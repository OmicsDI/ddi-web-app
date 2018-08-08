import {Component, OnInit} from '@angular/core';
import {DataSetService} from '@shared/services/dataset.service';
import {MergeCandidate} from 'model/MergeCandidate';
import {NotificationsService} from 'angular2-notifications/dist';
import {ProfileService} from '@shared/services/profile.service';
import {DialogService} from '@shared/services/dialog.service';

@Component({
    selector: 'app-merge',
    templateUrl: './merge.component.html',
    styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

    public mergeControl: boolean;

    test: boolean;
    mergeCandidates: MergeCandidate[];
    count: number;

    checkedDatasets: { basedatabase: string, baseaccession: string, database: string, accession: string }[] = [];
    currentPage = 1;



    constructor(
        public profileService: ProfileService,
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
            .getMergeCandidates(10 * (this.currentPage - 1), 10)
            .subscribe(
                result => {
                    console.log(result);
                    this.mergeCandidates = result;
                }
            );

        this.datasetService
            .getMergeCandidateCount()
            .subscribe(
                result => {
                    this.count = result;
                }
            );
    }

    isChecked(basedatabase: string, baseaccession: string, database: string, accession: string): boolean {
        const index: number = this.checkedDatasets.findIndex(function (obj) {
            return obj.baseaccession === baseaccession && obj.basedatabase === basedatabase &&
                obj.accession === accession && obj.database === database;
        });
        return (index !== -1);
    }

    merge(basedatabase: string, baseaccession: string, database: string, accession: string) {
        const result = new MergeCandidate();
        result.database = database;
        result.accession = accession;
        result.similars = [];

        for (const m of this.checkedDatasets) {

            if (m.baseaccession === baseaccession && m.basedatabase === basedatabase && m.accession !== accession) {
                console.log(m.database + '???' + m.accession);
                result.similars.push({'database': m.database, 'accession': m.accession});
            }


            // //if itis main dataset
            // if(m.database==database && m.accession === accession)
            // {
            //     for(let d of m.similars){
            //         if(this.isChecked(basedatabase,baseaccession,d.database,d.accession)){
            //             result.similars.push({"database":d.database,"accession":d.accession});
            //         }
            //     }
            //     break;
            // }
            // else
            //     {
            //     var found = false;
            //     for(let d of m.similars){
            //         if(d.accession==accession && d.database === database){
            //             found = true;
            //             break;
            //         }
            //     }
            //     if(found){
            //         if(this.isChecked(basedatabase,baseaccession,m.database,m.accession)) {
            //             result.similars.push({"database": m.database, "accession": m.accession});
            //         }
            //         for(let d of m.similars){
            //             if(this.isChecked(basedatabase,baseaccession,d.database,d.accession)) {
            //                 if (!(accession === d.accession && database === d.database)) {
            //                     result.similars.push({"database": d.database, "accession": d.accession});
            //                 }
            //             }
            //         }
            //         break;
            //     }
            // }
        }

        if (result.similars.length > 0) {

            let secondary_accessions = '';
            // var checkMaster = true;
            // for(let m of this.checkedDatasets){
            //     if(m.accession==baseaccession){
            //         checkMaster = false;
            //     }
            // }
            for (const d of result.similars) {
                secondary_accessions += secondary_accessions.length > 0 ? ',' : '';
                secondary_accessions += d.accession;
                // if(d.accession === baseaccession){
                //     checkMaster = false;
                // }
            }
            // if(checkMaster){
            //     var confirmMaster = this.dialogService.confirm("Warning","You didn't sleect master dataset,do you want to continue?")
            //         .subscribe(res => {
            //             if(res){
            //                 var confirm = this.dialogService.confirm('Delete ' + result.similars.length + ' datasets', 'datasets '+
            // secondary_accessions + ' will be added as secondary accessions to ' + result.accession + '(' + result.database + ')')
            //                     .subscribe(res => {
            //                         if(res){
            //
            //                             this.datasetService.merge(result).subscribe(data=>{
            //                                     this.notificationService.success("Datasets merged","sucessfully");
            //                                     this.load();
            //                                 },
            //                                 err=>{
            //                                     this.notificationService.error("Error occured",err);
            //                                 });
            //                         }});
            //             }
            //         });
            // }else{
            const confirm = this.dialogService.confirm('Delete ' + result.similars.length +
                ' datasets', 'datasets ' + secondary_accessions + ' will be added as secondary accessions to ' +
                result.accession + '(' + result.database + ')')
                .subscribe(res => {
                    if (res) {

                        this.datasetService.merge(result).subscribe(data => {
                                this.notificationService.success('Datasets merged', 'sucessfully');
                                this.load();
                            },
                            err => {
                                this.notificationService.error('Error occured', err);
                            });
                    }
                });
            // }
        }
    }

    skipMerge(basedatabase: string, baseaccession: string, database: string, accession: string) {
        const result = new MergeCandidate();
        result.database = database;
        result.accession = accession;
        result.similars = [];

        for (const m of this.checkedDatasets) {
            if (m.baseaccession === baseaccession && m.basedatabase === basedatabase) {
                console.log(m.database + '???' + m.accession);
                result.similars.push({'database': m.database, 'accession': m.accession});
            }
            // if(m.database==database && m.accession === accession)
            // {
            //     for(let d of m.similars){
            //         if(this.isChecked(basedatabase,baseaccession,d.database,d.accession)){
            //             result.similars.push({"database":d.database,"accession":d.accession});
            //         }
            //     }
            //     break;
            // } else {
            //     var found = false;
            //     for(let d of m.similars){
            //         if(d.accession==accession && d.database === database){
            //             found = true;
            //             break;
            //         }
            //     }
            //     if(found){
            //         if(this.isChecked(basedatabase,baseaccession,m.database,m.accession)) {
            //             result.similars.push({"database": m.database, "accession": m.accession});
            //         }
            //           for(let d of m.similars){
            //             if(this.isChecked(basedatabase,baseaccession,d.database,d.accession)) {
            //                 if (!(accession === d.accession && database === d.database)) {
            //                     result.similars.push({"database": d.database, "accession": d.accession});
            //                 }
            //             }
            //         }
            //         break;
            //     }
            // }
        }

        if (result.similars.length > 0) {

            let secondary_accessions = '';
            for (const d of result.similars) {
                secondary_accessions += secondary_accessions.length > 0 ? ',' : '';
                secondary_accessions += d.accession;
            }

            const confirm = this.dialogService.confirm('skip ' + result.similars.length +
                ' datasets', 'datasets ' + secondary_accessions + ' will be skiped')
                .subscribe(res => {
                    if (res) {

                        this.datasetService.skipMerge(result).subscribe(data => {
                                this.notificationService.success('Datasets skiped', 'sucessfully');
                                this.load();
                            },
                            err => {
                                this.notificationService.error('Error occured', err);
                            });
                    }
                });
        }
    }

    multiomicsMerge(basedatabase: string, baseaccession: string, database: string, accession: string) {
        const result = new MergeCandidate();
        result.database = database;
        result.accession = accession;
        result.similars = [];

        for (const m of this.checkedDatasets) {
            if (m.baseaccession === baseaccession && m.basedatabase === basedatabase) {
                console.log(m.database + '???' + m.accession);
                result.similars.push({'database': m.database, 'accession': m.accession});
            }
            // if(m.database==database && m.accession === accession)
            // {
            //     for(let d of m.similars){
            //         if(this.isChecked(basedatabase,baseaccession,d.database,d.accession)){
            //             result.similars.push({"database":d.database,"accession":d.accession});
            //         }
            //     }
            //     break;
            // } else {
            //     var found = false;
            //     for(let d of m.similars){
            //         if(d.accession==accession && d.database === database){
            //             found = true;
            //             break;
            //         }
            //     }
            //     if(found){
            //         if(this.isChecked(basedatabase,baseaccession,m.database,m.accession)) {
            //             result.similars.push({"database": m.database, "accession": m.accession});
            //         }
            //         for(let d of m.similars){
            //             if(this.isChecked(basedatabase,baseaccession,d.database,d.accession)) {
            //                 if (!(accession === d.accession && database === d.database)) {
            //                     result.similars.push({"database": d.database, "accession": d.accession});
            //                 }
            //             }
            //         }
            //         break;
            //     }
            // }
        }

        if (result.similars.length > 0) {

            let secondary_accessions = '';
            for (const d of result.similars) {
                secondary_accessions += secondary_accessions.length > 0 ? ',' : '';
                secondary_accessions += d.accession;
            }

            const confirm = this.dialogService.confirm('skip ' + result.similars.length +
                ' datasets', 'datasets ' + secondary_accessions + ' will be multiomics')
                .subscribe(res => {
                    if (res) {

                        this.datasetService.multiomicsMerge(result).subscribe(data => {
                                this.notificationService.success('Datasets skiped', 'sucessfully');
                                this.load();
                            },
                            err => {
                                this.notificationService.error('Error occured', err);
                            });
                    }
                });
        }
    }


    findCheckedSimilars(database: string, accession: string): { database: string, accession: string }[] {
        return null;
    }

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
