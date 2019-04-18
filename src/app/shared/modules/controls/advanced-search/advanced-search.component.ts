import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AutocompleteNComponent} from '@shared/modules/controls/autocomplete-n/autocomplete-n.component';
import {SearchQuery} from 'model/SearchQuery';
import {DataTransportService} from '@shared/services/data.transport.service';
import {SearchService} from '@shared/services/search.service';
import {QueryUtils} from '@shared/utils/query-utils';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DataControl} from 'model/DataControl';
import {isPlatformServer} from '@angular/common';
import {Subscription} from 'rxjs';
import {Facet} from 'model/Facet';
import {ArrayUtils} from '@shared/utils/array-utils';
import {FacetValue} from 'model/FacetValue';

@Component({
    selector: '[app-advanced-search]',
    templateUrl: 'advanced-search.component.html',
    styleUrls: ['advanced-search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AdvancedSearchComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild(AutocompleteNComponent)
    autocompleteComponent: AutocompleteNComponent;

    query: string;

    searchQuery: SearchQuery;
    private subscription: Subscription;

    @Input()
    isHomeSearch: boolean;

    facetMap = new Map<string, Facet>();
    allFacet: Facet[];

    params: {};

    isAdvancedOpened = false;

    // advance search
    dataControl = new DataControl();
    values: FacetValue[] = [];

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
        this.searchService.fullSearch('', this.dataControl.page, this.dataControl.pageSize, this.dataControl.sortBy,
            this.dataControl.order).subscribe(result => {
                this.setAllFacets(result.facets);
            });
        this.searchQuery = QueryUtils.parseQuery('["Cancer", "patient"] AND (tissue: ["Kidney", "Lung"] AND repository: ["ArrayExpress", "ENA"] OR (disease:~ ["Breast Cancer", "Reference"])) OR (repository: "GEO") AND (repository:~ ["ArrayExpress", "ENA"])');
        this.query = QueryUtils.parseVirtualQuery(this.searchQuery.rules);
    }


    ngAfterViewInit(): void {
    }

    setAllFacets(value: Facet[]) {
        const star = new Facet();
        star.id = 'all_fields';
        star.label = 'All fields';
        star.facetValues = [];
        this.facetMap.set(star.id, star);
        value.forEach(facet => {
            this.facetMap.set(facet.id, facet);
        });
        this.allFacet = ArrayUtils.prepend(star, value);
    }

    analyseParams(params) {
        this.params = params;
        if (this.router.url.indexOf('/dataset/') === -1) {
            this.searchQuery = QueryUtils.extractQuery(params);
            this.query = QueryUtils.parseVirtualQuery(this.searchQuery.rules);
            this.logger.debug('query: {}', this.query);
        }
    }

    doSearch(keyword) {
        this.searchService.triggerSearch(this.params, keyword, new DataControl());
    }

    search() {
        const searchText = this.autocompleteComponent.searchText;
        this.doSearch(searchText);
    }

    updateSearchQuery(searchQuery: SearchQuery) {
        this.searchQuery = searchQuery;
        this.query = QueryUtils.parseVirtualQuery(this.searchQuery.rules);
    }

    addRule(rule) {
        this.searchQuery.rules.push(rule);
        this.query = QueryUtils.parseVirtualQuery(this.searchQuery.rules);
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
