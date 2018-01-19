import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
