import { Component, OnInit } from '@angular/core';
// Import API service
import { ApiService } from '../../shared/api.service';
// Manage observable
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Dinosaur } from './dinosaur';

@Component({
  selector: 'app-dinosaurs',
  templateUrl: './dinosaurs.component.html',
  styles: []
})
export class DinosaursComponent implements OnInit {
  dinosaurs$: Observable<Dinosaur[]>;
  errorMsg: string;

  constructor(public api: ApiService) {
    this.dinosaurs$ = api.getDinosaurs$()
      .pipe(
        catchError((error, caught) => this._catchError(error, caught))
      );
  }

  ngOnInit() {
  }

  // Handle errors: generate an error message
  private _catchError(error, caught): Observable<any> {
    this.errorMsg = 'An error occurred fetching dinosaurs data. Please try again.';
    return Observable.throw(this.errorMsg);
  }

}
