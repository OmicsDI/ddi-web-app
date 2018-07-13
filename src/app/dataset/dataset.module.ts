import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatasetRoutingModule} from './dataset-routing.module';
import {DatasetComponent} from 'pages/dataset/dataset.component';
import {DisqusModule} from 'ngx-disqus';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {FormsModule} from '@angular/forms';
import {UtilsModule} from 'utils/utils.module';
import {ControlsModule} from 'controls/controls.module';
import {PipesModule} from '../pipes/pipes.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
    imports: [
        CommonModule,
        DatasetRoutingModule,
        DisqusModule.forRoot('omicsdi'),
        ClipboardModule,
        FormsModule,
        UtilsModule,
        ControlsModule,
        PipesModule,
        PagesModule
    ],
    declarations: [
        DatasetComponent
    ]
})
export class DatasetModule {
}
