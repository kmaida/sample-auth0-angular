import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHeaders,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
// Import AuthService to access login method
import { AuthService } from './auth.service';
// Manage observables
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Set request Authorization header
    const authReq = req.clone({
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    });

    // Send the new authorized request
    return next.handle(authReq)
      .pipe(
        catchError(this._catchError)
      );
  }

  // Handle any errors
  private _catchError(error, caught): Observable<any> {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.auth.login();
    }
    return Observable.throw(error);
  }
}
