import {Injectable} from '@angular/core';
import {Feedback} from 'model/Feedback';
import {AppConfig} from 'app/app.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class FeedbackService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
    }

    submit(feedback: Feedback) {

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.put(this.appConfig.getFeedbackUrl(), JSON.stringify(feedback), {headers: headers})
            .pipe(map(res => res)).subscribe(() => {});
    }
}
