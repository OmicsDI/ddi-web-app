import {async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DatasetComponent } from '@modules/dataset/components/dataset/dataset.component';
import {APP_BASE_HREF, CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {DatasetRoutingModule} from '@modules/dataset/dataset-routing.module';
import {DisqusModule} from 'ngx-disqus';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {FormsModule} from '@angular/forms';
import {UtilsModule} from '@shared/modules/utils/utils.module';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {PipesModule} from '@shared/pipes/pipes.module';
import {PublicationComponent} from '@modules/dataset/components/publication/publication.component';
import {SimilarComponent} from '@modules/dataset/components/similar/similar.component';
import {SimilarMoleculeComponent} from '@modules/dataset/components/similar-molecule/similar-molecule.component';
import {ProfileService} from '@shared/services/profile.service';
import {AuthHttp} from 'angular2-jwt';
import {authHttpServiceFactory} from 'app/app.module';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {AuthGuardService} from '@shared/services/auth-guard.service';
import {AuthService} from '@shared/services/auth.service';
import {SearchService} from '@shared/services/search.service';
import {DataSetService} from '@shared/services/dataset.service';
import {PublicationService} from '@shared/services/publication.service';
import {SimilarityService} from '@shared/services/similarity.service';
import {EnrichmentService} from '@shared/services/enrichment.service';
import {OntologyService} from '@shared/services/ontology.service';
import {FeedbackService} from '@shared/services/feedback.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {SimilarMoleculeService} from '@shared/services/similar-molecule.service';
import {AppConfig} from 'app/app.config';
import {StatisticsService} from '@shared/services/statistics.service';
import {AltmetricService} from '@shared/services/altmetric.service';
import {SelectedService} from '@shared/services/selected.service';
import {DialogService} from '@shared/services/dialog.service';
import {ScoreService} from '@shared/services/score.service';
import {ThorService} from '@shared/services/thor.service';
import {MatButtonModule, MatDialog, MatDialogModule, MatMenuModule} from '@angular/material';
import {InviteService} from '@shared/services/invite.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {DebugElement} from '@angular/core';
import {DataSetListMockService} from '@test/sharedServices/dataset-list.mock.service';
import {SimilarityMockService} from '@test/modules/dataset/similarity.mock.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {SimilarMoleculeMockService} from '@test/modules/dataset/similarMolecule.mock.service';
import {PublicationMockService} from '@test/modules/dataset/publication.mock.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {AltmetricMockService} from '@test/modules/dataset/altmetric.mock.service';
import {DataSetMockService} from '@test/sharedServices/dataset.mock.service';

describe('DatasetComponent', () => {
  let component: DatasetComponent;
  let fixture: ComponentFixture<DatasetComponent>;
  // let datasetDetail: DataSetDetail;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            CommonModule,
            DatasetRoutingModule,
            DisqusModule.forRoot('omicsdi'),
            ClipboardModule,
            FormsModule,
            UtilsModule,
            ControlsModule,
            PipesModule,
            HttpModule,
            HttpClientModule,
            RouterTestingModule,
            MatDialogModule
            , MatMenuModule
            , MatButtonModule
        ],
        declarations: [
            DatasetComponent,
            PublicationComponent,
            SimilarComponent,
            SimilarMoleculeComponent
        ],
        providers: [ProfileService
            , {
                provide: AuthHttp,
                useFactory: authHttpServiceFactory,
                deps: [Http, RequestOptions]
            },
            {provide: LocationStrategy, useClass: PathLocationStrategy},
            { provide: ComponentFixtureAutoDetect, useValue: true },
            // set base href
            {provide: APP_BASE_HREF, useValue: '/'} ,
             AuthService
            , AuthGuardService
            , SearchService
            , {provide: DataSetService, useClass: DataSetMockService}
            , {provide: PublicationService, useClass: PublicationMockService}
          // For SimilarComponent
            , {provide: SimilarityService, useClass: SimilarityMockService}
            , EnrichmentService
            , OntologyService
            , {provide: DatabaseListService, useClass: DataSetListMockService}
            , {provide: SimilarMoleculeService, useClass: SimilarMoleculeMockService}
                , FeedbackService
            , AppConfig
            , StatisticsService
            , {provide: AltmetricService, useClass: AltmetricMockService}
            , SelectedService
            , DialogService
            , ScoreService
            , ThorService
            , MatDialogModule
            , MatMenuModule
            , MatButtonModule
            , InviteService
            , NotificationsService
            , SlimLoadingBarService
            // , ActivatedRoute
        ]
    })
    .compileComponents().then( () => {
        fixture = TestBed.createComponent(DatasetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

  }));

  // beforeEach(() => {
  //
  // });
    it('Consistency between frontend and backend: dataset componenet', async( () => {
        fixture.whenStable().then( () => {
            fixture.detectChanges();
            const De: DebugElement = fixture.debugElement;
            const El: HTMLElement = De.nativeElement;
            // const h4 = El.querySelector('h4');
            const abstract = El.querySelector('#abstract');
            const reanalisys_of = El.querySelector('#reanalisys_of');
            const reanalisys_by = El.querySelector('#reanalisys_by');
            const relate_omics = El.querySelector('#relate_omics');
            const instruments = El.querySelector('#instruments');
            const organisms = El.querySelector('#organisms');
            const tissues = El.querySelector('#tissues');
            const diseases = El.querySelector('#diseases');
            const submitter = El.querySelector('#submitter');
            const id = El.querySelector('#id');
            const publicationDate =  El.querySelector('#publicationDate');
            const secondary_accession = El.querySelector('#secondary_accession');
            const repositories = El.querySelector('#repositories');
            const views = El.querySelector('#views');
            const citations = El.querySelector('#citations');
            const reanalysis = El.querySelector('#reanalysis');
            const connections = El.querySelector('#connections');
            // console.log(h4.textContent);
            // expect(h4.textContent).toContain('Anion-Exchange
            // Chromatography of Tryptic and Phosphopeptides: WAX vs. SAX and AEX vs. ERLIC');
            expect(abstract.textContent).toContain('At a pH > 5,  phosphopeptides have two negative charges per resid' +
                'ue and are well-retained in anion-exchan' +
                'ge chromatography.  However, the peptides' +
                ' with one or two phosphate groups are not ' +
                'separated from the peptides with multiple Asp' +
                ' or Glu residues, which interfere with the ' +
                'identification of phosphopeptides in tryptic' +
                ' digests.  At a pH around 2, phosphate residue' +
                's have just a single negative charge but' +
                ' Asp and Glu have none.  This facilitate' +
                's the separation of phosphopeptides from unmodified acidic pe' +
                'ptides.  The singly phosphorylated pepti' +
                'des are retained too weakly under these co' +
                'nditions, due to electrostatic repulsion, unless hydrophilic inte' +
                'raction is superimposed in the ERLIC mode' +
                ' (electrostatic repulsion-hydrophilic in' +
                'teraction chromatography).  Weak anion-ex' +
                'change (WAX) and strong' +
                ' anion-exchange (SAX) columns were compared, b' +
                'oth with peptide standards and with a comple' +
                'x tryptic digest.  The SAX column exhibited higher capa' +
                'city at pH 6 than did the WAX column.  Ho' +
                'wever, only about 60% as many phosphopeptides wer' +
                'e identified at pH 6 than via ERLIC at pH 2.  In o' +
                'ne run, 12,467 phosphopeptides were identif' +
                'ied, including 4233 with more than one phosphate.' +
                '  We conclude that chromatography of ph' +
                'osphopeptides is best performed at low pH ' +
                'in the ERLIC mode.  Under those conditions the per' +
                'formances of the SAX and WAX materials were comparable.');
                //
                //
                // expect(reanalisys_of.textContent).toContain('TEST001');

                expect(reanalisys_by.textContent).toContain('GPM32310019962');

                expect(relate_omics.textContent).toContain('TEST002');

                expect(instruments.textContent).toContain('Q Exactive');

                expect(organisms.textContent).toContain('Homo sapiens');

                expect(tissues.textContent).toContain('Hela Cell');

                expect(diseases.textContent).toContain('Not Available');

                expect(submitter.textContent).toContain('Otto Hudecz');

                expect(id.textContent).toContain('PXD001333');

                expect(publicationDate.textContent).toContain('2015-04-23');

                // expect(secondary_accession.textContent).toContain('???');

                expect(repositories.textContent).toContain('Pride');

                expect(views.textContent).toContain(66);

                expect(citations.textContent).toContain(0);

                expect(reanalysis.textContent).toContain(1);

                expect(connections.textContent).toContain(2);

        });

    }));
});
