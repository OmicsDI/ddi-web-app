import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import {SimilarityResult} from 'model/SimilarityResult';
import {AppConfig} from 'app/app.config';
import {BaseService} from "@shared/services/base.service";

@Injectable()
export class SimilarityMockService extends BaseService {

    private resultSource = new Subject<SimilarityResult>();

    searchResult$ = this.resultSource.asObservable();

    constructor(private http: Http, public appConfig: AppConfig) {
        super();
    }

    search(acc: string, repository: string) {
        const o: Observable<SimilarityResult> = this.http.get('test/modules/dataset/similarity.json')
            .map(x => this.extractData<SimilarityResult>(x));
        o.subscribe(x => {
            console.log(x);
            this.resultSource.next(x);
        });
    }
}
