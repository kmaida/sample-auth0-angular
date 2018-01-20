import { Component, OnInit } from '@angular/core';
// Import API service
import { ApiService } from '../../../shared/api.service';
// Manage observable
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { Dragon } from './dragon';

@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styles: []
})
export class DragonsComponent implements OnInit {
  dragons$: Observable<Dragon[]>;
  loading = true;
  error: string;

  constructor(private api: ApiService) {
    this.dragons$ = api.getDragons$()
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
  _onError(error, caught): Observable<any> {
    this.loading = false;
    this.error = 'An error occurred fetching dragons data.';
    return Observable.throw(this.error);
  }

}
