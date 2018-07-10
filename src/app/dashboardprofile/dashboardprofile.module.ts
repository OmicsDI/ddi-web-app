import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardprofileRoutingModule} from './dashboardprofile-routing.module';
import {DashboardProfileComponent} from 'pages/dashboard/profile/profile.component';
import {DashboardProfileAnnualOmicstypeComponent} from 'dashboard-profile-annual-omicstype/dashboard-profile-annual-omicstype.component';
import {CountingDataDashboardComponent} from 'cd-dashboard/counting-data-dashboard.component';
import {DashboardViewsCountComponent} from 'cd-dashboard/dashboard-views-count/dashboard-views-count.component';
import {DashboardReanalisysCountComponent} from 'cd-dashboard/dashboard-reanalisys-count/dashboard-reanalisys-count.component';
import {DashboardConnectionsCountComponent} from 'cd-dashboard/dashboard-connections-count/dashboard-connections-count.component';
import {DashboardClaimCountComponent} from 'cd-dashboard/dashboard-claim-count/dashboard-claim-count.component';
import {DashboardCitationsCountComponent} from 'cd-dashboard/dashboard-citations-count/dashboard-citations-count.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {NavComponent} from 'pages/dashboard/nav/nav.component';
import {ProfileInfoComponent} from 'pages/dashboard/controls/profile-info/profile-info.component';
import {ProfileResultComponent} from 'pages/dashboard/controls/profile-result/profile-result.component';
import {ProfileContactsComponent} from 'pages/dashboard/controls/profile-contacts/profile-contacts.component';
import {ProfileConnectionsComponent} from 'pages/dashboard/controls/profile-connections/profile-connections.component';
import {ClaimOrcidComponent} from 'pages/dashboard/controls/claim-orcid/claim-orcid.component';
import {DatasetwidgetDashboardprofileComponent} from './datasetwidget-dashboardprofile/datasetwidget-dashboardprofile.component';
import {OmicsImageDashboardprofileComponent} from './omics-image-dashboardprofile/omics-image-dashboardprofile.component';
import {ScoreDashboardprofileComponent} from './score-dashboardprofile/score-dashboardprofile.component';
import {UiSwitchModule} from 'angular2-ui-switch';
import {TruncateDashboardprofilePipe} from './truncate-dashboardprofile.pipe';
import {ToDateStringDashboardProfilePipe} from './toDateStringDashboardProfile.pipe';
import {UtilsModule} from 'utils/utils.module';

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
        UtilsModule
    ],
    declarations: [
        DashboardProfileComponent,
        DashboardProfileAnnualOmicstypeComponent,
        CountingDataDashboardComponent,
        DashboardViewsCountComponent,
        DashboardReanalisysCountComponent,
        DashboardConnectionsCountComponent,
        DashboardClaimCountComponent,
        DashboardCitationsCountComponent,
        NavComponent,
        ProfileInfoComponent,
        ProfileResultComponent,
        ProfileContactsComponent,
        ProfileConnectionsComponent,
        ClaimOrcidComponent,
        DatasetwidgetDashboardprofileComponent,
        OmicsImageDashboardprofileComponent,
        ScoreDashboardprofileComponent,


        // pipe
        TruncateDashboardprofilePipe,
        ToDateStringDashboardProfilePipe


    ],
})
export class DashboardprofileModule {
}
