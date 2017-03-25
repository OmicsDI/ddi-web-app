/**
 * Created by user on 3/25/2017.
 */
export class Publication {
  id: string;
  source: string;
  authors: string[];
  pubAbstract: string[];
  journal: string;
  issue?: any;
  date: string;
  pagination: string;
  keywords?: any;
  title: string;
  affiliation?: any;
  volume: string;
}
