import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardpictureRoutingModule} from './dashboardpicture-routing.module';
import {DashboardPictureComponent} from 'pages/dashboard/picture/picture.component';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import {ControlsModule} from 'controls/controls.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardpictureRoutingModule,
        FormsModule,
        FileUploadModule,
        ControlsModule,
        PagesModule
    ],
    declarations: [
        DashboardPictureComponent
    ]
})
export class DashboardpictureModule {
}
