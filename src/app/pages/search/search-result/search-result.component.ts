import {Component, OnInit, AfterViewChecked, Input, OnDestroy} from '@angular/core';
import {Subscription, Observable} from 'rxjs/Rx';
import {DataSet} from "../../../model/DataSet";
import {SearchService} from "../../../services/search.service";
import {TruncatePipe} from "../../../pipes/truncate.pipe";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Http, Response} from "@angular/http";
import {SearchResult} from "../../../model/SearchResult";
import {AppConfig} from "../../../app.config";
import {Profile} from "../../../model/Profile";
import {ProfileService} from "../../../services/profile.service";
import {SelectedService} from "../../../services/selected.service";
import {DatabaseListService} from "../../../services/database-list.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy ,AfterViewChecked {
  subscription: Subscription;
  result: Observable<SearchResult>;
  datasets: Observable<DataSet[]>;

  p: number = 1;
  total: number;
  loading: boolean;

  constructor(private appConfig: AppConfig
    , private searchService: SearchService
    , private slimLoadingBarService: SlimLoadingBarService
    , private profileService: ProfileService
    , private selectedService: SelectedService
    , private databaseListServce: DatabaseListService) {

    console.log("SearchResultComponent ctor");
    this.slimLoadingBarService.start();

    this.datasets = this.searchService.searchResult$.map(x => x.datasets);
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.subscription = this.searchService.searchResult$.subscribe(
      searchResult => {
        this.total = searchResult.count;
        this.slimLoadingBarService.complete();
        console.log("search result observed:" + String(searchResult.count));
      });
    console.log("getting profile");
    this.profileService.getProfile();
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.subscription.unsubscribe();
  }


  ngAfterViewChecked()
  {
    //this.slimLoadingBarService.complete();
    //console.log("search-result.ngAfterViewChecked");
  }

  omicsTest(d:DataSet, omics:string):boolean{
    if(d == null)
      return false;

    if(d.omicsType == null)
      return false;

    return (d.omicsType.indexOf(omics) != -1);
  }

  clicked(source:string,id:string){
    //console.log(`clicked ${source} ${id}`);
    this.selectedService.select(source,id);
  }

  getDatabaseUrl(source){
    var db =  this.databaseListServce.databases[source];
    if(!db) {
      console.log("source not found:"+source);
    }
    else {
      return db.sourceUrl;
    }
  }

  getDatabaseTitle(source){
    var db =  this.databaseListServce.databases[source];
    if(!db) {
      console.log("source not found:"+source);
    }
    else {
      return db.title;
    }
  }
}
