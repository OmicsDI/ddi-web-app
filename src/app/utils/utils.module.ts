import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownOpenDirective} from './dropdown/dropdown-open.directive';
import {DropdownDirective} from './dropdown/dropdown.directive';
import {DropdownNotClosableZoneDirective} from './dropdown/dropdown-not-closable-zone.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DropdownNotClosableZoneDirective,
        DropdownDirective,
        DropdownOpenDirective
    ],
    exports: [
        DropdownNotClosableZoneDirective,
        DropdownDirective,
        DropdownOpenDirective
    ]
})
export class UtilsModule {
}
