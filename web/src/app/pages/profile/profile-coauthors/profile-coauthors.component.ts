import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-profile-coauthors',
  templateUrl: './profile-coauthors.component.html',
  styleUrls: ['./profile-coauthors.component.css']
})
export class ProfileCoauthorsComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getCoAuthors("1234")
  }
}
