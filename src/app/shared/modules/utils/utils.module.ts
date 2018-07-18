import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipDirective} from './tooltip/tooltip.directive';
import {TooltipContentComponent} from './tooltip/tooltip-content.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TooltipDirective,
        TooltipContentComponent
    ],
    exports: [
        TooltipDirective,
        TooltipContentComponent
    ],
    entryComponents: [
        TooltipContentComponent
    ]
})
export class UtilsModule {
}
