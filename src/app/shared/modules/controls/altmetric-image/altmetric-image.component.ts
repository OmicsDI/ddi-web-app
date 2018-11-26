import {Component, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChange} from '@angular/core';
import {AltmetricService} from '@shared/services/altmetric.service';
import {AppConfig} from 'app/app.config';
import {LogService} from '@shared/modules/logs/services/log.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-altmetric-image',
    templateUrl: './altmetric-image.component.html',
    styleUrls: ['./altmetric-image.component.css']
})

export class AltmetricImageComponent implements OnInit, OnChanges {

    @Input() PMID: string;

    image_url = 'static/images/altmetric/altmetric_unknown.png';
    detail_url = '';

    constructor(private altmetricService: AltmetricService,
                private logger: LogService,
                @Inject(PLATFORM_ID) private platformId,
                public appConfig: AppConfig) {
    }

    ngOnInit() {
    }

    hasAltMetric() {
        return this.detail_url !== '';
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (const propName in changes) {
            if (propName === 'PMID') {
                if (null != changes[propName].currentValue) {
                    const PMID = changes[propName].currentValue;
                    if (isPlatformBrowser(this.platformId)) {
                        this.altmetricService.get(PMID).subscribe(
                            result => {
                                this.image_url = result.image_url;
                                this.detail_url = result.detail_url;
                            }, err => {
                                this.logger.debug('PMID ' + PMID + ' got error: ' + err);
                            }
                        );
                    }
                }
            }
        }
    }

}
