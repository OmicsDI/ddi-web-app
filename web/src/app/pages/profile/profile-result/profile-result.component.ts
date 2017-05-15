import {Component, OnInit, Input} from '@angular/core';
import {ProfileService} from "../../../services/profile.service";
import {Profile} from "../../../model/Profile";
import {AppConfig} from "../../../app.config";

@Component({
  selector: 'app-profile-result',
  templateUrl: './profile-result.component.html',
  styleUrls: ['./profile-result.component.css']
})
export class ProfileResultComponent implements OnInit {

  constructor(private profileService: ProfileService
    , private appConfig: AppConfig) { }

  ngOnInit() {
    //this.profileService.getDataSetDetails(this.profileService.profile);
  }

}
