import {Component, OnInit} from '@angular/core';
import {DatabaseListService} from '@shared/services/database-list.service';
import {Database} from 'model/Database';
import {environment} from 'environments/environment';
import {DomainStat} from 'model/DomainStat';
import {AppConfig} from 'app/app.config';
import {StatisticsService} from '@shared/services/statistics.service';
import {LogService} from '@shared/modules/logs/services/log.service';

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
    styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {
    public databases: Database[];
    public domainStats: Map<String, DomainStat> = new Map<String, DomainStat>();
    public p = 1;
    public config = {
        itemsPerPage: 8,
        currentPage: this.p
    };
    public url: string;

    constructor(private databaseListService: DatabaseListService,
                private statisticsService: StatisticsService,
                private logger: LogService,
                public appConfig: AppConfig) {
        this.url = environment.userServiceUrl;
    }

    ngOnInit() {
        this.getDBs();
        this.getDBStats();
    }

    getDBs() {
        this.databaseListService
            .getDatabaseList()
            .subscribe(
                result => {
                    this.databases = result.filter(d => d.source !== 'NCBI'); // AZ:TODO: add "display on database page" bit in mongo
                }
            );
    }

    getDBStats() {
        this.statisticsService
            .getDatasetStats()
            .subscribe(
                result => {
                    result.map(item => {
                        this.domainStats.set(item.domain.name, item);
                    });
                }
            );
    }

    getDatasetCount(domain: string) {
        if (domain === 'Omics-ENA') {
            domain = 'Omics ENA Project';
        }
        if (this.domainStats.has(domain)) {
            return this.domainStats.get(domain).domain.value;
        }
        this.logger.debug('Domain : {} can\'t be found', domain);
        return 0;
    }
}
