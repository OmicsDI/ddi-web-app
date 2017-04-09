import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {SearchResult} from "../model/SearchResult";
import {AppConfig} from "../app.config";
import {BaseService} from "./base.service";

@Injectable()
export class SearchService extends BaseService{

  private searchResultSource = new Subject<SearchResult>();

  searchResult$ = this.searchResultSource.asObservable();

  public searchQuery: string;

  pageSize: number = 15;
  currentPage: number = 1;

  sortOrder: string = "ascending";
  sortBy: string = "id";

  selectedPageSize = "10";
  pageSizes = ["10","20","50","100" ];

  constructor(private http: Http, private appConfig: AppConfig) {
    super()
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
    return this.http.get(this.appConfig.getSearchUrl(searchQuery,100,this.pageSize,this.sortBy,this.sortOrder,(page-1)*15))
      .map(x => this.extractData<SearchResult>(x));
  }

  page(page: number){
    this.callSearch1(this.searchQuery, page); //page
  }

  sort(){
    this.currentPage = 1;
    this.callSearch(this.searchQuery); //page
  }

  changePageSize(size: number){
    this.pageSize = size;
    this.callSearch1(this.searchQuery,1);
  }

}
