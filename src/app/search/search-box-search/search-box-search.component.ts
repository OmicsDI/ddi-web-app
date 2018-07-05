import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from 'services/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material';
import {AutocompleteNSearchComponent} from './autocomplete-n-search/autocomplete-n-search.component';

@Component({
    selector: '[AppSearchBoxSearch]',
    templateUrl: 'search-box-search.component.html',
    styleUrls: ['search-box-search.component.css']
})
export class SearchBoxSearchComponent implements OnInit {

    @ViewChild(AutocompleteNSearchComponent) autocompleteComponent: AutocompleteNSearchComponent;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
    }

    caret_class(): string {
        return this.trigger.menuOpen ? 'fa-caret-up' : 'fa-caret-down';
    }

    search() {
        this.searchService.callSearch();

        if (this.router.url.search('/search') === -1) {
            this.router.navigate(['search']);
        } else {
            // { queryParams: { q: this.searchService.fullQuery }
        }
    }

    doNotPropagate(event) {
        event.stopPropagation();
    }


}
