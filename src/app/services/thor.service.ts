import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {AppConfig} from "../app.config";
import {OrcidWork} from "../model/OrcidWork";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ThorService {

  constructor(private http: Http, private appConfig: AppConfig ) { }

  public claimBatchBehalf(orcid: string, database, accessToken: string, orcidWorks: OrcidWork[] ): Observable<any>{
    var body = { orcidWorkList : orcidWorks };

    let headers = new Headers();

    headers.append('accessToken', accessToken);
    //headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    let options = new RequestOptions({ headers: headers });

    return this.http.post( this.appConfig.getThorUrl(orcid,"OMICSDI"), JSON.stringify(body), options);
  }

}
