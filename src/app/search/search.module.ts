import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import {SearchFacetComponent} from "../pages/search/search-facet/search-facet.component";
import {SearchPagerComponent} from "../pages/search/search-pager/search-pager.component";
import {SearchQueryComponent} from "../pages/search/search-query/search-query.component";
import {SearchResultComponent} from "../pages/search/search-result/search-result.component";
import {SearchTotalComponent} from "../pages/search/search-total/search-total.component";
import {SearchComponent} from "../pages/search/search.component";
import {FeedbackComponent} from "../controls/feedback/feedback.component";
import {FacetOmicsComponent} from "../controls/facet-omics/facet-omics.component";
import {FacetComponent} from "../controls/facet/facet.component";
import {ScoreComponent} from "../controls/score/score.component";
import {OmicsImageComponent} from "../controls/omics-image/omics-image.component";
import {ConfirmDialogComponent} from "../controls/confirm-dialog/confirm-dialog.component";
import {InviteService} from "../services/invite.service";
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatMenuModule} from "@angular/material";
import {ProfileService} from "../services/profile.service";
import {AuthHttp} from "angular2-jwt";
import {authHttpServiceFactory} from "../app.module";
import {Http, RequestOptions} from "@angular/http";
import {AuthService} from "../services/auth.service";
import {AuthGuardService} from "../services/auth-guard.service";
import {SearchService} from "../services/search.service";
import {SimilarMoleculeService} from "../services/similar-molecule.service";
import {DataSetService} from "../services/dataset.service";
import {PublicationService} from "../services/publication.service";
import {SelectedService} from "../services/selected.service";
import {AltmetricService} from "../services/altmetric.service";
import {StatisticsService} from "../services/statistics.service";
import {SimilarityService} from "../services/similarity.service";
import {EnrichmentService} from "../services/enrichment.service";
import {AppConfig} from "../app.config";
import {OntologyService} from "../services/ontology.service";
import {FeedbackService} from "../services/feedback.service";
import {DatabaseListService} from "../services/database-list.service";
import {DialogService} from "../services/dialog.service";
import {ScoreService} from "../services/score.service";
import {ThorService} from "../services/thor.service";
import {DatasetWidgetComponent} from "../controls/datasetwidget/datasetwidget.component";

import {InviteComponent} from "./invite/invite.component";
import {AutocompleteNComponent} from "../controls/autocomplete-n/autocomplete-n.component";
import {QueryBuilderComponent} from "../controls/query-builder/query-builder.component";
import {OmicsImageSearchComponent} from "./datasetwidget-search/omics-image/omics-image-search.component";
import {NgxPaginationModule} from "ngx-pagination";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {ClipboardModule} from "ngx-clipboard/dist";
import {TruncatePipe} from "../pipes/truncate.pipe";
import {ToDateStringPipe} from "../pipes/toDateString.pipe";
import {TooltipModule} from "ng2-tooltip";
import {TruncateSearchPipe} from "./truncate-search.pipe";
import {ToDateStringSearchPipe} from "./toDateString-search.pipe";
import {ScoreSearchComponent} from "./datasetwidget-search/score-search/score-search.component";
import {DatasetwidgetSearchComponent} from "./datasetwidget-search/datasetwidget-search.component";
import {CitationDialogSearchComponent} from "./citation-dialog-search/citation-dialog-search.component";
import {CitationDialogComponent} from "../pages/dataset/citation-dialog/citation-dialog.component";
import {SearchBoxComponent} from "../controls/search-box/search-box.component";
import {AutocompleteNSearchComponent} from "./search-box-search/autocomplete-n-search/autocomplete-n-search.component";
import {SearchBoxSearchComponent} from "./search-box-search/search-box-search.component";
import {QueryBuilderSearchComponent} from "./search-box-search/query-builder-search/query-builder-search.component";
import {DropDownSearchComponent} from "./search-box-search/query-builder-search/drop-down-search/drop-down-search.component";
import {NguiAutoCompleteModule} from "@ngui/auto-complete";

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
      NgxPaginationModule,
      MatCheckboxModule,
      MatDialogModule,
      MatMenuModule,
      NguiAutoCompleteModule,
      // BrowserModule,
      //for input,select.etc
      FormsModule,
      ClipboardModule,
      TooltipModule
  ],
  declarations: [
      SearchComponent,
    SearchFacetComponent,
      SearchPagerComponent,
      SearchQueryComponent,
      SearchResultComponent,
      SearchTotalComponent,
      FeedbackComponent,
      FacetOmicsComponent,
      FacetComponent,
      DatasetwidgetSearchComponent,
      ScoreComponent,
      OmicsImageSearchComponent,
      CitationDialogComponent,
      ScoreSearchComponent,
      InviteComponent,
      SearchBoxSearchComponent,
      AutocompleteNSearchComponent,
      QueryBuilderSearchComponent,
      DropDownSearchComponent,
      //pipe
      TruncateSearchPipe,
      ToDateStringSearchPipe
  ],
    providers: [ProfileService
        , {  
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [Http, RequestOptions]
        }
        , AuthService
        , AuthGuardService
        , SearchService
        , DataSetService
        , PublicationService
        , SimilarityService
        , EnrichmentService
        , OntologyService
        , DatabaseListService
        , SimilarMoleculeService
        , FeedbackService
        , AppConfig
        , StatisticsService
        , AltmetricService
        , SelectedService
        , DialogService
        , ScoreService
        , ThorService
        , MatDialogModule
        , MatMenuModule
        , MatButtonModule
        , InviteService],
    entryComponents: [
        CitationDialogComponent
    ],
    // exports: [
    //     CitationDialogSearchComponent
    // ],
    bootstrap: [SearchComponent]
})
export class SearchModule { }
