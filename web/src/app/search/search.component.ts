import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  content : string;
  @ViewChild('targetdiv') contentDiv;

  constructor(private http: Http) { }

  ngOnInit() {
    let elem = this.contentDiv.nativeElement;
    let svc = this.http.get ( './Search.html' )
      .map ( response => { return response [ '_body' ] } );
    svc.subscribe (
      ( x ) => { elem.innerHTML = x },
      ( err ) => console.log ( err ),
      ( ) => console.log ( 'Complete' )
    )
  }
}
