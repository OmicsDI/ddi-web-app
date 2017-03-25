import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  content : string;

  constructor(private http: Http) { }

  ngOnInit() {

  }
}
