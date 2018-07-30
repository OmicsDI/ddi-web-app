import {ParamImporter} from '@shared/utils/query/param.importer';
import {Params} from '@angular/router';
import {QueryUtils} from '@shared/utils/query-utils';

export class QueryParamImporter implements ParamImporter {

    params: {};

    constructor(paramImporter: ParamImporter, query: string) {
        this.params = paramImporter.getParams();
        if (query != null) {
            this.params['q'] = QueryUtils.transformQuery(query);
        }
    }

    getParams(): Params {
        return this.params;
    }
}
