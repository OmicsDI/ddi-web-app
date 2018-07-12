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
import {ProfileControlsModule} from 'pages/dashboard/controls/profile-controls.module';
import {SimilarMoleculeComponent} from 'pages/dataset/similar-molecule/similar-molecule.component';
import {SimilarComponent} from 'pages/dataset/similar/similar.component';
import {PublicationComponent} from 'pages/dataset/publication/publication.component';
import {CitationDialogComponent} from 'pages/dataset/citation-dialog/citation-dialog.component';
import {PipesModule} from '../pipes/pipes.module';
import {NavComponent} from "pages/dashboard/nav/nav.component";
import {ClipboardModule} from "ngx-clipboard/dist";

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
        WelcomeComponent,
        SimilarMoleculeComponent,
        SimilarComponent,
        PublicationComponent,
        CitationDialogComponent,
        NavComponent
    ],
    exports: [
        CheckComponent,
        SearchQueryComponent,
        WelcomeComponent,
        SimilarMoleculeComponent,
        SimilarComponent,
        PublicationComponent,
        CitationDialogComponent,
        NavComponent
    ],
    entryComponents: [
        // ConfirmDialogComponent
          CitationDialogComponent
        // in some case dialog will not be loaded in lazy-load module,so we'd better put those component in here
    ],
})
export class PagesModule {
}
