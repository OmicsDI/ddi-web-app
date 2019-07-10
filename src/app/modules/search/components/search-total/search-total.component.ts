import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {SavedSearch} from 'model/SavedSearch';
import {ProfileService} from '@shared/services/profile.service';
import {NotificationsService} from 'angular2-notifications';
import {Profile} from 'model/Profile';
import {isPlatformServer} from '@angular/common';

@Component({
    selector: 'app-search-total',
    templateUrl: './search-total.component.html',
    styleUrls: ['./search-total.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTotalComponent implements OnInit {

    @Input()
    searchCount: string;

    @Input()
    searchQuery: string;

    @Output()
    ignoreAllFacet = new EventEmitter<void>();
    profile: Profile;
    isServer: boolean;

    constructor(public profileService: ProfileService,
                @Inject(PLATFORM_ID) platformId,
                private notificationService: NotificationsService) {
        this.isServer = isPlatformServer(platformId);
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
