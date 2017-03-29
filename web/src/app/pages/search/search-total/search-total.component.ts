import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../../services/search.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-total',
  templateUrl: './search-total.component.html',
  styleUrls: ['./search-total.component.css']
})
export class SearchTotalComponent implements OnInit {
  searchCount: string;
  searchQuery: string;
  subscription: Subscription;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.subscription = this.searchService.searchResult$.subscribe(
      searchResult => {
        this.searchCount = searchResult.count.toString();
        this.searchQuery = this.searchService.searchQuery;
      });
  }

}
