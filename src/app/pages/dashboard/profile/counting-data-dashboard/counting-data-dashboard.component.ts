import { Component, OnInit, EventEmitter, Output,Input,SimpleChanges,OnChanges } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as d3 from 'd3';
import { ChartsErrorHandler } from '../charts-error-handler/charts-error-handler';
import {DataSetService} from "../../../../services/dataset.service";
import {AppConfig} from "../../../../app.config";
import {Profile} from "../../../../model/Profile";
import {DatasetCount} from "../../../../model/DatasetCount";
import {ProfileService} from "../../../../services/profile.service";


import { Observable } from 'rxjs';
import {DataSetDetail} from "../../../../model/DataSetDetail";
import {NotificationsService} from "angular2-notifications/dist";
import {ThorService} from "../../../../services/thor.service";

@Component({
  selector: 'app-counting-data-dashboard',
  templateUrl: './counting-data-dashboard.component.html',
  styleUrls: ['./counting-data-dashboard.component.css']
})
export class CountingDataDashboardComponent implements OnInit {


    @Output()
    notifyHomeLoader:EventEmitter<string> = new EventEmitter<string>();
    private username: string;
    private web_service_url = this.appConfig.getWebServiceUrl();
    private retryLimitTimes = 2;
    private userServiceUrl: string;
    private dataOfViewCount: DatasetCount;
    private dataSets: DataSetDetail[] = [];


    @Input() profile: Profile = new Profile();



    constructor( private dataSetService: DataSetService,private route: ActivatedRoute,private appConfig: AppConfig,private profileService: ProfileService


        , private router: Router
        , private notificationService: NotificationsService
        , private thorService: ThorService) {
        this.userServiceUrl = dataSetService.getProfileServiceUrl();
    }

    ngOnInit() {
        //this.profileService.getDataSetDetails(this.profileService.profile);
          this.profileService.onProfileReceived.subscribe(x => this.reloadDataSets());



        // Listen page size
        Observable.fromEvent(window, 'resize')
            // .debounceTime(100) //timer
            .subscribe((event) => {
                // restartRequest
                this.reloadDataSets();
            });

        this.web_service_url = this.dataSetService.getWebServiceUrl();
    }


    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
            if(propName=="profile"){
                if(null!=chng.currentValue){
                    this.reloadDataSets();
                }
            }
        }
    }

    reloadDataSets(){
        // this.dataSets = new Array();
        if(!this.profile){
            return;
        }
        if(!this.profile.dataSets){
            return;
        }
        Observable.forkJoin(this.profile.dataSets.map(x => { return this.dataSetService.getDataSetDetail_private(x.id,x.source)})).subscribe(
            y => {
                // console.log(x);
                console.log(y);
                this.dataSets = y;
                this.thorService.datasets = y;
                console.log(this.dataSets);

            }
        )
    }
}
