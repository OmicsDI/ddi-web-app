import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {NotificationsService} from 'angular2-notifications/dist';
import {Profile} from 'model/Profile';
import {ProfileService} from 'services/profile.service';
import {DataSetService} from 'services/dataset.service';
import {AppConfig} from 'app/app.config';
import {ThorService} from 'services/thor.service';
import {DataSetDetail} from 'model/DataSetDetail';

@Component({
    selector: 'app-profile-result-dashboardclaimed',
    templateUrl: './profile-result-dashboardclaimed.component.html',
    styleUrls: ['./profile-result-dashboardclaimed.component.css']
})
export class ProfileResultDashboardclaimedComponent implements OnInit, OnChanges {

    @Input() profile: Profile;
    @Output() change = new EventEmitter();

    dataSets: DataSetDetail[];


    constructor(private profileService: ProfileService
        , private dataSetService: DataSetService
        , private appConfig: AppConfig
        , private router: Router
        , private notificationService: NotificationsService
        , private thorService: ThorService) {
    }

    ngOnInit() {
        // this.profileService.getDataSetDetails(this.profileService.profile);
        this.profileService.onProfileReceived.subscribe(x => this.reloadDataSets());
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            // console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
            if (propName === 'profile') {
                if (null !== chng.currentValue) {
                    this.reloadDataSets();
                }
            }
        }
    }

    reloadDataSets() {
        this.dataSets = new Array();
        if (!this.profile) {
            return;
        }
        if (!this.profile.dataSets) {
            return;
        }
        Observable.forkJoin(this.profile.dataSets.map(x => {
            return this.dataSetService.getDataSetDetail_private(x.id, x.source);
        })).subscribe(
            y => {
                this.dataSets = y;
                this.thorService.datasets = y;
            }
        );
    }


    deleteDataset(source, id) {
        const i: number = this.profile.dataSets.findIndex(x => x.source === source && x.id === id);
        if (i !== -1) {
            console.log(`deleting ${source} ${id}`);
            this.profile.dataSets.splice(i, 1);
        }
        this.change.emit({});
        this.reloadDataSets();

        this.notificationService.success('Dataset deleted', 'from your profile');
    }
}
