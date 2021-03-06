import { School } from './../models/School';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolServiceService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<School[]> {
      console.log('get all schools');
    return this.http
      .get<School[]>('http://localhost:8080/schools/school')
      .pipe(map(data => data))
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return observableThrowError(res.error || 'Server error');
  }
}
