import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {AppConfig} from 'app/app.config';
import {SimilarMolecule} from 'model/SimilarMolecule';
import {SimilarityResult} from 'model/SimilarityResult';
import {BaseService} from "@shared/services/base.service";

@Injectable()
export class SimilarMoleculeMockService extends BaseService {

    constructor(
        private http: Http
        , public appConfig: AppConfig) {
        super();
    }

    public search(acc: string, repository: string): Observable<SimilarMolecule> {
        return this.http
            .get('test/modules/dataset/SimilarMolecule.json')
            .map(x => this.extractData<SimilarMolecule>(x));
    }

    public searchSimilarityDatasets(acc: string, repository: string): Observable<SimilarityResult> {
        return this.http
            .get('test/modules/dataset/SimilarityResult.json')
            .map(x => this.extractData<SimilarityResult>(x));
    }

}