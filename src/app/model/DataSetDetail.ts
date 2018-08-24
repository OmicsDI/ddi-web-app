import {Protocol} from './Protocol';
import {Organism} from './Organism';
import {Dates} from './Dates';
import {SimilarDataset} from './SimilarDataset';
import {DataSet} from 'model/DataSet';
import {LabMember} from 'model/LabMember';
import {Scores} from 'model/Scores';
import {DatasetSimilar} from 'model/DatasetSimilar';

/**
 * Created by user on 3/25/2017.
 */
export class DataSetDetail {
    repositories: string[];
    tissues: string[];
    diseases: string[];
    citationsCount: number;
    connectionsCount: number;
    viewsCount: number;
    reanalysisCount: number;
    claimable: boolean;
    labHead: string[];
    labHeadMail: string[];
    submitter: string[];
    submitterMail: string[];
    publicationDate: string;
    publicationIds: string[];
    organisms: Organism[];
    protocols: Protocol[];
    labMembers: LabMember[];
    full_dataset_link: string;
    instruments: string[];
    experimentType: string[];
    dates: Map<string, Set<string>>;
    scores: Scores;
    similars: DatasetSimilar[];
    secondary_accession: string[];
    keywords: string[];
    omics_type: string[];
    description: string;
    source: string;
    organization: string[];
    name: string;
    id: string;

    public static toDataset(datasetDetails: DataSetDetail): DataSet {
        const dataset = new DataSet();
        dataset.id = datasetDetails.id;
        dataset.source = datasetDetails.source;
        dataset.title = datasetDetails.name;
        dataset.description = datasetDetails.description;
        dataset.keywords = datasetDetails.keywords;
        dataset.organisms = datasetDetails.organisms;
        if (datasetDetails.tissues) {
            for ( const tissue of datasetDetails.tissues) {
                dataset.tissues.push({name: tissue});
            };
        } else {
            dataset.tissues = null;
        };

        if (datasetDetails.diseases) {
            for ( const disease of datasetDetails.diseases) {
                dataset.diseases.push({name: disease});
            };
        } else {
            dataset.diseases = null;
        };
        dataset.omicsType = datasetDetails.omics_type;
        dataset.publicationDate = datasetDetails.publicationDate;
        dataset.score = datasetDetails.scores;
        dataset.claimable = datasetDetails.claimable;
        dataset.citationsCount = datasetDetails.citationsCount;
        dataset.connectionsCount = datasetDetails.connectionsCount;
        dataset.reanalysisCount = datasetDetails.reanalysisCount;
        dataset.viewsCount = datasetDetails.viewsCount;
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


