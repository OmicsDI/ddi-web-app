import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SavedSearch} from 'model/SavedSearch';
import {ProfileService} from '@shared/services/profile.service';
import {NotificationsService} from 'angular2-notifications/dist';

@Component({
    selector: 'app-search-total',
    templateUrl: './search-total.component.html',
    styleUrls: ['./search-total.component.css']
})
export class SearchTotalComponent implements OnInit {

    @Input()
    searchCount: string;

    @Input()
    searchQuery: string;

    @Output()
    ignoreAllFacet = new EventEmitter<void>();

    constructor(public profileService: ProfileService
        , private notificationService: NotificationsService) {
    }

    ngOnInit() {
    }

    showAllClick() {
        this.ignoreAllFacet.emit();
    }

    saveSearchClick() {
        const savedSearch: SavedSearch = new SavedSearch();

        savedSearch.userId = this.profileService.userId;
        savedSearch.search = this.searchQuery;
        savedSearch.count = +this.searchCount;


        this.profileService.saveSavedSearch(savedSearch);

        this.notificationService.success(
            'Search saved',
            'to your dashboard'
        );
    }

    copyQueryClick() {
        this.notificationService.success(
            'Сopied to clipboard',
            this.searchQuery
        );
    }

}
