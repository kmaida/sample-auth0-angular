import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// Import AuthService
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  private _authCheck(url: string) {
    if (this.auth.tokenValid) {
      return true;
    } else {
      // If not authenticated, call login method and pass guarded URL
      this.auth.login(url);
      return false;
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authCheck(state.url);
  }

  canLoad(route: Route): boolean {
    return this._authCheck(`/${route.path}`);
  }
}
