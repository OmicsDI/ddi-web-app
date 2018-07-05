import {Component, OnInit} from '@angular/core';
import {SearchService} from 'services/search.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {ActivatedRoute} from '@angular/router';
import {SearchQuery} from 'model/SearchQuery';
import {NotificationsService} from 'angular2-notifications/dist';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
    content: string;
    _dataLoaded = false;

    constructor(private searchService: SearchService, private slimLoadingBarService: SlimLoadingBarService,
                private route: ActivatedRoute, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.slimLoadingBarService.start();
        this.route.queryParams.subscribe(params => {
            const q: string = params['q'];
            if (null !== q) {
                this.searchService.textQuery = q;
                this.searchService.paramQuery = new SearchQuery();
                this.searchService.selectedFacets = {};
                this.searchService.callSearch();
            } else {
                this.searchService.callSearch();
            }
        });
        setTimeout(() => {
            this._dataLoaded = true;
        }, 500);
    }

    dataLoaded(): boolean {
        return this._dataLoaded;
    }

}
