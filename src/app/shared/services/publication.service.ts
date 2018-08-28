import {Injectable} from '@angular/core';
import {PublicationResult} from 'model/PublicationResult';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';

@Injectable()
export class PublicationService extends BaseService {

    constructor(private http: Http, public appConfig: AppConfig) {
        super();
    }

    search(acc: string): Observable<PublicationResult> {
        return this.http.get(this.appConfig.getPublicationUrl(acc))
            .map(x => this.extractData<PublicationResult>(x));
    }
}
