import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {Database} from 'model/Database';
import {LogService} from '@shared/modules/logs/services/log.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DatabaseListService extends BaseService {

    constructor(private http: HttpClient,
                private logger: LogService,
                public appConfig: AppConfig) {
        super();
    }

    public getDatabaseList(): Observable<Database[]> {
        return this.http.get(this.appConfig.getDatabasesUrl())
            .pipe(map(x => this.extractData<Database[]>(x)));
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

    // todo fetch from API
    public getDomainFromDatabaseName(databaseName: string) {
        const dbnameLower = databaseName.toLocaleLowerCase();

        if (dbnameLower === 'arrayexpress') {
            return 'arrayexpress-repository';
        }
        if (dbnameLower === 'expressionatlas') {
            return 'atlas-experiments';
        }
        if (dbnameLower === 'jpost repository') {
            return 'jpost';
        }
        if (dbnameLower === 'metabolights') {
            return 'metabolights_dataset';
        }
        if (dbnameLower === 'peptideatlas') {
            return 'peptide_atlas'
        }
        if (dbnameLower === 'metabolomicsworkbench') {
            return 'metabolomics_workbench'
        }
        if (dbnameLower === 'metabolomeexpress') {
            return 'metabolome_express';
        }
        if (dbnameLower === 'ena') {
            return 'omics_ena_project';
        }
        return dbnameLower
    }
}
