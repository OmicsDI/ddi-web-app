import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../model/Profile";
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private profileService: ProfileService, private appConfig: AppConfig) { }

  public profiles: Profile[];

  ngOnInit() {
    this.profileService.getAllProfiles().subscribe(x => this.profiles = x);
  }

}
