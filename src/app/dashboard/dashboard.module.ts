import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {NavDashboardComponent} from "./nav-dashboard/nav-dashboard.component";
import {DatasetwidgetSmallDashboardComponent} from "./datasetwidget-small-dashboard/datasetwidget-small-dashboard.component";
import {OmicsImageDashboardComponent} from "./datasetwidget-small-dashboard/omics-image-dashboard/omics-image-dashboard.component";

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
      DashboardComponent,
      NavDashboardComponent,
      DatasetwidgetSmallDashboardComponent,
      OmicsImageDashboardComponent
  ]
})
export class DashboardModule { }
