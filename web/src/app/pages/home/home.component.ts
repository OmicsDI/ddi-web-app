import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  elementRef: ElementRef;

  private chartOmics: string;
  private omicsBody: any;

  constructor() {
    this.chartOmics = 'chart_repos_omics';
  }

  ngOnInit() {
    this.appendPara();
  }

  private appendPara() {
    this.omicsBody = d3.select('#' + this.chartOmics)
                        .append('g')
                        .text('Hi this is text appended')
                        .style('color', 'red');
  }
}
