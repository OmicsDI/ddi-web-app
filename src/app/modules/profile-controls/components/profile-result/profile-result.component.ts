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
import {NgProgress} from '@ngx-progressbar/core';

@Component({
    selector: 'app-profile-result',
    templateUrl: './profile-result.component.html',
    styleUrls: ['./profile-result.component.css']
})
export class ProfileResultComponent implements OnInit {

    dataSets: DataSet[];

    @Input() profile: Profile;
    @Output() change = new EventEmitter();

    databases: Map<string, Database>;
    currentPage = 1;
    itemsPerPage = 10;
    watchedDatasets: Map<string, WatchedDataset>;


    constructor(public profileService: ProfileService,
                private dataSetService: DataSetService,
                public appConfig: AppConfig,
                private router: Router,
                private slimLoadingBarService: NgProgress,
                private notificationService: NotificationsService,
                private databaseListServive: DatabaseListService,
                private logger: LogService,
                private thorService: ThorService) {
    }

    ngOnInit() {
        this.reloadDataSets();
        this.profileService.getWatchedDatasets(this.profile.userId).subscribe( watches => {
            this.watchedDatasets = new Map<string, WatchedDataset> ();
            watches.forEach(watch => {
                this.watchedDatasets.set(watch.source + watch.accession, watch);
            })
        });
    }

    fetchPage(page: number) {
        this.slimLoadingBarService.ref().start();
        const fromIndex = (page - 1) * this.itemsPerPage;
        const toIndex = page * this.itemsPerPage;
        const datasets = this.profile.dataSets.slice(fromIndex, toIndex);
        this.dataSetService.getBatchDatasets(datasets).subscribe(batchResult => {
            this.dataSets = batchResult.datasets.map(x => DataSetDetail.toDataset(x));
            this.slimLoadingBarService.ref().complete();
            this.currentPage = page;
            window.scrollTo(0, 0);
        });
    }

    reloadDataSets() {
        this.databaseListServive.getDatabaseList().subscribe(databases => {
            this.databases = new Map<string, Database>();
            databases.forEach(db => {
                this.databases.set(db.source, db);
            });
            this.dataSets = [];
            if (!this.profile) {
                return;
            }
            if (!this.profile.dataSets) {
                return;
            }
            this.fetchPage(1);
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
