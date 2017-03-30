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

  pageSize: string = "15";
  currentPage: number = 1;

  sortOrder: string = "ascending";
  sortBy: string = "id";

  selectedPageSize = "10";
  pageSizes = ["10","20","50","100" ];


  constructor(private http: Http) {
  }

  public callSearch(searchQuery: string ){
    this.callSearch1(searchQuery,1);
  }

  public callSearch1(searchQuery: string, page: number ){
    this.currentPage = page;
    this.searchQuery = searchQuery;
    this.search(searchQuery, page).subscribe(searchResult => {
      this.searchResultSource.next(searchResult);
    });
    /** TODO: handle error **/
  }

  search(searchQuery: string, page: number): Observable<SearchResult> {
    /** use searchQuery **/
    let searchUrl = this.url.replace('Orbitrap*',searchQuery);
    searchUrl = searchUrl.replace('start=0','start=' + String((page-1)*15));

    searchUrl = searchUrl.replace('sortfield=id','sortfield='+this.sortBy);
    searchUrl = searchUrl.replace('order=descending','order='+this.sortOrder);

    searchUrl = searchUrl.replace('size=15','size='+this.pageSize);

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

  page(page: number){
    this.callSearch1(this.searchQuery, page); //page
  }

  sort(){
    this.currentPage = 1;
    this.callSearch(this.searchQuery); //page
  }

  changePageSize(size: string){
    this.pageSize = size;
    this.callSearch1(this.searchQuery,1);
  }

}
