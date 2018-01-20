import { Injectable } from '@angular/core';
// HTTP
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
// Manage observables
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private _API = environment.auth.audience;

  constructor(private http: HttpClient) { }

  // GET dinosaur data (authenticated users)
  getDinosaurs$(): Observable<any> {
    return this.http.get(`${this._API}dinosaurs`);
  }

  // GET dragon data (authenticated admin users)
  getDragons$(): Observable<any> {
    return this.http.get(`${this._API}dragons`);
  }

}
