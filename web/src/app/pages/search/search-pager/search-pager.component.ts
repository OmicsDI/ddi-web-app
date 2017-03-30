import { Component, OnInit } from '@angular/core';
import {PagingService} from "../../../services/paging.service";
import {SearchService} from "../../../services/search.service";
import {DataSet} from "../../../model/DataSet";
import {Observable, Subscription} from "rxjs";
import {SearchResult} from "../../../model/SearchResult";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Component({
  selector: 'app-search-pager',
  templateUrl: './search-pager.component.html',
  styleUrls: ['./search-pager.component.css']
})
export class SearchPagerComponent implements OnInit {

  collection = [];
  subscription: Subscription;
  searchQuery: String;
  result: Observable<SearchResult>;
  datasets: Observable<DataSet[]>;

  sortBy: string = 'id';
  sortOrder: string = 'ascending';

  p: number = 1;
  total: number;
  loading: boolean;

  constructor(private pagingService: PagingService, private searchService: SearchService, private slimLoadingBarService: SlimLoadingBarService ) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this.subscription = searchService.searchResult$.subscribe(
      searchResult => {
        this.total = searchResult.count;
      });
  }

  ngOnInit() {
  }

  getPage(page: number) {
    this.slimLoadingBarService.start();
    this.p = page;
    this.searchService.page(page);
  }

  sort(by: string){
    this.slimLoadingBarService.start();

    if (this.searchService.sortBy == by){
       if(this.searchService.sortOrder == 'ascending')
         this.searchService.sortOrder = 'descending'
       else
         this.searchService.sortOrder = 'ascending';
    }else{
      this.searchService.sortBy = by;
      this.searchService.sortOrder = 'ascending';
    }
    this.searchService.sort();
  }

}
