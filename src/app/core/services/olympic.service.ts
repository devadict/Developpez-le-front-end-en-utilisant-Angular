import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Olympic} from "../models/Olympic";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  private hasError$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) {
  }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        this.hasError$.next(true);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() : Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  get hasError(): Observable<boolean> {
    return this.hasError$.asObservable();
  }

  getOlympicByCountry(country: string): Observable<Olympic | undefined> {
    return this.olympics$.pipe(
      map(
        olympics => olympics.find(olympic => olympic.country === country)
      )
    );
  }
}
