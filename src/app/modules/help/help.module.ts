import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelpRoutingModule} from './help-routing.module';
import {ApiComponent} from '@modules/help/components/api/api.component';

@NgModule({
    imports: [
        CommonModule,
        HelpRoutingModule
    ],
    declarations: [
        ApiComponent
    ]
})
export class HelpModule {
}
