import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SearchResult} from 'model/SearchResult';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {DefaultParamImporter} from '@shared/utils/query/default.param.importer';
import {QueryParamImporter} from '@shared/utils/query/query.param.importer';
import {DatacontrolParamImporter} from '@shared/utils/query/datacontrol.param.importer';
import {DataControl} from 'model/DataControl';
import {DefaultUrlSerializer, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {QueryUtils} from '@shared/utils/query-utils';


@Injectable()
export class SearchService extends BaseService {

    private static EBISEARCH_START_LIMIT = 250_000;

    constructor(private http: HttpClient, public appConfig: AppConfig, private router: Router) {
        super();
    }

    /**
     * Call search function by redirect to the search page
     * @param {{}} params: Query params
     * @param {string} query (optional) query string
     * @param {DataControl} dataControl (optional) DataControl (page, pageSize, order, orderBy)
     */
    public triggerSearch(params: {}, query: string, dataControl: DataControl) {
        const queryParams = JSON.parse(JSON.stringify(params));
        let paramImporter = new DefaultParamImporter(queryParams);
        paramImporter = new QueryParamImporter(paramImporter, query);
        paramImporter = new DatacontrolParamImporter(paramImporter, dataControl);
        this.router.navigate(['search'], {queryParams: paramImporter.getParams()});
    }

    public fullSearch(searchQuery: string, page: number, pageSize: number, sortBy: string, order: string): Observable<SearchResult> {
        if (searchQuery == null || searchQuery === '') {
            searchQuery = '';
        } else {
            searchQuery = QueryUtils.parseRealQuery(QueryUtils.parseQuery(searchQuery));
        }
        return this.http.get(
            this.appConfig.getSearchUrl(
                searchQuery, 100, pageSize, sortBy, order, (page - 1) * pageSize))
            .pipe(map(x => this.extractData<SearchResult>(x)));
    }

    public isReachedPageLimit(dataControl: DataControl): boolean {
        return (dataControl.page - 1) * dataControl.pageSize >= SearchService.EBISEARCH_START_LIMIT;
    }
}
