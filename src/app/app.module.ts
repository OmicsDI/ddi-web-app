// <reference path="..node_modules/@angular/forms/src/form_providers.d.ts"/>
// <reference path="services/ontology.service.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {AppComponent} from './app.component';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatMenuModule} from '@angular/material';
import {AlertModule} from 'ngx-bootstrap';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {DisqusModule} from 'ngx-disqus';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {NgxPaginationModule} from 'ngx-pagination';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UiSwitchModule} from 'angular2-ui-switch';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleNotificationsModule} from 'angular2-notifications/dist';
import {routing} from './app.routes';
import {RouterModule} from '@angular/router';
import {ProfileService} from 'services/profile.service';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {AuthService} from 'services/auth.service';
import {AuthGuardService} from 'services/auth-guard.service';
import {SearchService} from 'services/search.service';
import {DataSetService} from 'services/dataset.service';
import {EnrichmentService} from 'services/enrichment.service';
import {SimilarityService} from 'services/similarity.service';
import {OntologyService} from 'services/ontology.service';
import {PublicationService} from 'services/publication.service';
import {DatabaseListService} from 'services/database-list.service';
import {AppConfig} from './app.config';
import {SimilarMoleculeService} from 'services/similar-molecule.service';
import {FeedbackService} from 'services/feedback.service';
import {StatisticsService} from 'services/statistics.service';
import {AltmetricService} from 'services/altmetric.service';
import {SelectedService} from 'services/selected.service';
import {ScoreService} from 'services/score.service';
import {DialogService} from 'services/dialog.service';
import {InviteService} from 'services/invite.service';
import {UnauthorizedComponent} from 'pages/unauthorized/unauthorized.component';
import {NotfoundComponent} from 'pages/notfound/notfound.component';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {TermsComponent} from 'pages/terms/terms.component';
import {SelectedComponent} from 'pages/selected/selected.component';
import {ThorService} from 'services/thor.service';
import {ControlsModule} from 'controls/controls.module';
import {PipesModule} from './pipes/pipes.module';
import {UtilsModule} from 'utils/utils.module';
import {PagesModule} from 'pages/pages.module';
import {HomeModule} from '@modules/home/home.module';


export function getParameterByName(name): string {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'id_token',
        tokenGetter: (() => localStorage.getItem('id_token')),
        globalHeaders: [{'Content-Type': 'application/json'}],
        headerName: 'X-AUTH-TOKEN',
        noTokenScheme: true,
        noJwtError: true
    }), http, options);
}


@NgModule({
    declarations: [
        AppComponent,
        UnauthorizedComponent,
        NotfoundComponent,
        TermsComponent,
        NotfoundComponent,
        SelectedComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        HomeModule,
        BrowserModule,
        FormsModule,
        HttpModule,
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
        SlimLoadingBarModule.forRoot(),
        NgxPaginationModule,
        UiSwitchModule,
        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),
        ClipboardModule,
        ControlsModule,
        PagesModule
    ],
    exports: [
        RouterModule
    ],
    providers: [ProfileService
        , {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        {provide: LocationStrategy, useClass: PathLocationStrategy}
        , AuthService
        , AuthGuardService
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
        , SelectedService
        , DialogService
        , ScoreService
        , ThorService
        , MatDialogModule
        , MatMenuModule
        , MatButtonModule
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
