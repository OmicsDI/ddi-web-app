import {NgModule} from '@angular/core';
import {ConfirmDialogComponent} from '@shared/modules/controls/confirm-dialog/confirm-dialog.component';
import {AltmetricImageComponent} from '@shared/modules/controls/altmetric-image/altmetric-image.component';
import {AnnotatedTextComponent} from '@shared/modules/controls/annotated-text/annotated-text.component';
import {DatasetWidgetComponent} from '@shared/modules/controls/datasetwidget/datasetwidget.component';
import {DeleteAllButtonComponent} from '@shared/modules/controls/delete-all-button/delete-all-button.component';
import {DeleteButtonComponent} from '@shared/modules/controls/delete-button/delete-button.component';
import {DatasetwidgetSmallComponent} from '@shared/modules/controls/datasetwidget-small/datasetwidget-small.component';
import {SocialnetworksComponent} from '@shared/modules/controls/socialnetworks/socialnetworks.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PipesModule} from '@shared/pipes/pipes.module';
import {OmicsImageComponent} from '@shared/modules/controls/omics-image/omics-image.component';
import {FeedbackComponent} from '@shared/modules/controls/feedback/feedback.component';
import {ClipboardModule} from 'ngx-clipboard';
import {FormsModule} from '@angular/forms';
import {DropDownComponent} from '@shared/modules/controls/drop-down/drop-down.component';
import {FacetComponent} from '@shared/modules/controls/facet/facet.component';
import {FacetOmicsComponent} from '@shared/modules/controls/facet-omics/facet-omics.component';
import {LoginComponent} from '@shared/modules/controls/login/login.component';
import {QueryBuilderComponent} from '@shared/modules/controls/query-builder/query-builder.component';
import {SearchBoxComponent} from '@shared/modules/controls/search-box/search-box.component';
import {MatMenuModule} from '@angular/material';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {AutocompleteNComponent} from '@shared/modules/controls/autocomplete-n/autocomplete-n.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UtilsModule,
        PipesModule,
        ClipboardModule,
        FormsModule,
        MatMenuModule,
        NguiAutoCompleteModule,
        BsDropdownModule.forRoot()
    ],
    declarations: [
        ConfirmDialogComponent,
        AltmetricImageComponent,
        AnnotatedTextComponent,
        DatasetWidgetComponent,
        DatasetwidgetSmallComponent,
        DeleteAllButtonComponent,
        DeleteButtonComponent,
        DropDownComponent,
        FacetComponent,
        FacetOmicsComponent,
        FeedbackComponent,
        LoginComponent,
        OmicsImageComponent,
        QueryBuilderComponent,
        SearchBoxComponent,
        SocialnetworksComponent,
        AutocompleteNComponent,
        CitationDialogComponent
    ],
    exports: [
        AltmetricImageComponent,
        AnnotatedTextComponent,
        DatasetWidgetComponent,
        DatasetwidgetSmallComponent,
        DeleteAllButtonComponent,
        DeleteButtonComponent,
        DropDownComponent,
        FacetComponent,
        FacetOmicsComponent,
        FeedbackComponent,
        LoginComponent,
        OmicsImageComponent,
        QueryBuilderComponent,
        SearchBoxComponent,
        SocialnetworksComponent,
        AutocompleteNComponent,
        CitationDialogComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        CitationDialogComponent
    ],
})
export class ControlsModule {
}
