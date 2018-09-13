import {Injectable} from '@angular/core';
import {PublicationResult} from 'model/PublicationResult';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class PublicationService extends BaseService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    search(acc: string): Observable<PublicationResult> {
        return this.http.get(this.appConfig.getPublicationUrl(acc))
            .pipe(map((x: Response) => this.extractData<PublicationResult>(x)));
    }
}
