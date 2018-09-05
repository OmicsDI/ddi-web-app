import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {ProfileService} from '@shared/services/profile.service';
import {AppConfig} from '../../../../app.config';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from 'model/Profile';

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
                public appConfig: AppConfig, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.router.events.subscribe(() => {
            this.showUp = this.router.url.indexOf('/dashboard/') !== -1;
        });
        this.profileService.getProfile()
            .subscribe(
                profile => {
                    this.profile = profile;
                    this.userId = profile.userId;
                    // this.getConnections(this.userId);
                    // this.getCoAuthors(this.userId);

                    this.profileImageUrl = this.getProfileImageUrl();
                }
            );
    }

    getProfileImageUrl(): string {
        return this.appConfig.getProfileImageUrl(this.userId);
    }

    profileClicked() {

    }
}
