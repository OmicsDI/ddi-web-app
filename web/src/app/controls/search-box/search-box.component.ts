import {Component, OnInit, ViewChild} from '@angular/core';
import {AutocompleteNComponent} from "../autocomplete-n/autocomplete-n.component";
import {SearchService} from "../../services/search.service";
import {Router} from "@angular/router";
import {SearchQuery} from "../../model/SearchQuery";
import {MdMenuTrigger} from "@angular/material";

@Component({
  selector: '[AppSearchBox]',
  templateUrl: 'search-box.component.html',
  styleUrls: ['search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @ViewChild(AutocompleteNComponent) autocompleteComponent:AutocompleteNComponent;
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  constructor(private searchService: SearchService, private router: Router) {
  }

  ngOnInit() {
  }

  caret_class(): string{
    return this.trigger.menuOpen ? "fa-caret-up" : "fa-caret-down" ;
  }

  doSearch(query: string){
    this.router.navigate(["search"], { queryParams: { q: query }});
    /***
    this.searchService.callSearch(query);
    if(this.router.url !== "/search"){
      this.router.navigate(["search"]);
    }***/
  }

  search(){
    let searchString = this.searchService.fullQuery;
    this.doSearch(searchString);
  }

  advSearch()
  {
    //this.doSearch(this.searchService.query.toQueryString());
    this.search();
  }

  doNotPropagate(event){
    event.stopPropagation();
  }


}
