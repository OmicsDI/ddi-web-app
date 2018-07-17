import {Component, OnInit} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {SavedSearch} from 'model/SavedSearch';
import {WatchedDataset} from 'model/WatchedDataset';
import {DialogService} from '@shared/services/dialog.service';
import {NotificationsService} from 'angular2-notifications/dist';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public savedSearches: SavedSearch[] = [];
    public watchedDatasets: WatchedDataset[] = [];

    constructor(public profileService: ProfileService
        , private dialogService: DialogService
        , private notificationService: NotificationsService) {
    }

    ngOnInit() {
        if (this.profileService.profile) {
            this.profileService.getSavedSearches(this.profileService.profile.userId).subscribe(x => {
                console.log('saved searches received:' + x.length);
                this.savedSearches = x;
            });
            this.profileService.getWatchedDatasets(this.profileService.profile.userId).subscribe(x => {
                console.log('saved searches received:' + x.length);
                this.watchedDatasets = x;
            });
        } else {
            this.profileService.onProfileReceived.subscribe(x => {
                this.profileService.getSavedSearches(x.userId).subscribe(r => {
                    console.log('saved searches received:' + r.length);
                    this.savedSearches = r;
                });
                this.profileService.getWatchedDatasets(this.profileService.profile.userId).subscribe(r => {
                    console.log('saved searches received:' + r.length);
                    this.watchedDatasets = r;
                });
            });
        }
    }

    delete(id: string) {
        this.profileService.deleteSavedSearch(id).subscribe(
            x => {
                console.log('savedSearch deleted');
                const i = this.savedSearches.findIndex(r => r.id === id);
                this.savedSearches.splice(i, 1);
                this.notificationService.success('Saved search removed', 'from dashboard');
            }
        );
    }

    deleteWatch(id: string) {
        this.profileService.deleteWatchedDataset(id).subscribe(
            x => {
                console.log('watchedDataset deleted');
                const i = this.watchedDatasets.findIndex(r => r.id === id);
                this.watchedDatasets.splice(i, 1);
                this.notificationService.success('Watched dataset removed', 'from dashboard');
            }
        );
    }

}
