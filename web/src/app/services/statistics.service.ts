import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import {AppConfig} from "../app.config";

@Injectable()
export class StatisticsService {

  constructor(private http: Http, private appConfig: AppConfig) { }

  public getStatisticsList(): Promise<Response>{

    return this.http.get(this.appConfig.getStatisticsUrl())
             .map(res => res.json())
             .toPromise();
  }
}
