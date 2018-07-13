import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import {ControlsModule} from 'controls/controls.module';
import {PipesModule} from '../pipes/pipes.module';
import {PagesModule} from 'pages/pages.module';
import {DisqusModule} from 'ngx-disqus';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UtilsModule} from 'utils/utils.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {SearchComponent} from 'pages/search/search.component';
import {SearchTotalComponent} from 'pages/search/search-total/search-total.component';
import {SearchResultComponent} from 'pages/search/search-result/search-result.component';
import {SearchPagerComponent} from 'pages/search/search-pager/search-pager.component';
import {SearchFacetComponent} from 'pages/search/search-facet/search-facet.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
      ControlsModule,
      PipesModule,
      PagesModule,
      DisqusModule.forRoot('omicsdi'),
      FormsModule,
      ClipboardModule,
      UtilsModule,
      NgxPaginationModule
  ],
  declarations: [
      SearchComponent,
      SearchTotalComponent,
      SearchResultComponent,
      SearchPagerComponent,
      SearchFacetComponent
  ]
})
export class SearchModule { }
