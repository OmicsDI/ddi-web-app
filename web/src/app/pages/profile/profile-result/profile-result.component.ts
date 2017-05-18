import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ProfileService} from "../../../services/profile.service";
import {Profile} from "../../../model/Profile";
import {AppConfig} from "../../../app.config";

@Component({
  selector: 'app-profile-result',
  templateUrl: './profile-result.component.html',
  styleUrls: ['./profile-result.component.css']
})
export class ProfileResultComponent implements OnInit {

  @Input() profile: Profile;
  @Output() change = new EventEmitter();

  constructor(private profileService: ProfileService
    , private appConfig: AppConfig) { }

  ngOnInit() {
    //this.profileService.getDataSetDetails(this.profileService.profile);
  }

  delete($event){
    let i: number = this.profile.dataSets.findIndex( x => x.source == $event.source && x.id == $event.id);
    if(i!=-1){
      this.profile.dataSets.splice(i,1);
    }
    this.change.emit({});
  }
}
