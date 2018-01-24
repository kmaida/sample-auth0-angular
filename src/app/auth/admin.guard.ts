import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Import authentication service
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    const expectedRole = route.data.role;

    if (this.auth.tokenValid && this.auth.hasRole(expectedRole)) {
      // Route can load if user is logged in and has the expected role
      return true;
    } else if (!this.auth.tokenValid) {
      // If user is not authenticated, prompt to log in
      this.auth.login(url);
      return false;
    } else {
      // If user is authenticated but not an admin, redirect to homepage
      console.log(`You do not have the necessary permissions to access ${url}.`);
      this.router.navigate(['home']);
      return false;
    }
  }
}
