import {Component, OnDestroy, OnInit} from '@angular/core';
import {Olympic} from "../../core/models/Olympic";
import { LineData } from "../../core/models/LineData";
import { DataTitleComponent } from 'src/app/core/components/data-title/data-title.component';
import { MedalsInfoComponent } from 'src/app/core/components/medals-info/medals-info.component';
import {ActivatedRoute, Router} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, Subject, of, takeUntil } from 'rxjs';


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  dataTitleComponent: DataTitleComponent = new DataTitleComponent();
  medalsInfoComponent: MedalsInfoComponent = new MedalsInfoComponent();


  olympics$: Observable<Olympic[]> = of([]);
  destroy$: Subject<boolean> = new Subject();
  hasError$ = new BehaviorSubject<boolean>(false);

  countryId!: number;
  country!: Olympic | undefined;

  basicData!: LineData;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];
    this.getOlympicsData();
   
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  getOlympicsData(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (object: Olympic[]) => {
        this.country = object.find((country) => country.id === this.countryId);
        if (this.country) {
          this.initChart(this.country);
        }
      },
      error: (msg) => {
        this.hasError$.next(true);
      },
      
    });
  }

  initChart(country: Olympic): void {
    this.basicData = {
      labels: this.getParticipationYears(country),
      datasets: [
        {
          backgroundColor: '#42A5F5',
          label: country?.country,
          data: this.getMedalCounts(country),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
      ],
    };
  }

  getParticipationYears(country: Olympic): number[] {
    return country?.participations.map((value) => value.year) ?? [];
  }

  getMedalCounts(country: Olympic): number[] {
    return country?.participations.map((value) => value.medalsCount) ?? [];
  }

  getNbOfEntries(): number {
    return this.country?.participations.length ?? 0;
  }
  getCountryName(): string {
    return this.country?.country ?? 'Country not found';
  }

  getNbOfMedals(): number {
    return (
      this.country?.participations.reduce(
        (prev, current) => current.medalsCount + prev,
        0
      ) ?? 0
    );
  }

  getNbOfAthletes(): number {
    return (
      this.country?.participations.reduce(
        (prev, current) => current.athleteCount + prev,
        0
      ) ?? 0
    );
  }

  goBack(): void {
    this.location.back();
  }
}
