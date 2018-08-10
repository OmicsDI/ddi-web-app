import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from 'app/app.config';
import {Database} from 'model/Database';
import {BaseService} from '@shared/services/base.service';

@Injectable()
export class DataSetListMockService extends BaseService {

    public databases = {};

    constructor(
        private http: Http,
        public appConfig: AppConfig) {
        super();
        this.getDatabaseList().subscribe();
    }

    public getDatabaseList(): Observable<Database[]> {
        return this.http.get(this.appConfig.getDatabasesUrl())
            .map(x => {
                const d1: Database[] = this.extractData<Database[]>(x);
                for (const d of d1) {
                    this.databases[d.source] = d;
                }
                return d1;
            });
    }

    public getSourceByDatabaseName(database: string): string {
        return 'massive';
    }

    public getDatabaseByAccession(accession: string): Database {
        const self = this;
        for (const key of Object.keys(this.databases)) {
            const database = self.databases[key];

            if (database.accessionPrefix) {
                for (const prefix of database.accessionPrefix) {
                    if (accession.startsWith(prefix)) {
                        return database;
                    }
                }
            }
        }
        return null;
    }
}
