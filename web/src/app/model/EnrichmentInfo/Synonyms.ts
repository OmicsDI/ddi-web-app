import {Synonym} from "./Synonym";
/**
 * Created by user on 3/25/2017.
 */
export interface Synonyms {
  name: Synonym[];
  description: Synonym[];
  pubmed_title: Synonym[];
  pubmed_abstract: Synonym[];
  sample_protocol: Synonym[];
  data_protocol: Synonym[];
}
