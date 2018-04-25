import {Component, Input, OnInit} from '@angular/core';
import {DataSetService} from "../../services/dataset.service";
import {DataSetDetail} from "../../model/DataSetDetail";

@Component({
  selector: 'app-datasetwidget-small-dashboard',
  templateUrl: './datasetwidget-small-dashboard.component.html',
  styleUrls: ['./datasetwidget-small-dashboard.component.css']
})
export class DatasetwidgetSmallDashboardComponent implements OnInit {

  @Input() id: string;
  @Input() source: string;

  dataSetDetail: DataSetDetail;

  constructor(private dataSetService: DataSetService) {

  }

  ngOnInit() {
    this.dataSetService.getDataSetDetail_private(this.id, this.source).subscribe(
        x=>this.dataSetDetail = x
    )

  }

}
