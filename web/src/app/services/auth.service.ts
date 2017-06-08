import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor() { }

  loggedIn() {
    let result: boolean;
    result = tokenNotExpired("id_token");
    if(!result){
      return false;
    }
    return result;
  }
}
