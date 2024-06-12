import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {PipesModule} from '@shared/pipes/pipes.module';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {SearchComponent} from './components/search/search.component';
import {SearchTotalComponent} from './components/search-total/search-total.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {SearchPagerComponent} from './components/search-pager/search-pager.component';
import {ModalModule} from 'ngx-bootstrap';
import {MatSelectModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        SearchRoutingModule,
        ControlsModule,
        PipesModule,
        FormsModule,
        ClipboardModule,
        UtilsModule,
        ModalModule.forRoot(),
        NgxPaginationModule,
        MatSelectModule
    ],
    declarations: [
        SearchComponent,
        SearchTotalComponent,
        SearchResultComponent,
        SearchPagerComponent
    ]
})
export class SearchModule {
}
