import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DatasetRoutingModule} from './dataset-routing.module';
import {DatasetComponent} from 'pages/dataset/dataset.component';
import {PublicationComponent} from 'pages/dataset/publication/publication.component';
import {SimilarComponent} from 'pages/dataset/similar/similar.component';
import {SimilarMoleculeComponent} from 'pages/dataset/similar-molecule/similar-molecule.component';
import {SocialnetworksDatasetComponent} from 'pages/dataset/socialnetworksdataset/socialnetworksdataset.component';
import {OmicsImageDatasetComponent} from 'pages/dataset/omics-image-dataset/omics-image-dataset.component';
import {AnnotatedTextDatasetComponent} from 'pages/dataset/annotated-text-dataset/annotated-text-dataset.component';
import {ScoreDatasetComponent} from 'pages/dataset/score-dataset/score-dataset.component';
import {ClaimButtonDatasetComponent} from 'pages/dataset/claim-button-dataset/claim-button-dataset.component';
import {DisqusModule} from 'ng2-awesome-disqus';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {AltmetricImageDatasetComponent} from 'pages/dataset/altmetric-image-dataset/altmetric-image-dataset.component';
import {TruncateDatasetPipe} from 'pages/dataset/pipe-dataset/truncate-dataset.pipe';
import {ToDateStringDatasetPipe} from 'pages/dataset/pipe-dataset/toDateStringDataset.pipe';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ng2-tooltip';

@NgModule({
    imports: [
        CommonModule,
        DatasetRoutingModule,
        DisqusModule,
        ClipboardModule,
        FormsModule,
        TooltipModule
    ],
    declarations: [
        DatasetComponent,
        PublicationComponent,
        SimilarComponent,
        SimilarMoleculeComponent,
        SocialnetworksDatasetComponent,
        OmicsImageDatasetComponent,
        AnnotatedTextDatasetComponent,
        ScoreDatasetComponent,
        ClaimButtonDatasetComponent,
        AltmetricImageDatasetComponent,
        // pipe
        TruncateDatasetPipe,
        ToDateStringDatasetPipe
    ]
})
export class DatasetModule {
}
