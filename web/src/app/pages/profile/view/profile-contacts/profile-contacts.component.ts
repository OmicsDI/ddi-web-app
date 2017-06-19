import {Component, Input, OnInit} from '@angular/core';
import {Profile} from "../../../../model/Profile";
import {AppConfig} from "../../../../app.config";
import {ProfileService} from "../../../../services/profile.service";

@Component({
  selector: 'app-profile-contacts',
  templateUrl: './profile-contacts.component.html',
  styleUrls: ['./profile-contacts.component.css']
})
export class ProfileContactsComponent implements OnInit {
  constructor(private appConfig: AppConfig,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  publicProfileUrl(): string{
    return this.appConfig.getPublicProfileUrl(this.profileService.profile);
  }

  contactInfoPresent():boolean{
    return this.profileService.profile.isPublic || `${this.profileService.profile.affiliation}${this.profileService.profile.email}${this.profileService.profile.homepage}${this.profileService.profile.orcid}`!="";
  }
}
