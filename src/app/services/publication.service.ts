import {Injectable} from '@angular/core';
import {PublicationResult} from 'model/PublicationResult';
import {Observable, Subject} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';

@Injectable()
export class PublicationService extends BaseService {

    private resultSource = new Subject<PublicationResult>();

    searchResult$ = this.resultSource.asObservable();

    constructor(private http: Http, public appConfig: AppConfig) {
        super();
    }

    search(acc: string) {
        const o: Observable<PublicationResult> = this.http.get(this.appConfig.getPublicationUrl(acc))
            .map(x => this.extractData<PublicationResult>(x));

        o.subscribe(x => {
            this.resultSource.next(x);
        });
    }
}
