import { Component, OnInit } from '@angular/core';
import {DataSetService} from "../../services/dataset.service";
import {NotificationsService} from "angular2-notifications/dist";
import {DialogServiceMerge} from "../../merge/dialog-merge.service";
import {MergeCandidate} from "../../model/MergeCandidate";
import {forEach} from "@angular/router/src/utils/collection";
import {DialogUnmergeService} from "../../unmerge/dialog-unmerge.service";
import {UnMergeDatasets} from "../../model/Unmerge/UnMergeDatasets";

@Component({
  selector: 'app-unmerge',
  templateUrl: './unmerge.component.html',
  styleUrls: ['./unmerge.component.css']
})
export class UnmergeComponent implements OnInit {

    constructor(
        private datasetService: DataSetService,
        private notificationService: NotificationsService,
        private dialogService: DialogUnmergeService
    ) { }

    test: boolean;
    unMergeCandidates: UnMergeDatasets[] = [];
    counts: number;
    checkedDatasets: {basedatabase:string, baseaccession:string, database:string, accession:string }[] = new Array<{basedatabase:string, baseaccession:string, database:string, accession:string }>();
    currentPage: number = 1;

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
            )

        // this.datasetService
        //     .getUnMergeCandidateCount()
        //     .subscribe(
        //         result => {
        //             this.mergeCandidates = result;
        //             this.counts = this.mergeCandidates.length;
        //         }
        //     )
    }

    isChecked(basedatabase: string, baseaccession: string, database: string, accession: string): boolean{
        const index: number = this.checkedDatasets.findIndex(function(obj) { return obj.baseaccession == baseaccession && obj.basedatabase == basedatabase && obj.accession == accession && obj.database == database });
        return (index !== -1)
    }



    unmerge(basedatabase: string, baseaccession: string, database: string, accession: string){
        let list = new Array();
        for ( let y of this.checkedDatasets ){
            let unmerge = this.unMergeCandidates.find( x => {
                return x.masterAccession == y.baseaccession && x.masterDatabase == y.basedatabase && x.dataset.accession == y.accession && x.dataset.database == y.database
            });
            list.push(unmerge);
        }
            console.log(list);



            var confirm = this.dialogService.confirm('unmerge datasets', 'unmerge datasets')
                .subscribe(res => {
                    if(res){

                        this.datasetService.unmerge(list).subscribe(data=>{
                                this.notificationService.success("Datasets Unmerged","sucessfully");
                                this.load();
                            },
                            err=>{
                                this.notificationService.error("Error occured",err);
                                this.load();
                            });
                    }});
            };



    check(basedatabase: string, baseaccession: string,database: string, accession: string, checked:Boolean){

        if(checked){
            var o = {"basedatabase":basedatabase, "baseaccession":baseaccession, "database":database, "accession":accession,"ischecked":checked};
            this.checkedDatasets.push(o);
        }
        else{
            const index: number = this.checkedDatasets.findIndex(function(obj) { return obj.baseaccession == baseaccession && obj.basedatabase == basedatabase && obj.accession == accession && obj.database == database });
            if (index !== -1) {
                this.checkedDatasets.splice(index, 1);
            }
        }
    }

    getPage(page: number){
        this.currentPage = page;
        this.load();
    }


}
