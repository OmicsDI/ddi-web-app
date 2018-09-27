import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from 'app/app.config';
import {Profile} from 'model/Profile';
import {DataTransportService} from '@shared/services/data.transport.service';
import {AuthService} from '@shared/services/auth.service';
import {Route, Router} from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    userId: string;
    public profileImageUrl: string;
    profile: Profile;
    isAdmin = false;
    isCollapsed = true;

    constructor(private profileService: ProfileService,
                private authService: AuthService,
                private router: Router,
                private dataTransportService: DataTransportService,
                public appConfig: AppConfig) {
    }

    ngOnInit() {
        this.router.events.subscribe(e => {
            this.isCollapsed = true;
        });
        this.dataTransportService.listen('image_change').subscribe(message => {
             this.profileImageUrl = this.appConfig.getProfileImageUrl(this.userId);
        });
        this.authService.loggedIn().then(isLogged => {
            if (isLogged) {
                this.profile = this.profileService.getProfileFromLocal();
                this.userId = this.profile.userId;
                this.profileImageUrl = this.appConfig.getProfileImageUrl(this.userId);
                this.profileService.getAdminUsers().subscribe( x => {
                    if (this.userId !== null) {
                        for (const user of x['users']) {
                            if (user === this.userId) {
                                this.isAdmin = true;
                            }
                        }
                    }
                });
            }
        });
    }
}
