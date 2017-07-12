import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { SharedService } from '../shared/shared.service';
import { user } from '../shared/user';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  apiurl: string = "http://localhost:3000/api/user";

  constructor(private _http: Http, private _sharedService: SharedService) { }

  getUser() {
    console.log(this._sharedService.ensureUser());
    let id = this._sharedService.ensureUser();
    return this._http.get("http://localhost:3000/api/user?id=" + id).map(res => res.json());
  }

  updateUser(user: user) {
    return this._http.put(this.apiurl, { user: user, _id: user._id }).map(res => {
      res.json()
    });
  }

}
