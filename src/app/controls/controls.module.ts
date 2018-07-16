import {NgModule} from '@angular/core';
import {ConfirmDialogComponent} from 'controls/confirm-dialog/confirm-dialog.component';
import {AltmetricImageComponent} from 'controls/altmetric-image/altmetric-image.component';
import {AnnotatedTextComponent} from 'controls/annotated-text/annotated-text.component';
import {ClaimAllButtonComponent} from 'controls/claim-all-button/claim-all-button.component';
import {ClaimButtonComponent} from 'controls/claim-button/claim-button.component';
import {DatasetWidgetComponent} from 'controls/datasetwidget/datasetwidget.component';
import {DeleteAllButtonComponent} from 'controls/delete-all-button/delete-all-button.component';
import {DeleteButtonComponent} from 'controls/delete-button/delete-button.component';
import {DatasetwidgetSmallComponent} from 'controls/datasetwidget-small/datasetwidget-small.component';
import {SocialnetworksComponent} from 'controls/socialnetworks/socialnetworks.component';
import {CommonModule} from '@angular/common';
import {ScoreComponent} from 'controls/score/score.component';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../pipes/pipes.module';
import {OmicsImageComponent} from 'controls/omics-image/omics-image.component';
import {UtilsModule} from 'utils/utils.module';
import {FeedbackComponent} from 'controls/feedback/feedback.component';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {FormsModule} from '@angular/forms';
import {DropDownComponent} from 'controls/drop-down/drop-down.component';
import {FacetComponent} from 'controls/facet/facet.component';
import {FacetOmicsComponent} from 'controls/facet-omics/facet-omics.component';
import {LoginComponent} from 'controls/login/login.component';
import {LoginLauncherComponent} from 'controls/login-launcher/login-launcher.component';
import {QueryBuilderComponent} from 'controls/query-builder/query-builder.component';
import {SearchBoxComponent} from 'controls/search-box/search-box.component';
import {SearchBoxLargeComponent} from 'controls/search-box-large/search-box-large.component';
import {AutocompleteNComponent} from 'controls/autocomplete-n/autocomplete-n.component';
import {MatMenuModule} from '@angular/material';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {CitationDialogComponent} from 'controls/citation-dialog/citation-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UtilsModule,
        PipesModule,
        ClipboardModule,
        FormsModule,
        MatMenuModule,
        NguiAutoCompleteModule

    ],
    declarations: [
        ConfirmDialogComponent,
        AltmetricImageComponent,
        AnnotatedTextComponent,
        ClaimAllButtonComponent,
        ClaimButtonComponent,
        DatasetWidgetComponent,
        DatasetwidgetSmallComponent,
        DeleteAllButtonComponent,
        DeleteButtonComponent,
        DropDownComponent,
        FacetComponent,
        FacetOmicsComponent,
        FeedbackComponent,
        LoginComponent,
        LoginLauncherComponent,
        OmicsImageComponent,
        QueryBuilderComponent,
        ScoreComponent,
        SearchBoxComponent,
        SearchBoxLargeComponent,
        SocialnetworksComponent,
        AutocompleteNComponent,
        CitationDialogComponent
    ],
    exports: [
        ScoreComponent,
        AltmetricImageComponent,
        AnnotatedTextComponent,
        ClaimAllButtonComponent,
        ClaimButtonComponent,
        DatasetWidgetComponent,
        DatasetwidgetSmallComponent,
        DeleteAllButtonComponent,
        DeleteButtonComponent,
        DropDownComponent,
        FacetComponent,
        FacetOmicsComponent,
        FeedbackComponent,
        LoginComponent,
        LoginLauncherComponent,
        OmicsImageComponent,
        QueryBuilderComponent,
        ScoreComponent,
        SearchBoxComponent,
        SearchBoxLargeComponent,
        SocialnetworksComponent,
        AutocompleteNComponent,
        CitationDialogComponent
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
})
export class ControlsModule {
}
