import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import {DataSet} from "../../../model/DataSet";
import {SearchService} from "../../../services/search.service";
import {TruncatePipe} from "../../../pipes/truncate.pipe";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

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

  constructor(private searchService: SearchService, private slimLoadingBarService: SlimLoadingBarService) {
    this.subscription = searchService.searchResult$.subscribe(
      searchResult => {
          this.searchCount = searchResult.count.toString();
          this.dataSets = searchResult.datasets;
          this.searchQuery = this.searchService.searchQuery;
          this.slimLoadingBarService.complete();
          console.log("search result observed");
      });

  }

  ngOnChanges(changes) {
    console.log("ngOnChanges");
  }
  ngAfterContentInit() {
    console.log("ngAfterContentInit");
  }
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked");
  }
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }
  ngAfterViewInit() {
    this.slimLoadingBarService.start();
    console.log("ngAfterViewInit");
  }
  ngOnInit() {
    console.log("ngOnInit");
  }
}
