import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { user } from './user';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


@Injectable()
export class SharedService {

    constructor(public snackBar: MdSnackBar, private _router: Router, private _http: Http) {
        this.user = new user();
    }

    private user: user;

    setUser(user) {
        console.log(this.user);
        this.user = user;
        sessionStorage.setItem('userid', this.user._id);
    }

    destroyUser() {
        this.user = new user();
        sessionStorage.removeItem('userid');
        this._router.navigateByUrl('login');
    }

    ensureUser() {
        if (!this.user._id) {
            if (sessionStorage.getItem('userid')) {
                this.user._id = sessionStorage.getItem('userid')
                return this.user._id;
            }
            else {
                this._router.navigateByUrl('login');
                // this.openSnackBar('Something went wrong!', 'Oops!');
            }
        } else {
            return this.user._id;
        }

    }

    getUser() {
        if (this.user)
            return this.user;
        else {
            this.user._id = sessionStorage.getItem('userid');
            if (this.user._id) {
                this._http.get("http://localhost:3000/api/user?id=" + this.user._id).subscribe(res => {
                    this.user = res.json();
                })
            }
            else {
                this.checkUser();
            }
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }

    checkUser(): void {
        if (!this.user || !this.ensureUser()) {
            this._router.navigateByUrl('login');
            this.openSnackBar("Please Login!", "Opps!")
        }
    }

}