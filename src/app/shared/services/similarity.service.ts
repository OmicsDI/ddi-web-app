import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {SimilarityResult} from 'model/SimilarityResult';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SimilarityService extends BaseService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    search(acc: string, repository: string) {
        return this.http.get(this.appConfig.getSimilarUrl(acc, repository))
            .pipe(map((x: Response) => this.extractData<SimilarityResult>(x)));
    }
}
