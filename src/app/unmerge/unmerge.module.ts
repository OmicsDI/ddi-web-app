import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UnmergeRoutingModule} from './unmerge-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {UnmergeComponent} from 'pages/unmerge/unmerge.component';
import {MatDialogModule} from '@angular/material';
import {ControlsModule} from 'controls/controls.module';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        UnmergeRoutingModule,
        MatDialogModule,
        ControlsModule
    ],
    declarations: [
        UnmergeComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
})
export class UnmergeModule {
}
