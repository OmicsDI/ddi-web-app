import {async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DatasetComponent } from './dataset.component';
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
import {DataSetMockService} from '@test/modules/dataset/dataset.mock.service';
import {DebugElement} from '@angular/core';
import {DataSetListMockService} from '@test/modules/dataset/dataset-list.mock.service';
import {SimilarityMockService} from '@test/modules/dataset/similarity.mock.service';

describe('DatasetComponent', () => {
  let component: DatasetComponent;
  let fixture: ComponentFixture<DatasetComponent>;
  let datasetService: DataSetService;
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
            //set base href
            {provide: APP_BASE_HREF, useValue: '/'} ,
             AuthService
            , AuthGuardService
            , SearchService
            , {provide: DataSetService, useClass: DataSetMockService}
            , PublicationService
            //For SimilarComponent
            , {provide: SimilarityService, useClass: SimilarityMockService}
            , EnrichmentService
            , OntologyService
            , {provide: DatabaseListService, useClass: DataSetListMockService}
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
            , InviteService
            // , ActivatedRoute
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetComponent);
    component = fixture.componentInstance;
    datasetService = TestBed.get(DataSetService);
    fixture.detectChanges();
  });
  //
  // it('No1.should create a component', () => {
  //   expect(component).toBeTruthy();
  // });
  //
  // it('No2.use ngOninit to get data ', () => {
  //     component.ngOnInit();
  //     fixture.detectChanges();
  //     expect(component.d.id).toBe('PXD001333');
  // });
  //
  // it('No3.test which service we using', () => {
  //     expect(datasetService.getDataSetDetail('mock', 'mock')).toBe('');
  // });
  //
  //   it('No4.should get html element from html template', () => {
  //       const bannerElement: HTMLElement = fixture.nativeElement;
  //       //find text from html template
  //       expect(bannerElement.textContent).toContain('Dataset Information');
  //   });
  //
  //   // it('should contain 'Dataset Information'', () => {
  //   //     const bannerElement: HTMLElement = fixture.nativeElement;
  //   //     //find text from html template
  //   //     const h3 = bannerElement.querySelector('h3');
  //   //     expect(h3.textContent).toEqual('Dataset Information');
  //   // });
  //
  //   // it('should contain 'Dataset Information' in debugElement', () => {
  //   //     const bannerDe: DebugElement = fixture.debugElement;
  //   //     const bannerEl: HTMLElement = bannerDe.nativeElement;
  //   //     //find text from html template
  //   //     const h3 = bannerEl.querySelector('h3');
  //   //     expect(h3.textContent).toEqual('Dataset Information');
  //   // });
  //
  //   it('No5. test if we can rendering a component with  Two-way binding', () => {
  //       const bannerDe: DebugElement = fixture.debugElement;
  //       const bannerEl: HTMLElement = bannerDe.nativeElement;
  //       //find text from html template
  //       const h3 = bannerEl.querySelector('h4');
  //       component.d.name = 'Anion-Exchange Chromatography of Tryptic and Phosphopeptides: WAX vs. SAX and AEX vs. ERLIC';
  //       fixture.detectChanges();
  //       expect(h3.textContent).toContain('Anion-Exchange Chromatography of Tryptic and Phosphopeptides: WAX vs. SAX and AEX vs. ERLIC');
  //   });
  //
  //   it('No6. can I bind a observable object into a 2 way binding element', () => {
  //       const De: DebugElement = fixture.debugElement;
  //       const El: HTMLElement = De.nativeElement;
  //       const datasetss = De.injector.get(DataSetService);
  //       //find text from html template
  //       fixture.detectChanges();
  //       const h3 = El.querySelector('h4');
  //       datasetService.dataSetDetail$.subscribe( x => {
  //           console.log(x);
  //           component.d = x;
  //           expect(h3.textContent).toContain('Anion-Exchange Chromatography of Tryptic and Phosphopeptides: WAX vs. SAX and AEX vs. ERLIC');
  //       });
  //   });
  //
  //   it('No7. whats tick()?', fakeAsync( () => {
  //       fixture.detectChanges();
  //       tick();
  //       fixture.detectChanges();
  //       const De: DebugElement = fixture.debugElement;
  //       const El: HTMLElement = De.nativeElement;
  //       //find text from html template
  //       fixture.detectChanges();
  //       const h3 = El.querySelector('h4');
  //       expect(h3.textContent).toContain('Anion-Exchange Chromatography of Tryptic and Phosphopeptides: WAX vs. SAX and AEX vs. ERLIC');
  //   }));
  //
  //
  //   it('No8. call service first and give the observable object to component instance,see if it can bind data to html template', fakeAsync(() => {
  //       datasetService.dataSetDetail$.subscribe( x => {
  //           component.d = x;
  //           console.log(x);
  //           tick();
  //           fixture.detectChanges();
  //           const De: DebugElement = fixture.debugElement;
  //           const El: HTMLElement = De.nativeElement;
  //           //find text from html template
  //           fixture.detectChanges();
  //           const h3 = El.querySelector('h4');
  //           expect(component.d.id).toEqual('PXD001333');
  //           expect(h3.textContent).toContain('Anion-Exchange Chromatography of Tryptic and Phosphopeptides: WAX vs. SAX and AEX vs. ERLIC');
  //       });
  //
  //   }));

    it('No9. use whenStable() to make sure all promises are over,and rendering component with data from promises', async( () => {
        fixture.detectChanges();
        fixture.whenStable().then( () => {
            fixture.detectChanges();
            //find text from html template
            fixture.detectChanges();
            component.ngOnInit();
            const De: DebugElement = fixture.debugElement;
            const El: HTMLElement = De.nativeElement;
            const h3 = El.querySelector('h4');
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



            expect(h3.textContent).toContain('Anion-Exchange Chromatography of Tryptic and Phosphopeptides: WAX vs. SAX and AEX vs. ERLIC');
            expect(abstract.textContent).toContain('At a pH > 5,  phosphopeptides have two negative charges per residue and are well-retained in anion-exchange chromatography.  However, the peptides with one or two phosphate groups are not separated from the peptides with multiple Asp or Glu residues, which interfere with the identification of phosphopeptides in tryptic digests.  At a pH around 2, phosphate residues have just a single negative charge but Asp and Glu have none.  This facilitates the separation of phosphopeptides from unmodified acidic peptides.  The singly phosphorylated peptides are retained too weakly under these conditions, due to electrostatic repulsion, unless hydrophilic interaction is superimposed in the ERLIC mode (electrostatic repulsion-hydrophilic interaction chromatography).  Weak anion-exchange (WAX) and strong anion-exchange (SAX) columns were compared, both with peptide standards and with a complex tryptic digest.  The SAX column exhibited higher capacity at pH 6 than did the WAX column.  However, only about 60% as many phosphopeptides were identified at pH 6 than via ERLIC at pH 2.  In one run, 12,467 phosphopeptides were identified, including 4233 with more than one phosphate.  We conclude that chromatography of phosphopeptides is best performed at low pH in the ERLIC mode.  Under those conditions the performances of the SAX and WAX materials were comparable.');
            if (reanalisys_of) {
                expect(reanalisys_of.textContent).toContain('TEST001');
            };

            if (reanalisys_of) {
                expect(reanalisys_by.textContent).toContain('GPM32310019962');
            };
            if (relate_omics) {
                expect(relate_omics.textContent).toContain('TEST002');
            };
            if (instruments) {
                expect(instruments.textContent).toContain('Q Exactive');
            };
            if (organisms) {
                expect(organisms.textContent).toContain('Homo sapiens');
            };
            if (tissues) {
                expect(tissues.textContent).toContain('Hela Cell');
            };
            if (diseases) {
                expect(diseases.textContent).toContain('Not Available');
            };
            if (submitter) {
                expect(submitter.textContent).toContain('Otto Hudecz');
            };
            if (id) {
                expect(id.textContent).toContain('PXD001333');
            };
            if (publicationDate) {
                expect(publicationDate.textContent).toContain('2015-04-23');
            };
            if (secondary_accession) {
                expect(secondary_accession.textContent).toContain('???');
            };
            if (repositories) {
                expect(repositories.textContent).toContain('Pride');
            };
            if (views) {
                expect(views.textContent).toContain(66);
            };
            if (citations) {
                expect(citations.textContent).toContain(0);
            };
            if (reanalysis) {
                expect(reanalysis.textContent).toContain(1);
            };
            if (connections) {
                expect(connections.textContent).toContain(2);
            };


            // const tt = El.querySelector('#dataset_upper_right h4');
            // expect(tt.textContent).toBe('hehehe');
            const tt2 = El.querySelectorAll('#dataset_upper_right .align-justify');
            // for (let t of tt2 ){
            //     expect(tt.textContent).toBe('hehehe');
            // }
            expect(tt2.item(0).textContent).toContain('At a pH > 5,  phosphopeptides have two negative charges per residue and are well-retained in anion-exchange chromatography.  However, the peptides with one or two phosphate groups are not separated from the peptides with multiple Asp or Glu residues, which interfere with the identification of phosphopeptides in tryptic digests.  At a pH around 2, phosphate residues have just a single negative charge but Asp and Glu have none.  This facilitates the separation of phosphopeptides from unmodified acidic peptides.  The singly phosphorylated peptides are retained too weakly under these conditions, due to electrostatic repulsion, unless hydrophilic interaction is superimposed in the ERLIC mode (electrostatic repulsion-hydrophilic interaction chromatography).  Weak anion-exchange (WAX) and strong anion-exchange (SAX) columns were compared, both with peptide standards and with a complex tryptic digest.  The SAX column exhibited higher capacity at pH 6 than did the WAX column.  However, only about 60% as many phosphopeptides were identified at pH 6 than via ERLIC at pH 2.  In one run, 12,467 phosphopeptides were identified, including 4233 with more than one phosphate.  We conclude that chromatography of phosphopeptides is best performed at low pH in the ERLIC mode.  Under those conditions the performances of the SAX and WAX materials were comparable.');
            // for ( let i = 0; i++ ; i < tt2.length) {
            //     expect(tt2.item(i).textContent).toBe('test');
            // };
        });

    }));

    // it('test abstract', async( () => {
    //     fixture.detectChanges();
    //     fixture.whenStable().then( () => {
    //         fixture.detectChanges();
    //
    //         //find text from html template
    //         fixture.detectChanges();
    //         component.ngOnInit();
    //         const abstract = El.querySelector('#abstract');
    //         expect(abstract.textContent).toContain('At a pH > 5,  phosphopeptides have two negative charges per residue and are well-retained in anion-exchange chromatography.  However, the peptides with one or two phosphate groups are not separated from the peptides with multiple Asp or Glu residues, which interfere with the identification of phosphopeptides in tryptic digests.  At a pH around 2, phosphate residues have just a single negative charge but Asp and Glu have none.  This facilitates the separation of phosphopeptides from unmodified acidic peptides.  The singly phosphorylated peptides are retained too weakly under these conditions, due to electrostatic repulsion, unless hydrophilic interaction is superimposed in the ERLIC mode (electrostatic repulsion-hydrophilic interaction chromatography).  Weak anion-exchange (WAX) and strong anion-exchange (SAX) columns were compared, both with peptide standards and with a complex tryptic digest.  The SAX column exhibited higher capacity at pH 6 than did the WAX column.  However, only about 60% as many phosphopeptides were identified at pH 6 than via ERLIC at pH 2.  In one run, 12,467 phosphopeptides were identified, including 4233 with more than one phosphate.  We conclude that chromatography of phosphopeptides is best performed at low pH in the ERLIC mode.  Under those conditions the performances of the SAX and WAX materials were comparable.');
    //     });
    //
    // }));

    // it('test abstract', async( () => {
    //     fixture.detectChanges();
    //     fixture.whenStable().then( () => {
    //         fixture.detectChanges();
    //
    //         //find text from html template
    //         fixture.detectChanges();
    //         component.ngOnInit();
    //         const De: DebugElement = fixture.debugElement;
    //         const El: HTMLElement = De.nativeElement;
    //         const abstract = El.querySelector('#abstract');
    //         expect(abstract.textContent).toContain('At a pH > 5,  phosphopeptides have two negative charges per residue and are well-retained in anion-exchange chromatography.  However, the peptides with one or two phosphate groups are not separated from the peptides with multiple Asp or Glu residues, which interfere with the identification of phosphopeptides in tryptic digests.  At a pH around 2, phosphate residues have just a single negative charge but Asp and Glu have none.  This facilitates the separation of phosphopeptides from unmodified acidic peptides.  The singly phosphorylated peptides are retained too weakly under these conditions, due to electrostatic repulsion, unless hydrophilic interaction is superimposed in the ERLIC mode (electrostatic repulsion-hydrophilic interaction chromatography).  Weak anion-exchange (WAX) and strong anion-exchange (SAX) columns were compared, both with peptide standards and with a complex tryptic digest.  The SAX column exhibited higher capacity at pH 6 than did the WAX column.  However, only about 60% as many phosphopeptides were identified at pH 6 than via ERLIC at pH 2.  In one run, 12,467 phosphopeptides were identified, including 4233 with more than one phosphate.  We conclude that chromatography of phosphopeptides is best performed at low pH in the ERLIC mode.  Under those conditions the performances of the SAX and WAX materials were comparable.');
    //     });
    //
    // }));
    //
    // it('test renalysis_of', async( () => {
    //     fixture.detectChanges();
    //     fixture.whenStable().then( () => {
    //         fixture.detectChanges();
    //
    //         //find text from html template
    //         fixture.detectChanges();
    //         component.ngOnInit();
    //         const De: DebugElement = fixture.debugElement;
    //         const El: HTMLElement = De.nativeElement;
    //         const renalysis_of = El.querySelector('#renalysis_of');
    //         expect(renalysis_of.textContent).toContain('');
    //     });
    //
    // }));

    // it('No10. ho jasmine.done works?' , ( done ) => {
    //     fixture.detectChanges();
    //     const spy = spyOn(datasetService, 'getDataSetDetail_private').and.returnValue( of(JSON.parse(DatasetDetailMock.datasetDetail)));
    //
    //     component.ngOnInit();
    //
    //     spy.calls.mostRecent().returnValue.then(() => {
    //         fixture.detectChanges();
    //         expect(component.d.id).toEqual('PXD001333');
    //         done();
    //     });
    //
    //
    // });
});
