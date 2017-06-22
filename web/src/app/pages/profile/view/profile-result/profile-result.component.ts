import {Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {ProfileService} from "../../../../services/profile.service";
import {Profile} from "../../../../model/Profile";
import {AppConfig} from "../../../../app.config";
import {Router} from "@angular/router";
import {DataSetService} from "../../../../services/dataset.service";
import {Observable} from "rxjs/Observable";
import {DataSetDetail} from "../../../../model/DataSetDetail";

@Component({
  selector: 'app-profile-result',
  templateUrl: './profile-result.component.html',
  styleUrls: ['./profile-result.component.css']
})
export class ProfileResultComponent implements OnInit, OnChanges {

  @Input() profile: Profile;
  @Output() change = new EventEmitter();

  constructor(private profileService: ProfileService
              ,private dataSetService: DataSetService
    , private appConfig: AppConfig
    , private router: Router) { }

  ngOnInit() {
    //this.profileService.getDataSetDetails(this.profileService.profile);
  }

  dataSets: DataSetDetail[];

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
    Observable.forkJoin(this.profile.dataSets.map(x => { return this.dataSetService.getDataSetDetail_private(x.id,x.source)})).subscribe(
      y => {this.dataSets = y}
    )
  }


  delete($event){
    console.log(`deleting ${$event.source} ${$event.id}`)
    let i: number = this.profile.dataSets.findIndex( x => x.source == $event.source && x.id == $event.id);
    if(i!=-1){
      this.profile.dataSets.splice(i,1);
    }
    this.change.emit({});
    this.reloadDataSets();
  }
}
