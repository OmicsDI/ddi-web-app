import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../model/Profile";

@Component({
  selector: '[AppLoginLauncher]',
  templateUrl: './login-launcher.component.html',
  styleUrls: ['./login-launcher.component.css']
})
export class LoginLauncherComponent implements OnInit {

  public profile : Profile;
  public name : string;

  constructor(private profileService: ProfileService, private router: Router, private auth: AuthService) {
    this.name = null;
  }
  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.profileService.getProfile()
      .subscribe(
        profile => {
          this.profile = profile;
          this.name = profile.userName;
        }
      );
  }

  private deleteCookie(name) {
    this.setCookie(name, "", -1);
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = "") {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  }

  LogOut() {
    localStorage.removeItem('id_token');
    this.router.navigate(['home']);
  }
}
