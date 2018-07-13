import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import {SimilarityResult} from 'model/SimilarityResult';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';

@Injectable()
export class SimilarityService extends BaseService {

    private resultSource = new Subject<SimilarityResult>();

    searchResult$ = this.resultSource.asObservable();

    constructor(private http: Http, public appConfig: AppConfig) {
        super();
    }

    search(acc: string, repository: string) {
        const o: Observable<SimilarityResult> = this.http.get(this.appConfig.getSimilarUrl(acc, repository))
            .map(x => this.extractData<SimilarityResult>(x));
        o.subscribe(x => {
            this.resultSource.next(x);
        });
    }
}
