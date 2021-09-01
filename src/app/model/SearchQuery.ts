/**
 * Created by user on 4/7/2017.
 */
export class Rule {
    condition = 'equal';
    field = 'all_fields';
    data = '';
    data2 = '';
    query: SearchQuery = null;
}

export class SearchQuery {
    operator = 'AND';
    rules: Rule[] = [];

    constructor() {
        const rule: Rule = new Rule();
        this.rules.push(rule);
    }

    public toQueryString(): string {
        let str = '';
        for (let i = 0; i < this.rules.length; i++) {
            if (i > 0) {
                str += ' ' + this.operator + ' ';
            }
            if (null != this.rules[i].query) {
                const tmp = this.rules[i].query.toQueryString();
                if (tmp !== '') {
                    str += '(' + tmp + ')';
                }
            } else {
                const rule = this.rules[i];
                let strtemp = '';

                if (rule.condition === 'range') {
                    strtemp = '["' + rule.data + '" TO "' + (rule.data2 || '') + '"]';
                }
                if (rule.condition === 'equal') {
                    if (rule.data !== '') {
                        strtemp = rule.data;
                    }
                }

                if (rule.field === 'all_fields') {
                    str += strtemp;
                } else {
                    str += rule.field + ': ' + strtemp;
                }
            }
        }
        return str;
    }
}

