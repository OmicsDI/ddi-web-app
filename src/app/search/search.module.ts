import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from 'pages/search/search.component';
import {InviteService} from 'services/invite.service';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatMenuModule} from '@angular/material';
import {ProfileService} from 'services/profile.service';
import {AuthHttp} from 'angular2-jwt';
import {AppModule, authHttpServiceFactory} from 'app/app.module';
import {Http, RequestOptions} from '@angular/http';
import {AuthService} from 'services/auth.service';
import {AuthGuardService} from 'services/auth-guard.service';
import {SearchService} from 'services/search.service';
import {SimilarMoleculeService} from 'services/similar-molecule.service';
import {DataSetService} from 'services/dataset.service';
import {PublicationService} from 'services/publication.service';
import {SelectedService} from 'services/selected.service';
import {AltmetricService} from 'services/altmetric.service';
import {StatisticsService} from 'services/statistics.service';
import {SimilarityService} from 'services/similarity.service';
import {EnrichmentService} from 'services/enrichment.service';
import {AppConfig} from 'app/app.config';
import {OntologyService} from 'services/ontology.service';
import {FeedbackService} from 'services/feedback.service';
import {DatabaseListService} from 'services/database-list.service';
import {DialogService} from 'services/dialog.service';
import {ScoreService} from 'services/score.service';
import {ThorService} from 'services/thor.service';

import {InviteComponent} from './invite/invite.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {TooltipModule} from 'ng2-tooltip';
import {TruncateSearchPipe} from './truncate-search.pipe';
import {ToDateStringSearchPipe} from './toDateString-search.pipe';
import {AutocompleteNSearchComponent} from './search-box-search/autocomplete-n-search/autocomplete-n-search.component';
import {SearchBoxSearchComponent} from './search-box-search/search-box-search.component';
import {QueryBuilderSearchComponent} from './search-box-search/query-builder-search/query-builder-search.component';
import {DropDownSearchComponent} from './search-box-search/query-builder-search/drop-down-search/drop-down-search.component';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {ControlsModule} from 'controls/controls.module';

@NgModule({
    imports: [
        AppModule,
        CommonModule,
        SearchRoutingModule,
        NgxPaginationModule,
        MatCheckboxModule,
        MatDialogModule,
        MatMenuModule,
        NguiAutoCompleteModule,
        ControlsModule,
        // BrowserModule,
        // for input,select.etc
        FormsModule,
        ClipboardModule,
        TooltipModule
    ],
    declarations: [
        InviteComponent,
        SearchBoxSearchComponent,
        AutocompleteNSearchComponent,
        QueryBuilderSearchComponent,
        DropDownSearchComponent,
        // pipe
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
    // entryComponents: [
    //     CitationDialogSearchComponent
    // ],
    // exports: [
    //     CitationDialogSearchComponent
    // ],
    bootstrap: [SearchComponent]
})
export class SearchModule {
}
