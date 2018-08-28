import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {Database} from 'model/Database';
import {LogService} from '@shared/modules/logs/services/log.service';

@Injectable()
export class DatabaseListService extends BaseService {

    constructor(private http: Http,
                private logger: LogService,
                public appConfig: AppConfig) {
        super();
    }

    public getDatabaseList(): Observable<Database[]> {
        return this.http.get(this.appConfig.getDatabasesUrl())
            .map(x => {
                return this.extractData<Database[]>(x);
            });
    }

    public getDatabaseBySource(source: string, databases: Database[]): Database {
        for (const db of databases) {
            if (db.source === source) {
                return db;
            }
        }
        this.logger.debug('Database with source {} can\'t be found', source);
        return null;
    }

    public getDatabaseByDatabaseName(database: string, databases: Database[]): Database {
        for (const db of databases) {
            if (db.databaseName === database) {
                return db;
            }
        }
        this.logger.debug('Database with name {} can\'t be found', database);
        return null;
    }

    public getDatabaseByAccession(accession: string, databases: Database[]): Database {
        for (const database of databases) {
            if (database.accessionPrefix) {
                for (const prefix of database.accessionPrefix) {
                    if (accession.startsWith(prefix)) {
                        return database;
                    }
                }
            }
        }
        this.logger.debug('Database with accession {} can\'t be found', accession);
        return null;
    }
}
