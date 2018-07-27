import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataSetService} from '@shared/services/dataset.service';
import {DataSet} from 'app/model/DataSet';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';


@Component({
    selector: 'app-latest-datasets',
    templateUrl: './latest-datasets.component.html',
    styleUrls: ['./latest-datasets.component.css'],
    providers: [ {provide: AsyncInitialisedComponent, useExisting: LatestDatasetsComponent }]
})
export class LatestDatasetsComponent extends AsyncInitialisedComponent implements OnInit {

    static requestLatestDatasetFailed;

    private widgetName = 'latest_datasets';
    latestDatasets: DataSet[];
    proteomics_list: string;
    metabolomics_list: string;
    genomics_list: string;
    transcriptomics_list: string;

    constructor(private dataSetService: DataSetService) {
        super();
        LatestDatasetsComponent.requestLatestDatasetFailed = false;
    }

    ngOnInit() {

        this.proteomics_list = this.dataSetService.getProteomicsList();
        this.metabolomics_list = this.dataSetService.getMetabolomicsList();
        this.genomics_list = this.dataSetService.getGenomicsList();
        this.transcriptomics_list = this.dataSetService.getTranscriptomicsList();

        this.dataSetService.getLatestDataSets()
            .then(res => {
                this.componentLoaded();

                this.latestDatasets = res['datasets'];
            })
            .then(() => {
                if (this.latestDatasets == null) {
                    LatestDatasetsComponent.requestLatestDatasetFailed = true;
                    console.log('datasets array is empty');
                }
            })
            .catch(this.handleError)
        ;
    }

    private handleError(error: any) {

        LatestDatasetsComponent.requestLatestDatasetFailed = true;
        console.log('GET error with url: http://www.omicsdi.org/ws/dataset/dataset/latest?size=10');
        return Promise.reject(error.message || error);
    }

    isRequestLatestDatasetFailed(): boolean {
        return LatestDatasetsComponent.requestLatestDatasetFailed;
    }

    getMonthDay(dateString: string): string {
        return this.dataSetService.getMonthDay(dateString);
    }

}
