import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
    constructor(private router: Router) {
    }

    loggedIn() {
        return tokenNotExpired('id_token') && localStorage.getItem('profile') != null;
    }

    canActivate() {
        if (this.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['unauthorized']);
            return false;
        }
    }
}
