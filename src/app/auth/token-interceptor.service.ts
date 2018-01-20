import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHeaders,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
// Import authentication service to access login and logout methods
import { AuthService } from './auth.service';
// Manage observables
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

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
        tap(
          // Must use arrow syntax in order to preserve "this"
          res => this._onNext(res),
          error => this._onError(error)
        )
      );
  }

  // Cloned request sent with authorization header
  private _onNext(res) {
    if (res instanceof HttpResponse) {
      console.log(`Sent an authorized HTTP request with status ${res.status}: ${res.statusText}`);
    }
  }

  // Handle errors
  private _onError(error) {
    if (error instanceof HttpErrorResponse) {
      const errMsg = error.message;
      if (error.status === 401 || errMsg.indexOf('No JWT') > -1 || errMsg.indexOf('Unauthorized') > -1) {
        // Clear any invalid session data that may still be present
        this.auth.logout();
        // Log in again
        this.auth.login();
      }
    }
  }
}
