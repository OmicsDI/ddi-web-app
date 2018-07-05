import {Pipe, PipeTransform} from '@angular/core';
import {DataSet} from 'model/DataSet';

@Pipe({
    name: 'limitDatasetNumbers'
})
export class LimitDatasetNumbersPipe implements PipeTransform {

    transform(datasets: DataSet[], args?: any): DataSet[] {
        return datasets.slice(0, parseInt(args, 10));
    }

}
