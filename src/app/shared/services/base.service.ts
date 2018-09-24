/**
 * Created by user on 4/9/2017.
 */

export class BaseService {
    constructor() {
    }

    protected extractData<T>(res: Object): T {
        return (res || {}) as T;
    }
}
