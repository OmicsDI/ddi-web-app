import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {AppConfig} from 'app/app.config';
import {KeyValuePair} from 'model/KeyValuePair';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OntologyService extends BaseService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    lookup(keys: string[]): Observable<KeyValuePair[]> {
        return this.http.get(this.appConfig.getOntologyLookupUrl(keys))
            .pipe(map(x => this.extractData<KeyValuePair[]>(x)));
    }

    resolve(val: string): string {
        return 'The ' + val;
    }

}
