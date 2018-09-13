import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';

@Component({
    selector: '[AppLoginLauncher]',
    templateUrl: './login-launcher.component.html',
    styleUrls: ['./login-launcher.component.css']
})

export class LoginLauncherComponent implements OnInit {

    public profile: Profile;
    public name: string;
    public userId: string;
    public isPublic: boolean;

    constructor(public profileService: ProfileService, private router: Router, public auth: AuthService) {
        this.name = null;
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        if (this.auth.loggedIn()) {
            this.profileService.getProfile()
                .subscribe(
                    profile => {
                        this.profileService.setProfile(profile);
                        this.profile = profile;
                        this.name = profile.userName;
                        this.userId = profile.userId;
                        this.isPublic = profile.isPublic;
                    }
                );
        }
    }

    private deleteCookie(name) {
        this.setCookie(name, '', -1);
    }

    private setCookie(name: string, value: string, expireDays: number, path = '') {
        const d: Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        const expires: string = 'expires=' + d.toUTCString();
        document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
    }

    LogOut() {
        // this.deleteCookie('AUTH-TOKEN');
        localStorage.removeItem('id_token');
        this.profileService.removeProfile();
        this.router.navigate(['home']);
    }
}
