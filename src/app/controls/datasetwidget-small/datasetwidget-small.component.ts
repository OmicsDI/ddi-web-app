import {Component, Input, OnInit} from '@angular/core';
import {DataSetService} from "../../services/dataset.service";
import {DataSetDetail} from "../../model/DataSetDetail";

@Component({
  selector: 'app-datasetwidget-small',
  templateUrl: './datasetwidget-small.component.html',
  styleUrls: ['./datasetwidget-small.component.css']
})
export class DatasetwidgetSmallComponent implements OnInit {

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
