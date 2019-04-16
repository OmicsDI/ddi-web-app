import {
    Component, EventEmitter,
    Inject,
    Input, OnInit,
    Output,
    PLATFORM_ID,
    ViewEncapsulation
} from '@angular/core';
import {Rule, SearchQuery} from 'model/SearchQuery';
import {Facet} from 'model/Facet';
import {QueryUtils} from '@shared/utils/query-utils';

@Component({
    selector: '[app-advanced-search-factors]',
    templateUrl: 'advanced-search-factors.component.html',
    styleUrls: ['advanced-search-factors.component.css']
})
export class AdvancedSearchFactorsComponent implements OnInit {

    @Input()
    searchQuery: SearchQuery;

    @Input()
    rules: Rule[];

    @Output()
    searchQueryChange: EventEmitter<SearchQuery> = new EventEmitter();

    @Input()
    isSubRule: boolean;

    @Input()
    isParentLast = true;

    @Input()
    facetMap: Map<string, Facet>;

    @Input()
    allFacet: Facet[];

    conditions = QueryUtils.getConditions();

    currentRule: Rule;

    showingRule: Map<Rule, boolean> = new Map<Rule, boolean>();

    constructor(@Inject(PLATFORM_ID) private platformId) {
    }

    ngOnInit(): void {
    }

    changeOperator(operator, rule: Rule) {
        rule.operator = operator;
        this.searchQueryChange.emit(this.searchQuery);
    }

    getFacetValue(facetId: string, facet: Facet) {
        const res = facet.facetValues.forEach(element => {
            if (element.value === facetId) {
                return element.label;
            }
        });
        return res != null ? res : facetId;
    }

    addSubRule(rule) {
        if (this.currentRule != null) {
            this.showingRule.set(this.currentRule, false);
        }
        this.currentRule = rule;
        this.showingRule.set(this.currentRule, true);
    }

    updateSearchQuery(searchQuery: SearchQuery) {
        this.searchQueryChange.emit(searchQuery);
    }

    createSubRule(rule: Rule, parentRule: Rule) {
        parentRule.subRule.push(rule);
        this.updateSearchQuery(this.searchQuery);
        this.showingRule.set(this.currentRule, false);
        this.currentRule = null;
    }
}
