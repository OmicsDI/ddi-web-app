import { Injectable } from '@angular/core';
import {SimilarityResult} from "../model/SimilarityResult";
import {Subject, Observable} from "rxjs";
import {Http, Response} from "@angular/http";

@Injectable()
export class DatasetService {

  constructor(private http: Http) { }

  private searchResultSource = new Subject<SimilarityResult>();
  searchResult$ = this.searchResultSource.asObservable();
  public searchQuery: string;

  //http://www.omicsdi.org/ws/dataset/get?acc=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/dataset/getSimilar?acc=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/dataset/getFileLinks?acc=E-GEOD-66737&database=arrayexpress-repository

  //http://www.omicsdi.org/ws/enrichment/getSimilarityInfo?accession=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/enrichment/getEnrichmentInfo?accession=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/enrichment/getSimilarDatasetsByBiologicalData?accession=E-GEOD-66737&database=arrayexpress-repository
  //http://www.omicsdi.org/ws/enrichment/getSynonymsForDataset?accession=E-GEOD-66737&database=arrayexpress-repository

  //http://www.omicsdi.org/ws/publication/list?acc=26404089

  url: string = "http://www.omicsdi.org/ws/dataset/search?query=Orbitrap*&facetcount=100&size=15&sortfield=id&order=descending&start=0";

  public callSearch(searchQuery: string ){
    this.searchQuery = searchQuery;
    this.search(searchQuery).subscribe(searchResult => {
      this.searchResultSource.next(searchResult);
    });
    /** TODO: handle error **/
  }

  search(searchQuery: string): Observable<SimilarityResult> {
    /** use searchQuery **/
    let searchUrl = this.url.replace('Orbitrap',searchQuery);
    return this.http.get(searchUrl) //,config //{ withCredentials: true }
      .map(this.extractData);
  }

  private extractData(res: Response) : SimilarityResult {
    let body = res.json();
    //return body || { };
    var searchResult : SimilarityResult;
    searchResult = (body || { }) as SimilarityResult;
    return searchResult;
  }
}
