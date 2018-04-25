import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {NotificationsService} from "angular2-notifications/dist";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material";
import {DataSet} from "../../model/DataSet";
import {SelectedService} from "../../services/selected.service";
import {AppConfig} from "../../app.config";
import {ProfileService} from "../../services/profile.service";
import {DatabaseListService} from "../../services/database-list.service";
import {DataSetService} from "../../services/dataset.service";
import {DataSetShort} from "../../model/DataSetShort";
import {WatchedDataset} from "../../model/WatchedDataset";
import {CitationDialogSearchComponent} from "../citation-dialog-search/citation-dialog-search.component";
import {CitationDialogComponent} from "../../pages/dataset/citation-dialog/citation-dialog.component";
// import {CitationDialogComponent} from "../../pages/dataset/citation-dialog-search/citation-dialog-search.component";

@Component({
  selector: 'app-datasetwidget-search',
  templateUrl: './datasetwidget-search.component.html',
  styleUrls: ['./datasetwidget-search.component.css']
})
export class DatasetwidgetSearchComponent implements OnInit {

  @Input() d: DataSet;
  @Input() allowSelect: boolean = true;
  @Output() buttonClicked = new EventEmitter<any>();
  @Input() allowDelete: boolean = true;
  @Input() allowClaim: boolean = true;
  @Input() allowWatch: boolean = true;

  constructor(private selectedService: SelectedService
            , private appConfig: AppConfig
            , private profileService: ProfileService
            , private databaseListServce: DatabaseListService
            , private router: Router
            , private notificationService: NotificationsService
            , private dataSetService: DataSetService
            , private dialog: MatDialog) { }

  ngOnInit() {
  }

  getDatabaseUrl(source){
    var db =  this.databaseListServce.databases[source];
    if(!db) {
      console.log("source not found:"+source);
    }
    else {
      return db.sourceUrl;
    }
  }

  getDatabaseTitle(source){
    var db =  this.databaseListServce.databases[source];
    if(!db) {
      console.log("source not found:"+source);
    }
    else {
      return db.databaseName;
    }
  }

  citeClicked($event,source,id){
    this.citation(source,id);
    $event.stopPropagation();
    $event.preventDefault();
  }

  /*
  selectClicked($event,source,id){
    this.toggle(source,id);
    $event.stopPropagation();
    $event.preventDefault();
  }*/

  citation(source,id) {
    let dialogRef: MatDialogRef<CitationDialogComponent>;

    this.dataSetService.getDataSetDetail_private(id, source).subscribe(
        x => {
          dialogRef = this.dialog.open(CitationDialogComponent);
          dialogRef.componentInstance.title = "Dataset citation";
          dialogRef.componentInstance.datasetDetail = x;
          return dialogRef.afterClosed();
        }
    )
  }

  claimClicked($event,source,id){
    if(!this.profileService.isClaimed(source,id)){
      var d:DataSetShort = new DataSetShort();

      d.source = source;
      d.id = id;

      this.profileService.claimDataset(this.profileService.userId, d);
    }else{
      this.router.navigate(['profile']);
    }

    $event.stopPropagation();
    $event.preventDefault();

    this.notificationService.success(
        'Dataset claimed',
        'to your dashboard'
    )
  }

  watchClicked($event,source,id){
    var d:WatchedDataset = new WatchedDataset();

    d.source = source;
    d.accession = id;
    d.userId = this.profileService.userId;

    this.profileService.saveWatchedDataset(d);

    $event.stopPropagation();
    $event.preventDefault();

    this.notificationService.success(
        'Dataset watched',
        'in your dashboard'
    )
  }

  toggle(source:string,id:string){
    if(!this.allowSelect)
      return;

    if(!this.profileService.userId)
      return;

    this.selectedService.toggle(source,id);
    console.log(`toggle ${source} ${id}`);
  }

  deleteClicked($event,source,id){
    this.buttonClicked.emit();
  }


}
