import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {DisqusModule} from 'ngx-disqus';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {UiSwitchModule} from 'angular2-ui-switch';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UtilsModule} from '@shared/modules/utils/utils.module';
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
import {ProfileChartsModule} from '@modules/profile-charts/profile-charts.module';
import {NgxEditorModule} from 'ngx-editor';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgxEditorModule,
        DashboardRoutingModule,
        ControlsModule,
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
    ]
})
export class DashboardModule {
}
