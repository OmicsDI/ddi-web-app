import {Component, OnInit} from '@angular/core';
import {DataSetDetail} from 'model/DataSetDetail';
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
import {DatabaseListService} from '@shared/services/database-list.service';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {NotificationsService} from 'angular2-notifications';
import {DialogService} from '@shared/services/dialog.service';
import {LogService} from '@shared/modules/logs/services/log.service';
import {Database} from 'model/Database';
import {NgProgress} from '@ngx-progressbar/core';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {Profile} from 'model/Profile';
import {DataSetShort} from 'model/DataSetShort';
import * as moment from 'moment';
import {AuthService} from '@shared/services/auth.service';
import {throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';


@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {
    d: DataSetDetail;
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
    notfound = false;

    databases: Database[];

    reanalysisOf = [];
    reanalysedBy = [];
    relatedOmics = [];

    profile: Profile;
    isLogged = false;

    constructor(private dataSetService: DataSetService,
                private route: ActivatedRoute,
                private enrichmentService: EnrichmentService,
                public appConfig: AppConfig,
                public profileService: ProfileService,
                private dialog: MatDialog,
                private dialogService: DialogService,
                private notificationService: NotificationsService,
                private logger: LogService,
                private auth: AuthService,
                private slimLoadingBarService: NgProgress,
                private databaseListService: DatabaseListService) {

        this.current_url = route.pathFromRoot.toString();
        this.index_dataset = this.current_url.indexOf('dataset');
        this.web_service_url = dataSetService.getWebServiceUrl();
        this.auth.loggedIn().then(isLogged => {
            this.isLogged = isLogged;
            if (isLogged) {
                this.profile = this.profileService.getProfileFromLocal();
            }
        })
    }

    ngOnInit() {
        const self = this;
        this.databaseListService.getDatabaseList().subscribe(databases => {
            this.route.params.subscribe(params => {
                this.slimLoadingBarService.start();
                this.acc = params['acc'];
                this.repository = params['domain'];
                this.databases = databases;
                this.dataSetService.getDataSetDetail(this.acc, this.repository)
                    .pipe(catchError((err: HttpErrorResponse) => {
                        self.slimLoadingBarService.complete();
                        self.notfound = true;
                        return throwError(
                            'Can\'t get dataset, err: ' + err.message);
                    }))
                    .subscribe(result => {
                        self.reanalysisOf = [];
                        self.reanalysedBy = [];
                        self.relatedOmics = [];
                        this.d = result;
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
                                self.reanalysisOf.push({reanalysis: reanalysis, db: reanalyDb});
                            });

                            result.similars.filter(s => s.relationType === 'Reanalyzed by').map(reanalysedBy => {
                                const reanalyDb = this.databaseListService.getDatabaseByDatabaseName(reanalysedBy.database, databases);
                                self.reanalysedBy.push({reanalysis: reanalysedBy, db: reanalyDb});
                            });

                            result.similars.filter(s => s.relationType !== 'Reanalyzed by' && s.relationType !== 'Reanalysis of')
                                .map(omics => {
                                    const reanalyDb = this.databaseListService.getDatabaseByDatabaseName(omics.database, databases);
                                    self.relatedOmics.push({reanalysis: omics, db: reanalyDb});
                            });
                        }

                        this.slimLoadingBarService.complete();
                });
            });
        });
    }

    isClaimable() {
        return this.d.claimable != null && this.d.claimable;
    }

    isClaimed() {
        if (this.isLogged) {
            const profile: Profile = this.profile;
            let obj: any;
            if (null != profile.dataSets) {
                obj = profile.dataSets.find(x => x.id === this.d.id && x.source === this.d.source);
            }
            return (null != obj);
        }
        return false;
    }

    claimDataset() {
        const dataset: DataSetShort = new DataSetShort();
        dataset.source = this.d.source;
        dataset.id = this.d.id;
        dataset.claimed = moment().format('ll');
        dataset.name = this.d.name;
        dataset.omics_type = this.d.omics_type;

        this.auth.loggedIn().then(isLogged => {
            if (isLogged) {
                this.logger.debug('Claiming dataset for user: {}', this.profile.userId);
                this.profileService.claimDataset(this.profile.userId, dataset);
                //
                this.profile.dataSets.push(dataset);
                this.profileService.setProfile(this.profile);
            }
        });
    }

    getSynonyms(text: string): string[] {
        let result: string[];
        result = this.synonymResult.synonymsList.find(r => r.wordLabel === text).synonyms;
        return result;
    }

    getSection(str: string, synonyms: Synonym[]): Section[] {

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
    // getSection(str: string, synonyms: Synonym[]): Section[]{
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

    processSections() {
        // TODO: encoding problems
        const description = this.enrichmentInfo.originalAttributes.description.replace('Â³loopingÂ²', 'WloopingW');

        this.title_sections = this.getSection(this.enrichmentInfo.originalAttributes.name, this.enrichmentInfo.synonyms.name);
        this.abstract_sections = this.getSection(description, this.enrichmentInfo.synonyms.description);
        this.sample_protocol_sections = this.getSection(
            this.enrichmentInfo.originalAttributes.sample_protocol, this.enrichmentInfo.synonyms.sample_protocol);
        this.data_protocol_sections = this.getSection(
            this.enrichmentInfo.originalAttributes.data_protocol, this.enrichmentInfo.synonyms.data_protocol);

        const str = this.enrichmentInfo.originalAttributes.name;
        this.ontology_highlighted = true;
        this.removeTags();
    }

    removeTags() {
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

    enrichClick() {
        if (this.ontology_highlighted) {
            this.title_sections = null;
            this.abstract_sections = null;
            this.sample_protocol_sections = null;
            this.data_protocol_sections = null;

            this.logger.debug('remove hightlighting');
            this.ontology_highlighted = false;
        } else {

            forkJoin(
                [this.enrichmentService.getEnrichmentInfo(this.repository, this.acc),
                    this.enrichmentService.getSynonyms(this.repository, this.acc)]
            ).subscribe(
                data => {
                    this.enrichmentInfo = data[0];
                    this.logger.debug('Enrichment info: {}', this.enrichmentInfo);
                    this.synonymResult = data[1];
                    this.logger.debug('Synonym result: {}', this.synonymResult);
                    this.logger.debug('calling processSections');
                    if (!this.synonymResult || !this.enrichmentInfo || this.synonymResult.synonymsList.length <= 0 ) {
                        this.dialogService.confirm('Alert' , 'no synonymous words');
                    } else if (!this.enrichmentInfo.synonyms.name || !this.enrichmentInfo.synonyms.description) {
                        this.dialogService.confirm('Alert' , 'no synonymous words in name or description');
                        this.processSections();
                    } else {
                        this.processSections();
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

    upperName(lower: string) {
        return lower.replace(/^\w/, function (chr) {
            return chr.toUpperCase();
        });
    }
}
