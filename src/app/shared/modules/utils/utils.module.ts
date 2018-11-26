import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipDirective} from './tooltip/tooltip.directive';
import {TooltipContentComponent} from './tooltip/tooltip-content.component';
import {IsLoggedDirective} from '@shared/directives/is-logged.directive';
import {PieChartDirective} from '@shared/directives/pie-chart.directive';
import {TransferHttpResponseModule} from '@shared/modules/angular-transfer-http-response/transfer-http-response.module';

@NgModule({
    imports: [
        CommonModule,
        TransferHttpResponseModule
    ],
    declarations: [
        TooltipDirective,
        IsLoggedDirective,
        PieChartDirective,
        TooltipContentComponent
    ],
    exports: [
        TooltipDirective,
        TooltipContentComponent,
        PieChartDirective,
        IsLoggedDirective
    ],
    entryComponents: [
        TooltipContentComponent
    ]
})
export class UtilsModule {
}
