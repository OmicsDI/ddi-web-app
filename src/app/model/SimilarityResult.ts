/**
 * Created by user on 3/25/2017.
 */
import {DataSet} from './DataSet';
import {Facet} from './Facet';

/**
 * Created by user on 3/22/2017.
 */

export class SimilarityResult {
    count: number;
    datasets: DataSet[];
    facets: Facet[];

    constuctor() {
        this.datasets = [];
    }
}
