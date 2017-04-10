import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Facet} from "../../../model/Facet";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-search-facet',
  templateUrl: './search-facet.component.html',
  styleUrls: ['./search-facet.component.css']
})
export class SearchFacetComponent implements OnInit {
  subscription: Subscription;
  searchCount: String;
  facets : Facet[];

  constructor(private searchService: SearchService) {
    this.subscription = searchService.searchResult$.subscribe(
      searchResult => {
        this.searchCount = searchResult.count.toString();
        this.facets = searchResult.facets;
      });
  }

  ngOnInit() {
  }

  facetValueSelected(value: string) {
      this.searchService.callSearchByFacets();
  }

}
