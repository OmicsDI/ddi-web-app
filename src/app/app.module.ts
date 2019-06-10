// <reference path="..node_modules/@angular/forms/src/form_providers.d.ts"/>
// <reference path="services/ontology.service.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from '@shared/components/app/app.component';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatMenuModule} from '@angular/material';
import {AlertModule, BsModalService} from 'ngx-bootstrap';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {DisqusModule} from 'ngx-disqus';
import {ClipboardModule} from 'ngx-clipboard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {routing} from './app.routes';
import {RouterModule} from '@angular/router';
import {ProfileService} from '@shared/services/profile.service';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from '@shared/services/auth.service';
import {SearchService} from '@shared/services/search.service';
import {DataSetService} from '@shared/services/dataset.service';
import {EnrichmentService} from '@shared/services/enrichment.service';
import {SimilarityService} from '@shared/services/similarity.service';
import {OntologyService} from '@shared/services/ontology.service';
import {PublicationService} from '@shared/services/publication.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {AppConfig} from './app.config';
import {SimilarMoleculeService} from '@shared/services/similar-molecule.service';
import {FeedbackService} from '@shared/services/feedback.service';
import {StatisticsService} from '@shared/services/statistics.service';
import {AltmetricService} from '@shared/services/altmetric.service';
import {ScoreService} from '@shared/services/score.service';
import {DialogService} from '@shared/services/dialog.service';
import {InviteService} from '@shared/services/invite.service';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ThorService} from '@shared/services/thor.service';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {PipesModule} from '@shared/pipes/pipes.module';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {HomeModule} from '@modules/home/home.module';
import {CommonplaceModule} from '@modules/commonplace/commonplace.module';
import {DataTransportService} from '@shared/services/data.transport.service';
import {LogService} from '@shared/modules/logs/services/log.service';
import {LogPublisherService} from '@shared/modules/logs/services/log.publisher.service';
import {UploadService} from '@shared/services/upload.service';
import {HttpClientModule} from '@angular/common/http';
import {NgProgressModule} from '@ngx-progressbar/core';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {
    TRANSFER_RESPONSE_BASE_URLS} from '@shared/modules/angular-transfer-http-response/transfer-http-response.module';
import {environment} from '../environments/environment';
import {GoogleAnalyticsService} from '@shared/services/google-analytics.service';
import {SchemaService} from '@shared/services/schema.service';
import {RedirectService} from '@shared/services/redirect.service';


export function jwtTokenGetter() {
    let token = null;
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('id_token');
    }
    return token;
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        JwtModule.forRoot({
            config: {
                tokenGetter: jwtTokenGetter,
                headerName: 'X-AUTH-TOKEN',
                whitelistedDomains: ['wwwdev.ebi.ac.uk', '*.omicsdi.org', 'omicsdi.org']
            }
        }),
        CommonModule,
        PipesModule,
        HomeModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        NgProgressModule,
        MatDialogModule,
        MatMenuModule,
        MatButtonModule,
        MatCheckboxModule,
        routing,
        FormsModule,
        ReactiveFormsModule,
        NguiAutoCompleteModule,
        DisqusModule.forRoot('omicsdi'),
        AlertModule.forRoot(),
        UtilsModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),
        ClipboardModule,
        ControlsModule,
        CommonplaceModule,
        BsDropdownModule.forRoot()
    ],
    exports: [
        RouterModule
    ],
    providers: [ProfileService,
        {provide: LocationStrategy, useClass: PathLocationStrategy},
        {
            provide: TRANSFER_RESPONSE_BASE_URLS,
            useValue: [environment.webServiceUrl]
        }
        , RedirectService
        , AuthService
        , SchemaService
        , BsModalService
        , DataTransportService
        , SearchService
        , DataSetService
        , PublicationService
        , SimilarityService
        , EnrichmentService
        , OntologyService
        , DatabaseListService
        , SimilarMoleculeService
        , FeedbackService
        , AppConfig
        , StatisticsService
        , AltmetricService
        , DialogService
        , ScoreService
        , ThorService
        , MatDialogModule
        , MatMenuModule
        , MatButtonModule
        , LogService
        , LogPublisherService
        , UploadService
        , GoogleAnalyticsService
        , InviteService],
    entryComponents: [
        // ConfirmDialogComponent
        //   CitationDialogSearchComponent
        // in some case dialog will not be loaded in lazy-load module,so we'd better put those component in here
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
