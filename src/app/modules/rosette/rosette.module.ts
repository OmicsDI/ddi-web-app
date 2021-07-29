import {NgModule} from '@angular/core';
import {RosetteRoutingModule} from './rosette-routing.module';
import {RosetteComponent} from './components/rosette/rosette.component';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule,
        RosetteRoutingModule,
        UtilsModule
    ],
    declarations: [
        RosetteComponent
    ]
})
export class RosetteModule {
}
