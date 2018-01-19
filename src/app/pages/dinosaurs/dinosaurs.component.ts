import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dinosaurs',
  templateUrl: './dinosaurs.component.html',
  styles: []
})
export class DinosaursComponent implements OnInit {
  dinosaurs$: Observable<{[key: string]: number|string}>;
  loading: boolean;
  error: string;

  constructor(private api: ApiService) {
    this.dinosaurs$ = api.getDinosaurs$().pipe(
      map((res) => this._success(res)),
      catchError((error, caught) => this._showError(error, caught))
    );
  }

  ngOnInit() {
  }

  _success(res) {
    this.loading = false;
    this.error = '';
    return res;
  }

  _showError(error, caught): Observable<any> {
    this.loading = false;
    if (error instanceof HttpErrorResponse) {
      console.log(error);
    }
    return Observable.throw(error);
  }

}
