import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
// Manage observable
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Dinosaur } from '../../shared/dinosaur';

@Component({
  selector: 'app-dinosaurs',
  templateUrl: './dinosaurs.component.html',
  styles: []
})
export class DinosaursComponent implements OnInit {
  dinosaurs$: Observable<Dinosaur[]>;
  loading: boolean;
  error: boolean;

  constructor(private api: ApiService) {
    this.dinosaurs$ = api.getDinosaurs$().pipe(
      tap(
        this._onNext,
        this._onError
      )
    );
  }

  ngOnInit() {
  }

  private _onNext(val) {
    this.loading = false;
    this.error = false;
  }

  private _onError(error) {
    this.loading = false;
    this.error = true;
  }

}
