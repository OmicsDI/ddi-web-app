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
import {ArrayUtils} from '@shared/utils/array-utils';
import {el} from '@angular/platform-browser/testing/src/browser_util';

export class AdvancedRule {
    condition = 'equal';
    field = 'all_fields';
    data = [];
    operator = 'AND';
    subRule: AdvancedRule[] = [];
}

@Component({
    selector: '[app-advanced-search-factors]',
    templateUrl: 'advanced-search-factors.component.html',
    styleUrls: ['advanced-search-factors.component.css']
})
export class AdvancedSearchFactorsComponent implements OnInit {

    @Input()
    searchQuery: SearchQuery;

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

    rules: AdvancedRule[] = [];

    conditions = QueryUtils.getConditions();

    currentRule: AdvancedRule;

    showingRule: Map<AdvancedRule, boolean> = new Map<AdvancedRule, boolean>();

    constructor(@Inject(PLATFORM_ID) private platformId) {
    }

    ngOnInit(): void {
        this.rules = this.toAdvancedRule(this.searchQuery);
    }

    private toAdvancedRule(searchQuery: SearchQuery): AdvancedRule[] {
        const ruleMap = new Map<string, Rule[]>();
        const result: AdvancedRule[] = [];
        searchQuery.rules.forEach(rule => {
            if (rule.query != null) {
                const subRule = new AdvancedRule();
                subRule.subRule = this.toAdvancedRule(rule.query);
                result.push(subRule);
            } else if (ruleMap.has(rule.field)) {
                ruleMap.get(rule.field).push(rule);
            } else {
                ruleMap.set(rule.field, [rule]);
            }
        });

        ruleMap.forEach((value: Rule[], key: string) => {
            const advancedRule = new AdvancedRule();
            if (searchQuery.operator === 'OR') {
                advancedRule.condition = 'oneOf';
            } else if (searchQuery.operator === 'NOT') {
                advancedRule.condition = 'not';
            } else {
                advancedRule.condition = 'equal';
            }
            advancedRule.field = key;
            value.forEach(val => {
                advancedRule.data.push(val.data);
            });
            result.push(advancedRule);
        });
        return result;
    }

    changeOperator(operator, rule: Rule) {
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
        // parentRule.subRule.push(rule);
        this.updateSearchQuery(this.searchQuery);
        this.showingRule.set(this.currentRule, false);
        this.currentRule = null;
    }
}
