import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardclaimedRoutingModule } from './dashboardclaimed-routing.module';
import {DashboardClaimedComponent} from "../pages/dashboard/claimed/claimed.component";
import {NavDashboardclaimedComponent} from "./nav-dashboardclaimed/nav-dashboardclaimed.component";
import {ProfileResultDashboardclaimedComponent} from "./profile-result-dashboardclaimed/profile-result-dashboardclaimed.component";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import {ClipboardModule} from "ngx-clipboard/dist";
import {TooltipModule} from "ng2-tooltip";
import {DatasetwidgetDashboardclaimedComponent} from "./profile-result-dashboardclaimed/datasetwidget-dashboardclaimed/datasetwidget-dashboardclaimed.component";
import {ScoreDashboardclaimedComponent} from "./profile-result-dashboardclaimed/datasetwidget-dashboardclaimed/score-dashboardclaimed/score-dashboardclaimed.component";
import {OmicsImageDashboardclaimedComponent} from "./profile-result-dashboardclaimed/datasetwidget-dashboardclaimed/omics-image-dashboardclaimed/omics-image-dashboardclaimed.component";
import {TruncateSearchPipe} from 'app/dashboardclaimed/profile-result-dashboardclaimed/datasetwidget-dashboardclaimed/truncate-dashboardclaimed.pipe';
import {ToDateStringSearchPipe} from "./profile-result-dashboardclaimed/datasetwidget-dashboardclaimed/toDateString-dashboardclaimed.pipe";

@NgModule({
  imports: [
    CommonModule,
      NgxPaginationModule,
    DashboardclaimedRoutingModule, //for input,select.etc
      FormsModule,
      ClipboardModule,
      TooltipModule
  ],
  declarations: [
      DashboardClaimedComponent,
      NavDashboardclaimedComponent,
      ProfileResultDashboardclaimedComponent,
      DatasetwidgetDashboardclaimedComponent,
      ScoreDashboardclaimedComponent,
      OmicsImageDashboardclaimedComponent,

      TruncateSearchPipe,
      ToDateStringSearchPipe

  ]
})
export class DashboardclaimedModule { }
