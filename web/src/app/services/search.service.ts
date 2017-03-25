import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {SearchResult} from "../model/SearchResult";

@Injectable()
export class SearchService {

  private searchResultSource = new Subject<SearchResult>();
  searchResult$ = this.searchResultSource.asObservable();
  public searchQuery: string;

  url: string = "http://www.omicsdi.org/ws/dataset/search?query=Orbitrap*&facetcount=100&size=15&sortfield=id&order=descending&start=0";

  constructor(private http: Http) {
  }

  public callSearch(searchQuery: string ){
    this.searchQuery = searchQuery;
    this.search(searchQuery).subscribe(searchResult => {
      this.searchResultSource.next(searchResult);
    });
    /** TODO: handle error **/
  }

  search(searchQuery: string): Observable<SearchResult> {
    /** use searchQuery **/
    let searchUrl = this.url.replace('Orbitrap',searchQuery);
    return this.http.get(searchUrl) //,config //{ withCredentials: true }
      .map(this.extractData);
  }

  private extractData(res: Response) : SearchResult {
    let body = res.json();
    //return body || { };
    var searchResult : SearchResult;
    searchResult = (body || { }) as SearchResult;
    return searchResult;
  }
}
