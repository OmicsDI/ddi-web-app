import {DataControl} from 'model/DataControl';
import {Rule, SearchQuery} from 'model/SearchQuery';
import {ArrayUtils} from '@shared/utils/array-utils';
import {Facet} from 'model/Facet';
import {FacetValue} from 'model/FacetValue';

export class Index {
    current = 0;
}

export class QueryUtils {

    public static transformQuery(query: string): string {
        query = query.replace(/:\s*/g, ':');
        query = query.replace(/\s+AND\s+/g, '-AND-');
        query = query.replace(/\s+OR\s+/g, '-OR-');
        query = query.replace(/\s+NOT\s+/g, '-NOT-');
        return query;
    }

    public static getBaseQuery(params: {}): string {
        let query = params['q'] != null ? params['q'] : '';
        query = query.replace(/-AND-/g, ' AND ');
        query = query.replace(/-OR-/g, ' OR ');
        query = query.replace(/-NOT-/g, ' NOT ');
        return query;
    }

    /**
     * Get DataControl from url params
     * @param {{}} params
     * @returns {DataControl}
     */
    public static getDataControl(params: {}): DataControl {
        const control = new DataControl();
        if (params.hasOwnProperty('sortBy')) {
            control.sortBy = params['sortBy'];
        }
        if (params.hasOwnProperty('order')) {
            control.order = params['order'];
        }
        if (params.hasOwnProperty('pageSize')) {
            control.pageSize = parseInt(params['pageSize'], 10);
        }
        if (params.hasOwnProperty('page')) {
            control.page = params['page'];
        }
        return control;
    }

    /**
     * Get all facets from url params
     * @param {{}} params
     * @returns {Map<string, string[]>}
     */
    public static getAllFacets(params: {}): Map<string, string[]> {
        const searchQuery = this.extractQuery(params);
        let result = this.getFacets(searchQuery.rules);
        for (let j = 0; j < searchQuery.rules.length; j++) {
            if (searchQuery.rules[j].query != null) {
                result = ArrayUtils.addAll(result, this.getFacets(searchQuery.rules[j].query.rules));
            }
        }
        return result;
    }

    private static getFacets(facetRules: Rule[]): Map<string, string[]> {
        const result = new Map<string, string[]>();
        for (let i = 0; i < facetRules.length; i ++) {
            if (facetRules[i].field != null) {
                if (!result.has(facetRules[i].field)) {
                    result.set(facetRules[i].field, [facetRules[i].data]);
                } else {
                    const prev = result.get(facetRules[i].field);
                    prev.push(facetRules[i].data);
                    result.set(facetRules[i].field, prev);
                }
            }
        }
        return result;
    }

    /**
     * 
     * @param facets 
     * @returns facets with all ids/labels/values stripped of round brackets - as these mess up
     * both query extraction (queryExtractor() function treats them as query constructs - even if they are just part of
     * facet label, e.g. "Illumina HiSeq 2000 (Homo sapiens)"). Round brackets in checkbox html element ids leads to user's
     * failure in ticking that facet's checkbox when they click on it.
     */
    public static getSanitizedFacets(facets: Facet[]): Array<Facet> {
        for (let i = 0; i < facets.length; i ++) {
            let facet = facets[i];
            facet.id = facet.id.replace(/[\(\)]*/g,'');
            facet.label = facet.label.replace(/[\(\)]*/g,'');
            for (let j = 0; j < facet.facetValues.length; j ++) {
                let facetValue = facet.facetValues[j];
                facetValue.label = facetValue.label.replace(/[\(\)]*/g,'');
                facetValue.value = facetValue.value.replace(/[\(\)]*/g,'');
            }
        }
        return facets;
    } 

    /**
     * Extract SearchQuery from url params
     * @param {{}} params
     * @returns {SearchQuery}
     */
    public static extractQuery(params: {}): SearchQuery {
        let query = this.getBaseQuery(params);
        return this.queryExtractor(query, new Index());
    }

    private static queryExtractor(query: string, index: Index): SearchQuery {
        const search = new SearchQuery();
        search.rules = [];
        const queryRules = [];
        let message = '';
        for (; index.current < query.length; index.current++) {
            if (query.charAt(index.current) === '(') {
                index.current++;
                const rule = {
                    query: this.queryExtractor(query, index), condition: null, field: null, data: null, data2: null};
                queryRules.push(rule);
            } else if (query.charAt(index.current) === ')') {
                break;
            } else {
                message += query.charAt(index.current);
            }
        }
        if (message.indexOf('OR') > -1) {
            search.operator = 'OR';
        } else if (message.indexOf('NOT') > -1) {
            search.operator = 'NOT';
        }
        const conditions = message.split(search.operator);
        for (let i = 0; i < conditions.length; i++) {
            const condition = conditions[i].trim();
            if (condition !== '') {
                const rules = this.extractCondition(condition);
                rules.forEach(rule => {
                    search.rules.push(rule);
                });
            }
        }
        for (let i = 0; i < queryRules.length; i++) {
            search.rules.push(queryRules[i]);
        }
        return search;
    }

    private static extractCondition(condition: string): Rule[] {
        const parts = condition.split(/:(.+)/);
        const rule = new Rule();
        let value = condition;
        if (parts.length > 1) {
            rule.field = parts[0].trim();
            value = parts[1].trim();
        }
        let match = /\["([^"]*)"\]/.exec(value);
        if (match) {
            rule.data = match[1];
            return [rule];
        }
        match = /\["([^"]*)"\s+TO\s+"([^"]*)"\]/.exec(value);
        if (match) {
            rule.data = match[1];
            rule.data2 = match[2];
            rule.condition = 'range';
            return [rule];
        }

        // Case: repository: "GEO" E-GEOD-30197
        // https://multiomics.atlassian.net/browse/OF-111
        match = /(\"[^"]*\")([^"]+)/.exec(value);
        if (match) {
            rule.data = match[1];
            const subRules = this.extractCondition(match[2]);
            const rules = [rule];
            subRules.forEach(subRule => {
                rules.push(subRule);
            });
            return rules;
        }
        rule.data = value;
        return [rule];
    }
}
