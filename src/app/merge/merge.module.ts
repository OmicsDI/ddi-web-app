import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MergeRoutingModule} from './merge-routing.module';
import {MergeComponent} from 'pages/merge/merge.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatDialogModule} from '@angular/material';
import {ControlsModule} from 'controls/controls.module';
import {AuthGuardService} from 'services/auth-guard.service';

@NgModule({
    imports: [
        CommonModule,
        MergeRoutingModule,
        NgxPaginationModule,
        MatDialogModule,
        ControlsModule
    ],
    declarations: [
        MergeComponent
    ],
    entryComponents: [
    ],
    providers: [
        AuthGuardService
    ],
    bootstrap: [MergeComponent]
})
export class MergeModule {
}
