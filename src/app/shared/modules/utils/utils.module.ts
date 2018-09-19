import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipDirective} from './tooltip/tooltip.directive';
import {TooltipContentComponent} from './tooltip/tooltip-content.component';
import {IsLoggedDirective} from '@shared/directives/is-logged.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TooltipDirective,
        IsLoggedDirective,
        TooltipContentComponent
    ],
    exports: [
        TooltipDirective,
        TooltipContentComponent,
        IsLoggedDirective
    ],
    entryComponents: [
        TooltipContentComponent
    ]
})
export class UtilsModule {
}
