import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material';
import {AutocompleteNComponent} from '@shared/modules/controls/autocomplete-n/autocomplete-n.component';
import {SearchQuery} from 'model/SearchQuery';
import {DataTransportService} from '@shared/services/data.transport.service';
import {SearchService} from '@shared/services/search.service';
import {QueryUtils} from '@shared/utils/query-utils';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DataControl} from 'model/DataControl';

@Component({
    selector: '[app-search-box]',
    templateUrl: 'search-box.component.html',
    styleUrls: ['search-box.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent implements OnInit {

    @ViewChild(AutocompleteNComponent) autocompleteComponent: AutocompleteNComponent;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    query: string;

    queryParams: SearchQuery = new SearchQuery();

    @Input()
    isHomeSearch: boolean;

    params: {};

    // advance search
    dataControl = new DataControl();
    facetsChannel = 'facet_channel';

    constructor(protected router: Router,
                private dataTransportService: DataTransportService,
                private searchService: SearchService,
                private logger: LogService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
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
        });
        this.loadFacetForAdvancedSearch();
    }

    getQueryValue() {
        if (this.query && this.query.match(/^"[^"]*"$/)) {
            return this.query.substring(1, this.query.length - 1);
        }
        return this.query;
    }

    caret_class(): string {
        return this.trigger.menuOpen ? 'fa-caret-up' : 'fa-caret-down';
    }

    doSearch(keyword) {
        this.searchService.triggerSearch(this.params, keyword, new DataControl());
    }

    search() {
        const searchText = this.autocompleteComponent.searchText;
        this.doSearch(searchText);
    }

    updateQueryParams($event: SearchQuery) {
        this.query = $event.toQueryString();
    }

    doNotPropagate(event) {
        event.stopPropagation();
    }

    private loadFacetForAdvancedSearch() {
        this.searchService.fullSearch('', this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy,
            this.dataControl.order)
            .subscribe(result => {
                this.dataTransportService.fire(this.facetsChannel, result.facets);
            });
    }
}
