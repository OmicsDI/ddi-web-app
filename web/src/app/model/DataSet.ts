import {Organism} from "./Organism";
import {Disease} from "./Disease";
import {Tissue} from "./Tissue";
/**
 * Created by user on 3/22/2017.
 */

export class DataSet {
  id: string;
  source: string;
  title: string;
  description: string;
  keywords: string[];
  organisms: Organism[];
  tissues: Tissue[];
  diseases: Disease[];
  visitCount: number;
  publicationDate: string;
  score?: any;
  omicsType: string[];

  constructor(){
    this.omicsType = [];
  }
}


