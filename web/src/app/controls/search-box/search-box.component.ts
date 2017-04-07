import {Component, OnInit, ViewChild} from '@angular/core';
import {AutocompleteNComponent} from "../autocomplete-n/autocomplete-n.component";
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";
import {SearchQuery} from "../../model/SearchQuery";

@Component({
  selector: '[AppSearchBox]',
  templateUrl: 'search-box.component.html',
  styleUrls: ['search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @ViewChild(AutocompleteNComponent) autocompleteComponent:AutocompleteNComponent;

  query:SearchQuery = new SearchQuery();

  constructor(private searchService: SearchService, private router: Router) {
  }

  ngOnInit() {
  }

  search(){
    let searchString = this.autocompleteComponent.selected;
    this.searchService.callSearch(searchString);

    if(this.router.url !== "/search"){
      this.router.navigate(["search"]);
    }
  }

  doNotPropagate(event){
    event.stopPropagation();
  }
}
