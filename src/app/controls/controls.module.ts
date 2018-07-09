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
import {TooltipModule} from 'ng2-tooltip';
import {ScoreComponent} from 'controls/score/score.component';
import {OmicsImageSearchComponent} from 'search/datasetwidget-search/omics-image/omics-image-search.component';
import {RouterModule} from '@angular/router';
import {PipesModule} from '../pipes/pipes.module';
import {OmicsImageComponent} from 'controls/omics-image/omics-image.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TooltipModule,
        PipesModule
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
        SocialnetworksComponent,
        SocialnetworksComponent,
        ScoreComponent,
        OmicsImageSearchComponent,
        OmicsImageComponent
    ],
    exports: [
        ScoreComponent,
        OmicsImageSearchComponent,
        OmicsImageComponent
    ]
})
export class ControlsModule {
}
