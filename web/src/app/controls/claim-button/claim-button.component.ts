import {Component, OnInit, Input, AfterViewChecked, OnChanges, SimpleChange} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {AuthService} from "../../services/auth.service";
import {Profile} from "../../model/Profile";
import {DataSetShort} from "../../model/DataSetShort";
import {fdatasyncSync} from "fs";
import {Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'claim-button',
  templateUrl: './claim-button.component.html',
  styleUrls: ['./claim-button.component.css']
})
export class ClaimButtonComponent implements OnInit,OnChanges {

  @Input() repository: string;
  @Input() accession: string;
  profile:Profile;
  claimed:boolean;
  userId:string;

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
    }
    console.log(log.join(', '));

    if((null!=this.accession)&&(null!=this.repository)){
      this.getProfile();
    }
  }

  getProfile(){
    this.profileService.getProfile()
      .subscribe(
        profile => {
          this.profile = profile;
          this.userId = profile.userId;

          let obj: any = profile.dataSets.find(x => x.dataSetId == this.accession && x.source == this.repository);

          this.claimed = (null != obj) ;
        }
      );
  }

  claimDataset(){
    let dataset: DataSetShort = new DataSetShort();
    dataset.source = this.repository;
    dataset.dataSetId = this.accession;
    dataset.claimed = moment().format("ll");

    this.profileService.claimDataset(this.userId, dataset);
    this.claimed = true;
  }

  viewInProfile(){
    this.router.navigate(['profile']);
  }


}
