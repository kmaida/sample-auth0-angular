import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Get auth configuration from environment
import { environment } from './../../environments/environment';
// Import auth0.js library
import * as auth0 from 'auth0-js';
// Handle observables
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
// @TODO: using import { of } from 'rxjs/observable/of' works but the usage throws errors
// @TODO: same case for timer
// This should supposedly be fixed in RxJS 6
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

@Injectable()
export class AuthService {
  // Create Auth0 web auth instance
  private _auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientId,
    domain: environment.auth.domain,
    responseType: 'token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });
  userProfile: any;
  // Track authentication status
  loggedIn: boolean;
  // Control view if authentication is still processing
  loading: boolean;
  // Subscribe to token renewal timer stream
  refreshSub: Subscription;

  constructor(private router: Router) {
    // If authenticated, set local profile property.
    // If not authenticated but there are still items in localStorage, log out.
    const lsProfile = localStorage.getItem('profile');
    const lsToken = localStorage.getItem('access_token');

    if (this.tokenValid) {
      this.userProfile = JSON.parse(lsProfile);
      this.loggedIn = true;
    } else if (!this.tokenValid && lsProfile) {
      this.logout();
    }
  }

  login(redirect?: string) {
    // Set redirect upon login if trying to access a protected route.
    // Redirect will take place after user is authenticated.
    const _redirect = redirect ? redirect : this.router.url;
    localStorage.setItem('auth_redirect', _redirect);
    // Auth0 authorize request
    this._auth0.authorize();
  }

  handleAuth() {
    this.loading = true;
    // When Auth0 hash parsed, get profile
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        this.router.navigate(['/']);
        this.loggedIn = false;
        this.loading = false;
        console.error(`Error authenticating: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this._auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile?) {
    // Set tokens and expiration in localStorage
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
    // Set profile information
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
      this.userProfile = profile;
    }
    // Session set; set loggedIn
    this.loggedIn = true;
    this.loading = false;
    // Redirect to desired route
    this.router.navigate([localStorage.getItem('auth_redirect')]);
  }

  renewToken() {
    this._auth0.checkSession({},
      (err, authResult) => {
        if (authResult && authResult.accessToken) {
          this._setSession(authResult);
        } else if (err) {
          console.warn(`Could not renew token: ${err.errorDescription}`);
          // Log out without redirecting to clear auth data
          this.logout(true);
          // Log in again
          this.login();
        }
      }
    );
  }

  scheduleRenewal() {
    // If user doesn't have a valid token, do nothing
    if (!this.tokenValid) { return; }
    // Unsubscribe from previous expiration observable
    this.unscheduleRenewal();
    // Create and subscribe to expiration observable
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const expiresIn$ = Observable.of(expiresAt)
      .pipe(
        mergeMap(
          expires => {
            const now = Date.now();
            // Use timer to track delay until expiration
            // to run the refresh at the proper time
            return Observable.timer(Math.max(1, expires - now));
          }
        )
      );

    this.refreshSub = expiresIn$
      .subscribe(
        () => {
          this.renewToken();
          this.scheduleRenewal();
        }
      );
  }

  unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  logout(skipRedirect?: boolean) {
    // Ensure all auth items removed from localStorage and service
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('auth_redirect');
    this.userProfile = undefined;
    this.loggedIn = false;
    // Return to homepage if redirect shouldn't be skipped
    if (!skipRedirect) {
      this.router.navigate(['/']);
    }
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    const tokenValid = Date.now() < expiresAt;
    return Date.now() < expiresAt;
  }

}
