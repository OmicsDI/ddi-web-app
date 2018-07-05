import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppConfig} from "../../app.config";
import {InviteService} from "../../services/invite.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  inviteId : string;

  constructor(private route: ActivatedRoute
      , private appConfig: AppConfig
      , private inviteService: InviteService
      , private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.inviteId = params['inviteId'];
      this.inviteService.getInvite(this.inviteId).subscribe(
          x => {
            if(!x){
              this.router.navigate(["/notfound"]);
            }
          }
      )
    })
  }


  submit(provider: string, scope: string) {
    window.location.href = this.appConfig.getLoginUrl(provider,scope) + "&state=" + this.inviteId + "&" + Math.random().toString(36).substring(7);
  }


}
