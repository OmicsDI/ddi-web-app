import {Params} from '@angular/router';

export interface ParamImporter {
    getParams(): Params;
}
