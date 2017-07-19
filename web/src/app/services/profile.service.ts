import { Injectable }       from '@angular/core';
import {Http, Response, RequestOptionsArgs, Headers, RequestOptions}   from '@angular/http';
import {Observable, ObservableInput} from 'rxjs/Observable';
import { Profile } from '../model/Profile';
import { AuthHttp } from 'angular2-jwt';
import {AppConfig} from "../app.config";
import {BaseService} from "./base.service";
import {DataSetShort} from "../model/DataSetShort";
import {UserShort} from "../model/UserShort";
import {DataSetDetail} from "../model/DataSetDetail";
import {DataSetService} from "./dataset.service";

@Injectable()
export class ProfileService extends BaseService {

  public profile: Profile; //this.profile.userId
  public userId: string;

  constructor (private http: AuthHttp, private appConfig: AppConfig, private dataSetService: DataSetService) {
    super();
    console.log("ProfileService ctor");
  }

  getParameterByName(name): string {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  getProfile(): Observable<Profile> {
    return this.http.get(this.appConfig.getProfileUrl(null)) //,config //{ withCredentials: true }
        .map(x => {
          this.profile = this.extractData<Profile>(x);
          if(!this.profile || !this.profile.userId){
            console.log("profile not received");
          }else {
            console.log("profile received:" + this.profile.userId);
            this.userId = this.profile.userId;
            this.getCoAuthors(this.profile.userId);
          }
          return this.profile;
        })
        .catch(this.handleError);
  }

  getPublicProfile(username): Observable<Profile>{
    var _profile;
    return this.http.get(this.appConfig.getProfileUrl(username)) //,config //{ withCredentials: true }
      .map(x => {
        _profile = this.extractData<Profile>(x);
        if(!_profile){
          console.log("public profile not received");
        }else {
          console.log("public profile received:" + _profile.userId);
        }
        return _profile;
      })
      .catch(this.handleError);
  }

  getAllProfiles(): Observable<Profile[]>{
    var _profiles;
    return this.http.get(this.appConfig.getAllProfilesUrl()) //,config //{ withCredentials: true }
      .map(x => {
        _profiles = this.extractData<Profile[]>(x);
        if(!_profiles){
          console.log("public profile not received");
        }else {
          console.log("public profilesreceived:" + _profiles.length);
        }
        return _profiles;
      })
      .catch(this.handleError);
  }

  getUserConnections (userId: string): Observable<string[]>{
    return this.http.get(this.appConfig.getUserConnectionsUrl(userId)) //{ withCredentials: true }
      .map(x => this.extractData<String[]>(x))
      .catch(this.handleError);
  }

  deleteConnection(userId: string, provider: string): Observable<any>{
    let deleteConnectionUrl = this.appConfig.getDeleteConnectionUrl(userId,provider);
    return this.http.delete(deleteConnectionUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getCoAuthors (userId: string): Observable<UserShort[]> {
    return this.http.get(this.appConfig.getUserCoAuthorsUrl(userId))//
        .map(x => this.extractData<UserShort[]>(x))
        .catch(this.handleError);
  }

  public updateUser(): Observable<string>{

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
    //console.log("deleting user with datasets:" + this.profile.dataSets.length);

    return this.http.post(this.appConfig.getProfileUrl(null), JSON.stringify(this.profile), config)
      .map(res => {return "OK"})
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

  public saveDataSets(userID: string, datasets: DataSetShort[]){
    let r:string;
    this.http.put(this.appConfig.getProfileSaveDatasetsUrl(userID),JSON.stringify(datasets))
      .map(res => res.json()).subscribe(data => {
      r = data;
    });
    console.log(r);
  }

  public claimDataset(userID: string, dataset: DataSetShort) {
    //alert(`claim ${userID} ${accession} ${repository}`);
    //let datasetId:DataSetId = new DataSetId();
    //datasetId.accession = accession;
    //datasetId.repository = repository;

      let r:string;

      this.http.post(this.appConfig.getProfileClaimDatasetUrl(userID),JSON.stringify(dataset))
      .map(res => res.json()).subscribe(data => {
        r = data;
      });
  }

  setCookie(name, value, path)
  {
    if (null==path)
      path="/";

    var today = new Date();
    var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000);

    document.cookie=name + "=" + value + "; path="+ path +"; expires=" + expiry.toUTCString();
  }

  public connect(provider: string) {

    var form = document.createElement("form");
    var element1 = document.createElement("input");

    form.method = "POST";
    form.action = this.appConfig.getConnectUrl(provider);

    ///element1.value = localStorage.getItem("id_token");
    ///element1.name = "X-AUTH-TOKEN";
    ///form.appendChild(element1);

    document.body.appendChild(form);

    this.setCookie("X-AUTH-TOKEN", localStorage.getItem("id_token"), this.appConfig.getConnectCookiePath(provider));

    form.submit();
  }
}
