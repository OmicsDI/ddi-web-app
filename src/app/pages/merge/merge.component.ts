import { Component, OnInit } from '@angular/core';
import {DataSetService} from "../../services/dataset.service";
import {MergeCandidate} from "../../model/MergeCandidate";
import {DataSetShort} from "../../model/DataSetShort";
import {NotificationsService} from "angular2-notifications/dist";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

  constructor(
      private datasetService: DataSetService,
      private notificationService: NotificationsService,
      private dialogService: DialogService
  ) { }

  mergeCandidates: MergeCandidate[];
  count: number;
  checkedDatasets: {database:string, accession:string}[] = new Array<{database:string, accession:string}>();
  currentPage: number = 1;

  ngOnInit() {
        this.load();
  }

  load() {
      this.datasetService
          .getMergeCandidates(10 * (this.currentPage - 1) , 10)
          .subscribe(
              result => {
                  console.log(result);
                  this.mergeCandidates = result;
              }
          )

      this.datasetService
          .getMergeCandidateCount()
          .subscribe(
              result => {
                  this.count = result;
              }
          )
  }

  isChecked(database: string, accession: string): boolean{
      const index: number = this.checkedDatasets.findIndex(function(obj) { return obj.accession == accession && obj.database == database });
      return (index !== -1)
  }

  merge(database: string, accession: string){
      var result = new MergeCandidate();
      result.database = database;
      result.accession = accession;
      result.similars = new Array();

    for(let m of this.mergeCandidates)
    {
        if(m.database==database && m.accession == accession)
        {
            for(let d of m.similars){
                if(this.isChecked(d.database,d.accession)){
                    result.similars.push({"database":d.database,"accession":d.accession});
                }
            }
            break;
        } else {
            var found = false;
            for(let d of m.similars){
                if(d.accession==accession && d.database == database){
                    found = true;
                    break;
                }
            }
            if(found){
                if(this.isChecked(m.database,m.accession)) {
                    result.similars.push({"database": m.database, "accession": m.accession});
                }
                for(let d of m.similars){
                    if(this.isChecked(d.database,d.accession)) {
                        if (!(accession == d.accession && database == d.database)) {
                            result.similars.push({"database": d.database, "accession": d.accession});
                        }
                    }
                }

            }
        }
    }

    if(result.similars.length > 0) {

        var secondary_accessions = "";
        for(let d of result.similars){
            secondary_accessions += secondary_accessions.length > 0 ? "," : "";
            secondary_accessions += d.accession;
        }

        var confirm = this.dialogService.confirm('Delete ' + result.similars.length + ' datasets', 'datasets ' + secondary_accessions + ' will be added as secondary accessions to ' + result.accession + '(' + result.database + ')')
            .subscribe(res => {
                if(res){

                    this.datasetService.merge(result).subscribe(data=>{
                            this.notificationService.success("Datasets merged","sucessfully");
                            this.load();
                        },
                        err=>{
                            this.notificationService.error("Error occured",err);
                        });
                }});
    }
  }


    skipMerge(database: string, accession: string){
        var result = new MergeCandidate();
        result.database = database;
        result.accession = accession;
        result.similars = new Array();

        for(let m of this.mergeCandidates)
        {
            if(m.database==database && m.accession == accession)
            {
                for(let d of m.similars){
                    if(this.isChecked(d.database,d.accession)){
                        result.similars.push({"database":d.database,"accession":d.accession});
                    }
                }
                break;
            } else {
                var found = false;
                for(let d of m.similars){
                    if(d.accession==accession && d.database == database){
                        found = true;
                        break;
                    }
                }
                if(found){
                    if(this.isChecked(m.database,m.accession)) {
                        result.similars.push({"database": m.database, "accession": m.accession});
                    }
                      for(let d of m.similars){
                        if(this.isChecked(d.database,d.accession)) {
                            if (!(accession == d.accession && database == d.database)) {
                                result.similars.push({"database": d.database, "accession": d.accession});
                            }
                        }
                    }

                }
            }
        }

        if(result.similars.length > 0) {

            var secondary_accessions = "";
            for(let d of result.similars){
                secondary_accessions += secondary_accessions.length > 0 ? "," : "";
                secondary_accessions += d.accession;
            }

            var confirm = this.dialogService.confirm('skip ' + result.similars.length + ' datasets', 'datasets ' + secondary_accessions + ' will be skiped')
                .subscribe(res => {
                    if(res){

                        this.datasetService.skipMerge(result).subscribe(data=>{
                                this.notificationService.success("Datasets skiped","sucessfully");
                                this.load();
                            },
                            err=>{
                                this.notificationService.error("Error occured",err);
                            });
                    }});
        }
    }

    multiomicsMerge(database: string, accession: string){
        var result = new MergeCandidate();
        result.database = database;
        result.accession = accession;
        result.similars = new Array();

        for(let m of this.mergeCandidates)
        {
            if(m.database==database && m.accession == accession)
            {
                for(let d of m.similars){
                    if(this.isChecked(d.database,d.accession)){
                        result.similars.push({"database":d.database,"accession":d.accession});
                    }
                }
                break;
            } else {
                var found = false;
                for(let d of m.similars){
                    if(d.accession==accession && d.database == database){
                        found = true;
                        break;
                    }
                }
                if(found){
                    if(this.isChecked(m.database,m.accession)) {
                        result.similars.push({"database": m.database, "accession": m.accession});
                    }
                    for(let d of m.similars){
                        if(this.isChecked(d.database,d.accession)) {
                            if (!(accession == d.accession && database == d.database)) {
                                result.similars.push({"database": d.database, "accession": d.accession});
                            }
                        }
                    }

                }
            }
        }

        if(result.similars.length > 0) {

            var secondary_accessions = "";
            for(let d of result.similars){
                secondary_accessions += secondary_accessions.length > 0 ? "," : "";
                secondary_accessions += d.accession;
            }

            var confirm = this.dialogService.confirm('skip ' + result.similars.length + ' datasets', 'datasets ' + secondary_accessions + ' will be skiped')
                .subscribe(res => {
                    if(res){

                        this.datasetService.multiomicsMerge(result).subscribe(data=>{
                                this.notificationService.success("Datasets skiped","sucessfully");
                                this.load();
                            },
                            err=>{
                                this.notificationService.error("Error occured",err);
                            });
                    }});
        }
    }



  findCheckedSimilars(database: string,accession: string) : {database: string,accession: string}[]
  {
      return null;
  }

 check(database: string, accession: string, checked:Boolean){
     var o = {"database":database, "accession":accession};
     if(checked){
         this.checkedDatasets.push(o);
     }
     else{
         const index: number = this.checkedDatasets.findIndex(function(obj) { return obj.accession == accession && obj.database == database });
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
