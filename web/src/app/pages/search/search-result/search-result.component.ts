import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import {DataSet} from "../../../model/DataSet";
import {SearchService} from "../../../services/search.service";
import {TruncatePipe} from "../../../pipes/truncate.pipe";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  subscription: Subscription;
  searchCount: String;
  searchQuery: String;
  dataSets: DataSet[];

  constructor(private searchService: SearchService) {
    this.subscription = searchService.searchResult$.subscribe(
      searchResult => {
          this.searchCount = searchResult.count.toString();
          this.dataSets = searchResult.datasets;
          this.searchQuery = this.searchService.searchQuery;
      });
  }

  ngOnInit() {
  }
}
