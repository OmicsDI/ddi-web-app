import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
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
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DatabaseListService} from '@shared/services/database-list.service';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {NotificationsService} from 'angular2-notifications';
import {DialogService} from '@shared/services/dialog.service';
import {Database} from 'model/Database';
import {NgProgress} from '@ngx-progressbar/core';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {Profile} from 'model/Profile';
import {DataSetShort} from 'model/DataSetShort';
import * as moment from 'moment';
import {AuthService} from '@shared/services/auth.service';
import {Subscription, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Meta, Title} from '@angular/platform-browser';
import {isPlatformServer} from '@angular/common';
import {SchemaService} from '@shared/services/schema.service';
import {SelectionModel} from '@angular/cdk/collections';
import {RedirectService} from '@shared/services/redirect.service';
import {ObjectUtils} from '@shared/utils/object-utils';


export class FileInfo {
    position: number;
    name: string;
    provider: string;
    category: string;
    drsUrl: string;
}

export class Filter {
    source = 'primary';
    keyword = '';
}


@Component({
    selector: 'app-dataset',
    templateUrl: './dataset.component.html',
    styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit, OnDestroy {
    d: DataSetDetail;
    enrichmentInfo: EnrichmentInfo;
    synonymResult: SynonymResult;
    displayedColumns: string[] = ['select', 'name', 'category', 'action', "drs"];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

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
    drs_url: string;
    databaseByAccession: Object = {};
    ontology_highlighted = false;
    notfound = false;

    databases: Database[];

    reanalysisOf = [];
    reanalysedBy = [];
    relatedOmics = [];

    providers = [];
    galaxyInstances = [];

    filter = new Filter();

    profile: Profile;
    isLogged = false;
    isServer = true;
    schema: any;
    dataSource: MatTableDataSource<FileInfo>;
    selection = new SelectionModel<FileInfo>(true, []);
    private subscription: Subscription;
    upperName = ObjectUtils.upperName;

    constructor(private dataSetService: DataSetService,
                private route: ActivatedRoute,
                private enrichmentService: EnrichmentService,
                public appConfig: AppConfig,
                public profileService: ProfileService,
                private dialog: MatDialog,
                private dialogService: DialogService,
                private notificationService: NotificationsService,
                private auth: AuthService,
                private slimLoadingBarService: NgProgress,
                private titleService: Title,
                @Inject(PLATFORM_ID) platformId,
                private metaTagService: Meta,
                private redirectService: RedirectService,
                private schemaService: SchemaService,
                private databaseListService: DatabaseListService) {

        this.current_url = route.pathFromRoot.toString();
        this.index_dataset = this.current_url.indexOf('dataset');
        this.web_service_url = dataSetService.getWebServiceUrl();
        this.isServer = isPlatformServer(platformId);
        this.auth.loggedIn().then(isLogged => {
            this.isLogged = isLogged;
            if (isLogged) {
                this.profile = this.profileService.getProfileFromLocal();
            }
        });
    }

    parseDataset(dataset: DataSetDetail) {
        const self = this;
        self.reanalysisOf = [];
        self.reanalysedBy = [];
        self.relatedOmics = [];
        this.d = dataset;
        this.titleService.setTitle(this.acc + ' - ' + dataset.name + ' - ' + 'OmicsDI');

        if (this.d.secondary_accession) {
            this.d.secondary_accession.forEach(item => {
                this.databaseByAccession[item] = this.databaseListService.getDatabaseByAccession(item, this.databases);
            });
        }

        const db = this.databaseListService.getDatabaseBySource(dataset.source, this.databases);
        if (db != null) {
            this.repositoryName = db.databaseName;
            this.databaseUrl = db.sourceUrl;
        }

        if (dataset.similars != null) {
            dataset.similars.forEach(similar => {
                const reanalyDb = this.databaseListService.getDatabaseByDatabaseName(similar.database, this.databases);
                if (reanalyDb != null) {
                    if (similar.relationType === 'Reanalysis of') {
                        self.reanalysisOf.push({reanalysis: similar, db: reanalyDb});
                    } else if (similar.relationType === 'Reanalyzed by') {
                        self.reanalysedBy.push({reanalysis: similar, db: reanalyDb});
                    } else {
                        self.relatedOmics.push({reanalysis: similar, db: reanalyDb});
                    }
                }
            });
        }
        this.drs_url = "Not available";
        this.dataSetService.getDataSetDRSUrl(this.acc, this.repositoryName).then(
            (drsUrlsJson) =>
                {
                    if (drsUrlsJson != null && Array.isArray(drsUrlsJson)) {
                        drsUrlsJson.forEach(drsEntry => {
                            if (drsEntry['name'] == this.acc) {
                                this.drs_url = drsEntry['drsURL'];
                            }
                        });
                    }
                }).catch(() => {}); // quiesce

        this.slimLoadingBarService.ref().complete();
    }

    parseSchema(schema: any) {
        if (schema && schema['mainEntity']) {
            // Avoid html tags in dataset.description object
            this.metaTagService.updateTag({name: 'description', content: schema['mainEntity']['description']});
        }
        return schema;
    }

    isClaimable() {
        return this.d.claimable != null && this.d.claimable;
    }

    parseFiles(files: any) {
        const elements: FileInfo[] = [];
        this.providers = [];
        let position = 0;
        let versions = 1;
        const downloadUrlsJson = files[0];
        const drsUrlsJson = files[1];
        const fileName2DRSUrl = new Map<string, string[]>();
        if (drsUrlsJson != null && Array.isArray(drsUrlsJson)) {
            drsUrlsJson.forEach(drsEntry => {
                fileName2DRSUrl[drsEntry['name'].split("/")[1]] = drsEntry['drsURL'];
            });
        }

        downloadUrlsJson['file_versions'].forEach(version => {
            if (this.providers.indexOf(version['type']) > -1) {
                this.providers.push(version['type'] + '_' + versions++);
            } else {
                this.providers.push(version['type']);
            }
            Object.keys(version['files']).forEach(function(fileType, index) {
                version['files'][fileType].forEach(file => {
                    const fileInfo = new FileInfo();
                    fileInfo.category = fileType;
                    fileInfo.name = file;
                    fileInfo.provider = version['type'];
                    const auxArr = fileInfo.name.split("/");
                    fileInfo.drsUrl = fileName2DRSUrl[auxArr[auxArr.length - 1]];
                    if (fileInfo.drsUrl == null) {
                        fileInfo.drsUrl = "Not available";
                    }
                    elements.push(fileInfo);
                });
            });
        });



        elements.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
        elements.forEach(e => e.position = position++);

        this.dataSource = new MatTableDataSource<FileInfo>(elements);
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
            const filterObj = JSON.parse(filter);
            return data.provider.includes(filterObj['source']) && data.name.toLowerCase().includes(filterObj['keyword'].toLowerCase());
        };
        setTimeout(x => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        this.dataSource.filter = JSON.stringify(this.filter);
    }

    ngOnInit() {
        const self = this;
        this.databaseListService.getDatabaseList().subscribe(databases => {
            this.databases = databases;
            this.subscription = this.route.params.subscribe(params => {
                this.slimLoadingBarService.ref().start();
                this.acc = params['acc'];
                this.repository = params['domain'];
                this.schemaService.getDatasetSchema(this.acc, this.repository).subscribe(result => {
                    this.schema = this.parseSchema(result);
                });
                this.dataSetService.getDataSetDetail(this.acc, this.repository)
                    .pipe(catchError((err: HttpErrorResponse) => {
                        self.slimLoadingBarService.ref().complete();
                        self.notfound = true;
                        return throwError('Can\'t get dataset, err: ' + err.message);
                    }))
                    .subscribe(result => {
                        this.parseDataset(result);
                        this.dataSetService.getDataSetFiles(this.acc, this.repository).then(
                            (r) => {this.parseFiles(r)}
                        ).catch(() => {}); // quiesce
                        this.title_sections = null;
                        this.abstract_sections = null;
                        this.sample_protocol_sections = null;
                        this.data_protocol_sections = null;
                        this.ontology_highlighted = false;
                    });
            });
        });
        if (!this.isServer) {
            if (sessionStorage.getItem('galaxy_instance') != null) {
                this.galaxyInstances.push({'url': sessionStorage.getItem('galaxy_instance'), 'from': 'Redirected from'});
            }
            if (this.isLogged && this.profile.galaxyInstance != null) {
                this.galaxyInstances.push({'url': this.profile.galaxyInstance, 'from': 'Profile'});
            }

            this.galaxyInstances.push({'url': 'https://usegalaxy.org', 'from': 'Default'});
            this.galaxyInstances.push({'url': 'Custom...', 'from': 'Enter your galaxy instance'});
        }
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
        if (this.isLogged) {
            const dataset: DataSetShort = new DataSetShort();
            dataset.source = this.d.source;
            dataset.id = this.d.id;
            dataset.claimed = moment().format('ll');
            dataset.name = this.d.name;
            dataset.omics_type = this.d.omics_type;

            this.profileService.claimDataset(this.profile.userId, dataset);
            this.profile.dataSets.push(dataset);
            this.profileService.setProfile(this.profile);
        }
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

        let i = 0;
        for (let n = 0; n < synonyms.length; n++) {
            if (i < synonyms[n].from - 1) {
                const t = str.substr(i, synonyms[n].from - i - 1);

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

        if (i < str.length) {
            result.push({text: str.substr(i, str.length - i), beAnnotated: false, tobeReduced: false, synonyms: null});
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
        const description = this.enrichmentInfo.originalAttributes.description;

        this.title_sections = this.getSection(this.enrichmentInfo.originalAttributes.name, this.enrichmentInfo.synonyms.name);
        this.abstract_sections = this.getSection(description, this.enrichmentInfo.synonyms.description);
        // this.sample_protocol_sections = this.getSection(
        //     this.enrichmentInfo.originalAttributes.sample_protocol, this.enrichmentInfo.synonyms.sample_protocol);
        // this.data_protocol_sections = this.getSection(
        //     this.enrichmentInfo.originalAttributes.data_protocol, this.enrichmentInfo.synonyms.data_protocol);
        this.ontology_highlighted = true;
        this.removeTags();
    }

    removeTags() {
        for (const section of this.abstract_sections) {
            if (section.text != null) {
                section.text = section.text.replace(/<(?:.|\n)*?>/gm, '');
            }
        }
    }

    enrichClick() {
        if (this.ontology_highlighted) {
            this.title_sections = null;
            this.abstract_sections = null;
            this.sample_protocol_sections = null;
            this.data_protocol_sections = null;
            this.ontology_highlighted = false;
        } else {
            this.slimLoadingBarService.ref().start();
            forkJoin(
                [this.enrichmentService.getEnrichmentInfo(this.repository, this.acc),
                    this.enrichmentService.getSynonyms(this.repository, this.acc)]
            ).subscribe(
                data => {
                    this.enrichmentInfo = data[0];
                    this.synonymResult = data[1];
                    if (!this.synonymResult || !this.enrichmentInfo || !this.synonymResult.synonymsList || this.synonymResult.synonymsList.length <= 0 ) {
                        this.dialogService.confirm('Alert' , 'no synonymous words');
                    } else if (!this.enrichmentInfo.synonyms.name && !this.enrichmentInfo.synonyms.description) {
                        this.dialogService.confirm('Alert' , 'no synonymous words in both name and description');
                    } else {
                        this.processSections();
                    }
                    this.slimLoadingBarService.ref().complete();
                }
            );
        }
    }

    applyFilter() {
        this.dataSource.filter = JSON.stringify(this.filter);
    }

    citation() {
        let dialogRef: MatDialogRef<CitationDialogComponent>;

        dialogRef = this.dialog.open(CitationDialogComponent);
        dialogRef.componentInstance.title = 'Dataset citation';
        dialogRef.componentInstance.datasetDetail = this.d;

        return dialogRef.afterClosed();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else if (this.selection.selected.length > 0) {
            this.dataSource.data.forEach(row => this.selection.select(row));
        } else {
            this.dataSource.data.filter(r => r.provider === this.filter.source)
                .forEach(row => this.selection.select(row))
        }
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: FileInfo): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    sendToGalaxy(galaxyUrl: string) {
        if (galaxyUrl === 'Custom...') {
            this.dialogService.singleInputDialog('Enter the Galaxy URL: ').subscribe(instance => {
                if (instance != null) {
                    this.sendToGalaxy(instance);
                }
            });
            return;
        }
        if (galaxyUrl.indexOf('tool_runner') === -1) {
            if (galaxyUrl[galaxyUrl.length - 1] !== '/') {
                galaxyUrl = galaxyUrl + '/';
            }
            galaxyUrl = galaxyUrl + 'tool_runner';
        }
        const files = [];
        this.selection.selected.forEach(file => {
            files.push(file.position);
        });

        const url = `${this.web_service_url}dataset/${this.repository}/${this.acc}/files?position=${files.join(',')}`;
        const request = {
            'URL': url,
            'name': this.acc,
            'tool_id': 'omicsdi',
            'type': 'json'};
        this.redirectService.get(request, galaxyUrl);
    }

    copyDataDRSURLClick(drsURL: string) {
        this.notificationService.success('Сopied to clipboard', drsURL);
    }
}
