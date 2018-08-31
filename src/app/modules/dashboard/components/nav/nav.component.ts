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
    public uploader: FileUploader;
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

                    this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(this.userId)});

                    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                        this.profileImageUrl = this.getProfileImageUrl();
                    };

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
