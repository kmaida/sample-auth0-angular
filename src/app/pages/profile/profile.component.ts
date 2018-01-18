import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  profileArray: {[key: string]: any};

  constructor(public auth: AuthService) {
    this.profileArray = this.profileArray = Object.keys(auth.userProfile);
  }

  ngOnInit() {
    console.log(this.profileArray);
  }

}
