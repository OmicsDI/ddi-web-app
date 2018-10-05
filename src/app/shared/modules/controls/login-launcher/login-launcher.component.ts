import {Component, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';
import {DataTransportService} from '@shared/services/data.transport.service';

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

    constructor(public profileService: ProfileService, public auth: AuthService, private dataTransportService: DataTransportService) {
    }

    ngOnInit() {
        this.getProfile();
        this.dataTransportService.listen('user_profile').subscribe(() => {
            this.getProfile();
        })
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

    LogOut() {
        // this.deleteCookie('AUTH-TOKEN');
        localStorage.removeItem('id_token');
        this.profileService.removeProfile();
        window.location.href = '/home';
    }
}
