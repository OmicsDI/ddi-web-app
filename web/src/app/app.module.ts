import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './controls/login/login.component';
import { LoginLauncherComponent } from './controls/login-launcher/login-launcher.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/view/profile.component';
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
import {DatabaseListService} from './services/database-list.service';
import {SimilarMoleculeService} from './services/similar-molecule.service';

import {SearchBoxComponent} from "./controls/search-box/search-box.component";
import {SearchResultComponent} from "./pages/search/search-result/search-result.component";
import {SearchFacetComponent} from "./pages/search/search-facet/search-facet.component";
import {AutocompleteNComponent} from "./controls/autocomplete-n/autocomplete-n.component";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {FacetComponent} from "./controls/facet/facet.component";
import {Ng2AutoCompleteModule} from "ng2-auto-complete";
import { SocialnetworksComponent } from './controls/socialnetworks/socialnetworks.component';
import { SimilarComponent } from './pages/dataset/similar/similar.component';
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

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/*import { DisqusModule } from 'angular2-disqus';*/
import {DisqusModule} from "ng2-awesome-disqus";


import { SearchPagerComponent } from './pages/search/search-pager/search-pager.component';
import { SearchTotalComponent } from './pages/search/search-total/search-total.component';

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import {DropdownModule} from "ng2-dropdown";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {PagingService} from "./services/paging.service";
import {NgxPaginationModule} from "ngx-pagination";
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
import { ProfileResultComponent } from './pages/profile/view/profile-result/profile-result.component';
import { ProfileTotalComponent } from './pages/profile/view/profile-total/profile-total.component';
import { ProfileInfoComponent } from './pages/profile/view/profile-info/profile-info.component';
import { ProfileCoauthorsComponent } from './pages/profile/view/profile-coauthors/profile-coauthors.component';
import { ProfileConnectionsComponent } from './pages/profile/view/profile-connections/profile-connections.component';
import { OmicsImageComponent } from './controls/omics-image/omics-image.component';
import { DeleteButtonComponent } from './controls/delete-button/delete-button.component';
import { DeleteAllButtonComponent } from './controls/delete-all-button/delete-all-button.component';
import {UiSwitchModule} from "../../node_modules/angular2-ui-switch";
import {OntologyService} from "./services/ontology.service";
import { FacetOmicsComponent } from './controls/facet-omics/facet-omics.component';
import { SimilarMoleculeComponent } from './pages/dataset/similar-molecule/similar-molecule.component';
import { LimitDatasetNumbersPipe } from './pipes/limit-dataset-numbers.pipe';
import { ClaimedComponent } from './pages/profile/claimed/claimed.component';
import { ProfileContactsComponent } from './pages/profile/view/profile-contacts/profile-contacts.component';
import { UpdateProfileComponent } from './pages/profile/update-profile/update-profile.component';
import { ProfileDisqusComponent } from './pages/profile/profile-disqus/profile-disqus.component';
import {FeedbackComponent} from "./controls/feedback/feedback.component";
import {FeedbackService} from "./services/feedback.service";
import {StatisticsService} from "./services/statistics.service";
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AltmetricImageComponent } from './controls/altmetric-image/altmetric-image.component';
import {AltmetricService} from "./services/altmetric.service";
import { CitationDialogComponent } from './pages/dataset/citation-dialog/citation-dialog.component';
import { AdminComponent } from './pages/admin/admin.component';
import {SelectedService} from "./services/selected.service";
import { SelectedComponent } from './pages/selected/selected.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SavedSearchComponent } from './pages/dashboard/saved-search/saved-search.component';
import { UpdateNotificationsComponent } from './pages/dashboard/update-notifications/update-notifications.component';
import {DashboardSelectedComponent} from "./pages/dashboard/selected/selected.component";
import {DashboardFeedbackComponent} from "./pages/dashboard/feedback/feedback.component";
import {SimpleNotificationsModule} from "angular2-notifications";

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
    PublicationComponent,
    SearchPagerComponent,
    SearchTotalComponent,
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
    ProfileTotalComponent,
    ProfileInfoComponent,
    ProfileCoauthorsComponent,
    ProfileConnectionsComponent,
    OmicsImageComponent,
    DeleteButtonComponent,
    DeleteAllButtonComponent,
    FacetOmicsComponent,
    SimilarMoleculeComponent,
    LimitDatasetNumbersPipe,
    ClaimedComponent,
    ProfileContactsComponent,
    UpdateProfileComponent,
    ProfileDisqusComponent,
    FeedbackComponent,
    NotfoundComponent,
    AltmetricImageComponent,
    CitationDialogComponent,
    AdminComponent,
    SelectedComponent,
    DashboardComponent,
    SavedSearchComponent,
    UpdateNotificationsComponent,
    DashboardSelectedComponent,
    DashboardFeedbackComponent
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
    NgxPaginationModule,
    TooltipModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
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
    , OntologyService
    , DatabaseListService
    , SimilarMoleculeService
    , FeedbackService
    , AppConfig
    , StatisticsService
    , AltmetricService
    , SelectedService],
  entryComponents: [
    CitationDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
