import { Component, OnInit } from '@angular/core';
import { user } from '../shared/user';
import { SharedService } from '../shared/shared.service';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  user: user;
  error: any;

  constructor(private _sharedService: SharedService, private _profileService: ProfileService, private _router: Router) {
    // this.user = Object.assign({}, this._sharedService.getUser());
    this.user = new user();
    this._sharedService.ensureUser();
  }

  ngOnInit() {
    console.log('init')
    this._profileService.getUser().subscribe(res => {
      console.log(res);
      this.user = res[0]
      this.user.password = "";
    });
  }

  update() {
    this._profileService.updateUser(this.user)
      .subscribe(res => {
        // this._sharedService.setUser(res)
        this._router.navigateByUrl('home');
      }, (err) => {
        this.error = err.json()
      });
  }

  Logout() {
    this._sharedService.destroyUser();
  }

}
