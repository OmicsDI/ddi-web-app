import {Component, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';

@Component({
    selector: '[app-login-launcher]',
    templateUrl: './login-launcher.component.html',
    styleUrls: ['./login-launcher.component.css']
})

export class LoginLauncherComponent implements OnInit {

    public profile: Profile;
    public name: string;
    public userId: string;
    public isPublic: boolean;

    constructor(public profileService: ProfileService, public auth: AuthService) {
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        this.auth.loggedIn().then(isLogged => {
            if (isLogged) {
                const profile = this.profileService.getProfileFromLocal();
                this.profile = profile;
                this.name = profile.userName;
                this.userId = profile.userId;
                this.isPublic = profile.isPublic;
            }
        });
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
        window.location.href = '/home';
    }
}
