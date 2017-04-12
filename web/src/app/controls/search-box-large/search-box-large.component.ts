import {Component, OnInit, ViewChild} from '@angular/core';
import {AutocompleteNComponent} from "../autocomplete-n/autocomplete-n.component";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'search-box-large',
  templateUrl: './search-box-large.component.html',
  styleUrls: ['./search-box-large.component.css']
})
export class SearchBoxLargeComponent implements OnInit {

  constructor(private searchService: SearchService, private router: Router) { }

  @ViewChild(AutocompleteNComponent) autocompleteComponent:AutocompleteNComponent;

  ngOnInit() {
  }

  doSearch(query: string){
    this.searchService.callSearch(query);

    if(this.router.url !== "/search"){
      this.router.navigate(["search"]);
    }
  }

  search(){
    let searchString = this.autocompleteComponent.selected;
    this.doSearch(searchString);
  }
}
