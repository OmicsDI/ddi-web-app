import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelpRoutingModule} from './help-routing.module';
import {AboutComponent} from '@modules/help/components/about/about.component';

@NgModule({
    imports: [
        CommonModule,
        HelpRoutingModule
    ],
    declarations: [
        AboutComponent
    ],
    bootstrap: [AboutComponent]
})
export class HelpModule {
}
