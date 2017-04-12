import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { StatisticsDomainsDetail } from 'app/model/StatisticsDomainsDetail';
import { ChartsErrorHandler } from '../charts-error-handler/charts-error-handler';
import { DataSetService } from 'app/services/dataset.service';

@Component({
  selector: 'app-tissues-organisms',
  templateUrl: './tissues-organisms.component.html',
  styleUrls: ['./tissues-organisms.component.css']
})
export class TissuesOrganismsComponent implements OnInit {

  private webServiceUrl: string;
  private retryLimitTimes: number;
  private chartsErrorHandler: ChartsErrorHandler;

  private chartName: string;
  
  private tissues: StatisticsDomainsDetail[];
  private organisms: StatisticsDomainsDetail[];
  private diseases: StatisticsDomainsDetail[];

  constructor(datasetService: DataSetService) { 
    this.webServiceUrl = datasetService.getWebServiceUrl();
    this.retryLimitTimes = 2;
    this.chartsErrorHandler = new ChartsErrorHandler();
    this.chartName = 'chart_tissues_organisms';
  }

  ngOnInit() {
    this.startRequest();
  }

  private startRequest(): void {
    d3.queue()
      .defer(d3.json, this.webServiceUrl + 'statistics/tissues?size=100')
      .defer(d3.json, this.webServiceUrl + 'statistics/organisms?size=100') // geojson points
      .defer(d3.json, this.webServiceUrl + 'statistics/diseases?size=100') // geojson points
      .await(this.drawChartTissuesOrganisms);
  }

  private drawChartTissuesOrganisms(error: any, ...args) {
    if (error) {
      this.retryLimitTimes--;
      if (this.retryLimitTimes <= 0) {
        ChartsErrorHandler.outputErrorInfo(this.chartName);
        this.startRequest();
      }else {
        ChartsErrorHandler.removeGettingInfo(this.chartName);
        [ this.tissues, this.organisms, this.diseases ] = [args[0], args[1], args[2]];
        console.log(this.tissues.length);
        console.log(this.organisms.length);
        console.log(this.diseases.length);
      }
    }
  }

  private prepareData(): void{

  }

}
