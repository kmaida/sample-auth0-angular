import { Component, OnInit } from '@angular/core';
// Import Title service
import { Title } from '@angular/platform-browser';
// Import authentication service
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  pageTitle: string;
  profileKeys: string[];

  constructor(
    public auth: AuthService,
    private title: Title
  ) { }

  ngOnInit() {
    this.profileKeys = Object.keys(this.auth.userProfile);
    this.pageTitle = this.auth.userProfile.name;
    this.title.setTitle(this.pageTitle);
  }

}
