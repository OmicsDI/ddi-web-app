import { Injectable } from '@angular/core';
import {Feedback} from "../model/Feedback";
import {Http, RequestOptions, Headers} from "@angular/http";
import {AppConfig} from "../app.config";

@Injectable()
export class FeedbackService {

  constructor(private http: Http, private appConfig: AppConfig) { }

  submit(feedback:Feedback){

    let r:string;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.put(this.appConfig.getFeedbackUrl(),JSON.stringify(feedback),options)
      .map(res => res.json()).subscribe(data => {
      r = data;
    });

  }

}
