import { Component, OnInit } from '@angular/core';
import {DataSetDetail} from "../../model/DataSetDetail";
import {Observable} from "rxjs/Observable";
import {SelectedService} from "../../services/selected.service";
import {DataSetService} from "../../services/dataset.service";
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {

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


}
