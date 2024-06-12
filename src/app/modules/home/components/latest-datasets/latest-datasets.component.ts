import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataSetService} from '@shared/services/dataset.service';
import {DataSet} from 'app/model/DataSet';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';
import {LogService} from '@shared/modules/logs/services/log.service';
import {TimeUtils} from '@shared/utils/time-utils';


@Component({
    selector: 'app-latest-datasets',
    templateUrl: './latest-datasets.component.html',
    styleUrls: ['./latest-datasets.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ {provide: AsyncInitialisedComponent, useExisting: LatestDatasetsComponent }]
})
export class LatestDatasetsComponent extends AsyncInitialisedComponent implements OnInit {

    static requestLatestDatasetFailed;

    latestDatasets: DataSet[];
    proteomics_list: string;
    metabolomics_list: string;
    genomics_list: string;
    transcriptomics_list: string;

    constructor(private dataSetService: DataSetService, private logger: LogService, private cd: ChangeDetectorRef) {
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
                this.cd.detectChanges();
            })
            .then(() => {
                if (this.latestDatasets == null) {
                    LatestDatasetsComponent.requestLatestDatasetFailed = true;
                    this.cd.detectChanges();
                    this.logger.debug('datasets array is empty');
                }
            })
            .catch(this.handleError)
        ;
    }

    private handleError(error: any) {

        LatestDatasetsComponent.requestLatestDatasetFailed = true;
        if (this) {
            this.cd.detectChanges();
        }
        return Promise.reject(error.message || error);
    }

    isRequestLatestDatasetFailed(): boolean {
        return LatestDatasetsComponent.requestLatestDatasetFailed;
    }

    getMonthDayYear(dateString: string): string {
        return TimeUtils.getMonthDayYear(dateString);
    }

}
