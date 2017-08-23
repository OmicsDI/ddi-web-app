import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {SearchResult} from "../model/SearchResult";
import {AppConfig} from "../app.config";
import {BaseService} from "./base.service";
import {SearchQuery, Rule} from "../model/SearchQuery";
import {Facet} from "../model/Facet";
import {FacetValue} from "../model/FacetValue";

@Injectable()
export class SearchService extends BaseService{

  private searchResultSource = new Subject<SearchResult>();

  searchResult$ = this.searchResultSource.asObservable();

  private _textQuery: string;

  public get textQuery() : string {
    return this._textQuery;
  }
  public set textQuery(value){
      this._textQuery = value;
      this._fullQuery = this.getFullQuery();
  }

  public _paramQuery: SearchQuery = new SearchQuery();
  public get paramQuery() : SearchQuery {
    return this._paramQuery;
  }
  public set paramQuery(value){
    this._paramQuery = value;
    this._fullQuery = this.getFullQuery();
  }

  private _fullQuery: string;


  /*** fullQuery can be set explicitely, textQuery,paramQuery not updated ***/
  public get fullQuery(): string{
    return this._fullQuery;
  }
  public set fullQuery(value){
    this._textQuery = value;
    this._paramQuery = new SearchQuery();
    this.selectedFacets = new Object();
    this._fullQuery = this.getFullQuery();
  }

  public currentQuery: string; //fullQuery after you press search;


  currentPage: number = 1;

  sortOrder: string = "ascending";
  sortBy: string = "";

  selectedPageSize = 30;
  pageSizes = ["10","20","30","50","100" ];

  public facets: Facet[];

  constructor(private http: Http, private appConfig: AppConfig) {
    super()
  }

  private getFullQuery(): string{
    let result: string = "";
    if(this.textQuery){
      result += this.textQuery;
    }
    let s = this.paramQuery.toQueryString();
    //// query string built by legacy algorithm
    if (s == '((""))')
      s = "";
    if (s == '(())')
      s = "";
    if(s=='()')
      s = "";
    if( s != "")
    {
      if(result)
        result = "(" + result + " AND " +  this.paramQuery.toQueryString() + ")";
      else
        result = this.paramQuery.toQueryString();
    }
    return result;
  }

  public callSearch(page: number = 1 ){
    this.currentQuery = this.fullQuery;
    this.currentPage = page;
    this.search(this.fullQuery, page).subscribe(searchResult => {
      this.searchResultSource.next(searchResult);
      this.facets = (JSON.parse(JSON.stringify(searchResult.facets)));
    });
    /** TODO: handle error **/
  }

  private search(searchQuery: string, page: number): Observable<SearchResult> {
    return this.http.get(this.appConfig.getSearchUrl(searchQuery,100,this.selectedPageSize,this.sortBy,this.sortOrder,(page-1)*15))
      .map(x => this.extractData<SearchResult>(x));
  }

  page(page: number){
    this.callSearch(page); //page
  }

  sort(){
    this.currentPage = 1;
    this.callSearch(); //page
  }

  changePageSize(){
    this.callSearch(1);
  }

  selectedFacets: Object = new Object; //string=>string[]

  selectFacet(id:string, value:string){
    if(null==this.selectedFacets[id])
      this.selectedFacets[id] = new Array<string>();

    this.selectedFacets[id].push(value);
  }

  unselectFacet(id:string, value:string){
    this.selectedFacets[id].splice(this.selectedFacets[id].indexOf(value),1);
  }

  unselectFacets(){
    this.selectedFacets = new Object();
  }

  isFacetSelected(id:string, value:string):boolean{
    if(null == this.selectedFacets[id])
      return false;

    let result:boolean = (this.selectedFacets[id].indexOf(value) != -1);

    return result;
  }

  callSearchByFacets(){
    this.paramQuery = new SearchQuery();

    this.paramQuery.operator = "AND";
    this.paramQuery.rules = new Array<Rule>();
    for (var id in this.selectedFacets) {
      if(this.selectedFacets[id].length == 0)
        continue;

      let rule: Rule = new Rule();
      if(this.selectedFacets[id].length > 1){
        let q: SearchQuery = new SearchQuery();
        q.operator = (id=="omics_type"?"AND":"OR");
        q.rules = new Array<Rule>();
        for(let i of this.selectedFacets[id]){
          let r:Rule = new Rule();
          r.field = id;
          r.data = i;
          r.condition = "equal";
          q.rules.push(r);
        }
        rule.query = q;
      }
      else{
        rule.field = id;
        rule.data = this.selectedFacets[id][0];
        rule.condition = 'equal';
      }
      this.paramQuery.rules.push(rule);
    }

    this._fullQuery = this.getFullQuery();
    this.callSearch();
  }

  getFacetValues(facet: string):FacetValue[]{
    let result: FacetValue[];
    result = new Array<FacetValue>();

    if(null == this.facets){
      let v:FacetValue = new FacetValue();
      v.label = "label1";
      v.value = "value1";
      result.push(v);
    }
    else{
      for(let f of this.facets)
      {
        if(f.id == facet){
          for(let w of f.facetValues) {
            let v: FacetValue = new FacetValue();
            v.label = w.label;
            v.value = w.value;
            result.push(v);
          }
        }
      }
    }
    return result;
  }
}
