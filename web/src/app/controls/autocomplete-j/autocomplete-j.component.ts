import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {AutocompleteResult} from "../../model/AutocompleteResult";

declare var $:any;

var tags = [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ];

@Component({
  selector: 'app-autocomplete-j',
  templateUrl: './autocomplete-j.component.html',
  styleUrls: ['./autocomplete-j.component.css']
})
export class AutocompleteJComponent implements OnInit {

  url: string = "http://www.omicsdi.org/ws/term/getTermByPattern?q=hum&size=10";

  public selected = [];

  constructor(private http: Http) {}

  ngOnInit() {

    this.selected = ["something","else"];


    $('#hero-demo').jsonTagEditor({
      placeholder: 'Enter tags ...',
      autocomplete: {
        source: function( request, response ) {

          let result: Observable<AutocompleteResult> = this.http.get(this.url) //,config //{ withCredentials: true }
            .map(this.extractData);

          result.subscribe();

          var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
          response($.grep(tags, function (item) {
            return matcher.test(item);
          }))
        }
        , minLength: 3
        , delay: 250
        , html: true
        , position: { collision: 'flip' } }
    });
  }

}
