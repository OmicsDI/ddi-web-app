import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { FrequentlyTerm } from 'app/model/FrequentlyTerm';
import { DataSetService } from 'app/services/dataset.service';

@Component({
  selector: 'app-hotwords',
  templateUrl: './hotwords.component.html',
  styleUrls: ['./hotwords.component.css']
})
export class HotwordsComponent implements OnInit {

  private webServiceUrl: string;
  private terms: {
    Omics_description: FrequentlyTerm[],
    Omics_data_protocol: FrequentlyTerm[],
    Omics_sample_protocol: FrequentlyTerm[]
  };

  private hotwordsName = 'hotwords';
  private body: any;
  private colors: string[];

  constructor(datasetService: DataSetService) {
    this.webServiceUrl = datasetService.getWebServiceUrl();
    this.body = d3.select('#' + this.hotwordsName);
    this.colors = d3.schemeCategory20;
  }

  ngOnInit() {
    this.startRequest();
  }

  private startRequest() {
    let webServiceUrl = this.webServiceUrl;

    d3.queue()
      .defer(d3.json, webServiceUrl+'term/frequentlyTerm/list?size=40&domain=omics&field=description')
      .defer(d3.json, webServiceUrl+'term/frequentlyTerm/list?size=40&domain=omics&field=data_protocol')
      .defer(d3.json, webServiceUrl+'term/frequentlyTerm/list?size=40&domain=omics&field=sample_protocol')
      .await(this.drawWordCloud);
  }

  private drawWordCloud(error: any, omicsDes: FrequentlyTerm[], omicsDatap: FrequentlyTerm[], omicsSamp: FrequentlyTerm[]): void {
    if (error) {
      this.outputErrorInfo();
      return;
    }

    this.terms.Omics_description = omicsDes;
    this.terms.Omics_data_protocol = omicsDatap;
    this.terms.Omics_sample_protocol = omicsSamp;

    d3.select(window).on('resize', this.change);
  }

  private change() {
    let body = this.body;

    let divWidth = parseInt(this.body.style('width'));
    
    let svg = body.select('#word_cloud_svg');
    if (svg.empty()) {
      svg = body.select('#word_cloud_svg')
        .attr('id', 'word_cloud_svg')
        .attt('class', 'wordcloud')
        .attr('height', 325);
    }
  }

  private outputErrorInfo() {
    d3.select('#' + this.hotwordsName)
      .append('p')
      .attr('class', 'error-info')
      .html('Sorry, accessing to the word cloud web service was temporally failed.');
  }
}
