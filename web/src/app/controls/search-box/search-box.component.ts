import {Component, OnInit, ViewChild} from '@angular/core';
import {AutocompleteNComponent} from "../autocomplete-n/autocomplete-n.component";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  caret_class(): string{
    return this.trigger.menuOpen ? "fa-caret-up" : "fa-caret-down" ;
  }

  search(){
    this.searchService.callSearch();

    if(this.router.url.search("/search")==-1){
      this.router.navigate(["search"]);
    }else{
      //{ queryParams: { q: this.searchService.fullQuery }
    }
  }

  doNotPropagate(event){
    event.stopPropagation();
  }


}
