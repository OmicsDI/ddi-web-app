import {Component, OnInit} from '@angular/core';
import {DataSetService} from '@shared/services/dataset.service';
import {NotificationsService} from 'angular2-notifications';
import {UnMergeDatasets} from 'model/unmerge/UnMergeDatasets';
import {DialogService} from '@shared/services/dialog.service';
import {LogService} from '@shared/modules/logs/services/log.service';
import {NgProgress} from '@ngx-progressbar/core';

@Component({
    selector: 'app-unmerge',
    templateUrl: './unmerge.component.html',
    styleUrls: ['./unmerge.component.css']
})
export class UnmergeComponent implements OnInit {

    test: boolean;
    unMergeCandidates: UnMergeDatasets[];
    counts: number;
    checkedDatasets: { basedatabase: string, baseaccession: string, database: string, accession: string }[] = [];
    currentPage = 1;

    constructor(private datasetService: DataSetService,
                private notificationService: NotificationsService,
                private logger: LogService,
                private slimLoadingBarService: NgProgress,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.test = false;
        this.load();
    }

    load() {
        this.slimLoadingBarService.ref().start();
        this.datasetService
            .getUnMergeCandidates()
            .subscribe(
                result => {
                    this.logger.debug('Unmerge candidates: {}', result);
                    this.unMergeCandidates = result;
                    this.counts = this.unMergeCandidates.length;
                    this.slimLoadingBarService.ref().complete();
                }
            );

        // this.datasetService
        //     .getUnMergeCandidateCount()
        //     .subscribe(
        //         result => {
        //             this.mergeCandidates = result;
        //             this.counts = this.mergeCandidates.length;
        //         }
        //     )
    }

    isChecked(basedatabase: string, baseaccession: string, database: string, accession: string): boolean {
        const index: number = this.checkedDatasets.findIndex(function (obj) {
            return obj.baseaccession === baseaccession && obj.basedatabase === basedatabase &&
                obj.accession === accession && obj.database === database;
        });
        return (index !== -1);
    }


    unmerge(basedatabase: string, baseaccession: string, database: string, accession: string) {
        const list = [];
        for (const y of this.checkedDatasets) {
            const unmerge = this.unMergeCandidates.find(x => {
                return x.masterAccession === y.baseaccession && x.masterDatabase === y.basedatabase &&
                    x.dataset.accession === y.accession && x.dataset.database === y.database;
            });
            list.push(unmerge);
        }
        this.logger.debug('Unmerge list: {}', list);


        const confirm = this.dialogService.confirm('unmerge datasets', 'unmerge datasets')
            .subscribe(res => {
                if (res) {

                    this.datasetService.unmerge(list).subscribe(data => {
                            this.notificationService.success('Datasets Unmerged', 'sucessfully');
                            this.load();
                        },
                        err => {
                            this.notificationService.error('Error occured', err);
                            this.load();
                        });
                }
            });
    };


    check(basedatabase: string, baseaccession: string, database: string, accession: string, checked: Boolean) {

        if (checked) {
            const o = {
                'basedatabase': basedatabase,
                'baseaccession': baseaccession,
                'database': database,
                'accession': accession,
                'ischecked': checked
            };
            this.checkedDatasets.push(o);
        } else {
            const index: number = this.checkedDatasets.findIndex(function (obj) {
                return obj.baseaccession === baseaccession && obj.basedatabase === basedatabase &&
                    obj.accession === accession && obj.database === database;
            });
            if (index !== -1) {
                this.checkedDatasets.splice(index, 1);
            }
        }
    }

    getPage(page: number) {
        this.currentPage = page;
        this.load();
    }

    // todo as a service,not hard coded
    getDatabaseName(dbname) {
        if (dbname) {
            switch (dbname.toLowerCase()) {
                case 'arrayexpress':
                    return 'arrayexpress-repository';
                case 'expressionatlas':
                    return 'atlas-experiments';
                case 'jpost repository':
                    return 'jpost';
                case 'metabolights':
                    return 'metabolights_dataset';
                case 'peptideatlas':
                    return 'peptide_atlas';
                case 'metabolomicsworkbench':
                    return 'metabolomics_workbench';
                case 'metabolomeexpress':
                    return 'metabolome_express';
                default :
                    return dbname.toLowerCase();
            }

        }
    }

}
