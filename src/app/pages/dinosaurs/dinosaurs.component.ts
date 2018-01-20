import { Component, OnInit } from '@angular/core';
// Import API service
import { ApiService } from '../../shared/api.service';
// Manage observable
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { Dinosaur } from './dinosaur';

@Component({
  selector: 'app-dinosaurs',
  templateUrl: './dinosaurs.component.html',
  styles: []
})
export class DinosaursComponent implements OnInit {
  dinosaurs$: Observable<Dinosaur[]>;
  loading = true;
  error: string;

  constructor(private api: ApiService) {
    this.dinosaurs$ = api.getDinosaurs$()
      .pipe(
        tap(this._onNext),
        catchError(this._onError)
      );
  }

  ngOnInit() {
  }

  // API data emitted successfully
  private _onNext(val) {
    console.log('Retrived API data successfully:', val);
    this.loading = false;
    this.error = null;
  }

  // An error occurred retrieving API data
  private _onError(error, caught): Observable<any> {
    this.loading = false;
    this.error = 'An error occurred fetching dinosaurs data.';
    return Observable.throw(this.error);
  }

}
