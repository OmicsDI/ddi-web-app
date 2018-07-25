import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {SearchResult} from 'model/SearchResult';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {DefaultParamImporter} from '@shared/utils/query/default.param.importer';
import {QueryParamImporter} from '@shared/utils/query/query.param.importer';
import {DatacontrolParamImporter} from '@shared/utils/query/datacontrol.param.importer';
import {DataControl} from 'model/DataControl';
import {Router} from '@angular/router';


@Injectable()
export class SearchService extends BaseService {

    constructor(private http: Http, public appConfig: AppConfig, private router: Router) {
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

    public fullSearch(searchQuery: string, page: number, pageSize: number, sortBy: string, order: boolean): Observable<SearchResult> {
        const orderBy = order ? 'ascending' : 'descending';
        if (searchQuery == null) {
            searchQuery = '';
        }
        return this.http.get(
            this.appConfig.getSearchUrl(
                searchQuery, 100, pageSize, sortBy, orderBy, (page - 1) * pageSize))
            .map(x => this.extractData<SearchResult>(x));
    }
}
