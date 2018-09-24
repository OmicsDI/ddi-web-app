import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';
import {DataSetService} from '@shared/services/dataset.service';
import {DataSetDetail} from 'model/DataSetDetail';
import {AppConfig} from 'app/app.config';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {InviteComponent} from '@modules/profile-controls/components/invite/invite.component';
import {LogService} from '@shared/modules/logs/services/log.service';
import {AuthService} from '@shared/services/auth.service';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class DashboardProfileComponent implements OnInit {
    profileX: Profile;
    public name: String;
    dataSetDetails: DataSetDetail[] = [];
    profileImageUrl = '';
    coauthors: string[];
    userId = 'xxx';
    username: string = null;

    constructor(public profileService: ProfileService,
                private dataSetService: DataSetService,
                public appConfig: AppConfig,
                private router: Router,
                private authService: AuthService,
                private route: ActivatedRoute,
                private logger: LogService,
                private slimLoadingBarService: NgProgress,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.slimLoadingBarService.start();
        this.profileX = this.profileService.getProfileFromLocal();
        this.name = this.profileX.userName;
        this.dataSetDetails = [];

        this.userId = this.profileX.userId;

        if (window.location.search) {
            this.showWelcomeDialog();
        }
        this.slimLoadingBarService.complete();
    }


    private showWelcomeDialog() {
        const inviteId = this.route.snapshot.queryParams['state'];

        if (inviteId) {

            this.logger.debug('Opening dialog with inviteId : {}', inviteId);

            if (inviteId.length === 12) {
                this.dialog.open(InviteComponent, {data: {inviteId: inviteId}});
            }
        }

    }

    isMy(): boolean {
        return (null == this.username);
    }
}
