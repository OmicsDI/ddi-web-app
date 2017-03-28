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

import {SearchBoxComponent} from "./pages/search/search-box/search-box.component";
import {SearchResultComponent} from "./pages/search/search-result/search-result.component";
import {SearchFacetComponent} from "./pages/search/search-facet/search-facet.component";
import {AutocompleteJComponent} from "./controls/autocomplete-j/autocomplete-j.component";
import {AutocompleteNComponent} from "./controls/autocomplete-n/autocomplete-n.component";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {FacetComponent} from "./controls/facet/facet.component";
import {Ng2AutoCompleteModule} from "ng2-auto-complete";
import { SocialnetworksComponent } from './controls/socialnetworks/socialnetworks.component';
import { SimilarComponent } from './pages/dataset/similar/similar.component';
import { DisqusComponent } from './pages/dataset/disqus/disqus.component';
import { PublicationComponent } from './pages/dataset/publication/publication.component';

import { DisqusModule } from 'angular2-disqus';

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
    AutocompleteJComponent,
    AutocompleteNComponent,
    TruncatePipe,
    FacetComponent,
    SocialnetworksComponent,
    SimilarComponent,
    DisqusComponent,
    PublicationComponent
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
    DisqusModule
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
    , SimilarityService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
