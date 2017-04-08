import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";

@Injectable()
export class StatisticsService {

  private webServiceUrl = 'http://www.omicsdi.org/ws/';
  constructor(private http: Http) { }

  public getStatisticsList(): Promise<Response>{

    return this.http.get(this.webServiceUrl+"statistics/general")
             .map(res => res.json())
             .toPromise();
  }
}
