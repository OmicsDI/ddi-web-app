import {
    Directive, HostListener, ComponentRef, ViewContainerRef, Input, ComponentFactoryResolver} from '@angular/core';
import {TooltipContentComponent} from './tooltip-content.component';

@Directive({
    selector: '[appTooltip]'
})
export class TooltipDirective {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private tooltipComponent: ComponentRef<TooltipContentComponent>;
    private visible: boolean;

    // -------------------------------------------------------------------------
    // Inputs / Outputs
    // -------------------------------------------------------------------------

    @Input()
    appTooltip: string|TooltipContentComponent;

    @Input()
    tooltipDisabled: boolean;

    @Input()
    tooltipAnimation = true;

    @Input()
    tooltipPlacement: 'top'|'bottom'|'left'|'right' = 'bottom';

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private viewContainerRef: ViewContainerRef,
                private resolver: ComponentFactoryResolver) {
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    @HostListener('focusin')
    @HostListener('mouseenter')
    show(): void {
        if (this.tooltipDisabled || this.visible) {
            return;
        }

        this.visible = true;
        if (typeof this.appTooltip === 'string') {
            const factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
            if (!this.visible) {
                return;
            }

            this.tooltipComponent = this.viewContainerRef.createComponent(factory);
            this.tooltipComponent.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltipComponent.instance.content = this.appTooltip as string;
            this.tooltipComponent.instance.placement = this.tooltipPlacement;
            this.tooltipComponent.instance.animation = this.tooltipAnimation;
        } else {
            const tooltip = this.appTooltip as TooltipContentComponent;
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.tooltipPlacement;
            tooltip.animation = this.tooltipAnimation;
            tooltip.show();
        }
    }

    @HostListener('focusout')
    @HostListener('mouseleave')
    hide(): void {
        if (!this.visible) {
            return;
        }

        this.visible = false;
        if (this.tooltipComponent) {
            this.tooltipComponent.instance.tooltipInstance = this.tooltipComponent;
            this.tooltipComponent.instance.gratefulDestroy(50);
        }

        if (this.appTooltip instanceof TooltipContentComponent) {
            (this.appTooltip as TooltipContentComponent).gratefulDestroy(50);
        }
    }
}
