import {Component, OnInit} from '@angular/core';
import {AppConfig} from 'app/app.config';
import {ProfileService} from 'services/profile.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {DialogService} from 'services/dialog.service';

@Component({
    selector: 'app-claimed',
    templateUrl: './claimed.component.html',
    styleUrls: ['./claimed.component.css']
})
export class DashboardClaimedComponent implements OnInit {

    constructor(private profileService: ProfileService,
                private appConfig: AppConfig,
                private notificationService: NotificationsService,
                private dialogService: DialogService) {
    }

    ngOnInit() {
    }

    updateProfile() {
        this.profileService.updateUser().subscribe();
    }

    deleteClick() {

        this.dialogService.confirm('Delete all datasets', 'Are you sure you want to do this?')
            .subscribe(res => {
                if (res) {
                    this.notificationService.success(
                        'Datasets deleted',
                        'from your profile'
                    );

                    this.profileService.profile.dataSets = [];
                    this.profileService.updateUser().subscribe(x => {

                    });

                }
            });
    }
}
