import {ParamImporter} from '@shared/utils/query/param.importer';
import {Params} from '@angular/router';
import {DataControl} from 'model/DataControl';

export class DatacontrolParamImporter implements ParamImporter {

    params: Params;

    constructor(paramImporter: ParamImporter, dataControl: DataControl) {
        this.params = paramImporter.getParams();
        if (dataControl != null) {
            this.params['sortBy'] = dataControl.sortBy;
            this.params['order'] = dataControl.order;
            this.params['pageSize'] = dataControl.pageSize;
            this.params['page'] = dataControl.page;
        }
        const defaultDataControl = new DataControl();
        if (this.params['sortBy'] === defaultDataControl.sortBy) {
            delete this.params['sortBy'];
        }
        if (this.params['order'] === defaultDataControl.order) {
            delete this.params['order'];
        }
        if (this.params['pageSize'] === defaultDataControl.pageSize) {
            delete this.params['pageSize'];
        }
        if (this.params['page'] === defaultDataControl.page) {
            delete this.params['page'];
        }
    }

    getParams(): Params {
        return this.params;
    }
}
