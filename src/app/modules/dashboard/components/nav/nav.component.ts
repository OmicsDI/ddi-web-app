import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from 'app/app.config';
import {Profile} from 'model/Profile';
import {DataTransportService} from '@shared/services/data.transport.service';
import {AuthService} from '@shared/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

    userId: string;
    public profileImageUrl: string;
    profile: Profile;
    isAdmin = false;
    isCollapsed = true;
    isAdminCollapsed = true;
    private subscriptions: Subscription[] = [];

    constructor(private profileService: ProfileService,
                private authService: AuthService,
                private router: Router,
                private dataTransportService: DataTransportService,
                public appConfig: AppConfig) {
    }

    ngOnInit() {
        this.subscriptions.push(this.router.events.subscribe(e => {
            this.isCollapsed = true;
        }));
        this.subscriptions.push(this.dataTransportService.listen('image_change').subscribe(message => {
             this.profileImageUrl = this.appConfig.getProfileImageUrl(this.userId);
        }));
        this.subscriptions.push(this.dataTransportService.listen('user_profile').subscribe(() => {
            this.profile = this.profileService.getProfileFromLocal();
        }));
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

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
