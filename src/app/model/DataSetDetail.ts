import {Protocol} from './Protocol';
import {Organism} from './Organism';
import {Dates} from './Dates';
import {SimilarDataset} from './SimilarDataset';
import {DataSet} from 'model/DataSet';

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
    score = 0;
    visitCount = 0;
    claimable = false;
    citationsCount = 0;
    connectionsCount = 0;
    reanalysisCount = 0;
    viewsCount = 0;
    citationsCountScaled: number;
    connectionsCountScaled: number;
    reanalysisCountScaled: number;
    viewsCountScaled: number;

    public static toDataset(datasetDetails: DataSetDetail): DataSet {
        const dataset = new DataSet();
        dataset.id = datasetDetails.id;
        dataset.source = datasetDetails.source;
        dataset.title = datasetDetails.name;
        dataset.description = datasetDetails.description;
        dataset.keywords = datasetDetails.keywords;
        dataset.organisms = datasetDetails.organisms;
        dataset.tissues = datasetDetails.tissues;
        dataset.diseases = datasetDetails.diseases;
        dataset.omicsType = datasetDetails.omics_type;
        dataset.publicationDate = datasetDetails.publicationDate;
        dataset.score = datasetDetails.score;
        dataset.visitCount = datasetDetails.visitCount;
        dataset.claimable = datasetDetails.claimable;
        dataset.citationsCount = datasetDetails.citationsCount;
        dataset.connectionsCount = datasetDetails.connectionsCount;
        dataset.reanalysisCount = datasetDetails.reanalysisCount;
        dataset.viewsCount = datasetDetails.viewsCount;
        dataset.reanalysisCountScaled = datasetDetails.reanalysisCountScaled;
        dataset.citationsCountScaled = datasetDetails.citationsCountScaled;
        dataset.connectionsCountScaled = datasetDetails.connectionsCountScaled;
        dataset.viewsCountScaled = datasetDetails.viewsCountScaled;
        return dataset;
    }

    constructor() {
        this.omics_type = [];
    }

    omicsTest(omics: string): boolean {
        if (this.omics_type == null) {
            return false;
        }
        return (this.omics_type.indexOf(omics) !== -1);
    }

}


