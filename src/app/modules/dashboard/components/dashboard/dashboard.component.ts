import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {SavedSearch} from 'model/SavedSearch';
import {WatchedDataset} from 'model/WatchedDataset';
import {DialogService} from '@shared/services/dialog.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Profile} from 'model/Profile';
import {Observable} from 'rxjs/Observable';
import {DataSetDetail} from 'model/DataSetDetail';
import {DataSetService} from '@shared/services/dataset.service';
import {ThorService} from '@shared/services/thor.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public savedSearches: SavedSearch[] = [];
    public watchedDatasets: WatchedDataset[] = [];

    profile: Profile;
    public dataSets: DataSetDetail[];

    constructor(public profileService: ProfileService,
                private dialogService: DialogService,
                private logger: LogService,
                private dataSetService: DataSetService,
                private thorService: ThorService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        if (this.profileService.profile) {
            this.profile = this.profileService.profile;
            this.reloadDataSets();
            this.profileService.getSavedSearches(this.profileService.profile.userId).subscribe(x => {
                this.logger.debug('saved searches received: {}', x.length);
                this.savedSearches = x;
            });
            this.profileService.getWatchedDatasets(this.profileService.profile.userId).subscribe(x => {
                this.logger.debug('saved searches received: {}', x.length);
                this.watchedDatasets = x;
            });
        } else {
            this.profileService.onProfileReceived.subscribe(x => {
                this.profile = x;
                this.reloadDataSets();
                this.profileService.getSavedSearches(x.userId).subscribe(r => {
                    this.logger.debug('saved searches received: {}', r.length);
                    this.savedSearches = r;
                });
                this.profileService.getWatchedDatasets(this.profileService.profile.userId).subscribe(r => {
                    this.logger.debug('saved searches received: {}', r.length);
                    this.watchedDatasets = r;
                });
            });
        }
    }

    reloadDataSets() {
        // this.dataSets = new Array();
        if (!this.profile || !this.profile.dataSets) {
            this.dataSets = [];
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
    }

    delete(id: string) {
        this.profileService.deleteSavedSearch(id).subscribe(
            x => {
                this.logger.debug('savedSearch deleted');
                const i = this.savedSearches.findIndex(r => r.id === id);
                this.savedSearches.splice(i, 1);
                this.notificationService.success('Saved search removed', 'from dashboard');
            }
        );
    }

    deleteWatch(id: string) {
        this.profileService.deleteWatchedDataset(id).subscribe(
            x => {
                this.logger.debug('watchedDataset deleted');
                const i = this.watchedDatasets.findIndex(r => r.id === id);
                this.watchedDatasets.splice(i, 1);
                this.notificationService.success('Watched dataset removed', 'from dashboard');
            }
        );
    }

}
