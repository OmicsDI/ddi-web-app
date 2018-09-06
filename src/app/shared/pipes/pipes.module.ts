import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TruncatePipe} from './truncate.pipe';
import {ToDateStringPipe} from './toDateString.pipe';
import {MegaNumberPipe} from './mega-number.pipe';
import {KeepHtmlPipe} from '@shared/pipes/keep-html.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TruncatePipe,
        ToDateStringPipe,
        KeepHtmlPipe,
        MegaNumberPipe
    ],
    exports: [
        TruncatePipe,
        KeepHtmlPipe,
        ToDateStringPipe,
        MegaNumberPipe
    ]
})
export class PipesModule {
}
