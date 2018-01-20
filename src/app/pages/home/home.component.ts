import { Component, OnInit } from '@angular/core';
// Import Title service
import { Title } from '@angular/platform-browser';
// Import authentication service
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    a { cursor: pointer; }
  `]
})
export class HomeComponent implements OnInit {
  pageTitle = 'Home';

  constructor(
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

}
