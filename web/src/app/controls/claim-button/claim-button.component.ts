import {Component, OnInit, Input, AfterViewChecked, OnChanges, SimpleChange} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {AuthService} from "../../services/auth.service";
import {Profile} from "../../model/Profile";
import {DataSetShort} from "../../model/DataSetShort";
import {fdatasyncSync} from "fs";
import {Router} from "@angular/router";
import * as moment from 'moment';
import {DataSet} from "../../model/DataSet";

@Component({
  selector: 'claim-button',
  templateUrl: './claim-button.component.html',
  styleUrls: ['./claim-button.component.css']
})
export class ClaimButtonComponent implements OnInit,OnChanges {

  @Input() dataSet: DataSet;

  claimed:boolean;

  constructor(private auth: AuthService, private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }

      if(propName=="dataSet"){
        if(null!=changes[propName].currentValue){
          if(null!=this.profileService.profile) {
            let profile: Profile = this.profileService.profile;
            let obj: any;
            if (null != profile.dataSets) {
              obj = profile.dataSets.find(x => x.id == this.dataSet.id && x.source == this.dataSet.source);
            }
            this.claimed = (null != obj);
          }
        }
      }
    }
  }

  claimDataset(){
    let dataset: DataSetShort = new DataSetShort();
    dataset.source = this.dataSet.source;
    dataset.id = this.dataSet.id;
    dataset.claimed = moment().format("ll");
    dataset.name = this.dataSet.title;
    dataset.omics_type = this.dataSet.omicsType;

    if(!this.profileService.profile){
      console.log(`this.profileService.profile is NULL`);
      console.log(`this.profileService.userId ${this.profileService.userId}`);
    }else{
      console.log(`claim dataset for user: ${this.profileService.profile.userId}`);
      this.profileService.claimDataset(this.profileService.profile.userId, dataset);
    }

    this.claimed = true;
  }

  viewInProfile(){
    this.router.navigate(['profile']);
  }


}