import {DataControl} from 'model/DataControl';
import {Rule, SearchQuery} from 'model/SearchQuery';
import {KeyValuePair} from 'model/KeyValuePair';
import {ArrayUtils} from '@shared/utils/array-utils';

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
     * Get all facets from searchQuery object
     * @param {{}} searchQuery
     * @returns {Map<string, Rule[]>}
     */
    public static getAllFacets(searchQuery: SearchQuery): Map<string, Rule[]> {
        const result = new Map<string, Rule[]>();
        this.findAllFacetsFromRole(searchQuery.rules, result);
        return result;
    }

    private static findAllFacetsFromRole(roles: Rule[], facets: Map<string, Rule[]>) {
        roles.forEach(role => {
            if (role.field !== 'all_fields') {
                if (role.condition === 'oneOf' || (role.condition === 'equal' && role.data.length === 1)) {
                    if (facets.has(role.field)) {
                        facets.get(role.field).push(role);
                    } else {
                        facets.set(role.field, [role]);
                    }
                }
            }
        });
    }

    /**
     * Extract SearchQuery from url params
     * @param {{}} params
     * @returns {SearchQuery}
     */
    public static extractQuery(params: {}): SearchQuery {
        const query = this.getBaseQuery(params);
        return this.parseQuery(query);
    }

    public static getConditions(): Map<string, string> {
        const result = new Map<string, string>();
        this.getConditionList().forEach(x => {
            result.set(x.key, x.value);
        });
        return result;
    }

    public static getConditionList(): KeyValuePair[] {
        const result = [];
        result.push(KeyValuePair.instance('equal', 'is'));
        result.push(KeyValuePair.instance('oneOf', 'is one of'));
        result.push(KeyValuePair.instance('not', 'is not'));
        return result;
    }

    public static parseRealQuery(query: SearchQuery): string {
        const result = [];
        for (let i = 0; i < query.rules.length; i++) {
            if (i !== 0) {
                result.push(query.rules[i].operator);
            }
            result.push(this.parseRealRule(query.rules[i]));
        }
        return result.join(' ');
    }

    public static parseQuery(query: String): SearchQuery {
        const newQuery = 'AND ' + query;
        const regex = /(AND|OR)\s*\(*(\w+)?(:~|:-|:)?\s*\[?([\w|"|,|\s]+)\]?\)*/g;
        let match = regex.exec(newQuery);
        const rules: Rule[] = [];
        const parents: Rule[] = [];
        while (match != null) {
            const rule = new Rule();
            rule.operator = match[1];
            if (match[3] == null || match[3] === ':') {
                rule.condition = 'equal';
            } else if (match[3] === ':~') {
                rule.condition = 'oneOf';
            } else {
                rule.condition = 'not';
            }
            if (match[2] == null) {
                rule.field = 'all_fields';
            } else {
                rule.field = match[2];
            }
            rule.data = match[4].split(',').map(x => x.replace(/"/g, '').trim());
            if (parents.length === 0) {
                rules.push(rule);
            } else {
                parents[parents.length - 1].subRule.push(rule);
            }
            const nOpenBracket = match[0].split('(').length - 1;
            const nCloseBracket = match[0].split(')').length - 1;
            if (nOpenBracket > nCloseBracket) {
                parents.push(rule);
            }
            if (nCloseBracket > nOpenBracket) {
                parents.pop();
            }
            match = regex.exec(newQuery);
        }

        return SearchQuery.instance(rules);
    }

    public static parseRealRule(rule: Rule): string {
        const result = [];
        rule.data.forEach(e => {
            let data = '"' + e + '"';
            if (rule.field !== 'all_fields') {
                data = rule.field + ':' + data;
            }
            result.push(data);
        });
        if (rule.condition === 'equal') {
            return '(' + result.join(' AND ') + ')';
        } else if (rule.condition === 'oneOf') {
            return '(' + result.join(' OR ') + ')';
        } else if (rule.condition === 'not') {
            return '("*" NOT (' + result.join(' OR ') + '))';
        }
    }

    public static parseVirtualQuery(rules: Rule[], isFirst = true): string {
        let result = '';
        for (let i = 0; i < rules.length; i++) {
            let rule = this.parseVirtualRule(rules[i]);

            if (rules[i].subRule.length > 0) {
                rule = rule + this.parseVirtualQuery(rules[i].subRule, false);
            }
            if (i !== 0 || rules[i].subRule.length > 0) {
                rule = '(' + rule + ')';
            }
            if (i !== 0 || !isFirst) {
                rule = ' ' + rules[i].operator + ' ' + rule;
            }
            result += rule;
        }
        return result;
    }

    public static parseVirtualRule(rule: Rule): string {
        let result = rule.field;
        let condition = ':';
        if (rule.condition === 'oneOf') {
            condition = ':~'
        } else if (rule.condition === 'not') {
            condition = ':-'
        }

        let value = rule.data.map(x => '"' + x + '"').join(', ');
        if (rule.data.length > 1) {
            value = '[' + value + ']';
        }
        if (rule.field === 'all_fields' && condition === ':') {
            return value;
        }
        result += condition + ' ' + value;
        return result;
    }
}
