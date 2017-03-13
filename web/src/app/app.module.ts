import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginLauncherComponent } from './login-launcher/login-launcher.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DatabaseComponent } from './database/database.component';
import { AboutComponent } from './about/about.component';
import {routing} from "./app.routes";
import {MaterialModule} from "@angular/material";

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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
