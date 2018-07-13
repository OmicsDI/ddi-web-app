import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardprofileRoutingModule} from './dashboardprofile-routing.module';
import {DashboardProfileComponent} from 'pages/dashboard/profile/profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UiSwitchModule} from 'angular2-ui-switch';
import {UtilsModule} from 'utils/utils.module';
import {ProfileChartsModule} from '../profile-charts/profile-charts.module';
import {ControlsModule} from 'controls/controls.module';
import {ProfileControlsModule} from 'pages/dashboard/controls/profile-controls.module';
import {PipesModule} from '../pipes/pipes.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardprofileRoutingModule,
        NgxPaginationModule,
        UiSwitchModule,
        // BrowserModule,
        // for input,select.etc
        FormsModule,
        ClipboardModule,
        UtilsModule,
        ProfileChartsModule,
        ControlsModule,
        ProfileControlsModule,
        PipesModule,
        PagesModule
    ],
    declarations: [
        DashboardProfileComponent,
    ],
})
export class DashboardprofileModule {
}
