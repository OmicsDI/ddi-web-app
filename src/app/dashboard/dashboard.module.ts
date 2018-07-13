import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from 'pages/dashboard/dashboard.component';
import {ControlsModule} from 'controls/controls.module';
import {PagesModule} from 'pages/pages.module';
import {ProfileControlsModule} from 'pages/dashboard/controls/profile-controls.module';
import {ProfileChartsModule} from '../profile-charts/profile-charts.module';
import {DisqusModule} from 'ngx-disqus';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {UiSwitchModule} from 'angular2-ui-switch';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UtilsModule} from 'utils/utils.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {DashboardClaimedComponent} from 'pages/dashboard/claimed/claimed.component';
import {DashboardFeedbackComponent} from 'pages/dashboard/feedback/feedback.component';
import {DashboardSelectedComponent} from 'pages/dashboard/selected/selected.component';
import {DashboardProfileComponent} from 'pages/dashboard/profile/profile.component';
import {DashboardPictureComponent} from 'pages/dashboard/picture/picture.component';
import {SettingsComponent} from 'pages/dashboard/settings/settings.component';
import {DashboardUpdateComponent} from 'pages/dashboard/update/update.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ControlsModule,
        PagesModule,
        ProfileControlsModule,
        ProfileChartsModule,
        DisqusModule.forRoot('omicsdi'),
        FileUploadModule,
        FormsModule,
        UiSwitchModule,
        ClipboardModule,
        UtilsModule,
        NgxPaginationModule
    ],
    declarations: [
        DashboardComponent,
        DashboardClaimedComponent,
        DashboardFeedbackComponent,
        DashboardPictureComponent,
        DashboardProfileComponent,
        DashboardSelectedComponent,
        SettingsComponent,
        DashboardUpdateComponent
    ]
})
export class DashboardModule {
}
