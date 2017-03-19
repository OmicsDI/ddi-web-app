import { Injectable }       from '@angular/core';
import {Http, Response, RequestOptionsArgs, Headers, RequestOptions}   from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Profile } from './profile';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class ProfileService {
  profileUrl = "http://localhost:8080/api/user/current";
  logoutUrl = "http://localhost:8088/user/logout";
  connectionsUrl = "http://localhost:8088/api/users/{0}/connections";

  constructor (private http: AuthHttp) {}

  getParameterByName(name): string {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  getProfile (): Observable<Profile> {
    /*
    let authToken = this.getParameterByName("auth");
    var config: RequestOptionsArgs;
    if(authToken) {
      let headers = new Headers();
      headers.append('X-AUTH-TOKEN', authToken);
      config = { headers: headers };
    }*/
    return this.http.get(this.profileUrl) //,config //{ withCredentials: true }
        .map(this.extractData)
        .catch(this.handleError);
  }

  getUserConnections (userId: string): Observable<string[]>{
    let url = "http://localhost:8080/api/users/" + userId + "/connections";
    return this.http.get(url) //{ withCredentials: true }
      .map(this.extractConnectionsData)
      .catch(this.handleError);
  }

  private getUserUrl(id){
    return this.profileUrl + "/" + id;
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
    return this.http.post(this.profileUrl, JSON.stringify(profile), config)
      .map(res => res.json());
  }

  private extractData(res: Response) {
    let body = res.json();
    //return body || { };
    var p : Profile;
    p = (body || { }) as Profile;
    return p;
  }

  private extractConnectionsData(res: Response) {
    let body = res.json();
    //return body || { };
    var p : String[];
    p = (body || { }) as String[];
    return p;
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

  public logOut() {
    ///not working
    this.http.get(this.logoutUrl, {withCredentials: true})
        .map(this.extractDataLogin)
        .catch(this.handleErrorLogin);

    console.warn("logging out..");
  }
}
