import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardupdateRoutingModule} from './dashboardupdate-routing.module';
import {DashboardUpdateComponent} from 'pages/dashboard/update/update.component';
import {FormsModule} from '@angular/forms';
import {ControlsModule} from 'controls/controls.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardupdateRoutingModule,
        FormsModule,
        ControlsModule,
        PagesModule
    ],
    declarations: [
        DashboardUpdateComponent
    ]
})
export class DashboardupdateModule {
}
