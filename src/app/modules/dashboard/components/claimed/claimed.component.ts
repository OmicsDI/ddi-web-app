import {Component, OnInit} from '@angular/core';
import {AppConfig} from 'app/app.config';
import {ProfileService} from '@shared/services/profile.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {DialogService} from '@shared/services/dialog.service';
import {Profile} from 'model/Profile';

@Component({
    selector: 'app-claimed',
    templateUrl: './claimed.component.html',
    styleUrls: ['./claimed.component.css']
})
export class DashboardClaimedComponent implements OnInit {

    profile: Profile;

    constructor(public profileService: ProfileService,
                public appConfig: AppConfig,
                private notificationService: NotificationsService,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        if (this.profileService.isAuthorized()) {
            this.profile = this.profileService.getProfileFromLocal();
        }
    }

    updateProfile() {
        this.profileService.updateUser(this.profile).subscribe();
    }

    deleteClick() {

        this.dialogService.confirm('Delete all datasets', 'Are you sure you want to do this?')
            .subscribe(res => {
                if (res) {
                    this.notificationService.success(
                        'Datasets deleted',
                        'from your profile'
                    );

                    this.profile.dataSets = [];
                    this.profileService.updateUser(this.profile ).subscribe(x => {

                    });

                }
            });
    }
}
