import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Profile } from './profile';

@Injectable()
export class ProfileService {
  profileUrl = "http://localhost:8088/user/profile?angular=2";

  constructor (private http: Http) {}

  getProfile (): Observable<Profile> {
    return this.http.get(this.profileUrl, { withCredentials: true })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
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
}
