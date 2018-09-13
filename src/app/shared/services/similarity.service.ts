import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {SimilarityResult} from 'model/SimilarityResult';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';

@Injectable()
export class SimilarityService extends BaseService {

    constructor(private http: Http, public appConfig: AppConfig) {
        super();
    }

    search(acc: string, repository: string) {
        return this.http.get(this.appConfig.getSimilarUrl(acc, repository))
            .map(x => this.extractData<SimilarityResult>(x));
    }
}
