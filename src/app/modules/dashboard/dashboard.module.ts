import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {DashboardClaimedComponent} from '@modules/dashboard/components/claimed/claimed.component';
import {DashboardFeedbackComponent} from '@modules/dashboard/components/feedback/feedback.component';
import {DashboardSelectedComponent} from '@modules/dashboard/components/selected/selected.component';
import {DashboardProfileComponent} from '@modules/dashboard/components/profile/profile.component';
import {SettingsComponent} from '@modules/dashboard/components/settings/settings.component';
import {DashboardUpdateComponent} from '@modules/dashboard/components/update/update.component';
import {DashboardComponent} from '@modules/dashboard/components/dashboard/dashboard.component';
import {ProfileControlsModule} from '@modules/profile-controls/profile-controls.module';
import {ProfileChartsModule} from '@modules/profile-charts/profile-charts.module';
import {QuillModule} from 'ngx-quill';
import {NavComponent} from '@modules/dashboard/components/nav/nav.component';
import {MergeComponent} from '@modules/dashboard/components/merge/merge.component';
import {OnlyAdminDirective} from '@shared/directives/only-admin.directive';
import {UnmergeComponent} from '@modules/dashboard/components/unmerge/unmerge.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ModalModule} from 'ngx-bootstrap';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatSlideToggleModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        QuillModule,
        DashboardRoutingModule,
        ControlsModule,
        ProfileControlsModule,
        ProfileChartsModule,
        ModalModule.forRoot(),
        FormsModule,
        ClipboardModule,
        UtilsModule,
        NgxPaginationModule,
        ImageCropperModule,
        CollapseModule.forRoot(),
        MatSlideToggleModule
    ],
    declarations: [
        DashboardComponent,
        DashboardClaimedComponent,
        DashboardFeedbackComponent,
        DashboardProfileComponent,
        DashboardSelectedComponent,
        SettingsComponent,
        DashboardUpdateComponent,
        NavComponent,
        MergeComponent,
        UnmergeComponent,
        OnlyAdminDirective
    ]
})
export class DashboardModule {
}
