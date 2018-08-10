import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {Database} from 'model/Database';
import {LogService} from '@shared/modules/logs/services/log.service';

@Injectable()
export class DatabaseListService extends BaseService {

    public databases = {};

    constructor(private http: Http,
                private logger: LogService,
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
        const self = this;
        let source = null;
        Object.keys(this.databases).forEach(key => {
            const d = self.databases[key];
            if (d.databaseName === database) {
                source = d.source;
                return;
            }
        });
        return source;
    }

    public getDatabaseByAccession(accession: string): Database {
        const self = this;
        for (const key of Object.keys(this.databases)) {
            const database = self.databases[key];

            if (database.accessionPrefix) {
                for (const prefix of database.accessionPrefix) {
                    this.logger.debug('Comparing {} and {}', prefix, accession);
                    if (accession.startsWith(prefix)) {
                        this.logger.debug('success');
                        return database;
                    }
                }
            }
        }
        return null;
    }
}
