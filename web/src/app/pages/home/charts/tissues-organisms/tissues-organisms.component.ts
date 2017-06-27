import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { PackLayout } from 'd3';

import { StatisticsDomainsDetail } from 'app/model/StatisticsDomainsDetail';
import { ChartsErrorHandler } from '../charts-error-handler/charts-error-handler';
import { DataSetService } from 'app/services/dataset.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tissues-organisms',
  templateUrl: './tissues-organisms.component.html',
  styleUrls: ['./tissues-organisms.component.css']
})
export class TissuesOrganismsComponent implements OnInit {

  @Output()
  notifyHomeLoader:EventEmitter<string> = new EventEmitter<string>();

  private webServiceUrl: string;
  private retryLimitTimes: number;
  private chartsErrorHandler: ChartsErrorHandler;

  private bubChartName = 'chart_tissues_organisms';
  private field = 'Tissues';

  private tissues: StatisticsDomainsDetail[];
  private organisms: StatisticsDomainsDetail[];
  private diseases: StatisticsDomainsDetail[];

  private bubble: any;

  constructor(datasetService: DataSetService, private router: Router) {
    this.webServiceUrl = datasetService.getWebServiceUrl();
    this.retryLimitTimes = 2;
    this.chartsErrorHandler = new ChartsErrorHandler();
  }

  ngOnInit() {
    this.startRequest();
  }

  private startRequest(): void {
    let self = this;

    d3.queue()
      .defer(d3.json, this.webServiceUrl + 'statistics/tissues?size=100')
      .defer(d3.json, this.webServiceUrl + 'statistics/organisms?size=100') // geojson points
      .defer(d3.json, this.webServiceUrl + 'statistics/diseases?size=100') // geojson points
      .await(function(error: any, tissues: StatisticsDomainsDetail[], organisms: StatisticsDomainsDetail[], diseases: StatisticsDomainsDetail[]) {
        if (error) {
          self.retryLimitTimes--;

          if (self.retryLimitTimes <= 0) {
            self.notifyHomeLoader.emit('tissues');
            ChartsErrorHandler.outputErrorInfo(self.bubChartName);
            return;
          }

          ChartsErrorHandler.outputGettingInfo(self.bubChartName);
          self.startRequest();
        }else {
          self.notifyHomeLoader.emit('tissues');
          ChartsErrorHandler.removeGettingInfo(self.bubChartName);

          self.tissues = tissues;
          self.organisms = organisms;
          self.diseases = diseases;

          self.prepareData();
        }
      });
  }

  private prepareData(): void{
    let self = this;

    self.tissues.pop();
    self.organisms.pop();
    self.diseases.pop();

    let totalTissues = self.tissues.shift()
      , totalOrganisms = self.organisms.shift()
      , totalDiseases = self.diseases.shift();

    self.tissues.sort((a, b) => parseInt(a.value) - parseInt(b.value));
    self.organisms.sort((a, b) => parseInt(a.value) - parseInt(b.value));
    self.diseases.sort((a, b) => parseInt(a.value) - parseInt(b.value));

    self.tissues = self.tissues.filter(o => parseInt(o.value) >= 7);
    self.organisms = self.organisms.filter(o => parseInt(o.value) >= 20);
    self.diseases = self.diseases.filter(o => parseInt(o.value) >= 7);

    self.draw();
  }

  private draw(): void {
    let self = this
      , body = d3.select('#' + self.bubChartName)
      , divWidth: number = parseInt(body.style('width'))
      , divHeight: number = parseInt(body.style('height'))
      , diameter = Math.min(divWidth, divHeight) / 1.15;

    body.selectAll("svg").remove();
    let svg = body.append("svg")
          .attr("width", diameter * 1.3)
          .attr("height", diameter * 1.3)
          .attr("class", "bubble center")
          .attr("style", "position:relative")

    d3.select(window.frameElement)
      .style("height", diameter + "px");

    let tooltip: any = document.getElementById("tissue_organism_chart_tooltip");

    if (tooltip == null) {
        tooltip = body.append("div")
            .attr("class", "chart_tooltip")
            .attr("id", "tissue_organism_chart_tooltip")
            .style("opacity", 0);
    }

    self.change();

    d3.select(window)
      .on('resize.tiss_organism', function() { self.change() })
  }

  private resetRadio(divWidthTemp: number): void {
    let self = this
      , body = d3.select('#' + self.bubChartName);

    let formdiv = d3.select('#' + self.bubChartName + '_formdiv');
    if (d3.select('#' + self.bubChartName + '_formdiv').empty()) {
        formdiv = body.append('div');
    }

    formdiv
      .attr("class", "center")
      .attr("id", self.bubChartName + '_formdiv')
      .attr("style", "width:266px; position:absolute; bottom: 15px; left:" + (divWidthTemp - 266) / 2 + "px");

    let radio_form = formdiv.select(self.bubChartName + "_radio_form");

    if (d3.select('#' + self.bubChartName + '_radio_form').empty()) {
        radio_form = formdiv.append('form');
    }else {
        return;
    }

    radio_form
        .attr("id", self.bubChartName + "_radio_form")
        .attr("class", "center")
        .attr("style", "margin-bottom:8px")
        //  .attr("style","width:70%")
        .append('input')
        .attr('type', 'radio')
        .attr('name', 'dataset')
        .attr('value', 'Tissues')
        .attr('id', 'Tissues')
        .text('Tissues');
    radio_form
        .append('label')
        .text('Tissues')
        .attr('for', 'Tissues')
        .append('span')
        .append('span');
    radio_form
        .append('input')
        .attr('type', 'radio')
        .attr('name', 'dataset')
        .attr('value', 'Organisms')
        .attr('id', 'Organisms')
        .text('Organisms');
    radio_form
        .append('label')
        .text('Organisms')
        .attr('for', 'Organisms')
        .append('span')
        .append('span');
    radio_form
        .append('input')
        .attr('type', 'radio')
        .attr('name', 'dataset')
        .attr('value', 'Diseases')
        .attr('id', 'Diseases')
        .text('Diseases');
    radio_form
        .append('label')
        .text('Diseases')
        .attr('for', 'Diseases')
        .append('span')
        .append('span');

    d3.select("#" + self.bubChartName + "_radio_form")
      .select('input[value=Tissues]')
      .property('checked', true);

    d3.select("#" + self.bubChartName + "_radio_form")
      .selectAll('input')
      .on('change', function(d: any) {
        console.log(d);
        self.field = d3.select(this).attr('value')    // ignore this exception raised by editor
        self.change();
      });
  }

  private change(): void {
    let self = this
      , body = d3.select('#' + self.bubChartName)
      , div_width_inside = parseInt(body.style('width'))
      , div_height_inside = parseInt(body.style("height"))
      , diameter_inside = Math.min(div_height_inside, div_width_inside) - 24
      , format = d3.format(",d")
      , color: string[] = d3.schemeCategory20b;

    body.selectAll("svg").remove();
    let svg_inside = body.append("svg")
            .attr("width", diameter_inside)
            .attr("height", diameter_inside)
            .attr("class", "bubble center");
    //         .attr("style", "position:relative");

    self.resetRadio(div_width_inside);

    let value = self.field || 'Tissues'
      , data = []
      , searchWord_pre;

    if (value == 'Tissues') {
        data = self.tissues;
        searchWord_pre = '*:* AND tissue:"';
    }
    if (value == 'Organisms') {
        data = self.calculateLoggedValue(self.organisms);
        searchWord_pre = '*:* AND TAXONOMY:"';
    }
    if (value == 'Diseases') {
        data = self.diseases;
        searchWord_pre = '*:* AND disease:"';
    }

    svg_inside.selectAll(".node").remove();
    let root = d3.hierarchy(self.classes(data))
                 .sum(function(d: any) { return d.value })
                 .sort((a, b) => a.value - b.value);

    let pack = d3.pack()
          .size([diameter_inside, diameter_inside - 24])
          .padding(1.5);

    let node_inside = svg_inside.selectAll('.node')
          .data(pack(root).descendants().filter(d => { return !d.children }))
          .enter().append('g')
            .attr("class", "node")
            .attr("transform", function (d: any) {
              // console.log(d)
                return "translate(" + d.x + "," + d.y + ")";
            })
            .on("click", function (d: any, i) {
                d3.select('#tissue_organism_chart_tooltip')
                  .transition()
                  .duration(500)
                  .style("opacity", 0);

                var searchWord = searchWord_pre + d.data.className + '"';
                if (value == 'Organisms') {
                    searchWord = searchWord_pre + d.data.taxonomyid + '"';
                }
                console.log(searchWord)
                self.router.navigate(['search'],{ queryParams: { q: searchWord }});
                // angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                // -------------------------------  redirect --------------------------------------------
            });

        node_inside.append('circle')
          .attr('r', function(d) { return d.r * 1.1 })
          .attr('fill', function(d, i) { return color[i % color.length] })

        node_inside.append('text')
          .attr('dy', '.3em')
          .style('text-anchor', 'middle')
          .style('font-size', '10px')
          .text(function(d: any) {
            return d.r / d.data.className.length < 2.5 ? '' : d.data.className;
          })

        node_inside.on('mousemove', function(d: any) {
          let tooltip = d3.select('#tissue_organism_chart_tooltip');

          tooltip.transition()
            .duration(200)
            .style('opacity', .9);

          let mouse_coords = d3.mouse(document.getElementById('tissue_organism_chart_tooltip').parentElement);

          tooltip.html("<div><strong>" + d.data.className + ": </strong></div><div>" + format(d.data.value_before_log_calc) + "&nbsp;datasets</div>")
                    .style("left", (mouse_coords[0] + 25) + "px")
                    .style("top", (mouse_coords[1] - 40) + "px")
                    .style('padding', '3px')
                    // .style("width", d.data.className.length * 5 + d.data.value_before_log_calc.toString().length * 5 + 30 + "px");
        })
        .on('mouseout', function(d) {
          d3.select('#tissue_organism_chart_tooltip')
            .transition()
            .duration(200)
            .style('opacity', 0);
        })

  }

  private calculateLoggedValue(data: StatisticsDomainsDetail[]): StatisticsDomainsDetail[] {
    let newdata = [];
    for (let i = 0; i < data.length; i++) {
        var item = {
            id: data[i].id,
            label: data[i].label,
            name: data[i].name,
            value: 1 + Math.floor(Math.log(+data[i].value)),
            value_before_log_calc: +data[i].value
        };
        newdata.push(item);
    }
    return newdata;
  }

  private classes(arr) {
    let classes = [];
    for (let i = 0; i < arr.length; i++) {
        let value_before_log_calc = arr[i].value_before_log_calc == null ? +arr[i].value : +arr[i].value_before_log_calc;
        classes.push({
            packageName: arr[i].name,
            className: arr[i].name,
            value: +arr[i].value,
            value_before_log_calc: +value_before_log_calc,
            taxonomyid: arr[i].id
        });
    }
    return {children: classes};
  }

}
