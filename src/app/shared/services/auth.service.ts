import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ProfileService} from '@shared/services/profile.service';


@Injectable()
export class AuthService implements CanActivate {
    helper = new JwtHelperService();

    constructor(private router: Router, private profileService: ProfileService) {
    }

    async loggedIn() {
        const token = localStorage.getItem('id_token');
        if (token != null) {
            const expired = this.helper.decodeToken(token).expires;
            const isNotExpired = new Date().getMilliseconds() < expired;
            if (isNotExpired && this.profileService.getProfileFromLocal() == null) {
                const profile = await this.profileService.getProfile().toPromise();
                this.profileService.setProfile(profile);
            }
            return isNotExpired;
        }
        return false;
    }

    async canActivate() {
        if (await this.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['unauthorized']);
            return false;
        }
    }
}
