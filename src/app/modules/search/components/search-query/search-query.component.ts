import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SearchService} from '@shared/services/search.service';
import {SearchQuery} from 'model/SearchQuery';
import {NotificationsService} from 'angular2-notifications/dist';
import {SavedSearch} from 'model/SavedSearch';
import {ProfileService} from '@shared/services/profile.service';

@Component({
    selector: 'app-search-query',
    templateUrl: 'search-query.component.html',
    styleUrls: ['search-query.component.css']
})
export class SearchQueryComponent implements OnInit {

    searchQuery: string;
    subscription: Subscription;
    numberOfResults: number;

    constructor(private searchService: SearchService, private notificationService: NotificationsService,
                public profileService: ProfileService) {
    }

    ngOnInit() {
        this.subscription = this.searchService.searchResult$.subscribe(
            searchResult => {
                this.searchQuery = this.searchService.currentQuery;
                this.numberOfResults = searchResult.count;
            });
    }

    showAllClick() {
        this.searchService.paramQuery = new SearchQuery();
        this.searchService.textQuery = '*:*';
        this.searchService.unselectFacets();
        this.searchService.callSearch();
    }

    saveSearchClick() {
        const savedSearch: SavedSearch = new SavedSearch();

        savedSearch.userId = this.profileService.userId;
        savedSearch.search = this.searchQuery;
        savedSearch.count = this.numberOfResults;


        this.profileService.saveSavedSearch(savedSearch);

        this.notificationService.success(
            'Search saved',
            'to your dashboard'
        );
    }

}
