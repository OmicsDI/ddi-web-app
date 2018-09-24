import {Injectable} from '@angular/core';
import {AppConfig} from 'app/app.config';
import {Observable} from 'rxjs';
import {DomainStat} from 'model/DomainStat';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '@shared/services/base.service';

@Injectable()
export class StatisticsService extends BaseService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    public getStatisticsList(): Promise<any> {

        return this.http.get(this.appConfig.getStatisticsUrl())
            .toPromise();
    }

    public getDatasetStats(): Observable<DomainStat[]> {
        return this.http.get(this.appConfig.getDatasetStatsUrl())
            .pipe(map(res => this.extractData<DomainStat[]>(res)));
    }

    public getOmicsStats(): Promise<any> {
        return this.http.get(this.appConfig.getStatisticsOmicsUrl()).toPromise();
    }
}
