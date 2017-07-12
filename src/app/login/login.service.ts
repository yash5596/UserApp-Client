import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { user } from '../shared/user';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }

  login(user) {
    return this._http.post('http://localhost:3000/api/user/login', user);
  }

}
