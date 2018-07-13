import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from 'pages/about/about.component';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutingModule
    ],
    declarations: [
        AboutComponent
    ],
    bootstrap: [AboutComponent]
})
export class AboutModule {
}
