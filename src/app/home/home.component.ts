import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _sharedService: SharedService) {
    this._sharedService.checkUser();
  }

  ngOnInit() {
  }

  Logout() {
    this._sharedService.destroyUser();
  }

}
