/**
 * Created by user on 4/7/2017.
 */
export class Rule {
    operator = 'AND';
    condition = 'equal';
    field = 'all_fields';
    data = [];
    subRule: Rule[] = [];
}

export class SearchQuery {
    rules: Rule[] = [];

    public static instance(rules: Rule[]) {
        const searchQuery = new SearchQuery();
        searchQuery.rules = rules;
        return searchQuery;
    }

    constructor() {
        const rule: Rule = new Rule();
        this.rules.push(rule);
    }
}

