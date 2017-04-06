import { Component, OnInit } from '@angular/core';
import { DataSetService } from 'app/services/dataset.service';
import { DataSet } from 'app/model/DataSet';


@Component({
  selector: 'app-latest-datasets',
  templateUrl: './latest-datasets.component.html',
  styleUrls: ['./latest-datasets.component.css'],
  providers: [DataSetService]
})
export class LatestDatasetsComponent implements OnInit {

  latestDatasets: DataSet[];
  static requestLatestDatasetFailed;
  proteomics_list: string;
  metabolomics_list: string;
  genomics_list: string;
  transcriptomics_list: string;
   
  constructor(private dataSetService: DataSetService) {
    LatestDatasetsComponent.requestLatestDatasetFailed = false;
  }

  ngOnInit() {

    this.proteomics_list = this.dataSetService.getProteomicsList();
    this.metabolomics_list = this.dataSetService.getMetabolomicsList();
    this.genomics_list = this.dataSetService.getGenomicsList();
    this.transcriptomics_list = this.dataSetService.getTranscriptomicsList();

    this.dataSetService.getLatestDataSet()
      .then(res => {
        this.latestDatasets = res["datasets"];
      })
      .then(() => {
        if (this.latestDatasets == null) {
          LatestDatasetsComponent.requestLatestDatasetFailed = true;
        }
      })
      .catch(this.handleError)
      ;
  }
  private handleError(error: any) {

    LatestDatasetsComponent.requestLatestDatasetFailed = true;
    return Promise.reject(error.message || error);
  }
  isRequestLatestDatasetFailed(): boolean {
    return LatestDatasetsComponent.requestLatestDatasetFailed;
  }
  getMonthDay(dateString: string): string{
    return this.dataSetService.getMonthDay(dateString);
  }

}
