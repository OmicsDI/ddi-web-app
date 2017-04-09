import { Component, OnInit } from '@angular/core';
import { DataSetService } from 'app/services/dataset.service';
import { DataSet } from 'app/model/DataSet';

@Component({
  selector: 'app-most-accessed',
  templateUrl: './most-accessed.component.html',
  styleUrls: ['./most-accessed.component.css'],
  providers: [DataSetService]
})

export class MostAccessedComponent implements OnInit {

  mostAccessedDatasets: DataSet[];
  static requestMostAccessedDatasetFailed;
  proteomics_list: string;
  metabolomics_list: string;
  genomics_list: string;
  transcriptomics_list: string;

  constructor(private dataSetService: DataSetService) {
    MostAccessedComponent.requestMostAccessedDatasetFailed = false;
  }

  ngOnInit() {

    this.proteomics_list = this.dataSetService.getProteomicsList();
    this.metabolomics_list = this.dataSetService.getMetabolomicsList();
    this.genomics_list = this.dataSetService.getGenomicsList();
    this.transcriptomics_list = this.dataSetService.getTranscriptomicsList();

    this.dataSetService.getMostAccessedDataSets()
      .then(res => {
        this.mostAccessedDatasets = res["datasets"];
        this.mostAccessedDatasets.length = 10;
        this.mostAccessedDatasets.sort(function (dataset1, dataset2) {
          if (dataset1.visitCount > dataset2.visitCount) {
            return -1;
          } else if (dataset1.visitCount < dataset2.visitCount) {
            return 1;
          } else {
            return 0;
          }

        })

        // console.log(this.mostAccessedDatasets);
      })
      .then(() => {
        if (this.mostAccessedDatasets === null) {
          MostAccessedComponent.requestMostAccessedDatasetFailed = true;
          console.log("datasets array is empty");
        }
      })
      .catch(this.handleError)
      ;
  }
  private handleError(error: any) {

    MostAccessedComponent.requestMostAccessedDatasetFailed = true;
    console.log("GET error with url: http://www.omicsdi.org/ws/dataset/mostAccessed?size=20");
    return Promise.reject(error.message || error);
  }
  isRequestMostAccessedDatasetFailed(): boolean {
    return MostAccessedComponent.requestMostAccessedDatasetFailed;
  }

}
