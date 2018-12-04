import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {SearchService} from '@shared/services/search.service';
import {ActivatedRoute} from '@angular/router';
import {SearchResult} from 'model/SearchResult';
import {DataControl} from 'model/DataControl';
import {DataTransportService} from '@shared/services/data.transport.service';
import {QueryUtils} from '@shared/utils/query-utils';
import {Rule, SearchQuery} from 'model/SearchQuery';
import {Facet} from 'model/Facet';
import {FacetValue} from 'model/FacetValue';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Database} from 'model/Database';
import {DatabaseListService} from '@shared/services/database-list.service';
import {Profile} from 'model/Profile';
import {AuthService} from '@shared/services/auth.service';
import {ProfileService} from '@shared/services/profile.service';
import {NgProgress} from '@ngx-progressbar/core';
import {Title} from '@angular/platform-browser';
import {isPlatformServer} from '@angular/common';
import {forkJoin, Subscription} from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: 'search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
    query: string;
    facetsChannel = 'facet_channel';
    searchResult: SearchResult;
    dataControl = new DataControl();
    params = {};
    selectedFacets: Map<string, string[]>;
    databases: Database[];
    profile: Profile;
    isServer = true;
    private subscription: Subscription;

    constructor(private searchService: SearchService,
                private slimLoadingBarService: NgProgress,
                private route: ActivatedRoute,
                private logger: LogService,
                private authService: AuthService,
                private profileService: ProfileService,
                private databaseListService: DatabaseListService,
                private titleService: Title,
                @Inject(PLATFORM_ID) platformId,
                private dataTransportService: DataTransportService) {
        this.isServer = isPlatformServer(platformId);
    }

    ngOnInit() {
        if (this.isServer) {
            this.params = this.route.snapshot.params;
            this.query = QueryUtils.getBaseQuery(this.params);
            if (this.query !== '') {
                this.titleService.setTitle(this.query + ' - ' + 'OmicsDI');
            }
            this.dataControl = QueryUtils.getDataControl(this.params);
            this.selectedFacets = QueryUtils.getAllFacets(this.params);
            forkJoin(this.databaseListService.getDatabaseList(), this.searchService
                .fullSearch(this.query, this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy, this.dataControl.order))
                .subscribe(data => {
                    this.databases = data[0];
                    this.searchResult = data[1];
                    this.dataTransportService.fire(this.facetsChannel, data[1].facets);
                });
            return;
        }
        this.authService.loggedIn().then(isLogged => {
            if (isLogged) {
                this.profile = this.profileService.getProfileFromLocal();
            }
            this.databaseListService.getDatabaseList().subscribe(databases => {
                this.subscription = this.route.queryParams.subscribe(params => {
                    this.params = params;
                    this.slimLoadingBarService.ref().start();
                    this.query = QueryUtils.getBaseQuery(params);
                    if (this.query !== '') {
                        this.titleService.setTitle(this.query + ' - ' + 'OmicsDI');
                    }
                    this.dataControl = QueryUtils.getDataControl(params);
                    this.selectedFacets = QueryUtils.getAllFacets(params);
                    this.logger.debug('Facet selected: {}', this.selectedFacets);
                    this.databases = databases;
                    this.searchService
                        .fullSearch(
                            this.query, this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy, this.dataControl.order)
                        .subscribe(
                            result => {
                                this.searchResult = result;
                                this.dataTransportService.fire(this.facetsChannel, result.facets);
                            }, error => {
                                this.logger.error('Exception occurred when getting search result, {}', error);
                            }, () => {
                                this.slimLoadingBarService.ref().complete();
                            });
                });
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

    facetValueFindAndUpdate(searchQuery: SearchQuery, key: string, facet: string): boolean {
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
                    if (key !== 'omics_type') {
                        searchQuery.rules[i].query.operator = 'OR';
                    }
                    const rule = new Rule();
                    rule.field = key;
                    rule.data = facet;
                    searchQuery.rules[i].query.rules.push(rule);
                    break;
                }
            }
        }
        return foundKey;
    }

    /**
     * Add a facet into query
     * @param {string} key i.e: Organisms
     * @param {string} facet i.e: 10090
     */
    facetValueSelected(key: string, facet: string) {
        const searchQuery = QueryUtils.extractQuery(this.params);

        // Find key & update
        let foundKey = this.facetValueFindAndUpdate(searchQuery, key, facet);

        // If key not found, check the first level of query
        // If yes, then move that first level to second level
        if (!foundKey) {
            for (let i = 0; i < searchQuery.rules.length; i++) {
                if (searchQuery.rules[i].query === null) {
                    if (searchQuery.rules[i].field === key) {
                        if (searchQuery.rules[i].data === facet) {
                            return;
                        }
                        const newSearchQuery = new SearchQuery();
                        newSearchQuery.operator = 'OR';
                        newSearchQuery.rules = [];
                        const rule = new Rule();
                        rule.field = searchQuery.rules[i].field;
                        rule.data = searchQuery.rules[i].data;
                        newSearchQuery.rules.push(rule);
                        searchQuery.rules.splice(i, 1);
                        searchQuery.rules.push({condition: null, data: null, field: null, data2: null, query: newSearchQuery});
                        foundKey = this.facetValueFindAndUpdate(searchQuery, key, facet);
                        break;
                    }
                }
            }
        }

        // If key still not found, add new facet to query
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
                    if (rule.query != null) {
                        for (let j = 0; j < rule.query.rules.length; j++) {
                            const rule2 = rule.query.rules[j];
                            if (rule2.field !== null && rule2.field === originalFacet.id && rule2.data === facet.value) {
                                searchQuery.rules[i].query.rules.splice(j, 1);
                                break;
                            }
                        }
                        if (searchQuery.rules[i].query.rules.length === 0) {
                            searchQuery.rules.splice(i, 1);
                        }
                    }
                }
            });
        });
        this.searchService.triggerSearch(this.params, searchQuery.toQueryString(), null);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
