import {ParamImporter} from '@shared/utils/query/param.importer';
import {Params} from '@angular/router';
import {QueryUtils} from '@shared/utils/query-utils';
import {del} from 'selenium-webdriver/http';

export class QueryParamImporter implements ParamImporter {

    params: {};

    constructor(paramImporter: ParamImporter, query: string) {
        this.params = paramImporter.getParams();
        if (query != null) {
            this.params['q'] = QueryUtils.transformQuery(query);
        }
        if (query === '') {
            delete this.params['q'];
        }
    }

    getParams(): Params {
        return this.params;
    }
}
