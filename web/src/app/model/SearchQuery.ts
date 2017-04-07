/**
 * Created by user on 4/7/2017.
 */
export class Rule{
  condition: string = 'equal';
  field: string =  'all_fields';
  data: string = '';
  data2: string = '';
  query: SearchQuery = null;
}

export class SearchQuery{
  operator: string = "AND";
  rules: Rule[] = new Array<Rule>();

  constructor(){
    let rule: Rule = new Rule();
    this.rules.push(rule);
  }

  public toQueryString():string{
    for (var str = "(", i = 0; i < this.rules.length; i++) {
      i > 0 && (str += " " + this.operator + " ");
      if(null != this.rules[i].query) {
        str += this.rules[i].query.toQueryString();
      }
      else{
        var rule =this.rules[i];
        var strtemp = "";

        if(rule.condition == 'range') {strtemp = "[\"" + rule.data + "\" TO \"" +  (rule.data2||"") + "\"]" }
        if(rule.condition == 'equal') {strtemp =  "(\"" + rule.data +"\")" }

        if(rule.field == 'all_fields'){
          str += strtemp;
        }
        else{
          str += rule.field + ": " + strtemp;
        }
      }
    }
    str = str.replace(/"\*\:\*"/g, "*:*");
    return str + ")";
  }
}

