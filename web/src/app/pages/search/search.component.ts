import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {SearchService} from "../../services/search.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  content : string;

  constructor(private searchService: SearchService, private slimLoadingBarService: SlimLoadingBarService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.slimLoadingBarService.start();

    /***null==this.searchService.searchQuery***/
    /*** if(true){
      this.searchService.callSearch("*:*");
    }***/

    this.route.queryParams.subscribe(params => {
      let q: string = params['q'];
      if(null!=q){
        this.searchService.callSearch(q);
      }
      else{
        this.searchService.callSearch("*:*");
      }
    })

    setTimeout(() => {
      this._dataLoaded = true;
    }, 500);
  }

  _dataLoaded : boolean = false;
  dataLoaded(): boolean{
    return this._dataLoaded;
  }
}
