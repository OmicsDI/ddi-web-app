import {ParamImporter} from '@shared/utils/query/param.importer';
import {Params} from '@angular/router';

export class DefaultParamImporter implements ParamImporter {

    params: Params;

    constructor(params: Params) {
        this.params = params;
    }

    getParams(): Params {
        return this.params;
    }

}
