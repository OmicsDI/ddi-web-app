import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {AutocompleteNComponent} from "../../../controls/autocomplete-n/autocomplete-n.component";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-search-box',
  templateUrl: 'search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @ViewChild(AutocompleteNComponent) autocompleteComponent:AutocompleteNComponent;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
  }

  search(){
    let searchString = this.autocompleteComponent.selected;
    this.searchService.callSearch(searchString);
  }
}
