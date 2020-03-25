import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatasetRoutingModule} from './dataset-routing.module';
import {DatasetComponent} from './components/dataset/dataset.component';
import {DisqusModule} from 'ngx-disqus';
import {ClipboardModule} from 'ngx-clipboard';
import {FormsModule} from '@angular/forms';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {PipesModule} from '@shared/pipes/pipes.module';
import {PublicationComponent} from '@modules/dataset/components/publication/publication.component';
import {SimilarComponent} from '@modules/dataset/components/similar/similar.component';
import {SimilarMoleculeComponent} from '@modules/dataset/components/similar-molecule/similar-molecule.component';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {NgxJsonLdModule} from '@ngx-lite/json-ld';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

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
        NgxJsonLdModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        MatButtonModule,
        MatSortModule,
        MatInputModule
    ],
    declarations: [
        DatasetComponent,
        PublicationComponent,
        SimilarComponent,
        SimilarMoleculeComponent
    ],
    exports: [
        SimilarMoleculeComponent,
        SimilarComponent,
        PublicationComponent
    ],
    entryComponents: [
        CitationDialogComponent
    ]
})
export class DatasetModule {
}
