import {Synonyms} from "./Synonyms";
import {OriginalAttributes} from "./OriginalAttributes";
import {Id} from "./Id";
/**
 * Created by user on 3/25/2017.
 */
export class EnrichmentInfo {
  cd?: any;
  lmd?: any;
  cb?: any;
  lmb?: any;
  category?: any;
  accession: string;
  database: string;
  enrichTime: number;
  status: string;
  synonyms: Synonyms;
  originalAttributes: OriginalAttributes;
  id: Id;
}
