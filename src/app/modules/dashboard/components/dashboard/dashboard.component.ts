import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {SavedSearch} from 'model/SavedSearch';
import {WatchedDataset} from 'model/WatchedDataset';
import {DialogService} from '@shared/services/dialog.service';
import {NotificationsService} from 'angular2-notifications';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Profile} from 'model/Profile';
import {DataSetDetail} from 'model/DataSetDetail';
import {DataSetService} from '@shared/services/dataset.service';
import {ThorService} from '@shared/services/thor.service';
import {NgProgress} from '@ngx-progressbar/core';
import {DataSetShort} from 'model/DataSetShort';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public savedSearches: SavedSearch[] = [];
    public watchedDatasets: WatchedDataset[] = [];
    profile: Profile;
    currentPage = 1;
    itemsPerPage = 15;
    public dataSets: DataSetDetail[];
    public watchedDatasetDetails: DataSetDetail[];

    constructor(public profileService: ProfileService,
                private dialogService: DialogService,
                private logger: LogService,
                private slimLoadingBarService: NgProgress,
                private dataSetService: DataSetService,
                private thorService: ThorService,
                private notificationService: NotificationsService) {
    }

    fetchPage(page: number) {
        this.slimLoadingBarService.ref().start();
        const fromIndex = (page - 1) * this.itemsPerPage;
        const toIndex = page * this.itemsPerPage;
        const datasets = this.watchedDatasets.slice(fromIndex, toIndex).map(x => {
            const ds = new DataSetShort();
            ds.id = x.accession;
            ds.source = x.source;
            return ds;
        });
        this.dataSetService.getBatchDatasets(datasets).subscribe(batchResult => {
            this.watchedDatasetDetails = batchResult.datasets;
            this.slimLoadingBarService.ref().complete();
            this.currentPage = page;
        });
    }

    ngOnInit() {
        this.profile = this.profileService.getProfileFromLocal();
        this.profileService.getSavedSearches(this.profile.userId).subscribe(x => {
            this.logger.debug('saved searches received: {}', x.length);
            this.savedSearches = x;
        });
        this.profileService.getWatchedDatasets(this.profile.userId).subscribe(x => {
            this.logger.debug('saved searches received: {}', x.length);
            this.watchedDatasets = x;
            this.fetchPage(1);
        });
        if (!this.profile.dataSets) {
            this.dataSets = [];
            return;
        }
        this.dataSetService.getDatasetDetails(this.profile.dataSets).subscribe(batches => {
            const tmpresult = [];
            batches.forEach(batch => {
                tmpresult.push.apply(tmpresult, batch.datasets);
            });
            this.dataSets = tmpresult;
            this.slimLoadingBarService.ref().complete();
        })
    }
    delete(id: string) {
        this.profileService.deleteSavedSearch(this.profile.userId, id).subscribe(
            x => {
                this.logger.debug('savedSearch deleted');
                const i = this.savedSearches.findIndex(r => r.id === id);
                this.savedSearches.splice(i, 1);
                this.notificationService.success('Saved search removed', 'from dashboard');
                // Refresh the window so that the user can see that the saved search was removed
                window.location.reload();
            }
        );
    }

    deleteWatch(accession: string, database: string) {
        const watch = this.watchedDatasets.find(x => x.source === database && x.accession === accession);
        if (watch == null) {
            return;
        }
        this.profileService.deleteWatchedDataset(this.profile.userId, watch.id).subscribe(
            x => {
                this.logger.debug('watchedDataset deleted');
                const i = this.watchedDatasets.findIndex(r => r.id === watch.id);
                this.watchedDatasets.splice(i, 1);
                this.notificationService.success('Watched dataset removed', 'from dashboard');
                // Refresh the window so that the user can see that the saved search was removed
                window.location.reload();
            }
        );
    }

}
