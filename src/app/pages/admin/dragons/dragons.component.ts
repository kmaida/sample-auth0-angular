import { Component, OnInit } from '@angular/core';
// Import API service
import { ApiService } from '../../../shared/api.service';
// Manage observable
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Dragon } from './dragon';

@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styles: []
})
export class DragonsComponent implements OnInit {
  dragons$: Observable<Dragon[]>;
  errorMsg: string;

  constructor(public api: ApiService) {
    this.dragons$ = api.getDragons$()
    .pipe(
      catchError((error, caught) => this._catchError(error, caught))
    );
  }

  ngOnInit() {
  }

  private _catchError(error, caught): Observable<any> {
    this.errorMsg = 'An error occurred fetching dragons data. Please try again.';
    return Observable.throw(this.errorMsg);
  }

}
