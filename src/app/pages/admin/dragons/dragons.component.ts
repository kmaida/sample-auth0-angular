import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { Dragon } from '../../../shared/dragon';

@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styles: []
})
export class DragonsComponent implements OnInit {
  dragons$: Observable<Dragon[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

}
