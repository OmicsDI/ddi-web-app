import {Protocol} from './Protocol';
import {Organism} from './Organism';
import {Dates} from './Dates';
import {SimilarDataset} from './SimilarDataset';

/**
 * Created by user on 3/25/2017.
 */
export class DataSetDetail {
    id: string;
    source: string;
    name: string;
    description: string;
    keywords?: any;
    organisms: Organism[];
    publicationDate: string;
    publicationIds: string[];
    protocols: Protocol[];
    instruments?: any;
    experimentType?: any;
    labMembers?: any;
    full_dataset_link: string;
    tissues?: any;
    diseases?: any;
    omics_type: string[];
    similars: SimilarDataset[];
    organization?: any;
    dates: Dates;
    submitter: string[];
    submitterMail: string[];
    labHead?: any;
    labHeadMail?: any;
    reanalysis_of = 'reanalysis_of';
    reanalised_by = 'reanalised_by';
    related_omics = 'related_omics';
    secondary_accession: string[];
    repositories: string[];

    constructor() {
        this.omics_type = [];
    }

    omicsTest(omics: string): boolean {
        if (this.omics_type === null) {
            return false;
        }
        return (this.omics_type.indexOf(omics) !== -1);
    }


}


