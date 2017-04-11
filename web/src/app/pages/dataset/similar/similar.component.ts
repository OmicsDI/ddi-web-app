import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {SimilarityService} from "../../../services/similarity.service";
import {SimilarityResult} from "../../../model/SimilarityResult";
import {Subscription} from "rxjs";
import {DataSet} from "../../../model/DataSet";
import {AppConfig} from "../../../app.config";

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {



  d: SimilarityResult = new SimilarityResult;
  subscription: Subscription;
  DEFAULT_DATASET_NUMBER: number = 5;
  datasetNumber: number = this.DEFAULT_DATASET_NUMBER;

  @Input() acc: string;
  @Input() repository: string;

  loadMoreButtonText: string = "Load More";

  constructor(private similarityService: SimilarityService, private appConfig: AppConfig) {
    this.subscription = this.similarityService.searchResult$.subscribe(
      result => {
        this.d = result;
      });
  }

  ngOnInit() {
  }

  ngOnChanges(...args: any[]) {
    console.log('onChange fired');
    console.log('changing', args);

    if((this.acc != null)&&(this.repository != null))
      if((this.acc != "")&&(this.repository != ""))
      {
        this.similarityService.search(this.acc,this.repository);
      }
  }

  loadMore(){
    if(this.datasetNumber == this.DEFAULT_DATASET_NUMBER){
      this.datasetNumber = 100;
      this.loadMoreButtonText = "Go Back";
    }else{
      this.datasetNumber = this.DEFAULT_DATASET_NUMBER;
      this.loadMoreButtonText = "Load More";
    }
  }

  getDatasets() : DataSet[]{
    if(null==this.d)
      return null;
    if(null==this.d.datasets)
      return null;

    return this.d.datasets.slice(0,this.datasetNumber);
  }

  omicsTest(d: DataSet, omics: string ):boolean{
    if(d == null)
      return false;

    if(d.omicsType == null)
      return false;

    return (d.omicsType.indexOf(omics) != -1);
  }

}
