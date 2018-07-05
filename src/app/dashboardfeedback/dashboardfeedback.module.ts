import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardfeedbackRoutingModule} from './dashboardfeedback-routing.module';
import {DashboardFeedbackComponent} from 'pages/dashboard/feedback/feedback.component';
import {NavDashboardfeedbackComponent} from './nav-dashboardfeedback/nav-dashboardfeedback.component';
import {FeedbackDashboardfeedbackComponent} from './feedback-dashboardfeedback/feedback-dashboardfeedback.component';
import {DisqusModule} from 'ng2-awesome-disqus';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';

@NgModule({
    imports: [
        CommonModule,
        DashboardfeedbackRoutingModule,
        DisqusModule,
        FormsModule,
        ClipboardModule
    ],
    declarations: [
        DashboardFeedbackComponent,
        NavDashboardfeedbackComponent,
        FeedbackDashboardfeedbackComponent
    ]
})
export class DashboardfeedbackModule {
}
