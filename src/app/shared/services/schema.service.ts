import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataSetDetail} from 'model/DataSetDetail';
import {DataSet} from 'model/DataSet';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {MergeCandidate} from 'model/MergeCandidate';
import {UnMergeDatasets} from 'model/unmerge/UnMergeDatasets';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SchemaService extends BaseService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    public getDatasetSchema(accession: string, repository: string): Observable<any> {
        return this.http.get(this.appConfig.getDatasetSchemaUrl(accession, repository));
    }

    public getHomeSchema(): Observable<any> {
        return this.http.get(this.appConfig.getHomeSchemaUrl());
    }
}
