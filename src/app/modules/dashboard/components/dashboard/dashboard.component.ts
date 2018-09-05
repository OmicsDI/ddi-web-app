import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {SavedSearch} from 'model/SavedSearch';
import {WatchedDataset} from 'model/WatchedDataset';
import {DialogService} from '@shared/services/dialog.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Profile} from 'model/Profile';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public savedSearches: SavedSearch[] = [];
    public watchedDatasets: WatchedDataset[] = [];
    profile: Profile;

    constructor(public profileService: ProfileService,
                private dialogService: DialogService,
                private logger: LogService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        if (this.profileService.isAuthorized()) {
            this.profile = this.profileService.getProfileFromLocal();
            this.profileService.getSavedSearches(this.profile.userId).subscribe(x => {
                this.logger.debug('saved searches received: {}', x.length);
                this.savedSearches = x;
            });
            this.profileService.getWatchedDatasets(this.profile.userId).subscribe(x => {
                this.logger.debug('saved searches received: {}', x.length);
                this.watchedDatasets = x;
            });
        }
    }

    delete(id: string) {
        this.profileService.deleteSavedSearch(this.profile.userId, id).subscribe(
            x => {
                this.logger.debug('savedSearch deleted');
                const i = this.savedSearches.findIndex(r => r.id === id);
                this.savedSearches.splice(i, 1);
                this.notificationService.success('Saved search removed', 'from dashboard');
            }
        );
    }

    deleteWatch(id: string) {
        this.profileService.deleteWatchedDataset(this.profile.userId, id).subscribe(
            x => {
                this.logger.debug('watchedDataset deleted');
                const i = this.watchedDatasets.findIndex(r => r.id === id);
                this.watchedDatasets.splice(i, 1);
                this.notificationService.success('Watched dataset removed', 'from dashboard');
            }
        );
    }

}
