import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from 'pages/dashboard/dashboard.component';
import {ControlsModule} from 'controls/controls.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ControlsModule,
        PagesModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {
}
