import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './controls/login/login.component';
import { LoginLauncherComponent } from './controls/login-launcher/login-launcher.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DatabaseComponent } from './pages/database/database.component';
import { AboutComponent } from './pages/about/about.component';
import {routing} from "./app.routes";
import {MaterialModule} from "@angular/material";
import {ProfileService} from "./services/profile.service";
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import { Routes, RouterModule } from '@angular/router';
import { ApiComponent } from './pages/api/api.component';
import { SearchComponent } from './pages/search/search.component';
import { DatasetComponent } from './pages/dataset/dataset.component';
import { CheckComponent } from './pages/check/check.component';
import {SearchService} from "./services/search.service";
import {DataSetService} from "./services/dataset.service";
import {PublicationService} from "./services/publication.service";
import {SimilarityService} from "./services/similarity.service";

import {SearchBoxComponent} from "./controls/search-box/search-box.component";
import {SearchResultComponent} from "./pages/search/search-result/search-result.component";
import {SearchFacetComponent} from "./pages/search/search-facet/search-facet.component";
import {AutocompleteNComponent} from "./controls/autocomplete-n/autocomplete-n.component";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {FacetComponent} from "./controls/facet/facet.component";
import {Ng2AutoCompleteModule} from "ng2-auto-complete";
import { SocialnetworksComponent } from './controls/socialnetworks/socialnetworks.component';
import { SimilarComponent } from './pages/dataset/similar/similar.component';
import { DisqusComponent } from './pages/dataset/disqus/disqus.component';
import { PublicationComponent } from './pages/dataset/publication/publication.component';
import { ReposOmicsComponent } from './pages/home/charts/repos-omics/repos-omics.component';
import { HotwordsComponent } from './pages/home/charts/hotwords/hotwords.component';
import { TissuesOrganismsComponent } from './pages/home/charts/tissues-organisms/tissues-organisms.component';
import { MostAccessedComponent } from './pages/home/charts/most-accessed/most-accessed.component';
import { AnnualOmicstypeComponent } from './pages/home/charts/annual-omicstype/annual-omicstype.component';
import { LatestDatasetsComponent } from './pages/home/charts/latest-datasets/latest-datasets.component';
import { TweetsNewsComponent } from './pages/home/charts/tweets-news/tweets-news.component';
import { StatisticsPanelComponent } from './pages/home/charts/statistics-panel/statistics-panel.component';
import { HomeAboutComponent } from './pages/home/charts/home-about/home-about.component';

/*import { DisqusModule } from 'angular2-disqus';*/
import {DisqusModule} from "ng2-awesome-disqus";


import { SearchPagerComponent } from './pages/search/search-pager/search-pager.component';
import { SearchTotalComponent } from './pages/search/search-total/search-total.component';
import { SearchAdvancedComponent } from './pages/search/search-advanced/search-advanced.component';

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {DropdownModule} from "ng2-dropdown";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {PagingService} from "./services/paging.service";
import {Ng2PaginationModule} from "ng2-pagination";
import {EnrichmentService} from "./services/enrichment.service";
import { OntologyTooltipPipe } from './pipes/ontology-tooltip.pipe';
import {TooltipModule} from "ng2-tooltip";
import { AnnotatedTextComponent } from './controls/annotated-text/annotated-text.component';
import { QueryBuilderComponent } from './controls/query-builder/query-builder.component';
import { DropDownComponent } from './controls/drop-down/drop-down.component';
import { MegaNumberPipe } from './pipes/mega-number.pipe';
import {AppConfig} from "./app.config";
import {ToDateStringPipe} from "./pipes/toDateString.pipe";
import { ClaimButtonComponent } from './controls/claim-button/claim-button.component';
import { SearchBoxLargeComponent } from './controls/search-box-large/search-box-large.component';
import {FileSelectDirective} from "ng2-file-upload";
import { ClaimAllButtonComponent } from './controls/claim-all-button/claim-all-button.component';
import { SearchQueryComponent } from './pages/search/search-query/search-query.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ProfileResultComponent } from './pages/profile/profile-result/profile-result.component';
import { ProfilePagerComponent } from './pages/profile/profile-pager/profile-pager.component';
import { ProfileTotalComponent } from './pages/profile/profile-total/profile-total.component';
import { ProfileInfoComponent } from './pages/profile/profile-info/profile-info.component';
import { ProfileCoauthorsComponent } from './pages/profile/profile-coauthors/profile-coauthors.component';
import { ProfileConnectionsComponent } from './pages/profile/profile-connections/profile-connections.component';
import { OmicsImageComponent } from './controls/omics-image/omics-image.component';
import { DeleteButtonComponent } from './controls/delete-button/delete-button.component';
import { DeleteAllButtonComponent } from './controls/delete-all-button/delete-all-button.component';
import {UiSwitchModule} from "../../node_modules/angular2-ui-switch";

export function getParameterByName(name): string {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{'Content-Type':'application/json'}],
    headerName: "X-AUTH-TOKEN",
    noTokenScheme: true,
    noJwtError: true
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatabaseComponent,
    ProfileComponent,
    LoginComponent,
    LoginLauncherComponent,
    HomeComponent,
    DatabaseComponent,
    AboutComponent,
    UnauthorizedComponent,
    ApiComponent,
    SearchComponent,
    DatasetComponent,
    CheckComponent,
    SearchBoxComponent,
    SearchResultComponent,
    SearchFacetComponent,
    AutocompleteNComponent,
    TruncatePipe,
    ToDateStringPipe,
    FacetComponent,
    SocialnetworksComponent,
    SimilarComponent,
    DisqusComponent,
    PublicationComponent,
    SearchPagerComponent,
    SearchTotalComponent,
    SearchAdvancedComponent,
    OntologyTooltipPipe,
    AnnotatedTextComponent,
    ReposOmicsComponent,
    HotwordsComponent,
    TissuesOrganismsComponent,
    MostAccessedComponent,
    AnnualOmicstypeComponent,
    LatestDatasetsComponent,
    TweetsNewsComponent,
    StatisticsPanelComponent,
    AboutComponent,
    HomeAboutComponent,
    SearchAdvancedComponent,
    QueryBuilderComponent,
    DropDownComponent,
    MegaNumberPipe,
    ClaimButtonComponent,
    SearchBoxLargeComponent,
    FileSelectDirective,
    ClaimAllButtonComponent,
    SearchQueryComponent,
    TermsComponent,
    ProfileResultComponent,
    ProfilePagerComponent,
    ProfileTotalComponent,
    ProfileInfoComponent,
    ProfileCoauthorsComponent,
    ProfileConnectionsComponent,
    OmicsImageComponent,
    DeleteButtonComponent,
    DeleteAllButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    Ng2AutoCompleteModule,
    DisqusModule,
    AlertModule.forRoot(),
    DropdownModule,
    SlimLoadingBarModule.forRoot(),
    Ng2PaginationModule,
    TooltipModule,
    UiSwitchModule
  ],
  exports: [
    RouterModule
  ],
  providers: [ProfileService
    ,{provide: AuthHttp,
     useFactory: authHttpServiceFactory,
     deps: [Http, RequestOptions]}
    , AuthService
    , AuthGuardService
    , SearchService
    , DataSetService
    , PublicationService
    , SimilarityService
    , PagingService
    , EnrichmentService
    , AppConfig],
  bootstrap: [AppComponent]
})
export class AppModule {

}
