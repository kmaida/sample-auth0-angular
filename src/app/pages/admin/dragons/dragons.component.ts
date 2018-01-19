import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styles: []
})
export class DragonsComponent implements OnInit {
  dragons$: Observable<{[key: string]: number|string}>;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

}
