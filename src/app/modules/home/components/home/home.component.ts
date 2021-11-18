import {AfterViewInit, Component, Inject, PLATFORM_ID, QueryList, ViewChildren} from '@angular/core';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';
import {NgProgress} from '@ngx-progressbar/core';
import {Meta, Title} from '@angular/platform-browser';
import {isPlatformServer} from '@angular/common';
import {SchemaService} from '@shared/services/schema.service';
import {AppConfig} from 'app/app.config';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {


    @ViewChildren(AsyncInitialisedComponent)
    asyncComponents: QueryList<AsyncInitialisedComponent>;
    schema: any;
    private topDomain: string;
    topDomainIsOmicsDI = true;

    constructor(private loadingBarService: NgProgress,
                private metaService: Meta,
                private schemaService: SchemaService,
                public appConfig: AppConfig,
                @Inject(PLATFORM_ID) private platformId: string,
                private titleService: Title) {
         this.topDomain = this.appConfig.getTopDomain();
    }

    ngAfterViewInit() {
        if (this.topDomain != "omics") {
            this.topDomainIsOmicsDI = false;
        } 
        this.titleService.setTitle('OmicsDI: Home');
        this.metaService.updateTag({name: 'description', content: 'Omics Discovery Index is an integrated and open source platform ' +
                'facilitating the access and dissemination of omics datasets. It provides a unique infrastructure to integrate datasets ' +
                'coming from multiple omics studies, including at present proteomics, genomics, transcriptomics and metabolomics.' +
                'OmicsDI stores metadata coming from the public datasets from every resource using an efficient indexing system, ' +
                'which is able to integrate different biological entities including genes, proteins and metabolites with the relevant ' +
                'life science literature. OmicsDI is updated daily, as new datasets get publicly available in the contributing ' +
                'repositories.'});
        this.schemaService.getHomeSchema().subscribe(result => {
            this.schema = result;
        });
        if (!isPlatformServer(this.platformId)) {
            let total = this.asyncComponents.length;
            this.loadingBarService.ref().start();
            this.asyncComponents.map(e => e.loadedState$).forEach(e => e.subscribe(loaded => {
                if (loaded) {
                    total -= 1;
                }
                if (total === 0) {
                    this.loadingBarService.ref().complete();
                }
            }));
        }
    }

}
