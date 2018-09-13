import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class AuthService implements CanActivate {
    helper = new JwtHelperService();

    constructor(private router: Router) {
    }

    loggedIn() {
        const token = localStorage.getItem('id_token');
        return !this.helper.isTokenExpired(token);
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
