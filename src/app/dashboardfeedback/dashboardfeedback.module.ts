import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardfeedbackRoutingModule} from './dashboardfeedback-routing.module';
import {DashboardFeedbackComponent} from 'pages/dashboard/feedback/feedback.component';
import {DisqusModule} from 'ngx-disqus';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {ControlsModule} from 'controls/controls.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardfeedbackRoutingModule,
        DisqusModule.forRoot('omicsdi'),
        FormsModule,
        ClipboardModule,
        ControlsModule,
        PagesModule
    ],
    declarations: [
        DashboardFeedbackComponent
    ]
})
export class DashboardfeedbackModule {
}
