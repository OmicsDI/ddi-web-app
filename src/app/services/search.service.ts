import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {SearchResult} from 'model/SearchResult';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {Rule, SearchQuery} from 'model/SearchQuery';
import {Facet} from 'model/Facet';
import {FacetValue} from 'model/FacetValue';

@Injectable()
export class SearchService extends BaseService {

    private searchResultSource = new Subject<SearchResult>();

    searchResult$ = this.searchResultSource.asObservable();

    private _textQuery: string;

    selectedFacets: Object = {}; // string=>string[]

    public get textQuery(): string {
        return this._textQuery;
    }

    public set textQuery(value) {
        this._textQuery = value;
        this._fullQuery = this.getFullQuery();
    }

    public _paramQuery: SearchQuery = new SearchQuery();
    public get paramQuery(): SearchQuery {
        return this._paramQuery;
    }

    public set paramQuery(value) {
        this._paramQuery = value;
        this._fullQuery = this.getFullQuery();
    }

    private _fullQuery: string;


    /*** fullQuery can be set explicitely, textQuery,paramQuery not updated ***/
    public get fullQuery(): string {
        return this._fullQuery;
    }

    public set fullQuery(value) {
        this._textQuery = value;
        this._paramQuery = new SearchQuery();
        this.selectedFacets = {};
        this._fullQuery = this.getFullQuery();
    }

    public currentQuery: string; // fullQuery after you press search;


    currentPage = 1;

    sortOrder = 'ascending';
    sortBy = '';

    selectedPageSize = 10;
    pageSizes = ['10', '20', '30', '50', '100'];

    public facets: Facet[];
    public allFacets: Facet[] = [];
    public total: number;

    constructor(private http: Http, private appConfig: AppConfig) {
        super();
    }

    private getFullQuery(): string {
        let result = '';
        if (this.textQuery) {
            result += this.textQuery;
        }
        let s = this.paramQuery.toQueryString();
        // // query string built by legacy algorithm
        if (s === '((""))') {
            s = '';
        } if (s === '(())') {
            s = '';
        } if (s === '()') {
            s = '';
        } if (s !== '') {
            if (result) {
                result = '(' + result + ' AND ' + this.paramQuery.toQueryString() + ')';
            } else {
                result = this.paramQuery.toQueryString();
            }
        }
        return result;
    }

    public callSearch(page = 1) {
        console.log('!!!!!!!!is here?!!!!!!!!!!!');
        this.currentQuery = this.fullQuery;
        this.currentPage = page;
        this.total = 0;
        console.log(this.fullQuery);
        this.search(this.fullQuery, page).subscribe(searchResult => {
            this.searchResultSource.next(searchResult);
            this.total = searchResult.count;
            this.facets = (JSON.parse(JSON.stringify(searchResult.facets)));
            if (this.allFacets.length === 0) {
                this.allFacets = this.facets;
            }
        });
        /** TODO: handle error **/
    }

    private search(searchQuery: string, page: number): Observable<SearchResult> {
        console.log(searchQuery);
        if (searchQuery == null) {
            searchQuery = '';
        }
        return this.http.get(
            this.appConfig.getSearchUrl(
                searchQuery, 100, this.selectedPageSize, this.sortBy, this.sortOrder, (page - 1) * this.selectedPageSize))
            .map(x => this.extractData<SearchResult>(x));
    }

    page(page: number) {
        this.callSearch(page); // page
    }

    sort() {
        this.currentPage = 1;
        this.callSearch(); // page
    }

    changePageSize() {
        this.callSearch(1);
    }

    selectFacet(id: string, value: string) {
        if (null == this.selectedFacets[id]) {
            this.selectedFacets[id] = [];
        }
        this.selectedFacets[id].push(value);
    }

    unselectFacet(id: string, value: string) {
        this.selectedFacets[id].splice(this.selectedFacets[id].indexOf(value), 1);
    }

    unselectFacets() {
        this.selectedFacets = {};
    }

    isFacetSelected(id: string, value: string): boolean {
        if (null == this.selectedFacets[id]) {
            return false;
        }
        const result: boolean = (this.selectedFacets[id].indexOf(value) !== -1);

        return result;
    }

    callSearchByFacets() {
        this.paramQuery = new SearchQuery();

        this.paramQuery.operator = 'AND';
        this.paramQuery.rules = [];
        for (const id in this.selectedFacets) {
            if (this.selectedFacets[id].length === 0) {
                continue;
            }
            const rule: Rule = new Rule();
            if (this.selectedFacets[id].length > 1) {
                const q: SearchQuery = new SearchQuery();
                q.operator = (id === 'omics_type' ? 'AND' : 'OR');
                q.rules = [];
                for (const i of this.selectedFacets[id]) {
                    const r: Rule = new Rule();
                    r.field = id;
                    r.data = i;
                    r.condition = 'equal';
                    q.rules.push(r);
                }
                rule.query = q;
            } else {
                rule.field = id;
                rule.data = this.selectedFacets[id][0];
                rule.condition = 'equal';
            }
            this.paramQuery.rules.push(rule);
        }

        this._fullQuery = this.getFullQuery();
        this.callSearch();
    }

    getAllFacetValues(facet: string): FacetValue[] {
        let result: FacetValue[];
        result = [];

        if (null == this.allFacets) {
            const v: FacetValue = new FacetValue();
            v.label = 'label1';
            v.value = 'value1';
            result.push(v);
        } else {
            for (const f of this.allFacets) {
                if (f.id === facet) {
                    for (const w of f.facetValues) {
                        const v: FacetValue = new FacetValue();
                        v.label = w.label;
                        v.value = w.value;
                        result.push(v);
                    }
                }
            }
        }
        return result;
    }
}
