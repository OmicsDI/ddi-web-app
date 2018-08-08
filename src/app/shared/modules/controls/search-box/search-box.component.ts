import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material';
import {AutocompleteNComponent} from '@shared/modules/controls/autocomplete-n/autocomplete-n.component';
import {SearchQuery} from 'model/SearchQuery';
import {DataTransportService} from '@shared/services/data.transport.service';
import {SearchService} from '@shared/services/search.service';
import {QueryUtils} from '@shared/utils/query-utils';

@Component({
    selector: '[AppSearchBox]',
    templateUrl: 'search-box.component.html',
    styleUrls: ['search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

    @ViewChild(AutocompleteNComponent) autocompleteComponent: AutocompleteNComponent;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    query: string;

    queryParams: SearchQuery = new SearchQuery();

    @Input()
    isHomeSearch: boolean;

    params: {};

    constructor(protected router: Router, private dataTransportService: DataTransportService,
                private searchService: SearchService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.params = params;
            this.queryParams = QueryUtils.extractQuery(params);
            this.query = this.queryParams.toQueryString();
            if (this.query[0] === '(') {
                this.query = this.query.slice(1, this.query.length - 1);
            }
        });
    }

    caret_class(): string {
        return this.trigger.menuOpen ? 'fa-caret-up' : 'fa-caret-down';
    }

    doSearch(keyword) {
        this.searchService.triggerSearch(this.params, keyword, null);
    }

    search() {
        const searchText = this.autocompleteComponent.searchText;
        this.searchService.triggerSearch(this.params, searchText, null);
    }

    updateQueryParams($event: SearchQuery) {
        this.query = $event.toQueryString();
    }

    doNotPropagate(event) {
        event.stopPropagation();
    }
}
