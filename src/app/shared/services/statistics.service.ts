import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {AppConfig} from 'app/app.config';
import {Observable} from 'rxjs/Observable';
import {DomainStat} from 'model/DomainStat';

@Injectable()
export class StatisticsService {

    constructor(private http: Http, public appConfig: AppConfig) {
    }

    public getStatisticsList(): Promise<Response> {

        return this.http.get(this.appConfig.getStatisticsUrl())
            .map(res => res.json())
            .toPromise();
    }

    public getDatasetStats(): Observable<DomainStat[]> {
        return this.http.get(this.appConfig.getDatasetStatsUrl())
            .map(res => res.json());
    }
}
