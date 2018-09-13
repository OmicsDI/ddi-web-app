import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Response} from '@angular/http';
import {EnrichmentInfo} from 'model/enrichment-info/EnrichmentInfo';
import {SynonymResult} from 'model/enrichment-info/SynonymResult';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EnrichmentService extends BaseService {
    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    getEnrichmentInfo(repository: string, acc: string): Observable<EnrichmentInfo> {
        return this.http.get(this.appConfig.getEnrichmentUrl(acc, repository))
            .pipe(map((x: Response) => this.extractData<EnrichmentInfo>(x)));
    }

    getSynonyms(repository: string, acc: string): Observable<SynonymResult> {
        return this.http.get(this.appConfig.getSynonymsUrl(acc, repository))
            .pipe(map((x: Response) => this.extractData<SynonymResult>(x)));
    }
}
