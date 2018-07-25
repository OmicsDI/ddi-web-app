import {Component, OnInit} from '@angular/core';
import {SearchService} from '@shared/services/search.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {ActivatedRoute} from '@angular/router';
import {SearchResult} from 'model/SearchResult';
import {DataControl} from 'model/DataControl';
import {DataTransportService} from '@shared/services/data.transport.service';
import {QueryUtils} from '@shared/utils/query-utils';
import {Rule} from 'model/SearchQuery';
import {Facet} from 'model/Facet';
import {FacetValue} from 'model/FacetValue';

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

    constructor(private searchService: SearchService, private slimLoadingBarService: SlimLoadingBarService,
                private route: ActivatedRoute, private dataTransportService: DataTransportService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.params = params;
            this.slimLoadingBarService.start();
            this.query = QueryUtils.getBaseQuery(params);
            this.dataControl = QueryUtils.getDataControl(params);
            this.selectedFacets = QueryUtils.getFacets(params);
            this.searchService.fullSearch(this.query, this.dataControl.page, this.dataControl.pageSize,
                this.dataControl.sortBy, this.dataControl.order)
                .subscribe(result => {
                    this.searchResult = result;
                    this.dataTransportService.fire(this.facetsChannel, result.facets);
                });
            this.slimLoadingBarService.stop();
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
        for (let i = 0; i < searchQuery.rules.length; i++) {
            if (searchQuery.rules[i].field === key) {
                if (searchQuery.rules[i].data === facet) {
                    return;
                }
            }
        }
        const rule = new Rule();
        rule.field = key;
        rule.data = facet;
        searchQuery.rules.push(rule);
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
            if (searchQuery.rules[i].field === key) {
                if (searchQuery.rules[i].data === facet) {
                    searchQuery.rules.splice(i, 1);
                    break;
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
