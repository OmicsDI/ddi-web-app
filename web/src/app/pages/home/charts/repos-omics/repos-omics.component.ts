import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';

import { DataSetService } from '../../../../services/dataset.service';

@Component({
  selector: 'repos-omics',
  templateUrl: './repos-omics.component.html',
  styleUrls: ['./repos-omics.component.css']
})
export class ReposOmicsComponent implements OnInit {

  private webServiceUrl: string;
  private proteomicsList: string;
  private genomicsList: string;
  private metabolomicsList: string;
  private transcriptomicsList: string;
  
  private pieChartName = 'chart_repos_omics';
  private retryLimitTimes = 2;

  constructor(dataSetService: DataSetService) {
    this.webServiceUrl = dataSetService.getWebServiceUrl();
    this.proteomicsList = dataSetService.getProteomicsList();
    this.metabolomicsList = dataSetService.getMetabolomicsList();
    this.genomicsList = dataSetService.getGenomicsList();
    this.transcriptomicsList = dataSetService.getTranscriptomicsList();
  }

  ngOnInit() {
    this.startRequest();
  }

  public startRequest() {
    d3.queue()
      .defer(d3.json, this.webServiceUrl + 'statistics/domains')
      .defer(d3.json, this.webServiceUrl + 'statistics/omics')
      .await((err: any, domains: any[], omicstype: any[]) => {
        if (err) {
          this.retryLimitTimes--;
          if (this.retryLimitTimes <= 0){
            this.outputErrorInfo(this.pieChartName);
            return;
          }
          this.outputGettingInfo(this.pieChartName);
          this.startRequest();
        } else {
          this.draw(domains, omicstype);
        }
      });
  }

  public draw(domains: any[], omicsType: any[]): void {
    this.removeGettingInfo(this.pieChartName);

    let repos = this.transformDomains(domains);
    omicsType.shift();
    omicsType.pop();
    omicsType = this.dealCaseSensitiveIds(omicsType);

    
    omicsType.sort((a, b) => {
      return a.value - b.value;
    })
    repos.sort((a, b) => {
      return a.value - b.value;
    })

    /**
     * prepare the treemap data
     */
    let reposData = [
      {
          "name": "Proteomics",
          "size": null,
          "children": []
      },
      {
          "name": "Genomics",
          "size": null,
          "children": []
      },
      {
          "name": "Metabolomics",
          "size": null,
          "children": []
      },
      {
          "name": "Transcriptomics",
          "size": null,
          "children": []
      }
    ];

    let reposDataSimple = []
      , data = []
      , omicsDataSimple = []
      , omicsDataNum = [];

    for (let i = 0; i < repos.length; i++) {
      if (this.proteomicsList.indexOf(repos[i].name) > -1) {
        reposData[0].children.push({
          name: repos[i].name,
          size: repos[i].value
        })
        continue;
      }
      if (this.genomicsList.indexOf(repos[i].name) > -1) {
        reposData[1].children.push({
            name: repos[i].name,
            size: repos[i].value
        });
        continue;
      }
      if (this.metabolomicsList.indexOf(repos[i].name) > -1) {
        reposData[2].children.push({
            name: repos[i].name,
            size: repos[i].value
        });
        continue;
      }
      if (this.transcriptomicsList.indexOf(repos[i].name) > -1) {
        reposData[3].children.push({
            name: repos[i].name,
            size: repos[i].value
        });
        continue;
      }
    }

    for (let i = 0; i < reposData.length; i++) {
      let total = 0;

      for (let j = 0; j < reposData[i].children.length; j++) {
        total += parseInt(reposData[i].children[j].size);

        reposDataSimple.push({
          name: reposData[i].children[j].name,
          size: reposData[i].children[j].size
        })

        data.push(reposData[i].children[j].size);
      }
      reposData[i].size = total;
    }

    for (let i = 0; i < omicsType.length; i++) {
      omicsDataSimple.push({
        name: omicsType[i].name,
        size: omicsType[i].value
      })
      omicsDataNum.push(omicsType[i].value);
    }

    let body = d3.select('#' + this.pieChartName);
    this.setTheRadio(body);
  }

  private setTheRadio(body): void {
    let pieChartName = this.pieChartName

    let divWidth = parseInt(body.style('width'));
    let formDiv = d3.select('#' + pieChartName + '_formdiv');
    if (formDiv.empty()) {
      formDiv = body.append('div');
    }
    formDiv
      .attr('id', pieChartName + '_formdiv')
      .attr('class', 'center')
      .attr('style', 'width: 180px; position: absolute; bottom: 15px; left:' + (divWidth / 2 - 60) + 'px');
    
    let radioForm = d3.select('#' + pieChartName + '_radio_form');
    if (radioForm.empty()) {
      radioForm = formDiv.append('form');
    } else {
      return;
    }

    radioForm
      .attr('id', pieChartName + '_radio_form')
      .attr('class', 'center')
      .attr('style', 'margin-bottom:8px;')
      .append('input')
      .attr('type', 'radio')
      .attr('name', 'dataset')
      .attr('value', 'Resources')
      .attr('id', 'Resources')
      .text('Resources');
    radioForm
        .append('label')
        .text('Resources')
        .attr('for', 'Resources')
        .append('span')
        .append('span');

    radioForm
        .append('input')
        .attr('type', 'radio')
        .attr('name', 'dataset')
        .attr('value', 'Omics')
        .attr('id', 'Omics_radio')
        .text('Omics');
    radioForm
        .append('label')
        .text('Omics')
        .attr('for', 'Omics_radio')
        .append('span')
        .append('span');

    console.log('loaded');
  }

  private dealCaseSensitiveIds(omicstype: any[]): any[] {
    if (!omicstype || omicstype.length < 1) return ;

    let singleOmicsType = [];
    omicstype.forEach(m => {
      m.id = m.id.toLowerCase();
      m.value = parseInt(m.value);

      if (singleOmicsType.length <= 0) {  
        singleOmicsType.push(m);
      }else {
        let isRepeated = false;
        singleOmicsType.forEach(n => {
          if (m.id === n.id) {
            n.value = n.value + m.value;
            isRepeated  = true;
          }
        })
        if (!isRepeated) {
          singleOmicsType.push(m);
        }
      }
    })
    return singleOmicsType;
  }

  private transformDomains(domains: any[]): any[]{
    return domains.reduce((acc, val) => {
      return acc.concat([{
        name: val['domain']['name'],
        value: parseInt(val['domain']['value'])
      }])
    }, []);
  }

  public outputErrorInfo(errDiv: string): void {
    let tempDiv = d3.select('#' + errDiv);
    
    tempDiv.selectAll('i').remove();
    tempDiv.selectAll('p').remove();
    tempDiv.append('p')
           .attr('class', 'error-info')
           .text('Sorry, accessing to this web service was temporally failed.');
  }

  public outputGettingInfo(errDiv: string): void {
    let tempDiv = d3.select('#' + errDiv);

    if (tempDiv.select('i')[0][0] === null) {
      tempDiv.append('i')
             .attr('class', 'fa fa-spinner fa-spin');
    }
  }

  public removeGettingInfo(errDiv: string): void {
    let tempDiv = d3.select('#' + errDiv);
    tempDiv.select('i').remove();
  }

}
