import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {AppConfig} from 'app/app.config';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Invite} from 'model/Invite';

@Injectable()
export class InviteService extends BaseService {

    constructor(private http: Http, public appConfig: AppConfig) {
        super();
    }

    public getInvite(id: string): Observable<Invite> {
        return this.http.get(this.appConfig.getInviteUrl(id))
            .map(x => {
                return this.extractData<Invite>(x);
            });
    }

}
