import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
    constructor() {
    }

    loggedIn() {
        return tokenNotExpired('id_token') && localStorage.getItem('profile') != null;
    }
}
