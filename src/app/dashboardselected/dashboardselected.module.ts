import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardselectedRoutingModule} from './dashboardselected-routing.module';
import {DashboardSelectedComponent} from 'pages/dashboard/selected/selected.component';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {NgxPaginationModule} from 'ngx-pagination';
import {UtilsModule} from 'utils/utils.module';
import {ControlsModule} from 'controls/controls.module';
import {PipesModule} from '../pipes/pipes.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardselectedRoutingModule,
        NgxPaginationModule,
        FormsModule,
        ClipboardModule,
        UtilsModule,
        ControlsModule,
        PipesModule,
        PagesModule
    ],
    declarations: [
        DashboardSelectedComponent,
    ]
})
export class DashboardselectedModule {
}
