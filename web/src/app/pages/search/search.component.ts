import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {SearchService} from "../../services/search.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  content : string;

  constructor(private searchService: SearchService, private slimLoadingBarService: SlimLoadingBarService) { }

  ngOnInit() {
    console.log("search page onInit");
    this.slimLoadingBarService.start();
    if(null==this.searchService.searchQuery){
      this.searchService.callSearch("*:*");
    }
  }

  ngAfterViewChecked(){
    //this.slimLoadingBarService.complete();
  }

}
