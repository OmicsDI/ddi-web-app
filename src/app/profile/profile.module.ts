import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from 'pages/profile/profile.component';
import {ProfileInfoProfileComponent} from './profile-info-profile/profile-info-profile.component';
import {CountingDataDashboardProfileComponent} from './counting-data-dashboard-profile/counting-data-dashboard-profile.component';
import {DatasetWidgetProfileComponent} from './datasetwidget-profile/datasetwidget-profile.component';
import {DashboardCitationsCountProfileComponent} from 'profile-dashboard/dashboard-citations-count-profile.component';
import {DashboardClaimCountProfileComponent} from 'profile-dashboard/dashboard-claim-count-profile.component';
import {DashboardConnectionsCountProfileComponent} from 'profile-dashboard/dashboard-connections-count-profile.component';
import {DashboardReanalisysCountProfileComponent} from 'profile-dashboard/dashboard-reanalisys-count-profile.component';
import {DashboardViewsCountProfileComponent} from 'profile-dashboard/dashboard-views-count-profile.component';
import {OmicsImageDatasetwidgetProfileComponent} from 'profile-dashboard/omics-image-datasetwidget-profile.component';
import {ScoreDatasetwidgetProfileComponent} from 'profile-dashboard/score-datasetwidget-profile.component';
import {ProfileContactsProfileComponent} from './profile-contacts-profile/profile-contacts-profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {TruncateProfilePipe} from './truncate-profile.pipe';
import {ToDateStringProfilePipe} from './toDateString-profile.pipe';
import {UtilsModule} from 'utils/utils.module';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,

        NgxPaginationModule,
        // BrowserModule,
        // for input,select.etc
        FormsModule,
        ClipboardModule,
        UtilsModule
    ],
    declarations: [
        ProfileComponent,
        ProfileInfoProfileComponent,
        CountingDataDashboardProfileComponent,
        DashboardCitationsCountProfileComponent,
        DashboardClaimCountProfileComponent,
        DashboardConnectionsCountProfileComponent,
        DashboardReanalisysCountProfileComponent,
        DashboardViewsCountProfileComponent,


        DatasetWidgetProfileComponent,
        OmicsImageDatasetwidgetProfileComponent,
        ScoreDatasetwidgetProfileComponent,
        ProfileContactsProfileComponent,


        // pipe
        TruncateProfilePipe,
        ToDateStringProfilePipe
    ],
    bootstrap: [ProfileComponent]
})
export class ProfileModule {
}
