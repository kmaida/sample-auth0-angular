import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    if (this.auth.tokenValid && this.auth.isAdmin) {
      // Route can load if user is logged in and is an admin
      return true;
    } else if (!this.auth.tokenValid) {
      // If user is not authenticated, prompt to log in
      this.auth.login(url);
      return false;
    } else {
      // If user is authenticated but not an admin, redirect to homepage
      console.log(`You do not have the necessary permissions to access ${url}`);
      this.router.navigate(['/']);
      return false;
    }
  }
}
