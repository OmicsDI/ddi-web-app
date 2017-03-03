import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {ProfileService} from "../profile.service";
import { Profile } from '../profile';

@Component({
  selector: 'app-login-launcher',
  templateUrl: './login-launcher.component.html',
  styleUrls: ['./login-launcher.component.css'],
  providers: [ProfileService]
})
export class LoginLauncherComponent implements OnInit {

  public profile : Profile;
  public name : string;

  constructor(public dialog: MdDialog, private profileService: ProfileService) {
    this.name = "some string";
  }
  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.profileService.getProfile()
      .subscribe(
        profile => {
          this.profile = profile;
          this.name = profile.Name;
        }
      );
  }
}
