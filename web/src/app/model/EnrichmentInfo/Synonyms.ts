import {PubmedAbstract} from "./PubmedAbstract";
import {Description} from "./Description";
import {SampleProtocol} from "./SampleProtocol";
import {PubmedTitle} from "./PubmedTitle";
import {DataProtocol} from "./DataProtocol";
/**
 * Created by user on 3/25/2017.
 */
export interface Synonyms {
  pubmed_abstract: PubmedAbstract[];
  description: Description[];
  sample_protocol: SampleProtocol[];
  pubmed_title: PubmedTitle[];
  data_protocol: DataProtocol[];
}
