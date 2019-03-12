import {DataSetDetail} from 'model/DataSetDetail';

export class DatasetBatchResult {
    failure: string[];
    datasets: DataSetDetail[];
}
