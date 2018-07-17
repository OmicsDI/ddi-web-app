import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TruncatePipe} from './truncate.pipe';
import {ToDateStringPipe} from './toDateString.pipe';
import {MegaNumberPipe} from './mega-number.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TruncatePipe,
        ToDateStringPipe,
        MegaNumberPipe
    ],
    exports: [
        TruncatePipe,
        ToDateStringPipe,
        MegaNumberPipe
    ]
})
export class PipesModule {
}
