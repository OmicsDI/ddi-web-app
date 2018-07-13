import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardsettingsRoutingModule} from './dashboardsettings-routing.module';
import {SettingsComponent} from 'pages/dashboard/settings/settings.component';
import {ControlsModule} from 'controls/controls.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardsettingsRoutingModule,
        ControlsModule,
        PagesModule
    ],
    declarations: [
        SettingsComponent
    ]
})
export class DashboardsettingsModule {
}
