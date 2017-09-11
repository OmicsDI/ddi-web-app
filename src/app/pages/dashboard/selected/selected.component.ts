import { Component, OnInit } from '@angular/core';
import {DataSetDetail} from "../../../model/DataSetDetail";
import {SelectedService} from "../../../services/selected.service";
import {DataSetService} from "../../../services/dataset.service";
import {AppConfig} from "../../../app.config";
import {Observable} from "rxjs/Observable";
import {DataSetShort} from "../../../model/DataSetShort";
import {ProfileService} from "../../../services/profile.service";
import {NotificationsService} from "angular2-notifications/dist";
import {WatchedDataset} from "../../../model/WatchedDataset";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-dashboard-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class DashboardSelectedComponent implements OnInit {

  dataSets: DataSetDetail[];

  constructor(private selectedService:SelectedService
    ,private dataSetService: DataSetService
    ,private appConfig: AppConfig
    ,private profileService: ProfileService
    ,private notificationService: NotificationsService
    ,private dialogService: DialogService) { }

  ngOnInit() {
    this.reloadDataSets();
  }

  reloadDataSets(){
    this.dataSets = new Array();
    if(!this.selectedService.dataSets){
      return;
    }
    Observable.forkJoin(this.selectedService.dataSets.map(x => { return this.dataSetService.getDataSetDetail_private(x.id,x.source)})).subscribe(
      y => {this.dataSets = y}
    )
  }

  remove(source, id){
    var i = this.dataSets.findIndex(x => x.id==id && x.source==source);
    if(i>-1){
      this.dataSets.splice(i,1);
    }
    i = this.selectedService.dataSets.findIndex(x => x.id==id && x.source==source)
    if(i>-1){
      this.selectedService.dataSets.splice(i,1);
    }
    this.notificationService.success("Dataset removed","from selected");
  }

  exportClick(){
    alert("exportClick");
  }

  claimClick(){
    for(let dataSet of this.dataSets){
      var d:DataSetShort = new DataSetShort();

      d.source = dataSet.source;
      d.id = dataSet.id;

      this.profileService.claimDataset(this.profileService.userId, d);
    }
    this.notificationService.success(
        'Datasets claimed',
        'to your dashboard'
    )
  }

  watchClick(){
    for(let dataSet of this.dataSets){
      var d:WatchedDataset = new WatchedDataset();

      d.source = dataSet.source;
      d.accession = dataSet.id;
      d.userId = this.profileService.userId;

      this.profileService.saveWatchedDataset(d);
    }
    this.notificationService.success(
        'Datasets watched',
        'to your dashboard'
    )
  }



  deleteClick(){
    var confirm = this.dialogService.confirm('Unselect all datasets', 'Are you sure you want to do this?')
        .subscribe(res => {
          if(res){
            this.selectedService.dataSets = [];

            this.reloadDataSets();

            this.notificationService.success(
                'Datasets deleted',
                'from selected'
            )

          }});
  }
}






//   <img style="float:right;cursor:pointer;" src="img/delete.png" title="delete" (click)="selectedService.unselect(d.source, d.id); remove(d.source, d.id);">
