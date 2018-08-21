import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';
import {AppConfig} from 'app/app.config';
import {Router} from '@angular/router';
import {DataSetService} from '@shared/services/dataset.service';
import {Observable} from 'rxjs/Rx';
import {DataSetDetail} from 'model/DataSetDetail';
import {NotificationsService} from 'angular2-notifications/dist';
import {ThorService} from '@shared/services/thor.service';
import {DataSet} from 'model/DataSet';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {Database} from 'model/Database';

@Component({
    selector: 'app-profile-result',
    templateUrl: './profile-result.component.html',
    styleUrls: ['./profile-result.component.css']
})
export class ProfileResultComponent implements OnInit, OnChanges {

    dataSets: DataSetDetail[];

    @Input() profile: Profile;
    @Output() change = new EventEmitter();

    databases: Database[];

    toDataset = DataSetDetail.toDataset;


    constructor(public profileService: ProfileService,
                private dataSetService: DataSetService,
                public appConfig: AppConfig,
                private router: Router,
                private notificationService: NotificationsService,
                private databaseListServive: DatabaseListService,
                private logger: LogService,
                private thorService: ThorService) {
    }

    ngOnInit() {
        this.profileService.onProfileReceived.subscribe(x => this.reloadDataSets());
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            if (propName === 'profile') {
                if (null != chng.currentValue) {
                    this.reloadDataSets();
                }
            }
        }
    }

    reloadDataSets() {
        this.databaseListServive.getDatabaseList().subscribe(databases => {
            this.databases = databases;
            this.dataSets = [];
            if (!this.profile) {
                return;
            }
            if (!this.profile.dataSets) {
                return;
            }
            Observable.forkJoin(this.profile.dataSets.map(x => {
                return this.dataSetService.getDataSetDetail(x.id, x.source);
            })).subscribe(
                y => {
                    this.dataSets = y;
                    this.thorService.datasets = y;
                }
            );
        });
    }


    deleteDataset(source, id) {
        const i: number = this.profile.dataSets.findIndex(x => x.source === source && x.id === id);
        if (i !== -1) {
            this.logger.info(`deleting ${source} ${id}`);
            this.profile.dataSets.splice(i, 1);
        }
        this.change.emit({});
        this.reloadDataSets();

        this.notificationService.success('Dataset deleted', 'from your profile');
    }
}
