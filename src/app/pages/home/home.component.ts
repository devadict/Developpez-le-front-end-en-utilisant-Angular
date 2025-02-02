import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import {Router} from "@angular/router";
import {Subscription, Subject, takeUntil, Observable, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  olympics$: Observable<Olympic[]> = of([]);
  destroy$: Subject<boolean> = new Subject();
  medalsCount!: number[];
  labels!: string[];
  joCounter!: number;
  countryCounter!: number;
  data: any;
  options: any;


  constructor(private olympicService: OlympicService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    this.getOlympicsData();
    
  }

  ngOnDestroy(): void {
    
  }


  getOlympicsData(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (object: Olympic[]) => {
        console.log(object);
        this.joCounter = this.getNumberOfJOs(object);
        this.countryCounter = object.length;
        this.labels = this.getLabels(object);
        this.medalsCount = this.getMedalsCount(object);
        this.data = this.getData(this.labels, this.medalsCount);
    },
      error: (error: Error) => console.error(error),
      complete: () => console.log('Observer got a complete notification'),
    });
  }

  getNumberOfJOs(object: Olympic[]): number {
    return object[0]?.participations.length ?? 0;
  }

  getLabels(object: Olympic[]): string[] {
    return object.map((value) => value.country);
  }

  getMedalsCount(object: Olympic[]): number[] {
    return object.map((value) => value.participations)
      .map((value) => value.reduce((prev, current) => current.medalsCount + prev, 0));
  }

  getData(labels: string[], medalsCount: number[]): any {
    return {
      labels: labels,
      datasets: [
        {
          data: medalsCount,     
          backgroundColor: [
            '#956065',
            '#B8CBE7',
            '#89A1DB',
            '#793D52',
            '#9780A1'
          ],
        },
      ],
    };
  }


  onSelect(event: any) {
    this.router.navigateByUrl(`/${event.element.index + 1}`);
  }

}
