import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from 'app/app.config';
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
    isAdmin = false;

    constructor(private profileService: ProfileService,
                private authService: AuthService,
                private dataTransportService: DataTransportService,
                public appConfig: AppConfig) {
    }

    ngOnInit() {
        this.dataTransportService.listen('image_change').subscribe(message => {
             this.profileImageUrl = this.appConfig.getProfileImageUrl(this.userId);
        });
        if (this.authService.loggedIn()) {
            this.profile = this.profileService.getProfileFromLocal();
            this.userId = this.profile.userId;
            this.profileImageUrl = this.appConfig.getProfileImageUrl(this.userId);
            this.profileService.getAdminUsers().subscribe( x => {
                if (this.userId !== null) {
                    for (const user of x.json().users) {
                        if (user === this.userId) {
                            this.isAdmin = true;
                        }
                    }
                }
            });
        }
    }
}
