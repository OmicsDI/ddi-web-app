import {DataSet} from './DataSet';
import {Facet} from './Facet';

/**
 * Created by user on 3/22/2017.
 */

export class SearchResult {
    count: number;
    datasets: DataSet[];
    facets: Facet[];
}
