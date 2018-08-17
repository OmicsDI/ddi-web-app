import {Component, OnInit} from '@angular/core';
import {SearchService} from '@shared/services/search.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {ActivatedRoute} from '@angular/router';
import {SearchResult} from 'model/SearchResult';
import {DataControl} from 'model/DataControl';
import {DataTransportService} from '@shared/services/data.transport.service';
import {QueryUtils} from '@shared/utils/query-utils';
import {Rule, SearchQuery} from 'model/SearchQuery';
import {Facet} from 'model/Facet';
import {FacetValue} from 'model/FacetValue';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
    query: string;
    facetsChannel = 'facet_channel';
    searchResult: SearchResult = new SearchResult();
    dataControl = new DataControl();
    params = {};
    selectedFacets: Map<string, string[]>;

    constructor(private searchService: SearchService,
                private slimLoadingBarService: SlimLoadingBarService,
                private route: ActivatedRoute,
                private logger: LogService,
                private dataTransportService: DataTransportService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.params = params;
            this.slimLoadingBarService.start();
            this.query = QueryUtils.getBaseQuery(params);
            this.dataControl = QueryUtils.getDataControl(params);
            this.selectedFacets = QueryUtils.getAllFacets(params);
            this.logger.debug('Facet selected: {}', this.selectedFacets);
            this.searchService
                .fullSearch(this.query, this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy, this.dataControl.order)
                .subscribe(
                    result => {
                    this.searchResult = result;
                    this.dataTransportService.fire(this.facetsChannel, result.facets);
                }, error => {
                        this.logger.error('Exception occurred when getting search result, {}', error);
                }, () => {
                        this.slimLoadingBarService.complete();
                });
        });
    }

    /**
     * Change page, pageSize, order or orderBy
     * @param {DataControl} dataControl
     */
    requestData(dataControl: DataControl) {
        this.searchService.triggerSearch(this.params, null, dataControl);
    }

    /**
     * Add a facet into query
     * @param {string} key i.e: Organisms
     * @param {string} facet i.e: 10090
     */
    facetValueSelected(key: string, facet: string) {
        const searchQuery = QueryUtils.extractQuery(this.params);
        let foundKey = false;
        for (let i = 0; i < searchQuery.rules.length; i++) {
            if (searchQuery.rules[i].query !== null) {
                const tmpQuery = searchQuery.rules[i].query;
                for (let j = 0; j < tmpQuery.rules.length; j++) {
                    if (tmpQuery.rules[j].field === key) {
                        foundKey = true;
                        if (tmpQuery.rules[j].data === facet) {
                            return;
                        }
                    }
                }
                if (foundKey) {
                    searchQuery.rules[i].query.operator = 'OR';
                    const rule = new Rule();
                    rule.field = key;
                    rule.data = facet;
                    searchQuery.rules[i].query.rules.push(rule);
                    break;
                }
            }
        }
        if (!foundKey) {
            const newSearchQuery = new SearchQuery();
            newSearchQuery.operator = 'OR';
            newSearchQuery.rules = [];
            const rule = new Rule();
            rule.field = key;
            rule.data = facet;
            newSearchQuery.rules.push(rule);
            searchQuery.rules.push({condition: null, data: null, field: null, data2: null, query: newSearchQuery});
        }
        this.searchService.triggerSearch(this.params, searchQuery.toQueryString(), null);
    }

    /**
     * Remove a facet from query
     * @param {string} key
     * @param {string} facet
     */
    facetValueRemoved(key: string, facet: string) {
        const searchQuery = QueryUtils.extractQuery(this.params);
        for (let i = 0; i < searchQuery.rules.length; i++) {
            if (searchQuery.rules[i].query !== null) {
                for (let j = 0; j < searchQuery.rules[i].query.rules.length; j++) {
                    const rule = searchQuery.rules[i].query.rules[j];
                    if (rule.field === key && rule.data === facet) {
                        searchQuery.rules[i].query.rules.splice(j, 1);
                        if (searchQuery.rules[i].query.rules.length === 0) {
                            searchQuery.rules.splice(i, 1);
                        }
                        break;
                    }
                }
            }
        }
        this.searchService.triggerSearch(this.params, searchQuery.toQueryString(), null);
    }

    /**
     * Remove all activated facets
     */
    removeAllFacet() {
        const searchQuery = QueryUtils.extractQuery(this.params);
        this.searchResult.facets.forEach((originalFacet: Facet) => {
            originalFacet.facetValues.map((facet: FacetValue) => {
                for (let i = 0; i < searchQuery.rules.length; i++) {
                    const rule = searchQuery.rules[i];
                    if (rule.field !== null && rule.field === originalFacet.id && rule.data === facet.value) {
                        searchQuery.rules.splice(i, 1);
                        break;
                    }
                }
            });
        });
        this.searchService.triggerSearch(this.params, searchQuery.toQueryString(), null);
    }
}
