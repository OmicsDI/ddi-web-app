import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Http} from "@angular/http";
import {DataSetDetail} from "../../model/DataSetDetail";
import {Subscription} from 'rxjs/Rx';
import {DataSetService} from "../../services/dataset.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit, OnDestroy {
  d: DataSetDetail = new DataSetDetail();
  subscription: Subscription;

  acc:string;
  repository:string;

  constructor(private dataSetService: DataSetService, private route: ActivatedRoute) {
    console.info("DatasetComponent ctor");
    this.subscription = this.dataSetService.dataSetDetail$.subscribe(
      result => {
        console.info("dataSetDetail$ subscribtion");
        this.d = result;
        console.info("dataSetDetailResult:" + result);
        console.info("publicationIds:" + result.publicationIds);
      });


    //
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
          this.acc = params['acc'];
          this.repository = params['domain'];
          this.dataSetService.getDataSetDetail(this.acc,this.repository);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
