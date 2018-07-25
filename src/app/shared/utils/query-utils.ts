import {DataControl} from 'model/DataControl';
import {Rule, SearchQuery} from 'model/SearchQuery';

export class Index {
    current = 0;
}

export class QueryUtils {

    public static getBaseQuery(params: {}): string {
        return params['q'] != null ? params['q'] : '';
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
            control.pageSize = params['pageSize'];
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
    public static getFacets(params: {}): Map<string, string[]> {
        const result = new Map<string, string[]>();
        const searchQuery = this.extractQuery(params);
        for (let i = 0; i < searchQuery.rules.length; i++) {
            if (searchQuery.rules[i].field != null) {
                if (!result.has(searchQuery.rules[i].field)) {
                    result.set(searchQuery.rules[i].field, [searchQuery.rules[i].data]);
                } else {
                    const prev = result.get(searchQuery.rules[i].field);
                    prev.push(searchQuery.rules[i].data);
                    result.set(searchQuery.rules[i].field, prev);
                }
            }
        }
        return result;
    }

    /**
     * Extract SearchQuery from url params
     * @param {{}} params
     * @returns {SearchQuery}
     */
    public static extractQuery(params: {}): SearchQuery {
        let query = this.getBaseQuery(params);
        query = query.replace(/\(("[^"]*")\)/g, '[$1]');
        if (query[0] === '(') {
            query = query.slice(1, query.length - 1);
        }
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
                if (message.indexOf('OR') > -1) {
                    search.operator = 'OR';
                } else if (message.indexOf('NOT') > -1) {
                    search.operator = 'NOT';
                }
                index.current++;
                break;
            } else {
                message += query.charAt(index.current);
            }
        }
        const conditions = message.split(search.operator);
        for (let i = 0; i < conditions.length; i++) {
            const condition = conditions[i].trim();
            if (condition !== '') {
                search.rules.push(this.extractCondition(condition));
            }
        }
        for (let i = 0; i < queryRules.length; i++) {
            search.rules.push(queryRules[i]);
        }
        return search;
    }

    private static extractCondition(condition: string): Rule {
        const parts = condition.split(':');
        const rule = new Rule();
        let value = condition;
        if (parts.length > 1) {
            rule.field = parts[0].trim();
            value = parts[1].trim();
        }
        let match = /\["([^"]*)"\]/.exec(value);
        if (match) {
            rule.data = match[1];
            return rule;
        }
        match = /\["([^"]*)"\s+TO\s+"([^"]*)"\]/.exec(value);
        if (match) {
            rule.data = match[1];
            rule.data2 = match[2];
            rule.condition = 'range';
            return rule;
        }
        if (value[0] === '"') {
            value = value.slice(1, value.length - 1);
        }
        rule.data = value;
        return rule;
    }
}
