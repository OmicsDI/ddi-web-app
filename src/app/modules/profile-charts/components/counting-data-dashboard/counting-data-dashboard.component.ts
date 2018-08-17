import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataSetService} from '@shared/services/dataset.service';
import {AppConfig} from 'app/app.config';
import {Profile} from 'model/Profile';
import {ProfileService} from '@shared/services/profile.service';


import {Observable} from 'rxjs/Observable';
import {DataSetDetail} from 'model/DataSetDetail';
import {NotificationsService} from 'angular2-notifications/dist';
import {ThorService} from '@shared/services/thor.service';

@Component({
    selector: 'app-counting-data-dashboard',
    templateUrl: './counting-data-dashboard.component.html',
    styleUrls: ['./counting-data-dashboard.component.css']
})
export class CountingDataDashboardComponent implements OnInit, OnChanges {


    @Output()
    notifyHomeLoader: EventEmitter<string> = new EventEmitter<string>();
    private username: string;
    private web_service_url = this.appConfig.getWebServiceUrl();
    private retryLimitTimes = 2;
    private userServiceUrl: string;
    public dataSets: DataSetDetail[] = [];


    @Input() profile: Profile = new Profile();


    constructor(private dataSetService: DataSetService, private route: ActivatedRoute,
                public appConfig: AppConfig, public profileService: ProfileService
        , private router: Router
        , private notificationService: NotificationsService
        , private thorService: ThorService) {
        this.userServiceUrl = dataSetService.getProfileServiceUrl();
    }

    ngOnInit() {
        this.profileService.onProfileReceived.subscribe(x => this.reloadDataSets());
        // Listen page size
        Observable.fromEvent(window, 'resize')
            .subscribe((event) => {
                this.reloadDataSets();
            });

        this.web_service_url = this.dataSetService.getWebServiceUrl();
    }


    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            if (propName === 'profile') {
                if (null != chng.currentValue) {
                    this.reloadDataSets();
                }
            }
        }
    }

    reloadDataSets() {
        // this.dataSets = new Array();
        if (!this.profile) {
            return;
        }
        if (!this.profile.dataSets) {
            return;
        }
        Observable.forkJoin(this.profile.dataSets.map(x => {
            return this.dataSetService.getDataSetDetail(x.id, x.source);
        })).subscribe(
            y => {
                this.dataSets = y;
                this.thorService.datasets = y;
            }
        );
    }
}
