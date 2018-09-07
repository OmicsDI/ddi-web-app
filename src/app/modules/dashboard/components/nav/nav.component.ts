import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from '../../../../app.config';
import {Router} from '@angular/router';
import {Profile} from 'model/Profile';
import {DataTransportService} from '@shared/services/data.transport.service';
import {AuthService} from '@shared/services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    userId: string;
    public profileImageUrl: string;
    profile: Profile;
    showUp = false;

    constructor(private profileService: ProfileService,
                private authService: AuthService,
                private dataTransportService: DataTransportService,
                public appConfig: AppConfig,
                private router: Router) {
    }

    ngOnInit() {
        this.router.events.subscribe(() => {
            this.showUp = this.router.url.indexOf('/dashboard/') !== -1;
        });
        this.dataTransportService.listen('image_change').subscribe(message => {
             this.profileImageUrl = this.appConfig.getProfileImageUrl(this.userId);
        });
        if (this.authService.loggedIn()) {
            this.profile = this.profileService.getProfileFromLocal();
            this.userId = this.profile.userId;
            this.profileImageUrl = this.appConfig.getProfileImageUrl(this.userId);
        }
    }
}
