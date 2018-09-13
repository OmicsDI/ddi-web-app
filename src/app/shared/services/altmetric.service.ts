import {Injectable} from '@angular/core';
import {AppConfig} from 'app/app.config';
import {AltmetricEntity} from 'model/AltmetricEntity';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AltmetricService extends BaseService {

    constructor(private http: HttpClient, public appConfig: AppConfig) {
        super();
    }

    public get(PMID: string): Observable<AltmetricEntity> {
        return this.http.get(this.appConfig.getAltmetricUrl(PMID))
            .pipe(map((res: Response) => {
                const r = new AltmetricEntity();

                r.pubmed_id = res['pmid'];
                r.image_url = res['images']['small'];
                r.detail_url = res['details_url'];

                return r;
            }));
    }
}
