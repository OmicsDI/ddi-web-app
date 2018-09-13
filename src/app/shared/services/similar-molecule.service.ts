import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Response} from '@angular/http';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {SimilarMolecule} from 'model/SimilarMolecule';
import {SimilarityResult} from 'model/SimilarityResult';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SimilarMoleculeService extends BaseService {

    constructor(private http: HttpClient,
                public appConfig: AppConfig) {
        super();
    }

    public search(acc: string, repository: string): Observable<SimilarMolecule> {
        return this.http
            .get(this.appConfig.getSimilarityMoleculesUrl(acc, repository))
            .pipe(map((x: Response) => this.extractData<SimilarMolecule>(x)));
    }

    public searchSimilarityDatasets(acc: string, repository: string): Observable<SimilarityResult> {
        return this.http
            .get(this.appConfig.getSimilarityDatasetsUrl(acc, repository))
            .pipe(map((x: Response) => this.extractData<SimilarityResult>(x)));
    }

}
