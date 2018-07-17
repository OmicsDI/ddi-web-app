import {Component, OnInit} from '@angular/core';
import {DataSetService} from '@shared/services/dataset.service';
import {NotificationsService} from 'angular2-notifications/dist';
import {UnMergeDatasets} from 'model/unmerge/UnMergeDatasets';
import {DialogService} from '@shared/services/dialog.service';

@Component({
    selector: 'app-unmerge',
    templateUrl: './unmerge.component.html',
    styleUrls: ['./unmerge.component.css']
})
export class UnmergeComponent implements OnInit {

    test: boolean;
    unMergeCandidates: UnMergeDatasets[] = [];
    counts: number;
    checkedDatasets: { basedatabase: string, baseaccession: string, database: string, accession: string }[] = [];
    currentPage = 1;

    constructor(
        private datasetService: DataSetService,
        private notificationService: NotificationsService,
        private dialogService: DialogService
    ) {
    }

    ngOnInit() {
        this.test = false;
        this.load();
    }

    load() {
        this.datasetService
            .getUnMergeCandidates()
            .subscribe(
                result => {
                    console.log(result);
                    this.unMergeCandidates = result;
                    this.counts = this.unMergeCandidates.length;
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
        console.log(list);


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


}
