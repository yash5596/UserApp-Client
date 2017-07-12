import { Component, OnInit } from '@angular/core';
import { user } from '../shared/user';
import { SharedService } from '../shared/shared.service';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {

  user: user = new user();
  error: any;
  constructor(private _signupService: SignupService, private _router: Router, private _sharedService: SharedService) { }

  ngOnInit() {
    // if (this._sharedService.ensureUser()) {
    //   this._router.navigateByUrl('home');
    //   this._sharedService.openSnackBar("You are already logged in!", "Great")
    // }
  }

  Signup() {
    this._signupService.signup(this.user).subscribe(res => {
      this.user = new user();
      this._router.navigateByUrl('login');
    }, err => {
      this.error = err._body;
    });
  }

}
