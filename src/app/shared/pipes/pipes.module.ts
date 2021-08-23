import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TruncatePipe} from './truncate.pipe';
import {ToDateStringPipe} from './toDateString.pipe';
import {MegaNumberPipe} from './mega-number.pipe';
import {KeepHtmlPipe} from '@shared/pipes/keep-html.pipe';
import {FilterArrayPipe} from '@shared/pipes/filterarray.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TruncatePipe,
        ToDateStringPipe,
        KeepHtmlPipe,
        MegaNumberPipe,
        FilterArrayPipe
    ],
    exports: [
        TruncatePipe,
        KeepHtmlPipe,
        ToDateStringPipe,
        MegaNumberPipe,
        FilterArrayPipe
    ]
})
export class PipesModule {
}
