import { Injectable } from '@angular/core';
// HTTP
import { HttpClient } from '@angular/common/http';
// API URL
import { environment } from './../../environments/environment';
// Manage observables
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
// Import authentication service
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiService {
  private _API = environment.auth.audience;
  loading: boolean;
  error: boolean;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private _setStates(loading: boolean, error: boolean) {
    this.loading = loading;
    this.error = error;
  }

  // GET dinosaur data (authenticated users)
  getDinosaurs$(): Observable<any> {
    this._setStates(true, false);
    return this.http.get(`${this._API}dinosaurs`).pipe(
      // Must use arrow syntax in order to preserve "this"
      catchError((error, caught) => this._catchError(error, caught))
    );
  }

  // GET dragon data (authenticated admin users)
  getDragons$(): Observable<any> {
    this._setStates(true, false);
    return this.http.get(`${this._API}dragons`).pipe(
      catchError((error, caught) => this._catchError(error, caught))
    );
  }

  // Handle errors
  private _catchError(error, caught): Observable<any> {
    this._setStates(false, true);
    return Observable.throw(error.message);
  }

}
