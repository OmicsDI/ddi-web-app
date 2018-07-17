import {Component, OnInit, ViewChild} from '@angular/core';
import {AutocompleteNComponent} from '../autocomplete-n/autocomplete-n.component';
import {SearchService} from '@shared/services/search.service';
import {Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material';

@Component({
    selector: '[AppSearchBox]',
    templateUrl: 'search-box.component.html',
    styleUrls: ['search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

    @ViewChild(AutocompleteNComponent) autocompleteComponent: AutocompleteNComponent;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

    constructor(public searchService: SearchService, private router: Router) {
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
