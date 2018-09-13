import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Response} from '@angular/http';
import {AppConfig} from 'app/app.config';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class ScoreService extends BaseService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    public getViews(source: string, acc: string): Observable<number> {
        return this.http.get(this.appConfig.getScoreViewsUrl(acc, source))
            .pipe(map((x: Response) => {
                const o = x.json();
                if (o) {
                    return o;
                }
                return 0;
            }));
    }

    public getCitations(source: string, acc: string): Observable<number> {
        return this.http.get(this.appConfig.getScoreCitationsUrl(acc, source))
            .pipe(map((x: Response) => {
                const o = this.extractData<Object>(x);
                if (o) {
                    return o['pubmedCount'];
                }
                return 0;
            }));
    }

    public getReanalysis(source: string, acc: string): Observable<number> {
        return this.http.get(this.appConfig.getScoreReanalysisUrl(acc, source))
            .pipe(map((x: Response) => {
                const o = this.extractData<Object>(x);
                if (o) {
                    return o['total'];
                }
                return 0;
            }));
    }

    public getConnections(source: string, acc: string): Observable<number> {
        return this.http.get(this.appConfig.getScoreConnectionsUrl(acc))
            .pipe(map((x: Response) => {
                const o = this.extractData<Object>(x);
                if (o) {
                    return o['pubmedCount'];
                }
                return 0;
            }));
    }

}
