import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-search-query',
  templateUrl: 'search-query.component.html',
  styleUrls: ['search-query.component.css']
})
export class SearchQueryComponent implements OnInit {

  searchQuery: string;
  subscription: Subscription;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.subscription = this.searchService.searchResult$.subscribe(
      searchResult => {
        this.searchQuery = this.searchService.getFullQuery();
      });
  }

}
