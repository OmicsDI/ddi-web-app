import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Facet} from "../../../model/Facet";
import {SearchService} from "../../../services/search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-facet',
  templateUrl: './search-facet.component.html',
  styleUrls: ['./search-facet.component.css']
})
export class SearchFacetComponent implements OnInit {
  subscription: Subscription;
  searchCount: String;
  facets : Facet[];
  organismFacets: Facet[];
  omicsFacets: Facet[];

  constructor(private searchService: SearchService, private router: Router) {
    this.subscribeToSearch();

  }

  ngOnInit() {
  }

  facetValueSelected(value: string) {
      this.searchService.callSearchByFacets();
      this.subscribeToSearch();
      //this.router.navigate(['/search']);
  }

  subscribeToSearch(){
    this.subscription = this.searchService.searchResult$.subscribe(
      searchResult => {
        this.searchCount = searchResult.count.toString();
        this.facets = searchResult.facets;
        this.organismFacets = searchResult.facets.filter(x => x.label === 'Organisms');
        this.omicsFacets = searchResult.facets.filter(x => x.label === 'Omics type');

        if(this.organismFacets.length < 1){
          return;
        }

        /***********
        let values: string[] = this.organismFacets[0].facetValues.map(x => x.value).concat(",");
        this.ontolotyService.lookup(values).subscribe(x => {
          this.organismFacets[0].facetValues = this.organismFacets[0].facetValues.map(x => {
            x.label = this.ontolotyService.resolve(x.label);
            x.value = this.ontolotyService.resolve(x.value);
            return x;
          });
        });
        ***********/
      });
  }

}
