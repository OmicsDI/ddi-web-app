import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {AltmetricService} from '@shared/services/altmetric.service';
import {AppConfig} from 'app/app.config';

@Component({
    selector: 'app-altmetric-image',
    templateUrl: './altmetric-image.component.html',
    styleUrls: ['./altmetric-image.component.css']
})

export class AltmetricImageComponent implements OnInit, OnChanges {

    @Input() PMID: string;

    image_url = 'static/images/altmetric/altmetric_unknown.png';
    detail_url = '';

    constructor(private altmetricService: AltmetricService, public appConfig: AppConfig) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (const propName in changes) {
            if (propName === 'PMID') {
                if (null != changes[propName].currentValue) {
                    const PMID = changes[propName].currentValue;

                    this.altmetricService.get(PMID).subscribe(
                        result => {
                            console.log(result);
                            this.image_url = result.image_url;
                            this.detail_url = result.detail_url;
                        }
                    );
                }
            }
        }
    }

}
