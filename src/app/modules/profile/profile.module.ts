import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './components/profile/profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {PipesModule} from '@shared/pipes/pipes.module';
import {ProfileControlsModule} from '@modules/profile-controls/profile-controls.module';
import {ProfileChartsModule} from '@modules/profile-charts/profile-charts.module';
import {DisqusModule} from 'ngx-disqus';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        DisqusModule.forRoot('omicsdi'),
        NgxPaginationModule,
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
