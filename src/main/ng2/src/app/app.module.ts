import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginLauncherComponent } from './login-launcher/login-launcher.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {ProfileService} from "./profile.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginLauncherComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent],
  entryComponents: [LoginDialogComponent]
})
export class AppModule { }
