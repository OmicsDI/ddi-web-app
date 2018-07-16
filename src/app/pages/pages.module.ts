import {NgModule} from '@angular/core';
import {SearchQueryComponent} from 'pages/search/search-query/search-query.component';
import {CheckComponent} from 'pages/check/check.component';
import {WelcomeComponent} from 'pages/welcome/welcome.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ControlsModule} from 'controls/controls.module';
import {RouterModule} from '@angular/router';
import {MatCheckboxModule} from '@angular/material';
import {UtilsModule} from 'utils/utils.module';
import {PipesModule} from '../pipes/pipes.module';
import {ClipboardModule} from 'ngx-clipboard/dist';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        ControlsModule,
        RouterModule,
        UtilsModule,
        PipesModule,
        ClipboardModule
    ],
    declarations: [
        CheckComponent,
        SearchQueryComponent,
        WelcomeComponent
    ],
    exports: [
        CheckComponent,
        SearchQueryComponent,
        WelcomeComponent
    ]
})
export class PagesModule {
}
