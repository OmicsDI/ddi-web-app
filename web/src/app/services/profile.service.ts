import { Injectable }       from '@angular/core';
import {Http, Response, RequestOptionsArgs, Headers, RequestOptions}   from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Profile } from '../model/profile';
import { AuthHttp } from 'angular2-jwt';
import {AppConfig} from "../app.config";
import {BaseService} from "./base.service";
import {DataSetShort} from "../model/DataSetShort";

@Injectable()
export class ProfileService extends BaseService {
  constructor (private http: AuthHttp, private appConfig: AppConfig) {
    super();
  }

  getParameterByName(name): string {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  getProfile (): Observable<Profile> {
    return this.http.get(this.appConfig.getProfileUrl()) //,config //{ withCredentials: true }
        .map(x => this.extractData<Profile>(x))
        .catch(this.handleError);
  }

  getUserConnections (userId: string): Observable<string[]>{
    return this.http.get(this.appConfig.getUserConnectionsUrl(userId)) //{ withCredentials: true }
      .map(x => this.extractData<String[]>(x))
      .catch(this.handleError);
  }

  public updateUser(profile:Profile){

    let headers = new Headers();
    /**
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    let authToken = this.getParameterByName("auth");
    if(authToken) {
      headers.append('X-AUTH-TOKEN', authToken);
    }**/

    var config: RequestOptionsArgs = { headers: headers };
    //$http.post(url, config) .success ...
    return this.http.post(this.appConfig.getProfileUrl(), JSON.stringify(profile), config)
      .map(res => res.json());
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private extractDataLogin(res: Response) {
    console.warn("logging out - extracting data..");
  }

  private handleErrorLogin (error: Response | any) {
    console.warn("logging out - error..");
    return Observable.throw("Error in logout");
  }

  public claimDataset(userID: string, accession:string, repository:string){
    alert(`claim ${userID} ${accession} ${repository}`);
  }
}
