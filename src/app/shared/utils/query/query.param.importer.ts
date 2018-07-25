import {ParamImporter} from '@shared/utils/query/param.importer';
import {Params} from '@angular/router';

export class QueryParamImporter implements ParamImporter {

    params: {};

    constructor(paramImporter: ParamImporter, query: string) {
        this.params = paramImporter.getParams();
        if (query != null) {
            if (query[0] === '(') {
                query = query.slice(1, query.length - 1);
            }
            this.params['q'] = query;
        }
    }

    getParams(): Params {
        return this.params;
    }
}
