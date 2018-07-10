import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[appDropdownNotClosableZoneDirective]'
})
export class DropdownNotClosableZoneDirective {

    @Input()
    dropdownNotClosabledZoneDirective: boolean;

    constructor(private elementRef: ElementRef) {
    }

    contains(element: HTMLElement) {
        if (this.dropdownNotClosabledZoneDirective === false) {
            return false;
        }

        const thisElement: HTMLElement = this.elementRef.nativeElement;
        return thisElement.contains(element);
    }
}
