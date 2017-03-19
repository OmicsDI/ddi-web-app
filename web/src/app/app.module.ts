import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http, RequestOptions} from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginLauncherComponent } from './login-launcher/login-launcher.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DatabaseComponent } from './database/database.component';
import { AboutComponent } from './about/about.component';
import {routing} from "./app.routes";
import {MaterialModule} from "@angular/material";
import {ProfileService} from "./profile.service";
import { AUTH_PROVIDERS, AuthHttp, AuthConfig } from 'angular2-jwt';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth-guard.service";
import { Routes, RouterModule } from '@angular/router';

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
    ProfileComponent,
    DatabaseComponent,
    ProfileComponent,
    AboutComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    routing,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [ProfileService
    ,{provide: AuthHttp,
     useFactory: authHttpServiceFactory,
     deps: [Http, RequestOptions]}
    , AuthService
    , AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

}
