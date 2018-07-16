import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './components/profile/profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UtilsModule} from 'utils/utils.module';
import {ControlsModule} from 'controls/controls.module';
import {PipesModule} from '../../pipes/pipes.module';
import {ProfileControlsModule} from '@modules/profile-controls/profile-controls.module';
import {ProfileChartsModule} from '@modules/profile-charts/profile-charts.module';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        NgxPaginationModule,
        // BrowserModule,
        // for input,select.etc
        FormsModule,
        ClipboardModule,
        UtilsModule,
        ProfileChartsModule,
        ProfileControlsModule,
        ControlsModule,
        PipesModule
    ],
    declarations: [
        ProfileComponent,
    ],
    bootstrap: [ProfileComponent]
})
export class ProfileModule {
}
