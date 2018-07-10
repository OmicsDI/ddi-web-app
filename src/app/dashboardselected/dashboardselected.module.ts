import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardselectedRoutingModule} from './dashboardselected-routing.module';
import {DashboardSelectedComponent} from 'pages/dashboard/selected/selected.component';
import {NavDashboardselectedComponent} from './nav-dashboardselected/nav-dashboardselected.component';
import {DatasetwidgetDatasetselectedComponent} from './datasetwidget-datasetselected/datasetwidget-datasetselected.component';
import {ScoreDatasetselectedComponent} from './datasetwidget-datasetselected/score-datasetselected/score-datasetselected.component';
import {OmicsImageSearchDatasetselectedComponent} from 'omics-image-datasetselected/omics-image-search-datasetselected.component';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {NgxPaginationModule} from 'ngx-pagination';
import {TooltipModule} from 'ng2-tooltip';
import {TruncateDashboardselectedPipe} from './truncate-dashboardselected.pipe';
import {ToDateStringDashboardselectedPipe} from './toDateString-dashboardselected.pipe';

@NgModule({
    imports: [
        CommonModule,
        DashboardselectedRoutingModule,
        NgxPaginationModule,
        FormsModule,
        ClipboardModule,
        TooltipModule
    ],
    declarations: [
        DashboardSelectedComponent,
        NavDashboardselectedComponent,
        DatasetwidgetDatasetselectedComponent,
        ScoreDatasetselectedComponent,
        OmicsImageSearchDatasetselectedComponent,

        // pipe
        TruncateDashboardselectedPipe,
        ToDateStringDashboardselectedPipe
    ]
})
export class DashboardselectedModule {
}
