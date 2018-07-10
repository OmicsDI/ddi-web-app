import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardclaimedRoutingModule} from './dashboardclaimed-routing.module';
import {DashboardClaimedComponent} from 'pages/dashboard/claimed/claimed.component';
import {NavDashboardclaimedComponent} from './nav-dashboardclaimed/nav-dashboardclaimed.component';
import {ProfileResultDashboardclaimedComponent} from './profile-result-dashboardclaimed/profile-result-dashboardclaimed.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {DatasetwidgetDashboardclaimedComponent} from 'datasetwidget/datasetwidget-dashboardclaimed.component';
import {ScoreDashboardclaimedComponent} from 'datasetwidget/score-dashboardclaimed/score-dashboardclaimed.component';
import {OmicsImageDashboardclaimedComponent} from 'datasetwidget/omics-image-dashboardclaimed/omics-image-dashboardclaimed.component';
import {TruncateSearchPipe} from 'datasetwidget/truncate-dashboardclaimed.pipe';
import {ToDateStringSearchPipe} from 'datasetwidget/toDateString-dashboardclaimed.pipe';
import {UtilsModule} from 'utils/utils.module';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        DashboardclaimedRoutingModule, // for input,select.etc
        FormsModule,
        ClipboardModule,
        UtilsModule
    ],
    declarations: [
        DashboardClaimedComponent,
        NavDashboardclaimedComponent,
        ProfileResultDashboardclaimedComponent,
        DatasetwidgetDashboardclaimedComponent,
        ScoreDashboardclaimedComponent,
        OmicsImageDashboardclaimedComponent,

        TruncateSearchPipe,
        ToDateStringSearchPipe

    ]
})
export class DashboardclaimedModule {
}
