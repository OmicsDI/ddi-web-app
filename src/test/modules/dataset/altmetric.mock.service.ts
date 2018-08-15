import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AppConfig} from 'app/app.config';
import {AltmetricEntity} from 'model/AltmetricEntity';
import {Observable} from 'rxjs/Observable';
import {BaseService} from '@shared/services/base.service';

@Injectable()
export class AltmetricMockService extends BaseService {

    constructor(private http: Http, public appConfig: AppConfig) {
        super();
    }

    public get(PMID: string): Observable<AltmetricEntity> {
        return this.http.get('test/modules/dataset/Altmetric.json')
            .map(result => {
                const r = new AltmetricEntity();

                r.pubmed_id = result.json()['pmid'];
                r.image_url = result.json()['images']['small'];
                r.detail_url = result.json()['details_url'];

                return r;
            });
    }
}
