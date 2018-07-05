import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardpictureRoutingModule} from './dashboardpicture-routing.module';
import {DashboardPictureComponent} from 'pages/dashboard/picture/picture.component';
import {NavDashboardpictureComponent} from './nav-dashboardpicture/nav-dashboardpicture.component';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        DashboardpictureRoutingModule,
        FormsModule,
        FileUploadModule
    ],
    declarations: [
        DashboardPictureComponent,
        NavDashboardpictureComponent
    ]
})
export class DashboardpictureModule {
}
