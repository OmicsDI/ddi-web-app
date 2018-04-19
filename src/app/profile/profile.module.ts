import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from "../pages/profile/profile.component";
import {ProfileInfoProfileComponent} from "./profile-info-profile/profile-info-profile.component";
import {CountingDataDashboardProfileComponent} from "./counting-data-dashboard-profile/counting-data-dashboard-profile.component";
import {DatasetWidgetProfileComponent} from "./datasetwidget-profile/datasetwidget-profile.component";
import {DashboardCitationsCountProfileComponent} from "./counting-data-dashboard-profile/dashboard-citations-count-profile/dashboard-citations-count-profile.component";
import {DashboardClaimCountProfileComponent} from "./counting-data-dashboard-profile/dashboard-claim-count-profile/dashboard-claim-count-profile.component";
import {DashboardConnectionsCountProfileComponent} from "./counting-data-dashboard-profile/dashboard-connections-count-profile/dashboard-connections-count-profile.component";
import {DashboardReanalisysCountProfileComponent} from "./counting-data-dashboard-profile/dashboard-reanalisys-count-profile/dashboard-reanalisys-count-profile.component";
import {DashboardViewsCountProfileComponent} from "./counting-data-dashboard-profile/dashboard-views-count-profile/dashboard-views-count-profile.component";
import {OmicsImageDatasetwidgetProfileComponent} from "./datasetwidget-profile/omics-image-datasetwidget-profile/omics-image-datasetwidget-profile.component";
import {ScoreDatasetwidgetProfileComponent} from "./datasetwidget-profile/score-datasetwidget-profile/score-datasetwidget-profile.component";
import {ProfileContactsProfileComponent} from "./profile-contacts-profile/profile-contacts-profile.component";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {ClipboardModule} from "ngx-clipboard/dist";
import {TooltipModule} from "ng2-tooltip";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {ToDateStringPipe} from "../pipes/toDateString.pipe";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,

      NgxPaginationModule,
      // BrowserModule,
      //for input,select.etc
      FormsModule,
      ClipboardModule,
      TooltipModule,
  ],
  declarations: [
      ProfileComponent,
      ProfileInfoProfileComponent,
      CountingDataDashboardProfileComponent,
      DashboardCitationsCountProfileComponent,
      DashboardClaimCountProfileComponent,
      DashboardConnectionsCountProfileComponent,
      DashboardReanalisysCountProfileComponent,
      DashboardViewsCountProfileComponent,



      DatasetWidgetProfileComponent,
      OmicsImageDatasetwidgetProfileComponent,
      ScoreDatasetwidgetProfileComponent,
      ProfileContactsProfileComponent,



      //pipe
      TruncatePipe,
      ToDateStringPipe
  ]
})
export class ProfileModule { }
