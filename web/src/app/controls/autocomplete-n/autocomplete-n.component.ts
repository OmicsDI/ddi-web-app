import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {AutocompleteResult} from "../../model/AutocompleteResult";
import {AutocompleteResultItem} from "../../model/AutocompleteResultItem";

@Component({
  selector: 'app-autocomplete-n',
  templateUrl: './autocomplete-n.component.html',
  styleUrls: ['./autocomplete-n.component.css']
})
export class AutocompleteNComponent implements OnInit {
  selected: string;

  constructor(private http:Http) {
  }

  ngOnInit() {
  }

  list: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

  url_template: string = "http://www.omicsdi.org/ws/term/getTermByPattern?q=000&size=10";

  observableSource(keyword: any) {

    let url = this.url_template.replace('000',keyword);

    return this.http.get(url) //,config //{ withCredentials: true }
      .map(this.extractData);
  }

  private extractData(res: Response) : string[] {
    let body = res.json();
    //return body || { };
    var searchResult : AutocompleteResult;
    searchResult = (body || { }) as AutocompleteResult;
    return searchResult.items.map(x => x.name);
  }

}
