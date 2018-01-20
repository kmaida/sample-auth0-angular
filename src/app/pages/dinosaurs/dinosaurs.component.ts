import { Component, OnInit } from '@angular/core';
// Import API service
import { ApiService } from '../../shared/api.service';
// Manage observable
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { Dinosaur } from './dinosaur';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-dinosaurs',
  templateUrl: './dinosaurs.component.html',
  styles: []
})
export class DinosaursComponent implements OnInit {
  dinosaurs$: Observable<Dinosaur[]>;

  constructor(public api: ApiService) {
    this.dinosaurs$ = api.getDinosaurs$();
  }

  ngOnInit() {
  }

}
