import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SavedSearch} from 'model/SavedSearch';
import {ProfileService} from '@shared/services/profile.service';
import {NotificationsService} from 'angular2-notifications';
import {Profile} from 'model/Profile';

@Component({
    selector: 'app-search-total',
    templateUrl: './search-total.component.html',
    styleUrls: ['./search-total.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTotalComponent implements OnInit {

    @Input()
    searchCount: number;

    @Input()
    searchQuery: string;

    @Output()
    ignoreAllFacet = new EventEmitter<void>();
    profile: Profile;

    constructor(public profileService: ProfileService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.profile = this.profileService.getProfileFromLocal();
    }

    showAllClick() {
        this.ignoreAllFacet.emit();
    }

    saveSearchClick() {
        const savedSearch: SavedSearch = new SavedSearch();

        if (!this.profile) {
            this.notificationService.error('Please login');
            return;
        } else {
            savedSearch.userId = this.profile.userId;
            savedSearch.search = this.searchQuery;
            savedSearch.count = +this.searchCount;
            this.profileService.saveSavedSearch(savedSearch);
            this.notificationService.success('Search saved', 'to your dashboard');
        }
    }

    copyQueryClick() {
        this.notificationService.success('Сopied to clipboard', this.searchQuery);
    }
}
