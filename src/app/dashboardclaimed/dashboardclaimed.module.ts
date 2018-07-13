import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardclaimedRoutingModule} from './dashboardclaimed-routing.module';
import {DashboardClaimedComponent} from 'pages/dashboard/claimed/claimed.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';

import {UtilsModule} from 'utils/utils.module';
import {ControlsModule} from 'controls/controls.module';
import {ProfileControlsModule} from 'pages/dashboard/controls/profile-controls.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        DashboardclaimedRoutingModule, // for input,select.etc
        FormsModule,
        ClipboardModule,
        UtilsModule,
        ControlsModule,
        ProfileControlsModule,
        PagesModule
    ],
    declarations: [
        DashboardClaimedComponent
    ]
})
export class DashboardclaimedModule {
}
