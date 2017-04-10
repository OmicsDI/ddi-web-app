import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {AutocompleteResult} from "../../model/AutocompleteResult";
import {AutocompleteResultItem} from "../../model/AutocompleteResultItem";
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-autocomplete-n',
  templateUrl: './autocomplete-n.component.html',
  styleUrls: ['./autocomplete-n.component.css']
})
export class AutocompleteNComponent implements OnInit {
  selected: string;

  constructor(private http:Http, private appConfig: AppConfig) {
  }

  ngOnInit() {
  }

  observableSource(keyword: any) {
    return this.http.get(this.appConfig.getAutocompleteUrl(keyword))
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
