import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../profile.service";
import {Profile} from '../profile';

@Component({
  selector: 'app-login-launcher',
  templateUrl: './login-launcher.component.html',
  styleUrls: ['./login-launcher.component.css'],
  providers: [ProfileService],
})
export class LoginLauncherComponent implements OnInit {

  public profile : Profile;
  public name : string;

  constructor(private profileService: ProfileService) {
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
          this.name = profile.Name;
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
    var f = document.createElement("form");
    f.setAttribute('method',"post");
    f.setAttribute('action',"user/logout");

    var s = document.createElement("input"); //input element, Submit button
    s.setAttribute('type',"submit");
    s.setAttribute('value',"Submit");

    f.appendChild(s);

    document.getElementsByTagName('body')[0].appendChild(f);

    f.submit();

    //this.profileService.logOut();

    //this.deleteCookie("_gat");
    //this.deleteCookie("JSESSIONID");
    //this.deleteCookie("_ga");
  }
}
