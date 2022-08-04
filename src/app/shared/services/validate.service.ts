import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {LogService} from '@shared/modules/logs/services/log.service';
import {map} from 'rxjs/operators';
import {HttpClient, HttpEventType} from '@angular/common/http';

@Injectable()
export class ValidateService extends BaseService {

    uploadSub:Subscription;

    constructor(private http: HttpClient,
                private logger: LogService,
                public appConfig: AppConfig) {
        super();
    }

    public getValidateErrors(formData:FormData): Observable<Set<string>> {
        //alert(formData.get("isError"));
        const upload$ =  this.http.post(this.appConfig.getValidateUrl(), formData, {
            reportProgress: true,
            observe: 'body'
        }).pipe(map(x => this.extractData<Set<string>>(x)));

        return upload$;
    }
}
