import {Component, OnInit, Input, EventEmitter, Output, Query} from '@angular/core';
import {Facet} from "../../model/Facet";
import {FacetValue} from "../../model/FacetValue";
import {SearchQuery, Rule} from "../../model/SearchQuery";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnInit {

  constructor(private searchService:SearchService) {
  }

  ngOnInit() {
  }

  @Input() parent: QueryBuilderComponent;
  @Input() index: number;
  @Output() changed = new EventEmitter<void>();

  @Input() query: SearchQuery;

  hideBasicInfo: boolean;

  capitalize = function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  operators = [
    {name: 'AND'},
    {name: 'OR'},
    {name: 'NOT'}
  ];

  fields = [
      {name: 'all_fields', label: 'All Fields'}
    , {name: 'hello', label: 'hello world'}
  ];

  conditions = [
    {name: 'equal'}
    // { name: 'not' },
  ];

  addCondition() {
    this.hideBasicInfo = false;
    if(null==this.query.rules){
      this.query.rules = new Array<Rule>();
    }
    this.query.rules.push({
      condition: 'equal',
      field: 'all_fields',
      data: '',
      data2: null,
      query: null
    });
  };

  removeCondition(index) {
    this.query.rules.splice(index, 1);
  };

  addGroup() {
    this.hideBasicInfo = false;
    if(null==this.query.rules){
      this.query.rules = new Array<Rule>();
    }

    let q: SearchQuery = new SearchQuery();
    q.operator = 'AND';
    q.rules = new Array<Rule>();

      this.query.rules.push({
      query: q,
      condition: null,
      field:null,
      data:null,
      data2:null
    });
  };

  selectField = function (rule) {
    if (rule != undefined) {
      if (rule.field == "publication_date") {
        this.conditions.push({name: 'range'});
      }
      else if (this.conditions.length > 1) {
        this.conditions.pop();
      }
      this.clearData(rule);
    }
  };

  clearData(rule) {
    rule.data = '';
    rule.data2 = '';
  };

  removeGroup() {
    this.parent.removeGroupByIndex(this.index);
  };

  removeGroupByIndex(index: number){
    this.query.rules.splice(index, 1);
  }

  getFieldsData(field:string) : FacetValue[]
  {
    console.log("getFacetValues called:" + field);
    return this.searchService.getFacetValues(field);
  }

  dropDownValueChange(){
  }
}

