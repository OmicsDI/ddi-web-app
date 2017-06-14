import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as d3 from 'd3';
import { Selection } from 'd3-selection';

import { DataSetService } from '../../../../services/dataset.service';
import { ChartsErrorHandler } from '../charts-error-handler/charts-error-handler';

@Component({
  selector: 'repos-omics',
  templateUrl: './repos-omics.component.html',
  styleUrls: ['./repos-omics.component.css']
})
export class ReposOmicsComponent implements OnInit {

  @Output()
  notifyHomeLoader:EventEmitter<string> = new EventEmitter<string>();

  private webServiceUrl: string;
  private proteomicsList: string;
  private genomicsList: string;
  private metabolomicsList: string;
  private transcriptomicsList: string;
  
  private pieChartName = 'chart_repos_omics';
  private body;
  private retryLimitTimes = 2;

  private reposDataSimple = [];
  private data = [];
  private omicsDataSimple = [];
  private omicsDataNum = [];

  constructor(dataSetService: DataSetService) {
    // this.webServiceUrl = dataSetService.getWebServiceUrl();
    this.webServiceUrl = "http://www.omicsdi.org/ws/";
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
            this.notifyHomeLoader.emit('repos_omics');
            ChartsErrorHandler.outputErrorInfo(this.pieChartName);
            return;
          }
          ChartsErrorHandler.outputGettingInfo(this.pieChartName);
          this.startRequest();
        } else {
          this.notifyHomeLoader.emit('repos_omics');
          this.draw(domains, omicstype);
        }
      });
  }

  public draw(domains: any[], omicsType: any[]): void {
    let self = this;
    ChartsErrorHandler.removeGettingInfo(self.pieChartName);

    let repos = self.transformDomains(domains);
    omicsType.shift();
    omicsType.pop();
    omicsType = self.dealCaseSensitiveIds(omicsType);

    
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


    for (let i = 0; i < repos.length; i++) {
      if (self.proteomicsList.indexOf(repos[i].name) > -1) {
        reposData[0].children.push({
          name: repos[i].name,
          size: repos[i].value
        })
        continue;
      }
      if (self.genomicsList.indexOf(repos[i].name) > -1) {
        reposData[1].children.push({
            name: repos[i].name,
            size: repos[i].value
        });
        continue;
      }
      if (self.metabolomicsList.indexOf(repos[i].name) > -1) {
        reposData[2].children.push({
            name: repos[i].name,
            size: repos[i].value
        });
        continue;
      }
      if (self.transcriptomicsList.indexOf(repos[i].name) > -1) {
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

        self.reposDataSimple.push({
          name: reposData[i].children[j].name,
          size: reposData[i].children[j].size
        })

        self.data.push(reposData[i].children[j].size);
      }
      reposData[i].size = total;
    }

    for (let i = 0; i < omicsType.length; i++) {
      self.omicsDataSimple.push({
        name: omicsType[i].name,
        size: omicsType[i].value
      })
      self.omicsDataNum.push(omicsType[i].value);
    }

    let body = self.body = d3.select('#' + self.pieChartName);

    self.setTheRadio();
    self.drawBarGraphic(self.data, self.reposDataSimple);
    self.showTip('*:* AND repository:"', self.reposDataSimple);

    // give different namespace after 'resize' to add window listener
    d3.select(window).on('resize.repos_omics', function() {
      self.drawBarGraphic(self.data, self.reposDataSimple);
      self.showTip('*:* AND repository:"', self.reposDataSimple);
    });
  }

// radio form set up ---------------------------//
  private setTheRadio(): void {
    let omicsDataNum = this.omicsDataNum
      , omicsDataSimple = this.omicsDataSimple
      , reposDataSimple = this.reposDataSimple
      , data = this.data
      , pieChartName = this.pieChartName
      , body = this.body;

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

    d3.select("#" + this.pieChartName + "_radio_form")
      .selectAll('input')
      .on('change', change);

    d3.select("#" + this.pieChartName + "_radio_form")
      .select('input[value=Resources]')
      .property('checked', true);
    
    let self = this;
    function change() {
      let value = this.value || 'Resources'
        , d: any[]
        , searchWordPre: string;
      
      if (value == 'Omics') {
        d = omicsDataNum;
        searchWordPre = '*:* AND omics_type:"';

        self.drawBarGraphic(d, omicsDataSimple);
        self.showTip(searchWordPre, omicsDataSimple)
      }else if (value == 'Resources') {
        d = data;
        searchWordPre = '*:* AND repository:"';

        self.drawBarGraphic(d, reposDataSimple);
        self.showTip(searchWordPre, reposDataSimple);
        
      }
    }
  }

// 
  private drawBarGraphic(dataNow: any[],dataAddKey: any[]): void {
    let body = d3.select('#' + this.pieChartName);

    let divWidth = parseInt(body.style('width'));
    let divHeight = parseInt(body.style('height'));
    body.attr('position', 'relative');
    d3.select('#' + this.pieChartName + '_svg').remove();

    let svgHeight = divHeight - 40;
    let rectHeight = (svgHeight - 20 * 2 - 8 * 2) / 3;
    let rectWidth = (divWidth - 70) * 0.06514;
    let marginValueBefore = (divWidth - 70 - rectWidth * dataNow.length) / dataNow.length + rectWidth;
    let marginValue = marginValueBefore > 65 ? 65 : marginValueBefore;
    let lower = d3.scaleLinear().domain([0, 1000]).range([rectHeight * 3 + 28, rectHeight * 2 + 28]).clamp(true),
        upper = d3.scaleLinear().domain([1001, 5000]).range([rectHeight * 2 + 18, rectHeight + 18]).clamp(true),
        most = d3.scaleLinear().domain([5001, 80000]).range([rectHeight + 8, 8]).clamp(true),
        color = d3.schemeCategory10;
    
    let svg = body
                .append("svg")
                .attr("width", divWidth)
                .attr("height", svgHeight)
                .attr('margin-top', 10)
                .attr("id", this.pieChartName + "_svg");

    if (svg.selectAll("rect")) {
        svg.selectAll("rect").remove();
    }

    if (svg.selectAll("g")) {
        svg.selectAll("g").remove();
    }

    if (svg.selectAll("text")) {
        svg.selectAll("text").remove();
    }

    svg
      .selectAll("rect.lower")
      .data(dataNow)
      .enter()
      .append("rect")
      .attr("class", "lower")
      .attr("x", function (d, i) {
          return 70 + i * marginValue;
      })
      .attr("width", rectWidth)
      .attr("y", function (d) {
          return lower(d);
      })
      .attr("height", function (d) {
          return rectHeight * 3 + 28 - lower(d);
      })
      .style("fill", function(d, i) { return color[i % 10] });

    svg.selectAll("rect.upper")
        .data(dataNow)
        .enter()
        .append("rect")
        .attr("class", "upper")
        .attr("x", function (d, i) {
            return 70 + i * marginValue;
        })
        .attr("width", rectWidth)
        .attr("y", function (d) {
            return upper(d);
        })
        .attr("height", function (d) {
            return d >= 1500 ? rectHeight * 2 + 18 - upper(d) : 0;
        })
        .style("fill", function(d, i) { return color[i % 10] });

    svg.selectAll("rect.most")
        .data(dataNow)
        .enter()
        .append("rect")
        .attr("class", "most")
        .attr("x", function (d, i) {
            return 70 + i * marginValue;
        })
        .attr("width", rectWidth)
        .attr("y", function (d) {
            return most(d);
        })
        .attr("height", function (d) {
            return d >= 10000 ? rectHeight + 8 - most(d) : 0
        })
        .style('fill', function(d, i) { return color[i % 10] });


    svg.append("g").attr("transform", "translate(60,0)")
        .call(d3.axisLeft(lower).ticks(4));

    svg.append("g").attr("transform", "translate(60,0)")
        .call(d3.axisLeft(upper).ticks(4));

    svg.append("g").attr("transform", 'translate(60,0)')
        .call(d3.axisLeft(most).ticks(4));

    this.setTheRadio();
  }

  private showTip(searchWordPre: string, dataAddKey: any[]): void {
    let self = this
      , pieChartName = self.pieChartName;
    d3.select('#' + pieChartName + '_tooltip').remove();

    let tooltip = self.body
        .append('div')
        .attr('id', pieChartName + '_tooltip')
        .attr('class', 'chart_tooltip')
        .style('opacity', 0)
        .attr('position', 'absolute');

    self.body.selectAll('rect')
        .on('mouseover', function(d, i) {
          i = i % dataAddKey.length;
          let mouseCoords = d3.mouse(document.getElementById(pieChartName + '_tooltip').parentElement);
          d3.select(this).attr('cursor', 'pointer');

          tooltip.transition()
            .duration(200)
            .style('opacity', .9);

          tooltip.html(dataAddKey[i].name.toString() + ': <br>' + dataAddKey[i].size.toString() + ' datasets')
            .style('left', (mouseCoords[0]) + 'px')
            .style('top', parseInt(d3.select(this).attr('y')) - 30 + 'px')
            // .style('height', '2.8em')
            // .style('width', (self.getLength(dataAddKey[i].name, dataAddKey[i].size) * 7.5) + 'px')
            .style('padding', '3px')
            .style('font-size', 'monospace');
        })
        .on('mouseout', function () {
            tooltip.transition()
                .duration(500)
                .style('opacity', '0');
        })
        .on('click', function (d, i) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
            let searchWord = searchWordPre + dataAddKey[i].name.toString() + '"';
            if (dataAddKey[i].name.toString() == "MetaboLights Dataset")
                searchWord = searchWordPre + "MetaboLights" + '"';
            if (dataAddKey[i].name.toString() == "Metabolome Workbench")
                searchWord = searchWordPre + "MetabolomicsWorkbench" + '"';
            if (dataAddKey[i].name.toString() == "Expression Atlas Experiments")
                searchWord = searchWordPre + "ExpressionAtlas" + '"';
            // angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
            //---------------------------------------- redirect ----------------------------------------//
        })
  }

  private getLength(name: string, value: string): number {
    let nameLen = name.toString().length
      , valueLen = (value.toString() + ' datasets').length;
    
    return nameLen > valueLen ? nameLen : valueLen;
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
}
