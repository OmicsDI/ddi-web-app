import { Component, OnInit, EventEmitter, Output,Input,SimpleChanges,OnChanges } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as d3 from 'd3';
import { ChartsErrorHandler } from '../charts-error-handler/charts-error-handler';
import {DataSetService} from "../../../../services/dataset.service";
import {AppConfig} from "../../../../app.config";
import {Profile} from "../../../../model/Profile";
import {ProfileService} from "../../../../services/profile.service";

import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard-profile-annual-omicstype',
    templateUrl: './dashboard-profile-annual-omicstype.component.html',
    styleUrls: ['./dashboard-profile-annual-omicstype.component.css']
})
export class DashboardProfileAnnualOmicstypeComponent implements OnInit {

    @Output()
    notifyHomeLoader:EventEmitter<string> = new EventEmitter<string>();
    private username: string;
    private web_service_url = this.appConfig.getWebServiceUrl();
    private retryLimitTimes = 2;
    private userServiceUrl: string;

    @Input() profile: Profile = new Profile();


    constructor(private router: Router, private dataSetService: DataSetService,private route: ActivatedRoute,private appConfig: AppConfig,private profileService: ProfileService) {
        this.userServiceUrl = dataSetService.getProfileServiceUrl();
    }

    ngOnInit() {
        this.startRequest();

        // Listen page size
        Observable.fromEvent(window, 'resize')
            .debounceTime(100) //timer
            .subscribe((event) => {
                // restartRequest
                this.startRequest();
            });

        this.web_service_url = this.dataSetService.getWebServiceUrl();

    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            if(propName=="profile"){
                this.profile = chng.currentValue;
            }
            this.startRequest();
        }
    }

    private startRequest() {
        d3.queue()
            .defer(d3.json, this.userServiceUrl + 'users/' + this.profile.userId + '/omicsbyyears') // geojson points
            .await((err: any, annualData: any[]) => {
                if (err) {
                    this.retryLimitTimes--;
                    if (this.retryLimitTimes <= 0) {
                        this.notifyHomeLoader.emit('annual_omicstype');
                        ChartsErrorHandler.outputErrorInfo('barchart_omicstype_annual');
                        return;
                    }
                    ChartsErrorHandler.outputGettingInfo('barchart_omicstype_annual');
                    this.startRequest();
                } else {
                    this.notifyHomeLoader.emit('annual_omicstype');
                    ChartsErrorHandler.removeGettingInfo('barchart_omicstype_annual');
                    let processedData = this.prepareData(annualData);
                    console.log(annualData);
                    this.draw(processedData);
                }
            });
    }
    private draw(processedData : any){

        this.drawGraph(processedData);
        let self = this;
        // d3.select(window).on('resize',function(){
        //   self.drawGraph(processedData);
        // });
        d3.select(window)
            .on('resize.annual_omicstype', function() {
                if(self.router.url === "/home")
                    self.drawGraph(processedData)
            })
    }
    private drawGraph(processedData : any): void {
        let self = this;

        let body = d3.select('#barchart_omicstype_annual_dashboard');
        let svgProperties: any = this.initSvg(body);

        let width = svgProperties.get("width");
        let height = svgProperties.get("height");
        let heightOffset = svgProperties.get("heightOffset");
        let svg = svgProperties.get("svg");
        let toolTip = svgProperties.get("toolTip");

        let annualDataExtends = processedData.get("annualDataExtends");
        let allYear = processedData.get("allYear");
        let genomicsList = processedData.get("genomicsList");
        let transcriList = processedData.get("transcriList");
        let metaboloList = processedData.get("metaboloList");
        let proteomiList = processedData.get("proteomiList");
        let omicsTypes = processedData.get("omicsTypes");

        let x0 = d3.scaleTime().range([0, width - 30]);
        let y0 = d3.scaleLinear().range([height - heightOffset, 0]);
        let y1 = d3.scaleLinear().range([height - heightOffset, 0]);
        let xAxis = d3.axisBottom(x0).ticks(4).tickFormat(d3.timeFormat("%Y"));
        let yAxisLeft = d3.axisLeft(y0).ticks(9);
        let yAxisRight = d3.axisRight(y1).ticks(9);
        let yLine = d3.scaleLinear().range([15, 0]);
        let yNavLine = d3.axisBottom(yLine).ticks(0);

        var minDate = new Date(d3.min(annualDataExtends, d => {
            return parseInt(d["year"]);
        }), 0, 0);
        var maxDate = new Date(d3.max(annualDataExtends, d => {
            return parseInt(d["year"]);
        }), 0, 1);

        x0.domain([minDate, maxDate]);

        y0.domain([0, d3.max(annualDataExtends, d => {
            return d3.max(d["omics"], p => {
                if (p["name"] === "genomics" || p["name"] === "transcriptomics") {
                    return parseInt(p["value"]);
                }
            });
        })]);

        y1.domain([0, d3.max(annualDataExtends, d => {
            return d3.max(d["omics"], d => {
                if (d["name"] === "metabolomics" || d["name"] === "proteomics") {
                    return parseInt(d["value"]);
                }
            });
        })
        ]);

        var valueline = d3.line()
            .x(d => {
                return x0(new Date(d["year"], 0, 0));
            })
            .y(d => {
                return y0(parseInt(d["value"]));
            });

        var valueline2 = d3.line()
            .x(d => {
                return x0(new Date(d["year"], 0, 0));
            })
            .y(d => {
                return y1(parseInt(d["value"]));
            });

        svg.append("path")
            .style("stroke", "steelblue")
            .attr("d", valueline(genomicsList));

        svg.append("path")
            .style("stroke", "steelblue")
            .style("stroke-dasharray", ("3, 3"))
            .attr("d", valueline(transcriList));

        svg.append("path")        // Add the valueline2 path.
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline2(metaboloList));

        svg.append("path")
            .attr("class", "line")
            .style("stroke", "red")
            .style("stroke-dasharray", ("3, 3"))
            .attr("d", valueline2(proteomiList));

        svg.selectAll("path")
            .style('stroke-width', '2')
            .style('fill', 'none');

        svg.selectAll("circle")
            .data(allYear)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) {
                return x0(new Date(d.year, 0, 0));
            })
            .attr("cy", function (d) {
                if (d.name == "Genomics" || d.name == "Transcriptomics") {
                    return y0(d.value);
                } else if (d.name == "Metabolomics" || d.name == "Proteomics") {
                    return y1(d.value);
                }
            })
            .attr("fill", function (d) {
                if (d.name == "Genomics" || d.name == "Transcriptomics") {
                    return "steelblue";
                } else if (d.name == "Metabolomics" || d.name == "Proteomics") {
                    return "red";
                }
            });

        svg.selectAll("circle")
            .attr("r", 4)
            .style("cursor", "pointer")
            .on("mouseover", function (d: any, i: number) {
                let mouse_coords = d3.mouse(document.getElementById("bar_chart_tooltip").parentElement);
                toolTip.transition()
                    .duration(200)
                    .style("opacity", .9);

                toolTip.html(d.name.toString() + ": <br>" + d.value.toString() + " datasets")
                    .style("left", ((mouse_coords[0] + 5) + "px"))
                    .style("top", (parseInt(d3.select(this).attr("cy")) - 13 + "px"))
                    .style("height", "2.5em")
                    .style("width", ((d.year.toString().length + 9) * 8 + "px"))
                    .style("padding", "5px");
            })
            .on("mouseout", function () {
                toolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .on("click", function (d) {
                toolTip.transition()
                    .duration(500)
                    .style("opacity", 0);

                let searchWord = "*:* AND omics_type:\""
                    + DashboardProfileAnnualOmicstypeComponent.getName(d["year"], d["value"], annualDataExtends)
                    + "\" AND publication_date:\"" + d["year"] + "\"";

                console.log("router.navigate>>");
                self.router.navigate(['search'],{ queryParams: { q: searchWord }});
            });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - heightOffset) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .style("stroke", "steelblue")
            .call(yAxisLeft);

        svg.append("g")
            .attr("class", "y axis")
            .style("stroke", "red")
            .attr("transform", "translate(" + (width - 30) + " ,0)")
            .call(yAxisRight);
        let legend = svg.selectAll(".legend")
            .data(omicsTypes.slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(" + (i * 0) + ",200)";
            })
            .on("click", function (d) {
                var searchWord = "*:* AND omics_type:\"" + d + "\"";
                // angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);//***not yet solved**/
                console.log("this.router.navigate");
                self.router.navigate(['search'],{ queryParams: { q: searchWord }});
            });

        let legend_coords = {
            "genomics": { x: -15, y: 25, color: "steelblue" },
            "transcriptomics": { x: -15, y: 45, color: "steelblue" },
            "metabolomics": { x: (width + 10) / 2, y: 25, color: "red" },
            "proteomics": { x: (width + 10) / 2, y: 45, color: "red" }
        };

        legend.append("path")
            .attr("class", "omics-line")
            .style("stroke-width", "2")
            .attr("d", d => {
                return "M " + legend_coords[d]["x"] + " " + (legend_coords[d]["y"] + 8) +
                    " L " + (legend_coords[d]["x"] + 14) + " " + (legend_coords[d]["y"] + 8);
            })
            .style("stroke", d => {
                return legend_coords[d]["color"];
            })
            .style("stroke-dasharray", d => {
                if (d === "transcriptomics" || d === "proteomics") {
                    return ("3, 3");
                } else {
                    return ("0, 0");
                }
            });

        legend.append("text")
            .attr("x", d => {
                return legend_coords[d]['x'] + 20
            })
            .attr("y", d => {
                return legend_coords[d]['y']
            })
            .attr("dy", ".85em")
            .style("text-anchor", "start")
            .text(d => {
                return (d.substr(0, 1).toUpperCase() + d.substr(1, d.length - 1));
            });


    }
    private initSvg(body : any): any {

        let svgProperties = new Map<string, any>();
        // let body = d3.select('#barchart_omicstype_annual');
        let divWidthPx = body.style("width");
        let divWidth = parseInt(divWidthPx.substr(0, divWidthPx.length - 2));
        let latestDatasetsDivHeightPx = d3.select('#barchart_omicstype_annual_dashboard').style('height');
        let divHeight = parseInt(latestDatasetsDivHeightPx.substr(0, latestDatasetsDivHeightPx.length - 2));
        divHeight = 288;
        divWidth = parseInt(body.style("width"));

        let heightOffset = 50;
        let margin = { top: 20, right: 0, bottom: 20, left: 80 },
            width = divWidth - margin.left - margin.right,
            height = divHeight - margin.top - margin.bottom;
        body.attr("position", "relative");

        let tool_tip = null;
        if (!tool_tip) {
            tool_tip = body.append("div")
                .attr("id", "bar_chart_tooltip")
                .attr("class", "chart_tooltip")
                .style("opacity", 0)
                .attr("position", "absolute");
        }

        d3.select("#barchart_omicstype_annual_dashboard_svg").remove();
        let svg = d3.select("#barchart_omicstype_annual_dashboard").append("svg")
            .attr("id", "barchart_omicstype_annual_dashboard_svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + 20 + "," + margin.top + ")");

        svgProperties.set("width", width);
        svgProperties.set("height", height);
        svgProperties.set("heightOffset", heightOffset);
        svgProperties.set("svg", svg);
        svgProperties.set("toolTip", tool_tip);

        return svgProperties;
    }
    private prepareData(annualData: any[]): any {

        let processedData = new Map<string, any>();
        let omicsTypes = d3.keys(annualData[0]).filter(key => {
            return key !== "year";
        });

        // console.log(omicsTypes);
        //     omicsTypes = _.without(omicsTypes, "omics");//***unclear question  */

        let data = annualData;
        let genomicsList = [],
            metaboloList = [],
            proteomiList = [],
            transcriList = [],
            allYearData = [];

        data.forEach(d => {

            d.omics = omicsTypes.map(name => {
                if (name !== "year") return { name: name, value: +d[name], year: d["year"] };
            });
            //calculate the log value
            for (var i = 0; i < d.omics.length; i++) {

                var currOmic = d.omics[i];

                switch (currOmic.name) {
                    case "genomics":
                        genomicsList.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                        })
                        break;
                    case "transcriptomics":
                        transcriList.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                        })
                        break;
                    case "metabolomics":
                        metaboloList.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                        })
                        break;
                    case "proteomics":
                        proteomiList.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                        })
                        break;
                    default:
                        break;
                }
            }
        });
        // console.log(data[0].omics);
        this.prepareAllDate(genomicsList, "Genomics", allYearData);
        this.prepareAllDate(transcriList, "Transcriptomics", allYearData);
        this.prepareAllDate(metaboloList, "Metabolomics", allYearData);
        this.prepareAllDate(proteomiList, "Proteomics", allYearData);

        processedData.set("annualDataExtends", data);
        processedData.set("allYear", allYearData);
        processedData.set("genomicsList", genomicsList);
        processedData.set("transcriList", transcriList);
        processedData.set("metaboloList", metaboloList);
        processedData.set("proteomiList", proteomiList);
        processedData.set("omicsTypes", omicsTypes);

        return processedData;
    }
    private prepareAllDate(priData: any, nameString: string, allYearData: any[]) {
        for (var i = 0; i < priData.length; i++) {
            allYearData.push({
                name: nameString,
                year: priData[i].year,
                value: priData[i].value
            })
        }
    }

    private static getName(year: any, value: any, data: any[]): string{
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].omics.length; j++) {
                if (data[i].omics[j].year == year && data[i].omics[j].value == value) {
                    return data[i].omics[j].name;
                }
            }
        }
    }

}
