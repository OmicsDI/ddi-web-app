import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {
  constructor(private http: Http) { }
  ngOnInit() {
  }
}
