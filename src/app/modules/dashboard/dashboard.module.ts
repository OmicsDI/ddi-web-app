import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {ControlsModule} from 'controls/controls.module';
import {PagesModule} from 'pages/pages.module';
import {DisqusModule} from 'ngx-disqus';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {UiSwitchModule} from 'angular2-ui-switch';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UtilsModule} from 'utils/utils.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {DashboardClaimedComponent} from '@modules/dashboard/components/claimed/claimed.component';
import {DashboardFeedbackComponent} from '@modules/dashboard/components/feedback/feedback.component';
import {DashboardSelectedComponent} from '@modules/dashboard/components/selected/selected.component';
import {DashboardProfileComponent} from '@modules/dashboard/components/profile/profile.component';
import {DashboardPictureComponent} from '@modules/dashboard/components/picture/picture.component';
import {SettingsComponent} from '@modules/dashboard/components/settings/settings.component';
import {DashboardUpdateComponent} from '@modules/dashboard/components/update/update.component';
import {DashboardComponent} from '@modules/dashboard/components/dashboard/dashboard.component';
import {ProfileControlsModule} from '@modules/profile-controls/profile-controls.module';
import {NavComponent} from '@modules/dashboard/components/nav/nav.component';
import {ProfileChartsModule} from '@modules/profile-charts/profile-charts.module';

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
        DashboardUpdateComponent,
        NavComponent
    ]
})
export class DashboardModule {
}
