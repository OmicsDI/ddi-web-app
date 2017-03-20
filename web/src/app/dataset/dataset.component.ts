import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {

  @ViewChild('targetdiv') contentDiv;
  constructor(private http: Http) { }

  ngOnInit() {
    let elem = this.contentDiv.nativeElement;
    let svc = this.http.get ( './Dataset.html' )
      .map ( response => { return response [ '_body' ] } );
    svc.subscribe (
      ( x ) => { elem.innerHTML = x },
      ( err ) => console.log ( err ),
      ( ) => console.log ( 'Complete' )
    )
  }
}
