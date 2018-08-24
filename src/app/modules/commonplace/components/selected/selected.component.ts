import {Component, OnInit} from '@angular/core';
import {DataSetDetail} from 'model/DataSetDetail';
import {Observable} from 'rxjs/Observable';
import {SelectedService} from '@shared/services/selected.service';
import {DataSetService} from '@shared/services/dataset.service';
import {AppConfig} from 'app/app.config';
import {DatabaseListService} from '@shared/services/database-list.service';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DatabaseDetail} from 'model/DatabaseDetail';

@Component({
    selector: 'app-selected',
    templateUrl: './selected.component.html',
    styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {

    dataSets: DataSetDetail[];

    databases: Map<string, DatabaseDetail> = new Map<string, DatabaseDetail>();
    p: 0;

    constructor(public selectedService: SelectedService,
                private dataSetService: DataSetService,
                public appConfig: AppConfig,
                private logger: LogService,
                private databaseListServce: DatabaseListService) {
    }

    ngOnInit() {
        this.dataSets = [];
        if (!this.selectedService.dataSets) {
            return;
        }
        this.databaseListServce.getDatabaseList().subscribe(databases => {
            databases.map(db => {
                this.databases.set(db.source, db);
            });
        });
        this.selectedService.dataSets.map(x => {
            this.dataSetService.getDataSetDetail(x.id, x.source).subscribe(datasetDetail => {
                this.dataSets.push(datasetDetail);
            });
        });
    }

    remove(source, id) {
        const i = this.dataSets.findIndex(x => x.id === id && x.source === source);
        if (i > -1) {
            this.dataSets.splice(i, 1);
        }
    }
}
