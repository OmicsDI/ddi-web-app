import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSetDetail} from 'model/DataSetDetail';
import {Observable, Subscription} from 'rxjs/Rx';
import {DataSetService} from '@shared/services/dataset.service';
import {ActivatedRoute} from '@angular/router';
import {EnrichmentService} from '@shared/services/enrichment.service';
import {EnrichmentInfo} from 'model/enrichment-info/EnrichmentInfo';
import {Section} from 'model/enrichment-info/Section';
import {SynonymResult} from 'model/enrichment-info/SynonymResult';
import {Synonym} from 'model/enrichment-info/Synonym';
import {AppConfig} from 'app/app.config';
import {ProfileService} from '@shared/services/profile.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SimilarDataset} from 'model/SimilarDataset';
import {DatabaseListService} from '@shared/services/database-list.service';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {NotificationsService} from 'angular2-notifications/dist';
import {DialogService} from '@shared/services/dialog.service';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Database} from 'model/Database';


@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit, OnDestroy {
    d: DataSetDetail = new DataSetDetail();
    subscription: Subscription;
    enrichmentInfo: EnrichmentInfo;
    synonymResult: SynonymResult;

    acc: string;
    repository: string;
    repositoryName: string;

    title_sections: Section[];
    abstract_sections: Section[];
    sample_protocol_sections: Section[];
    data_protocol_sections: Section[];
    current_url: String;
    index_dataset: number;
    databaseUrl: string;
    web_service_url: string;
    databaseByAccession: Object = {};
    ontology_highlighted = false;

    databases: Database[];

    reanalysisOf = [];
    reanalysedBy = [];
    relatedOmics = [];

    constructor(private dataSetService: DataSetService,
                private route: ActivatedRoute,
                private enrichmentService: EnrichmentService,
                public appConfig: AppConfig,
                public profileService: ProfileService,
                private dialog: MatDialog,
                private dialogService: DialogService,
                private notificationService: NotificationsService,
                private logger: LogService,
                private slimLoadingBarService: SlimLoadingBarService,
                private databaseListService: DatabaseListService) {

        this.current_url = route.pathFromRoot.toString();
        this.index_dataset = this.current_url.indexOf('dataset');
        this.web_service_url = dataSetService.getWebServiceUrl();
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.slimLoadingBarService.start();
            this.acc = params['acc'];
            this.repository = params['domain'];
            this.databaseListService.getDatabaseList().subscribe(databases => {
                this.databases = databases;
                this.dataSetService.getDataSetDetail(this.acc, this.repository).subscribe(result => {
                    this.d = result;
                    // TODO: update with canonical id
                    this.acc = result.id;
                    this.repository = result.source;

                    this.logger.debug('DataSetDetailResult: {}', result);

                    if (this.d.secondary_accession) {
                        this.d.secondary_accession.forEach(item => {
                            this.databaseByAccession[item] = this.databaseListService.getDatabaseByAccession(item, databases);
                        });
                    }

                    const db = this.databaseListService.getDatabaseBySource(result.source, databases);
                    this.repositoryName = db.databaseName;
                    this.databaseUrl = db.sourceUrl;

                    if (result.similars != null) {
                        result.similars.filter(s => s.relationType === 'Reanalysis of').map(reanalysis => {
                            const reanalyDb = this.databaseListService.getDatabaseByDatabaseName(reanalysis.database, databases);
                            this.reanalysisOf.push({reanalysis: reanalysis, db: reanalyDb});
                        });

                        result.similars.filter(s => s.relationType === 'Reanalyzed by').map(reanalysedBy => {
                            const reanalyDb = this.databaseListService.getDatabaseByDatabaseName(reanalysedBy.database, databases);
                            this.reanalysedBy.push({reanalysis: reanalysedBy, db: reanalyDb});
                        });

                        result.similars.filter(s => s.relationType !== 'Reanalyzed by' && s.relationType !== 'Reanalysis of').map(omics => {
                            const reanalyDb = this.databaseListService.getDatabaseByDatabaseName(omics.database, databases);
                            this.relatedOmics.push({reanalysis: omics, db: reanalyDb});
                        });
                    }

                    this.slimLoadingBarService.complete();
                });
            });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    getSynonyms(text: string): string[] {
        let result: string[];
        result = this.synonymResult.synonymsList.find(r => r.wordLabel === text).synonyms;
        return result;
    }

    get_section(str: string, synonyms: Synonym[]): Section[] {

        const result: Section[] = [];
        if (null == synonyms) {
            result.push({text: str, beAnnotated: false, tobeReduced: false, synonyms: null});
            return result;
        }

        // todo array of Strange words
        // todo hard coded
        const reg = ['ï', '®', 'µ', 'å', '°' , '¾', 'è' ];
        let i = 0;
        for (let n = 0; n < synonyms.length; n++) {
            let j = 0;
            for (const key of reg) {
                const phase = str.substring(0, i);
                if (phase.indexOf(key) > 0) {
                    j += phase.split(key).length - 1;

                }
            }

            if (i < synonyms[n].from - 1) {
                const t = str.substr(i + j, synonyms[n].from - i - 1);

                result.push({text: t, beAnnotated: false, tobeReduced: false, synonyms: null});

            }
            const original_text = synonyms[n].text;
            // let text = str.substr(entry.from-1+j, entry.to-entry.from+1);
            result.push(
                {
                    text: original_text,
                    beAnnotated: true,
                    tobeReduced: false,
                    synonyms: this.getSynonyms(original_text)
                }
            );
            i = synonyms[n].to;
        }
        // add space for strange words
        let s = 0;
        for (const t of reg) {
            s = s + (str.split(t).length - 1);
        }

        if (i < str.length) {
            result.push({text: str.substr(i + s, str.length - i), beAnnotated: false, tobeReduced: false, synonyms: null});
        }
        return result;
    }

    // Backup do not delete
    // get_section(str: string, synonyms: Synonym[]): Section[]{
    //     let result: Section[] = new Array<Section>();
    //     if(null==synonyms){
    //         result.push({text:str, beAnnotated: false, tobeReduced: false, synonyms: null});
    //         return result;
    //     }
    //
    //     var i: number = 1;
    //     for (let entry of synonyms) {
    //         if(i<entry.from){
    //             let t = str.substr(i-1,entry.from-i);
    //             if(t!=" ") {
    //                 result.push({text:t, beAnnotated: false, tobeReduced: false, synonyms: null});
    //             }
    //         }
    //         let original_text = entry.text;
    //         let text = str.substr(entry.from-1, entry.to-entry.from+1);
    //         result.push(
    //             { text:text,
    //                 beAnnotated:true,
    //                 tobeReduced:false,
    //                 synonyms: this.getSynonyms(original_text)
    //             }
    //         );
    //         i = entry.to+1;
    //     }
    //     if(i < str.length){
    //         result.push({text:str.substr(i,str.length-i), beAnnotated:false, tobeReduced:false, synonyms:null});
    //     }
    //     return result;
    // }

    process_sections() {
        // TODO: encoding problems
        const description = this.enrichmentInfo.originalAttributes.description.replace('Â³loopingÂ²', 'WloopingW');

        this.title_sections = this.get_section(this.enrichmentInfo.originalAttributes.name, this.enrichmentInfo.synonyms.name);
        this.abstract_sections = this.get_section(description, this.enrichmentInfo.synonyms.description);
        this.sample_protocol_sections = this.get_section(
            this.enrichmentInfo.originalAttributes.sample_protocol, this.enrichmentInfo.synonyms.sample_protocol);
        this.data_protocol_sections = this.get_section(
            this.enrichmentInfo.originalAttributes.data_protocol, this.enrichmentInfo.synonyms.data_protocol);

        const str = this.enrichmentInfo.originalAttributes.name;
        this.ontology_highlighted = true;
        this.remove_tags();
    }

    remove_tags() {
        let count = 0;
        for (const section of this.abstract_sections) {
            section.text = section.text.replace(
                /<\/?[ib]*(br|span|h|u|strike|pre|code|tt|blockquote|small|center|em|strong)*\/?>/g, '');
            section.text = section.text.replace(/<[\s\S]*>/g, '');
            if (section.text.indexOf('<') !== -1 && section.text.indexOf('>') === -1) {
                section.text = section.text.replace(/<[\s\S]*/g, '');
                count = count + 1;
            } else if (section.text.indexOf('>') !== -1 && section.text.indexOf('<') === -1) {
                section.text = section.text.replace(/[\s\S]*>/g, '');
                count = count - 1;
            } else if (section.text.indexOf('>') === -1 && section.text.indexOf('<') === -1 && count > 0) {
                section.text = section.text.replace(/[\s\S]*/g, '');
            }
        }
    }

    enrich_click() {
        if (this.ontology_highlighted) {
            this.title_sections = null;
            this.abstract_sections = null;
            this.sample_protocol_sections = null;
            this.data_protocol_sections = null;

            this.logger.debug('remove hightlighting');
            this.ontology_highlighted = false;
        } else {

            Observable.forkJoin(
                [this.enrichmentService.getEnrichmentInfo(this.repository, this.acc),
                    this.enrichmentService.getSynonyms(this.repository, this.acc)]
            ).subscribe(
                data => {
                    this.enrichmentInfo = data[0];
                    this.logger.debug('Enrichment info: {}', this.enrichmentInfo);
                    this.synonymResult = data[1];
                    this.logger.debug('Synonym result: {}', this.synonymResult);
                    this.logger.debug('calling process_sections');
                    if (!this.synonymResult || !this.enrichmentInfo || this.synonymResult.synonymsList.length <= 0 ) {
                        this.dialogService.confirm('Alert' , 'no synonymous words');
                    } else if (!this.enrichmentInfo.synonyms.name || !this.enrichmentInfo.synonyms.description) {
                        this.dialogService.confirm('Alert' , 'no synonymous words in name or description');
                        this.process_sections();
                    } else {
                        this.process_sections();
                    }

                }
            );
        }
    }


    citation() {
        let dialogRef: MatDialogRef<CitationDialogComponent>;

        dialogRef = this.dialog.open(CitationDialogComponent);
        dialogRef.componentInstance.title = 'Dataset citation';
        dialogRef.componentInstance.datasetDetail = this.d;

        return dialogRef.afterClosed();
    }
}
