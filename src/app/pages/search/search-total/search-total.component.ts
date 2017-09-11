import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../../services/search.service";
import {Subscription} from "rxjs";
import {SearchQuery} from "../../../model/SearchQuery";
import {SavedSearch} from "../../../model/SavedSearch";
import {ProfileService} from "../../../services/profile.service";
import {NotificationsService} from "angular2-notifications/dist";

@Component({
  selector: 'app-search-total',
  templateUrl: './search-total.component.html',
  styleUrls: ['./search-total.component.css']
})
export class SearchTotalComponent implements OnInit {
  searchCount: string;
  searchQuery: string;
  subscription: Subscription;

  constructor(private searchService: SearchService
      , private profileService: ProfileService
      , private notificationService: NotificationsService ) { }

  ngOnInit() {
    this.subscription = this.searchService.searchResult$.subscribe(
      searchResult => {
        this.searchCount = searchResult.count.toString();
        this.searchQuery = this.searchService.currentQuery;
      });
  }

  showAllClick(){
    this.searchService.paramQuery = new SearchQuery();
    this.searchService.textQuery = "*:*";
    this.searchService.unselectFacets();
    this.searchService.callSearch();
  }

  saveSearchClick(){
    var savedSearch: SavedSearch = new SavedSearch();

    savedSearch.userId = this.profileService.userId;
    savedSearch.search = this.searchQuery;
    savedSearch.count = +this.searchCount;


    this.profileService.saveSavedSearch(savedSearch);

    this.notificationService.success(
        'Search saved',
        'to your dashboard'
    )
  }

  copyQueryClick(){
    this.notificationService.success(
        'Сopied to clipboard',
        this.searchQuery
    )
  }

}
