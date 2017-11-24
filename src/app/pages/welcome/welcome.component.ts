import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  inviteId : string;

  constructor(private route: ActivatedRoute, private appConfig: AppConfig) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.inviteId = params['inviteId'];
    })
  }


  submit(provider: string, scope: string) {
    window.location.href = this.appConfig.getLoginUrl(provider,scope) + "&state=" + this.inviteId + "&" + Math.random().toString(36).substring(7);
  }


}
