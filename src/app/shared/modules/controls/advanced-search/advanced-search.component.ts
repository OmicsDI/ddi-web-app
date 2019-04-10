import {Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material';
import {AutocompleteNComponent} from '@shared/modules/controls/autocomplete-n/autocomplete-n.component';
import {SearchQuery} from 'model/SearchQuery';
import {DataTransportService} from '@shared/services/data.transport.service';
import {SearchService} from '@shared/services/search.service';
import {QueryUtils} from '@shared/utils/query-utils';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DataControl} from 'model/DataControl';
import {isPlatformServer} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
    selector: '[app-advanced-search]',
    templateUrl: 'advanced-search.component.html',
    styleUrls: ['advanced-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AdvancedSearchComponent implements OnInit, OnDestroy {

    @ViewChild(AutocompleteNComponent) autocompleteComponent: AutocompleteNComponent;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    query: string;

    queryParams: SearchQuery = new SearchQuery();
    private subscription: Subscription;

    @Input()
    isHomeSearch: boolean;

    params: {};

    isAdvancedOpened = false;

    // advance search
    dataControl = new DataControl();
    facetsChannel = 'facet_channel';

    constructor(protected router: Router,
                private dataTransportService: DataTransportService,
                private searchService: SearchService,
                private logger: LogService,
                @Inject(PLATFORM_ID) private platformId,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.analyseParams(this.route.snapshot.queryParams);
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.subscription = this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.analyseParams(this.route.snapshot.queryParams);
            }
        });
        this.loadFacetForAdvancedSearch();
    }

    analyseParams(params) {
        this.params = params;
        if (this.router.url.indexOf('/dataset/') === -1) {
            this.queryParams = QueryUtils.extractQuery(params);
            const query = this.queryParams.toQueryString();
            if (query.match(/^"[^"]*"$/)) {
                this.query = query.substring(1, query.length - 1);
            } else {
                this.query = query;
            }
            this.logger.debug('query: {}', this.query);
        }
    }

    getQueryValue() {
        if (this.query && this.query.match(/^"[^"]*"$/)) {
            return this.query.substring(1, this.query.length - 1);
        }
        return this.query;
    }

    doSearch(keyword) {
        this.searchService.triggerSearch(this.params, keyword, new DataControl());
    }

    search() {
        const searchText = this.autocompleteComponent.searchText;
        this.doSearch(searchText);
    }

    private loadFacetForAdvancedSearch() {
        this.searchService.fullSearch('', this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy,
            this.dataControl.order)
            .subscribe(result => {
                this.dataTransportService.fire(this.facetsChannel, result.facets);
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
