import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {SimilarMolecule} from 'model/SimilarMolecule';
import {SimilarityResult} from 'model/SimilarityResult';

@Injectable()
export class SimilarMoleculeService extends BaseService {

    constructor(
        private http: Http
        , public appConfig: AppConfig) {
        super();
    }

    public search(acc: string, repository: string): Observable<SimilarMolecule> {
        return this.http
            .get(this.appConfig.getSimilarityMoleculesUrl(acc, repository))
            .map(x => this.extractData<SimilarMolecule>(x));
    }

    public searchSimilarityDatasets(acc: string, repository: string): Observable<SimilarityResult> {
        return this.http
            .get(this.appConfig.getSimilarityDatasetsUrl(acc, repository))
            .map(x => this.extractData<SimilarityResult>(x));
    }

}
