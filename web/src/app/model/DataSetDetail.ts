import {Protocol} from "./Protocol";
import {Organism} from "./Organism";
import {Dates} from "./Dates";
/**
 * Created by user on 3/25/2017.
 */
declare module namespace {

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
    similars?: any;
    organization?: any;
    dates: Dates;
    submitter: string[];
    submitterMail: string[];
    labHead?: any;
    labHeadMail?: any;
  }

}


