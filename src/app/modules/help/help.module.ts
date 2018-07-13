import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelpRoutingModule} from './help-routing.module';
import {AboutComponent} from '@modules/help/components/about/about.component';
import {ApiComponent} from '@modules/help/components/api/api.component';

@NgModule({
    imports: [
        CommonModule,
        HelpRoutingModule
    ],
    declarations: [
        AboutComponent,
        ApiComponent
    ]
})
export class HelpModule {
}
