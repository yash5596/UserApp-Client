import { Component, OnInit } from '@angular/core';
import { user } from '../shared/user';
import { LoginService } from "./login.service";
import { SharedService } from '../shared/shared.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  user: user = new user();
  error: any;
  constructor(private _sharedService: SharedService, private _loginService: LoginService, private _router: Router) { }

  ngOnInit() {
    if (this._sharedService.ensureUser()) {
      this._router.navigateByUrl('home');
      this._sharedService.openSnackBar("You are already logged in!", "Great")
    }
  }

  login() {
    this._loginService.login(this.user).subscribe(res => {
      this._sharedService.setUser(res.json()[0]);
      this.user = new user();
      this._router.navigateByUrl('home');
    }, err => {
      this.error = err._body;
    });
  }



}
