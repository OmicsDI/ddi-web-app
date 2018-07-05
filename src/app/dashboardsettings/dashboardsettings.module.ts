import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsettingsRoutingModule } from './dashboardsettings-routing.module';
import {SettingsComponent} from "../pages/dashboard/settings/settings.component";
import {NavDashboardsettingsComponent} from "./nav-dashboardsettings/nav-dashboardsettings.component";

@NgModule({
  imports: [
    CommonModule,
    DashboardsettingsRoutingModule
  ],
  declarations: [
      SettingsComponent,
      NavDashboardsettingsComponent
  ]
})
export class DashboardsettingsModule { }
