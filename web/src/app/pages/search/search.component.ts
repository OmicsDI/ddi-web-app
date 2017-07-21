import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";
import {SearchService} from "../../services/search.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ActivatedRoute} from "@angular/router";
import {SearchQuery} from "../../model/SearchQuery";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  content : string;

  constructor(private searchService: SearchService, private slimLoadingBarService: SlimLoadingBarService, private route: ActivatedRoute, private notificationService: NotificationsService) { }

  ngOnInit() {
    this.slimLoadingBarService.start();

    this.route.queryParams.subscribe(params => {
      let q: string = params['q'];
      if(null!=q){
        this.searchService.textQuery = q;
        this.searchService.paramQuery = new SearchQuery();
        this.searchService.selectedFacets = new Object();
        this.searchService.callSearch();
      }else{
        this.searchService.callSearch();
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

  public simpleNotificationsOptions = {timeOut:100,position: ["bottom", "right"],animate:"scale"};

}
