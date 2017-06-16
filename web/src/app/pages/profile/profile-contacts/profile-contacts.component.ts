import {Component, Input, OnInit} from '@angular/core';
import {Profile} from "../../../model/Profile";
import {AppConfig} from "../../../app.config";

@Component({
  selector: 'app-profile-contacts',
  templateUrl: './profile-contacts.component.html',
  styleUrls: ['./profile-contacts.component.css']
})
export class ProfileContactsComponent implements OnInit {

  @Input() profile: Profile = new Profile();

  constructor(private appConfig: AppConfig) { }

  ngOnInit() {
  }

  publicProfileUrl(): string{
    return this.appConfig.getPublicProfileUrl(this.profile);
  }

  contactInfoPresent():boolean{
    return this.profile.isPublic || `${this.profile.affiliation}${this.profile.email}${this.profile.homepage}${this.profile.orcid}`!="";
  }
}
