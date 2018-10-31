import {Injectable, PLATFORM_ID} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ProfileService} from '@shared/services/profile.service';
import {isPlatformBrowser} from '@angular/common';


@Injectable()
export class AuthService implements CanActivate {
    helper = new JwtHelperService();

    constructor(private router: Router, private profileService: ProfileService) {
    }

    async loggedIn() {
        // Server side rendering
        if (!isPlatformBrowser(PLATFORM_ID)) {
            return false;
        }
        const token = localStorage.getItem('id_token');
        if (token != null) {
            const expired = this.helper.decodeToken(token).expires;
            const isNotExpired = new Date().getMilliseconds() < expired;
            let profile = this.profileService.getProfileFromLocal();
            if (isNotExpired) {
                if (profile == null || (profile != null && profile.userId == null)) {
                    profile = await this.profileService.getProfile().toPromise();
                    if (profile.userId == null) {
                        // Token expired on the server (i.e restarted server)
                        localStorage.removeItem('id_token');
                        this.profileService.removeProfile();
                        return false;
                    }
                    this.profileService.setProfile(profile);
                }
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
