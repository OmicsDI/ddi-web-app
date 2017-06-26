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


  private _query: SearchQuery;
  @Output() queryChange = new EventEmitter<SearchQuery>();
  @Input() get query(): SearchQuery{
    return this._query;
  }
  set query(val) {
    this._query = val;
    this.queryChange.emit(this._query);
  }

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

  public notify(){
    this.queryChange.emit(this._query);
    if(this.parent) {
      this.parent.notify();
    }
  }

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
    this.notify();
  };

  removeCondition(index) {
    this.query.rules.splice(index, 1);
    this.notify();
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
    this.notify();
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
    this.notify();
  };

  clearData(rule) {
    rule.data = '';
    rule.data2 = '';
    this.notify();
  };

  removeGroup() {
    this.parent.removeGroupByIndex(this.index);
    this.queryChange.emit(this._query);
  };

  removeGroupByIndex(index: number){
    this.query.rules.splice(index, 1);
    this.notify();
  }

  getFieldsData(field:string) : FacetValue[]
  {
    return this.searchService.getFacetValues(field);

  }

  dropDownValueChange(){
    this.notify();
  }
}

