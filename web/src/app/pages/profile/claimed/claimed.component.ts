import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../../../app.config";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-claimed',
  templateUrl: './claimed.component.html',
  styleUrls: ['./claimed.component.css',
              '../profile.css']
})
export class ClaimedComponent implements OnInit {

  constructor(private profileService: ProfileService,
              private appConfig: AppConfig) { }

  ngOnInit() {
  }

  updateProfile(){
    this.profileService.updateUser(this.profileService.profile).subscribe();
  }

}
