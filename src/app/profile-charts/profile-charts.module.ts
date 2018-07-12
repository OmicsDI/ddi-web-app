import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountingDataDashboardComponent} from './counting-data-dashboard/counting-data-dashboard.component';
import {DashboardViewsCountComponent} from './counting-data-dashboard/dashboard-views-count/dashboard-views-count.component';
import {DashboardReanalisysCountComponent} from './counting-data-dashboard/dashboard-reanalisys-count/dashboard-reanalisys-count.component';
import {DashboardConnectionsCountComponent} from './counting-data-dashboard/dashboard-connections-count/dashboard-connections-count.component';
import {DashboardClaimCountComponent} from './counting-data-dashboard/dashboard-claim-count/dashboard-claim-count.component';
import {DashboardCitationsCountComponent} from './counting-data-dashboard/dashboard-citations-count/dashboard-citations-count.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      NgxPaginationModule
  ],
  declarations: [
      CountingDataDashboardComponent,
      DashboardViewsCountComponent,
      DashboardReanalisysCountComponent,
      DashboardConnectionsCountComponent,
      DashboardClaimCountComponent,
      DashboardCitationsCountComponent
  ],
    exports: [
        CountingDataDashboardComponent,
        DashboardViewsCountComponent,
        DashboardReanalisysCountComponent,
        DashboardConnectionsCountComponent,
        DashboardClaimCountComponent,
        DashboardCitationsCountComponent
    ]
})
export class ProfileChartsModule { }
