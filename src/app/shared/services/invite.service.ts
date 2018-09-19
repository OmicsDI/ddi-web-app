import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {AppConfig} from 'app/app.config';
import {Observable} from 'rxjs';
import {Invite} from 'model/Invite';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InviteService extends BaseService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    public getInvite(id: string): Observable<Invite> {
        return this.http.get(this.appConfig.getInviteUrl(id))
            .pipe(map(x => this.extractData<Invite>(x)));
    }

}
