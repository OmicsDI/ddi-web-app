import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownOpenDirective} from './dropdown/dropdown-open.directive';
import {DropdownDirective} from './dropdown/dropdown.directive';
import {DropdownNotClosableZoneDirective} from './dropdown/dropdown-not-closable-zone.directive';
import {TooltipDirective} from './tooltip/tooltip.directive';
import {TooltipContentComponent} from './tooltip/tooltip-content.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DropdownNotClosableZoneDirective,
        DropdownDirective,
        DropdownOpenDirective,
        TooltipDirective,
        TooltipContentComponent
    ],
    exports: [
        DropdownNotClosableZoneDirective,
        DropdownDirective,
        DropdownOpenDirective,
        TooltipDirective,
        TooltipContentComponent
    ],
    entryComponents: [
        TooltipContentComponent
    ]
})
export class UtilsModule {
}
