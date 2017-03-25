import {Synonyms} from "./EnrichmentInfo/Synonyms";
import {OriginalAttributes} from "./EnrichmentInfo/OriginalAttributes";
import {Id} from "./EnrichmentInfo/Id";
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
