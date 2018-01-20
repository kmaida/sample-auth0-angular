import { Injectable } from '@angular/core';
// HTTP
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
// Manage observables
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
// Types
import { Dinosaur } from './dinosaur';
import { Dragon } from './dragon';

@Injectable()
export class ApiService {
  private _API = environment.auth.audience;

  constructor(private http: HttpClient) { }

  // GET dinosaur data (authenticated users)
  getDinosaurs$(): Observable<Dinosaur[]> {
    return this.http
      .get(`${this._API}dinosaurs`)
      .pipe(catchError(this._catchError));
  }

  // GET dragon data (authenticated admin users)
  getDragons$(): Observable<Dragon[]> {
    return this.http
      .get(`${this._API}admin`)
      .pipe(catchError(this._catchError));
  }

  // Handle errors
  private _catchError(error, caught): Observable<any> {
    console.error('Error occurred getting data:', error);
    return Observable.throw(error);
  }

}
