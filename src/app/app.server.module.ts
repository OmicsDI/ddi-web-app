import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {environment} from '../environments/environment';
import { AppModule } from './app.module';
import {AppComponent} from '@shared/components/app/app.component';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import {TRANSFER_RESPONSE_BASE_URLS} from '@shared/modules/angular-transfer-http-response/transfer-http-response.module';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
      BrowserModule.withServerTransition({ appId: 'serverApp' }),
      AppModule,
      ServerModule,
      ModuleMapLoaderModule,
      ServerTransferStateModule,
  ],
    providers: [{
        provide: TRANSFER_RESPONSE_BASE_URLS,
        useValue: [environment.webServiceUrl]
    }],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
