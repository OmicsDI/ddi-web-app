import {Injectable} from '@angular/core';
import {Feedback} from 'model/Feedback';
import {Headers, Http, RequestOptions} from '@angular/http';
import {AppConfig} from 'app/app.config';

@Injectable()
export class FeedbackService {

    constructor(private http: Http, public appConfig: AppConfig) {
    }

    submit(feedback: Feedback) {

        let r: string;

        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        this.http.put(this.appConfig.getFeedbackUrl(), JSON.stringify(feedback), options)
            .map(res => res.json()).subscribe(data => {
            r = data;
        });

    }

}
