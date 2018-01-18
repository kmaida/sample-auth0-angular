import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private _API = environment.auth.audience;

  constructor(private http: HttpClient) { }

  // GET data (authenticated users)
  getData$(): Observable<{[key: string]: any}[]> {
    return this.http
      .get(`${this._API}data`)
      .pipe(catchError(this._catchError));
  }

  // GET admin data (authenticated admin users)
  getAdminData$(): Observable<{[key: string]: any}[]> {
    return this.http
      .get(`${this._API}admin`)
      .pipe(catchError(this._catchError));
  }

  // Handle errors
  private _catchError(error, caught): Observable<any> {
    console.error('Error occurred:', error);
    return Observable.throw(error);
  }

}
