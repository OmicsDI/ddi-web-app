import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'repos-omics',
  templateUrl: './repos-omics.component.html',
  styleUrls: ['./repos-omics.component.css']
})
export class ReposOmicsComponent implements OnInit {

  webServiceUrl = 'http://www.omicsdi.org/ws/';
  containerID = 'chart_repos_omics';
  retryLimitTimes = 2;

  constructor() { }

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
            this.outputErrorInfo(this.containerID);
            return;
          }
          this.outputGettingInfo(this.containerID);
          this.startRequest();
        } else {
          this.draw(domains, omicstype);
        }
      });
  }

  public draw(domains: any[], omicstype: any[]): void {
    this.removeGettingInfo(this.containerID);

    let repos = this.transformDomains(domains);
    omicstype.shift();
    omicstype.pop();
    omicstype = this.dealCaseSensitiveIds(omicstype);

    repos.sort((a, b) => {
      return a.value - b.value;
    })
    omicstype.sort((a, b) => {
      return a.value - b.value;
    })

    /**
     * prepare the treemap data
     */
    let repos_data = [
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

    let repos_data_simple = []
      , data = []
      , omics_data_simple = []
      , omics_data_num = [];

    
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
