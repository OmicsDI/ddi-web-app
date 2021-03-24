import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewChild} from '@angular/core';
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
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {BsModalService} from 'ngx-bootstrap';

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
    databases: Map<string, Database>;
    profile: Profile;
    isServer = true;
    modalRef: BsModalRef;
    searchQuery: SearchQuery;
    private subscription: Subscription;
    @ViewChild('paging_limit') public modal: TemplateRef<any>;

    constructor(private searchService: SearchService,
                private slimLoadingBarService: NgProgress,
                private route: ActivatedRoute,
                private logger: LogService,
                private authService: AuthService,
                private profileService: ProfileService,
                private databaseListService: DatabaseListService,
                private titleService: Title,
                @Inject(PLATFORM_ID) platformId,
                private modalService: BsModalService,
                private dataTransportService: DataTransportService) {
        this.isServer = isPlatformServer(platformId);
    }

    ngOnInit() {
        const config = {
            backdrop: true,
            ignoreBackdropClick: true
        };
        if (this.isServer) {
            this.params = this.route.snapshot.queryParams;
            this.query = QueryUtils.getBaseQuery(this.params);
            if (this.query !== '') {
                this.titleService.setTitle(this.query + ' - ' + 'OmicsDI');
            }
            this.dataControl = QueryUtils.getDataControl(this.params);
            this.selectedFacets = QueryUtils.getAllFacets(this.params);
            forkJoin(this.databaseListService.getDatabaseList(), this.searchService
                .fullSearch(this.query, this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy, this.dataControl.order))
                .subscribe(data => {
                    this.databases = new Map<string, Database>();
                    data[0].forEach(db => {
                        this.databases.set(db.source, db);
                    });
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
                this.databases = new Map<string, Database>();
                databases.forEach(db => {
                    this.databases.set(db.source, db);
                });
                this.subscription = this.route.queryParams.subscribe(params => {
                    this.params = params;
                    this.query = QueryUtils.getBaseQuery(params);
                    if (this.query !== '') {
                        this.titleService.setTitle(this.query + ' - ' + 'OmicsDI');
                    }
                    this.dataControl = QueryUtils.getDataControl(params);
                    if (this.searchService.isReachedPageLimit(this.dataControl)) {
                        this.modalRef = this.modalService.show(this.modal, config);
                        return;
                    }
                    this.slimLoadingBarService.ref().start();
                    this.selectedFacets = QueryUtils.getAllFacets(params);
                    this.logger.debug('Facet selected: {}', this.selectedFacets);
                    this.searchService
                        .fullSearch(
                            this.query, this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy, this.dataControl.order)
                        .subscribe(
                            result => {
                                this.searchQuery = QueryUtils.extractQuery(params);
                                this.searchResult = result;
                                this.dataTransportService.fire(this.facetsChannel, QueryUtils.getSanitizedFacets(result.facets));
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

    goToPage(page: number) {
        if (this.modalRef != null) {
            this.modalRef.hide();
        }
        this.dataControl.page = 1;
        this.requestData(this.dataControl);
    }

    findRule(searchQuery: SearchQuery, key: string, parent, parentIndex): {} {
        for (let i = 0; i < searchQuery.rules.length; i++) {
            if (searchQuery.rules[i].query === null) {
                if (searchQuery.rules[i].field === key) {
                    return {'rules': searchQuery.rules, 'index': i, 'query': searchQuery, 'parent': parent, 'parent_index': parentIndex};
                }
            } else {
                const rule = this.findRule(searchQuery.rules[i].query, key, searchQuery, i);
                if (rule != null) {
                    return rule;
                }
            }
        }
        return null;
    }

    /**
     * Add a facet into query
     * Warning: Think about pointer
     * @param {string} key i.e: Organisms
     * @param {string} facet i.e: 10090
     */
    facetValueSelected(key: string, facet: string) {
        const searchQuery = QueryUtils.extractQuery(this.params);
        let ruleLocation = this.findRule(searchQuery, key, searchQuery, 0);
        if (ruleLocation != null) {
            let index = ruleLocation['rules'].findIndex(x => x.data === facet);
            index = (index !== -1) ? index : ruleLocation['index'];
            if (ruleLocation['rules'][index].data === facet) {
                return;
            }
            if (ruleLocation['query'] === searchQuery) {
                // Found the same rule key in the first level of query
                // We're going to move this rule into second level of query
                const tmpRule = ruleLocation['rules'][index];
                ruleLocation['rules'].splice(index, 1);
                const newSearchQuery = new SearchQuery();
                newSearchQuery.operator = (key !== 'omics_type') ? 'OR' : newSearchQuery.operator;
                newSearchQuery.rules = [tmpRule];
                ruleLocation['rules'].push({condition: null, data: null, field: null, data2: null, query: newSearchQuery});
                // Leave the previous memory address
                // Assign ruleLocation['rules'] to the new memory address
                ruleLocation['rules'] = newSearchQuery.rules;
            } else {
                ruleLocation['query'].operator = (key !== 'omics_type') ? 'OR' : ruleLocation['query'].operator;
            }
        } else {
            ruleLocation = {'query': searchQuery, 'rules': searchQuery.rules}
        }
        const rule = new Rule();
        rule.field = key;
        rule.data = facet;
        ruleLocation['rules'].push(rule);
        const dataControl = QueryUtils.getDataControl(this.params);
        dataControl.page = 1;
        this.searchService.triggerSearch(this.params, searchQuery.toQueryString(), dataControl);
    }

    /**
     * Remove a facet from query
     * @param {string} key
     * @param {string} facet
     */
    facetValueRemoved(key: string, facet: string) {
        const searchQuery = QueryUtils.extractQuery(this.params);
        const ruleLocation = this.findRule(searchQuery, key, searchQuery, 0);
        if (ruleLocation != null) {
            const index = ruleLocation['rules'].findIndex(x => x.data === facet);
            if (index === -1) {
                return;
            }
            ruleLocation['rules'].splice(index, 1);
            if (ruleLocation['rules'].length === 0) {
                ruleLocation['parent'].rules.splice(ruleLocation['parent_index'], 1);
            }
        }
        const dataControl = QueryUtils.getDataControl(this.params);
        dataControl.page = 1;
        this.searchService.triggerSearch(this.params, searchQuery.toQueryString(), dataControl);
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
        const dataControl = QueryUtils.getDataControl(this.params);
        dataControl.page = 1;
        this.searchService.triggerSearch(this.params, searchQuery.toQueryString(), dataControl);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
