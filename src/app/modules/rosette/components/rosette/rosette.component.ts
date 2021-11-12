import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSetDetail} from 'model/DataSetDetail';
import {DataSetService} from '@shared/services/dataset.service';
import {ActivatedRoute} from '@angular/router';
import {AppConfig} from 'app/app.config';
import {Subscription, throwError} from 'rxjs';
import {DatabaseListService} from '@shared/services/database-list.service';

@Component({
    selector: 'app-rosette',
    templateUrl: './rosette.component.html',
    styleUrls: ['./rosette.component.css']
})
export class RosetteComponent implements OnInit, OnDestroy {
    d: DataSetDetail;
    acc: string;
    repository: string;
    private subscription: Subscription;
    notfound = false;
    errorOccurred = false;

    constructor(
            private dataSetService: DataSetService,
            private route: ActivatedRoute,
            public appConfig: AppConfig,
            private databaseListService: DatabaseListService) {
    }

    ngOnInit() {
        const self = this;
        this.databaseListService.getDatabaseList().subscribe(databases => {
            this.subscription = this.route.params.subscribe(params => {
                this.acc = params['acc'];
                this.repository = params['domain'];
                this.dataSetService.getDataSetDetail(this.acc, this.repository).subscribe(
                    result => {
                        this.d = result;
                    }
                );
            });
        });
    }


    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
