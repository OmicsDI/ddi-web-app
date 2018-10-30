import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Profile} from 'model/Profile';
import {AppConfig} from 'app/app.config';
import {Router} from '@angular/router';
import {DataSetService} from '@shared/services/dataset.service';
import {Observable} from 'rxjs';
import {DataSetDetail} from 'model/DataSetDetail';
import {NotificationsService} from 'angular2-notifications';
import {ThorService} from '@shared/services/thor.service';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {Database} from 'model/Database';
import {WatchedDataset} from 'model/WatchedDataset';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {DataSet} from 'model/DataSet';

@Component({
    selector: 'app-profile-result',
    templateUrl: './profile-result.component.html',
    styleUrls: ['./profile-result.component.css']
})
export class ProfileResultComponent implements OnInit {

    dataSets: DataSet[];

    @Input() profile: Profile;
    @Output() change = new EventEmitter();

    databases: Database[];

    toDataset = DataSetDetail.toDataset;

    watchedDatasets: WatchedDataset[];


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
        this.reloadDataSets();
        this.profileService.getWatchedDatasets(this.profile.userId).subscribe( x => {
            this.watchedDatasets = x;
        });
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
            forkJoin(this.profile.dataSets.map(x => {
                return this.dataSetService.getDataSetDetail(x.id, x.source);
            })).subscribe(
                y => {
                    this.dataSets = y.map(x => DataSetDetail.toDataset(x));
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
            this.profileService.setProfile(this.profile);
        }
        this.change.emit({});
        this.reloadDataSets();

        this.notificationService.success('Dataset deleted', 'from your profile');
    }
}
