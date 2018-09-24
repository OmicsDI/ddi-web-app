import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelpRoutingModule} from './help-routing.module';
import {ApiComponent} from '@modules/help/components/api/api.component';
import {UtilsModule} from '@shared/modules/utils/utils.module';

@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
        HelpRoutingModule
    ],
    declarations: [
        ApiComponent
    ]
})
export class HelpModule {
}
