import { Component, OnInit, EventEmitter, Output,Input,SimpleChanges,OnChanges } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as d3 from 'd3';
import { ChartsErrorHandler } from '../charts-error-handler/charts-error-handler';
import {DataSetService} from "../../../../services/dataset.service";
import {AppConfig} from "../../../../app.config";
import {Profile} from "../../../../model/Profile";
import {DatasetCount} from "../../../../model/DatasetCount";
import {ProfileService} from "../../../../services/profile.service";


import { Observable } from 'rxjs';
import {DataSetDetail} from "../../../../model/DataSetDetail";
import {NotificationsService} from "angular2-notifications/dist";
import {ThorService} from "../../../../services/thor.service";
@Component({
  selector: 'app-dashboard-reanalisys-count',
  templateUrl: './dashboard-reanalisys-count.component.html',
  styleUrls: ['./dashboard-reanalisys-count.component.css']
})
export class DashboardReanalisysCountComponent implements OnInit {

    @Output()
    notifyHomeLoader:EventEmitter<string> = new EventEmitter<string>();
    private username: string;
    private web_service_url = this.appConfig.getWebServiceUrl();
    private retryLimitTimes = 2;
    private userServiceUrl: string;
    private dataOfViewCount: DatasetCount;

    @Input() profile: Profile = new Profile();


    constructor( private dataSetService: DataSetService,private route: ActivatedRoute,private appConfig: AppConfig,private profileService: ProfileService


        , private router: Router
        , private notificationService: NotificationsService
        , private thorService: ThorService) {
        this.userServiceUrl = dataSetService.getProfileServiceUrl();
    }

    ngOnInit() {
        //this.profileService.getDataSetDetails(this.profileService.profile);
        this.profileService.onProfileReceived.subscribe(x => this.reloadDataSets());



        // Listen page size
        Observable.fromEvent(window, 'resize')
            .debounceTime(100) //timer
            .subscribe((event) => {
                // restartRequest
                this.reloadDataSets();
            });

        this.web_service_url = this.dataSetService.getWebServiceUrl();
    }

    dataSets: DataSetDetail[];

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
            if(propName=="profile"){
                if(null!=chng.currentValue){
                    this.reloadDataSets();
                }
            }
        }
    }

    reloadDataSets(){
        // this.dataSets = new Array();
        if(!this.profile){
            return;
        }
        if(!this.profile.dataSets){
            return;
        }
        Observable.forkJoin(this.profile.dataSets.map(x => { return this.dataSetService.getDataSetDetail_private(x.id,x.source)})).subscribe(
            y => {
                // console.log(x);
                console.log(y);
                this.dataSets = y;
                this.thorService.datasets = y;
                console.log(this.dataSets);

                this.startRequest(this.dataSets);

            }
        )
    }

    private startRequest(datasetDetail: DataSetDetail[] ) {
        let test= [];
        let id: string;
        for(let i = 0;i<datasetDetail.length;i++){
            test.push({
                id: datasetDetail[i].id,count: +datasetDetail[i]['scores']['reanalysisCount'],pointer: i+1
            })

        }
        console.log(test);
        let processedData = this.prepareData(test);
        this.draw(test);
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
        console.log('processedData');
        console.log(processedData);
        console.log(processedData.length);
        let dataCollection: number[] = [];
        let idCollection:string[] = [];
        let pointerCollection: number[] = [];
        for(let data of processedData){
            console.log(Number(data['count'].toString()));
            let count: number = Number(data['count']);
            dataCollection.push(count);
            idCollection.push(data['id']);
            pointerCollection.push(data['pointer']);
        }
        console.log(dataCollection);
        let max = Math.max(...dataCollection);
        let maxpointer = Math.max(...pointerCollection);
        console.log(max);


        let body = d3.select('#barchart_reanalisys_dashboard');
        let svgProperties: any = this.initSvg(body);

        let width = svgProperties.get("width");
        let height = svgProperties.get("height");
        let heightOffset = svgProperties.get("heightOffset");
        let svg = svgProperties.get("svg");
        let toolTip = svgProperties.get("toolTip");


        let countList = processedData;

        let x0 = d3.scaleLinear().range([0, width - 30]);
        let y0 = d3.scaleLinear().range([height - heightOffset, 0]);
        let y1 = d3.scaleLinear().range([height - heightOffset, 0]);
        let xAxis = d3.axisBottom(x0).ticks(processedData.length+2);
        let yAxisLeft = d3.axisLeft(y0).ticks(1);
        let yAxisRight = d3.axisRight(y1).ticks(2);
        let yLine = d3.scaleLinear().range([15, 0]);
        let yNavLine = d3.axisBottom(yLine).ticks(0);



        x0.domain([0,maxpointer+1]);

        y1.domain([0, max]);

        var valueline = d3.line()
            .x(d => {
                console.log(d['pointer']);
                return x0(d['pointer']);
            })
            .y(d => {
                console.log(d['count']);
                return y1(d['count']);
            });
        svg.append("path")        // Add the valueline2 path.
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline(processedData));
        svg.selectAll("path")
            .style('stroke-width', '2')
            .style('fill', 'none');

        svg.selectAll("circle")
            .data(processedData)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return x0(d['pointer']);
            })
            .attr("cy", function (d) {
                return y1(d['count']);
            })
            .attr("fill", function (d) {
                return "red";
            });

        svg.selectAll("circle")
            .attr("r", 4)
            .style("cursor", "pointer")
            .on("mouseover", function (d: any, i: number) {
                let mouse_coords = d3.mouse(document.getElementById("bar_chart_tooltip").parentElement);
                console.log(mouse_coords[0]+','+mouse_coords[1]);
                /*
                for d3 tooltip
                if a tooltip is inside angular component inside a div like this
                ----div-----
                [component]
                [component]
                [component]
                ----div-----
                the tooltip will show at the div,not the component ,so we have to fix it
                 */
                //whole profile div
                let profile_div = d3.select('#profile_div').style('height');
                let profile_div_height = profile_div.substring(0,profile_div.indexOf('px'));
                //barchart_connections_dashboard
                let barchart_connections_dashboard = d3.select('#barchart_connections_dashboard').style('height');
                let barchart_connections_dashboard_height = barchart_connections_dashboard.substring(0,barchart_connections_dashboard.indexOf('px'));
                //barchart_views_dashboard
                let barchart_views_dashboard = d3.select('#barchart_views_dashboard').style('height');
                let barchart_views_dashboard_height = barchart_views_dashboard.substring(0,barchart_views_dashboard.indexOf('px'));
                //barchart_reanalisys_dashboard
                let barchart_reanalisys_dashboard = d3.select('#barchart_reanalisys_dashboard').style('height');
                let barchart_reanalisys_dashboard_height = barchart_reanalisys_dashboard.substring(0,barchart_reanalisys_dashboard.indexOf('px'));

                let position = Number(profile_div_height)-Number(barchart_connections_dashboard_height)*5 + mouse_coords[1] - 40;
                console.log('position:'+position);

                toolTip.html(d['id'] + ": <br>" + d['count'] + " reanalisys")
                    .style("left", ((mouse_coords[0] + 5) + "px"))
                    .style("top", (position + "px"))
                    .style("height", "3em")
                    .style("width", (d3.select('#profile_div').style('width') + "px"))
                    .style("padding", "5px");

                toolTip.transition()
                    .duration(200)
                    .style("opacity", .9);
            })
            .on("mouseout", function () {
                toolTip.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
        //     .on("click", function (d) {
        //         toolTip.transition()
        //             .duration(500)
        //             .style("opacity", 0);
        //
        //         let searchWord = "*:* AND omics_type:\""
        //             + DashboardViewsCountComponent.getName(d["year"], d["value"], processedData)
        //             + "\" AND publication_date:\"" + d["year"] + "\"";
        //
        //         console.log("router.navigate>>");
        //         self.router.navigate(['search'],{ queryParams: { q: searchWord }});
        //     });

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
    }
    private initSvg(body : any): any {

        let svgProperties = new Map<string, any>();
        // let body = d3.select('#barchart_omicstype_annual');
        let divWidthPx = body.style("width");
        let divWidth = parseInt(divWidthPx.substr(0, divWidthPx.length - 2));
        let latestDatasetsDivHeightPx = d3.select('#barchart_reanalisys_dashboard').style('height');
        let divHeight = parseInt(latestDatasetsDivHeightPx.substr(0, latestDatasetsDivHeightPx.length - 2));
        divHeight = 100;
        divWidth = parseInt(body.style("width"));

        let heightOffset = 50;
        let margin = { top: 20, right: 0, bottom: -20, left: 20 },
            width = divWidth - margin.left - margin.right,
            height = divHeight - margin.top - margin.bottom;
        body.attr("position", "relative");

        let tool_tip = null;
        if (!tool_tip) {
            // tool_tip = document.getElementById('barchart_omicstype_annual_dashboard_svg')
            tool_tip = body.append("div")
                .attr("id", "bar_chart_tooltip")
                .attr("class", "chart_tooltip")
                .style("opacity", 0)
                .attr("position", "absolute");
        }

        d3.select("#barchart_reanalisys_dashboard_svg").remove();
        let svg = d3.select("#barchart_reanalisys_dashboard").append("svg")
            .attr("id", "barchart_reanalisys_dashboard_svg")
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
