import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppConfig} from 'app/app.config';

@Component({
    selector: 'app-home-about',
    templateUrl: './home-about.component.html',
    styleUrls: ['./home-about.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeAboutComponent implements OnInit {

    private topDomain: string;
    title: string;
    topDomainIsOmicsDI = true;

    constructor(public appConfig: AppConfig) {
        this.topDomain = this.appConfig.getTopDomain();
        this.title = this.appConfig.getTitle();
    }

    ngOnInit() {
        if (this.topDomain != "omics") {
            this.topDomainIsOmicsDI = false;
        }         
    }
}
