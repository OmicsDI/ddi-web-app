import { Component, OnInit } from '@angular/core';
import {DataSetDetail} from "../../../model/DataSetDetail";
import {SelectedService} from "../../../services/selected.service";
import {DataSetService} from "../../../services/dataset.service";
import {AppConfig} from "../../../app.config";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-dashboard-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class DashboardSelectedComponent implements OnInit {

  dataSets: DataSetDetail[];

  constructor(private selectedService:SelectedService
    ,private dataSetService: DataSetService
    ,private appConfig: AppConfig) { }

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
  }
}
