import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardupdateRoutingModule } from './dashboardupdate-routing.module';
import {DashboardUpdateComponent} from "../pages/dashboard/update/update.component";
import {NavDashboardupdateComponent} from "./nav-dashboardupdate/nav-dashboardupdate.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    DashboardupdateRoutingModule,
      FormsModule
  ],
  declarations: [
      DashboardUpdateComponent,
      NavDashboardupdateComponent
  ]
})
export class DashboardupdateModule { }
