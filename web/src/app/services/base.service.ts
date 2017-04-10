import {Http, Response} from "@angular/http";
/**
 * Created by user on 4/9/2017.
 */

export class BaseService {
 constructor(){}

 protected extractData<T>(res: Response): T {
    let body = res.json();
    var result: T;
    result = (body || {}) as T;
    return result;
 }
}
