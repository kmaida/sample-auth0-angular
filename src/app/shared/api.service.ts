import { Injectable } from '@angular/core';
// HTTP
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
// Manage observables
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
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

  private _catchError(error, caught): Observable<any> {
    this._setStates(false, true);
    return Observable.throw(error.message);
  }

}
