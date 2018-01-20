import { Injectable } from '@angular/core';
// HTTP
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
// Manage observables
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
// Import authentication service
import { AuthService } from '../auth/auth.service';


@Injectable()
export class ApiService {
  private _API = environment.auth.audience;
  loading: boolean;
  error: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // GET dinosaur data (authenticated users)
  getDinosaurs$(): Observable<any> {
    this.loading = true;
    this.error = null;
    return this.http.get(`${this._API}dinosaurs`).pipe(
      map(this._onNext),
      catchError(this._onError)
    );
  }

  // GET dragon data (authenticated admin users)
  getDragons$(): Observable<any> {
    this.loading = true;
    this.error = null;
    return this.http.get(`${this._API}dragons`).pipe(
      map(this._onNext),
      catchError(this._onError)
    );
  }

  _onNext(res) {
    this.loading = false;
    this.error = null;
    return res;
  }

  _onError(error, caught): Observable<any> {
    let errMsg = 'Unable to complete request';
    if (error instanceof HttpErrorResponse) {
      errMsg = error.message;
      if (error.status === 401 || errMsg.indexOf('No JWT present') > -1 || errMsg.indexOf('UnauthorizedError') > -1) {
        // Clear any invalid session data that may still be present
        this.auth.logout();
        // Log in again
        this.auth.login();
      }
      this.loading = false;
      this.error = errMsg;
      console.log('set', this.loading, this.error);
    }
    return Observable.throw(errMsg);
  }

}
