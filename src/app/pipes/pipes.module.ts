import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TruncatePipe} from './truncate.pipe';
import {ToDateStringPipe} from './toDateString.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TruncatePipe,
        ToDateStringPipe
    ],
    exports: [
        TruncatePipe,
        ToDateStringPipe
    ]
})
export class PipesModule {
}
