import {Response} from '@angular/http';

/**
 * Created by user on 4/9/2017.
 */

export class BaseService {
    constructor() {
    }

    protected extractData<T>(res: Response): T {
        return (res || {}) as T;
    }
}
