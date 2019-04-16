import {
    AfterViewInit,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit, Output,
    PLATFORM_ID,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AutocompleteNComponent} from '@shared/modules/controls/autocomplete-n/autocomplete-n.component';
import {Rule, SearchQuery} from 'model/SearchQuery';
import {DataTransportService} from '@shared/services/data.transport.service';
import {SearchService} from '@shared/services/search.service';
import {QueryUtils} from '@shared/utils/query-utils';
import {LogService} from '@shared/modules/logs/services/log.service';
import {DataControl} from 'model/DataControl';
import {isPlatformServer} from '@angular/common';
import {Subscription} from 'rxjs';
import {Facet} from 'model/Facet';
import {ArrayUtils} from '@shared/utils/array-utils';
import {FacetValue} from 'model/FacetValue';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material';

@Component({
    selector: '[app-advanced-search-input]',
    templateUrl: 'advanced-search-input.component.html',
    styleUrls: ['advanced-search-input.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AdvancedSearchInputComponent implements OnInit {

    @ViewChild(MatAutocompleteTrigger)
    private trigger: MatAutocompleteTrigger;

    query: string;

    @Input()
    searchQuery: SearchQuery;

    @Input()
    facetMap: Map<string, Facet>;

    @Input()
    allFacet: Facet[];

    @Output()
    addedNewRule: EventEmitter<Rule> = new EventEmitter();

    searchField = 'all_fields';
    searchOperator = 'equal';
    searchValue = '';
    values: FacetValue[] = [];
    conditions = QueryUtils.getConditionList();

    constructor(protected router: Router,
                private dataTransportService: DataTransportService,
                private searchService: SearchService,
                private logger: LogService,
                @Inject(PLATFORM_ID) private platformId,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
    }

    removeKeyword(keyId) {
         for (let i = 0; i < this.values.length; i++) {
             if (this.values[i].value === keyId) {
                 this.values.splice(i, 1);
                 return;
             }
         }
    }

    addKeyword() {
        if (this.searchValue === '') {
            return;
        }
        const keyword = new FacetValue();
        keyword.label = this.searchValue;
        keyword.value = this.searchValue;
        this.values.push(keyword);
        this.searchValue = '';
    }

    addSuggestion(suggestion: MatAutocompleteSelectedEvent) {
        suggestion.option.deselect();
        this.values.push(suggestion.option.value);
        this.searchValue = '';
    }

    displayNull(value) {
        return null;
    }

    addRule() {
        if (this.searchValue !== '') {
            this.addKeyword();
        }
        if (this.values.length === 0) {
            return;
        }
        const rule = new Rule();
        rule.condition = this.searchOperator;
        rule.field = this.searchField;
        rule.data = this.values.map(x => x.value);

        this.addedNewRule.emit(rule);
        this.values = [];
        this.searchValue = '';
    }
}
