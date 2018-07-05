import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as d3 from 'd3';
import {DataSetService} from 'services/dataset.service';
import {AppConfig} from '../../../../../app.config';
import {DatasetCount} from 'model/DatasetCount';
import {ProfileService} from 'services/profile.service';


import {Observable} from 'rxjs/Observable';
import {DataSetDetail} from 'model/DataSetDetail';
import {NotificationsService} from 'angular2-notifications/dist';
import {ThorService} from 'services/thor.service';

@Component({
    selector: 'app-dashboard-reanalisys-count',
    templateUrl: './dashboard-reanalisys-count.component.html',
    styleUrls: ['./dashboard-reanalisys-count.component.css']
})
export class DashboardReanalisysCountComponent implements OnInit, OnChanges {

    @Output()
    notifyHomeLoader: EventEmitter<string> = new EventEmitter<string>();
    private username: string;
    private web_service_url = this.appConfig.getWebServiceUrl();
    private retryLimitTimes = 2;
    private userServiceUrl: string;
    private dataOfViewCount: DatasetCount;
    dataSets: DataSetDetail[];

    @Input() datasets: DataSetDetail[] = [];

    private static getName(year: any, value: any, data: any[]): string {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].omics.length; j++) {
                if (data[i].omics[j].year === year && data[i].omics[j].value === value) {
                    return data[i].omics[j].name;
                }
            }
        }
    }

    constructor(private dataSetService: DataSetService, private route: ActivatedRoute,
                private appConfig: AppConfig, private profileService: ProfileService
        , private router: Router
        , private notificationService: NotificationsService
        , private thorService: ThorService) {
        this.userServiceUrl = dataSetService.getProfileServiceUrl();
    }

    ngOnInit() {
        // this.profileService.getDataSetDetails(this.profileService.profile);
        this.profileService.onProfileReceived.subscribe(x => this.reloadDataSets());


        // Listen page size
        Observable.fromEvent(window, 'resize')
            .debounceTime(100) // timer
            .subscribe((event) => {
                // restartRequest
                this.reloadDataSets();
            });

        this.web_service_url = this.dataSetService.getWebServiceUrl();
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            // console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
            if (propName === 'datasets') {
                // console.log(chng.currentValue);
                this.datasets = chng.currentValue;
                // console.log(this.datasets);
                if (null != chng.currentValue) {
                    // console.log('hey reload!');
                    // console.log(this.datasets);
                    this.reloadDataSets();
                }
            }
        }
    }

    reloadDataSets() {
        // this.dataSets = new Array();
        this.startRequest(this.datasets);
    }

    private startRequest(datasetDetail: DataSetDetail[]) {

        const processedData = this.prepareData(datasetDetail);
        // console.log(processedData);
        this.draw(processedData);
    }

    private draw(processedData: any) {

        this.drawGraph(processedData);
        const self = this;
        // d3.select(window).on('resize',function(){
        //   self.drawGraph(processedData);
        // });
        d3.select(window)
            .on('resize.annual_omicstype', function () {
                if (self.router.url === '/home') {
                    self.drawGraph(processedData);
                }
            });
    }

    private drawGraph(processedData: any): void {
        const self = this;
        // console.log('processedData');
        // console.log(processedData);

        const body = d3.select('#barchart_reanalisys_dashboard');
        const svgProperties: any = this.initSvg(body);

        const width = svgProperties.get('width');
        const height = svgProperties.get('height');
        const heightOffset = svgProperties.get('heightOffset');
        const svg = svgProperties.get('svg');
        const toolTip = svgProperties.get('toolTip');

        const annualDataExtends = processedData.get('annualDataExtends');
        const allYear = processedData.get('allYear');
        const genomicsList = processedData.get('genomicsList');
        const transcriList = processedData.get('transcriList');
        const metaboloList = processedData.get('metaboloList');
        const proteomiList = processedData.get('proteomiList');
        const omicsTypes = [
            {omicstype: 'genomicsList'}, {omicstype: 'transcriList'}, {omicstype: 'metaboloList'}, {omicstype: 'proteomiList'}];
        // console.log(allYear);

        const yearSet = processedData.get('yearSet');

        const dataCollection: number[] = [];
        // let idCollection:string[] = [];
        // let pointerCollection: number[] = [];
        const yearCollections: number[] = [];
        const countCollections: number[] = [];
        allYear.forEach(data => {
            // console.log(Number(data['count'].toString()));
            const count: number = Number(data['value']);
            dataCollection.push(count);
            // idCollection.push(data['id']);
            yearCollections.push(data['year']);
        });

        // console.log(genomicsList);
        //
        // console.log(Array.from(annualDataExtends).length);
        // var minDate = new Date(d3.min(annualDataExtends, d => {
        //     return parseInt(d["year"]);
        // }), 0, 0);
        // var maxDate = new Date(d3.max(annualDataExtends, d => {
        //     return parseInt(d["year"]);
        // }), 0, 1);

        const x0 = d3.scaleTime().range([0, width - 30]);
        const y0 = d3.scaleLinear().range([height - heightOffset, 0]);
        const y1 = d3.scaleLinear().range([height - heightOffset, 0]);
        const xAxis = d3.axisBottom(x0).ticks(yearSet.size + 2);
        const yAxisLeft = d3.axisLeft(y0).ticks(1);
        const yAxisRight = d3.axisRight(y1).ticks(1);
        const yLine = d3.scaleLinear().range([15, 0]);
        const yNavLine = d3.axisBottom(yLine).ticks(0);


        const minpointer = processedData.get('minYear');
        // console.log(minpointer);
        const max_G_T = processedData.get('max_G_T');
        const max_M_P = processedData.get('max_M_P');
        x0.domain([new Date(Number(minpointer) - 1, 0, 0), new Date()]);

        y0.domain([0, Number(max_G_T)]);
        y1.domain([0, Number(max_M_P)]);


        const valueline = d3.line()
            .x(d => {

                return x0(new Date(d['year'], 0, 0));
            })
            .y(d => {

                return y0(parseInt(d['value'], 10));
            });

        const valueline2 = d3.line()
            .x(d => {
                // console.log('Line:');
                // console.log(x0(new Date(d["year"], 0, 0)));
                return x0(new Date(d['year'], 0, 0));
            })
            .y(d => {
                // console.log(y1(parseInt(d["value"])));
                return y1(parseInt(d['value'], 10));
            });

        if (genomicsList) {
            svg.append('path')
                .style('stroke', 'steelblue')
                .attr('d', valueline(genomicsList));
        }
        if (transcriList) {
            svg.append('path')
                .style('stroke', 'steelblue')
                .style('stroke-dasharray', ('3, 3'))
                .attr('d', valueline(transcriList));
        }
        if (metaboloList) {
            svg.append('path')        // Add the valueline2 path.
                .attr('class', 'line')
                .style('stroke', 'red')
                .attr('d', valueline2(metaboloList));
        }
        if (proteomiList) {
            svg.append('path')
                .attr('class', 'line')
                .style('stroke', 'red')
                .style('stroke-dasharray', ('3, 3'))
                .attr('d', valueline2(proteomiList));
        }
        svg.selectAll('path')
            .style('stroke-width', '2')
            .style('fill', 'none');

        svg.selectAll('circle')
            .data(allYear)
            .enter()
            .append('circle')
            .attr('cx', function (d, i) {
                return x0(new Date(d['year'], 0, 0));
            })
            .attr('cy', function (d) {
                // console.log(d);
                if (d['omics_type'] === 'Genomics' || d['omics_type'] === 'Transcriptomics') {
                    // console.log(y0(d['value']));
                    return y0(d['value']);
                } else if (d['omics_type'] === 'Metabolomics' || d['omics_type'] === 'Proteomics') {
                    // console.log(y1(d['value']));
                    return y1(d['value']);
                }
            })
            .attr('fill', function (d) {
                if (d['omics_type'] === 'Genomics' || d['omics_type'] === 'Transcriptomics') {
                    // console.log(y0(d['value']));
                    return 'steelblue';
                } else if (d['omics_type'] === 'Metabolomics' || d['omics_type'] === 'Proteomics') {
                    // console.log(y1(d['value']));
                    return 'red';
                }
            });

        svg.selectAll('circle')
            .attr('r', 4)
            .style('cursor', 'pointer')
            .on('mouseover', function (d: any, i: number) {
                const mouse_coords = d3.mouse(document.getElementById('bar_chart_tooltip').parentElement);
                // console.log(mouse_coords[0]+','+mouse_coords[1]);
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
                const profile_div = d3.select('#profile_div').style('height');
                const profile_div_height = profile_div.substring(0, profile_div.indexOf('px'));

                const barchart_omicstype_annual_dashboard = d3.select('#barchart_claim_dashboard').style('height');
                const barchart_claim_dashboard_height = barchart_omicstype_annual_dashboard.substring(
                    0, barchart_omicstype_annual_dashboard.indexOf('px'));

                // barchart_citations_dashboard height
                const barchart_citations_dashboard = d3.select('#barchart_citations_dashboard').style('height');
                const barchart_citations_dashboard_height = barchart_citations_dashboard.substring(
                    0, barchart_citations_dashboard.indexOf('px'));
                // barchart_connections_dashboard
                const barchart_connections_dashboard = d3.select('#barchart_connections_dashboard').style('height');
                const barchart_connections_dashboard_height = barchart_connections_dashboard.substring(
                    0, barchart_connections_dashboard.indexOf('px'));
                // barchart_views_dashboard
                const barchart_views_dashboard = d3.select('#barchart_views_dashboard').style('height');
                const barchart_views_dashboard_height = barchart_views_dashboard.substring(0, barchart_views_dashboard.indexOf('px'));
                // barchart_reanalisys_dashboard
                const barchart_reanalisys_dashboard = d3.select('#barchart_reanalisys_dashboard').style('height');
                const barchart_reanalisys_dashboard_height = barchart_reanalisys_dashboard.substring(
                    0, barchart_reanalisys_dashboard.indexOf('px'));

                const position = Number(profile_div_height) -
                    Number(barchart_claim_dashboard_height) - Number(barchart_citations_dashboard_height) -
                    Number(barchart_connections_dashboard_height) - Number(barchart_views_dashboard_height) -
                    Number(barchart_reanalisys_dashboard_height) + mouse_coords[1] - 40;
                // console.log('position:'+position);

                toolTip.html(d.omics_type.toString() + ': <br>' + d.value.toString() + ' datasets')
                    .style('left', ((mouse_coords[0] + 5) + 'px'))
                    .style('top', (position + 'px'))
                    .style('height', '3em')
                    .style('width', ((d.year.toString().length + 9) * 8 + 'px'))
                    .style('padding', '5px');

                toolTip.transition()
                    .duration(200)
                    .style('opacity', .9);
                // contactInfo,gsc_rsb_co,connectionBox

                // let contactInfo = d3.select('#contactInfo').style('height');
                // let contactInfo_height = contactInfo.substring(0,contactInfo.indexOf('px'));
                // let gsc_rsb_co = d3.select('#gsc_rsb_co').style('height');
                // let gsc_rsb_co_height = contactInfo.substring(0,contactInfo.indexOf('px'));
                // let connectionBox = d3.select('#connectionBox').style('height');
                // let connectionBox_height = contactInfo.substring(0,contactInfo.indexOf('px'));
                // let sum = Number(contactInfo)+Number(gsc_rsb_co)+Number(connectionBox);
                // let coordy = mouse_coords[1].valueOf();
                // console.log('????:'+contactInfo_height);
                // console.log(mouse_coords[0]+","+mouse_coords[1]);
                // console.log(coordy+sum);

            })
            .on('mouseout', function () {
                toolTip.transition()
                    .duration(500)
                    .style('opacity', 0);
            })
            .on('click', function (d) {
                toolTip.transition()
                    .duration(500)
                    .style('opacity', 0);

                const searchWord = '*:* AND omics_type:"'
                    + DashboardReanalisysCountComponent.getName(d['year'], d['value'], annualDataExtends)
                    + '" AND publication_date:"' + d['year'] + '"';

                // console.log("router.navigate>>");
                self.router.navigate(['search'], {queryParams: {q: searchWord}});
            });

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height - heightOffset) + ')')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y axis')
            .style('stroke', 'steelblue')
            .call(yAxisLeft);

        svg.append('g')
            .attr('class', 'y axis')
            .style('stroke', 'red')
            .attr('transform', 'translate(' + (width - 30) + ' ,0)')
            .call(yAxisRight);
        // let legend = svg.selectAll(".legend")
        //     .data(omicsTypes.slice().reverse())
        //     .enter().append("g")
        //     .attr("class", "legend")
        //     .attr("transform", function (d, i) {
        //         return "translate(" + (i * 0) + ",200)";
        //     })
        //     .on("click", function (d) {
        //         var searchWord = "*:* AND omics_type:\"" + d + "\"";
        //         // angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);//***not yet solved**/
        //         // console.log("this.router.navigate");
        //         self.router.navigate(['search'],{ queryParams: { q: searchWord }});
        //     });
        //
        // let legend_coords = {
        //     "genomics": { x: -15, y: 25, color: "steelblue" },
        //     "transcriptomics": { x: -15, y: 45, color: "steelblue" },
        //     "metabolomics": { x: (width + 10) / 2, y: 25, color: "red" },
        //     "proteomics": { x: (width + 10) / 2, y: 45, color: "red" }
        // };
        //
        // legend.append("path")
        //     .attr("class", "omics-line")
        //     .style("stroke-width", "2")
        //     .attr("d", d => {
        //         return "M " + legend_coords[d]["x"] + " " + (legend_coords[d]["y"] + 8) +
        //             " L " + (legend_coords[d]["x"] + 14) + " " + (legend_coords[d]["y"] + 8);
        //     })
        //     .style("stroke", d => {
        //         return legend_coords[d]["color"];
        //     })
        //     .style("stroke-dasharray", d => {
        //         if (d === "transcriptomics" || d === "proteomics") {
        //             return ("3, 3");
        //         } else {
        //             return ("0, 0");
        //         }
        //     });
        //
        // legend.append("text")
        //     .attr("x", d => {
        //         return legend_coords[d]['x'] + 20
        //     })
        //     .attr("y", d => {
        //         return legend_coords[d]['y']
        //     })
        //     .attr("dy", ".85em")
        //     .style("text-anchor", "start")
        //     .text(d => {
        //         return (d.substr(0, 1).toUpperCase() + d.substr(1, d.length - 1));
        //     });


    }

    private initSvg(body: any): any {

        const svgProperties = new Map<string, any>();
        // let body = d3.select('#barchart_omicstype_annual');
        const divWidthPx = body.style('width');
        let divWidth = parseInt(divWidthPx.substr(0, divWidthPx.length - 2), 10);
        const latestDatasetsDivHeightPx = d3.select('#barchart_reanalisys_dashboard').style('height');
        let divHeight = parseInt(latestDatasetsDivHeightPx.substr(0, latestDatasetsDivHeightPx.length - 2), 10);
        divHeight = 100;
        divWidth = parseInt(body.style('width'), 10);

        const heightOffset = 50;
        const margin = {top: 20, right: 0, bottom: -20, left: 20},
            width = divWidth - margin.left - margin.right,
            height = divHeight - margin.top - margin.bottom;
        body.attr('position', 'relative');

        let tool_tip = null;
        if (!tool_tip) {
            // tool_tip = document.getElementById('barchart_omicstype_annual_dashboard_svg')
            tool_tip = body.append('div')
                .attr('id', 'bar_chart_tooltip')
                .attr('class', 'chart_tooltip')
                .style('opacity', 0)
                .attr('position', 'absolute');
        }

        d3.select('#barchart_reanalisys_dashboard_svg').remove();
        const svg = d3.select('#barchart_reanalisys_dashboard').append('svg')
            .attr('id', 'barchart_reanalisys_dashboard_svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + 20 + ',' + margin.top + ')');

        svgProperties.set('width', width);
        svgProperties.set('height', height);
        svgProperties.set('heightOffset', heightOffset);
        svgProperties.set('svg', svg);
        svgProperties.set('toolTip', tool_tip);

        return svgProperties;
    }

    private prepareData(annualData: any[]): any {
        const years: number[] = [];
        annualData.forEach(d => {
            const date = d['dates']['publication'];
            let year;
            if (date.toString().indexOf('-') >= 0) {
                year = date.toString().substr(0, 4);
            } else {
                year = date.toString().substr(date.toString().lastIndexOf(' '), 4);
            }
            years.push(Number(year));
        });
        const maxYear = Math.max(...years);
        // console.log(maxYear);
        const minYear = Math.min(...years);
        const allList = [];
        const allList_g = [];
        const allList_m = [];
        const allList_p = [];
        const allList_t = [];
        for (let i = minYear; i < maxYear + 1; i++) {
            allList_g.push({
                year: +i,
                value: 0
            });
            allList_m.push({
                year: +i,
                value: 0
            });
            allList_p.push({
                year: +i,
                value: 0
            });
            allList_t.push({
                year: +i,
                value: 0
            });
        }

        // console.log(allList_g);


        const genomicsList = [],
            metaboloList = [],
            proteomiList = [],
            transcriList = [],
            allYearData = [];
        annualData.forEach(d => {
            // console.log(d);
            const date = d['dates']['publication'];
            let year;
            if (date.toString().indexOf('-') >= 0) {
                year = date.toString().substr(0, 4);
            } else {
                year = date.toString().substr(date.toString().lastIndexOf(' '), 4);
            }
            switch (d['omics_type'].toString()) {
                case 'Genomics':

                    genomicsList.push({
                        year: +year,
                        value: +d['scores']['reanalysisCount']
                    });
                    break;
                case 'Transcriptomics':

                    transcriList.push({
                        year: +year,
                        value: +d['scores']['reanalysisCount']
                    });
                    break;
                case 'Metabolomics':

                    metaboloList.push({
                        year: +year,
                        value: +d['scores']['reanalysisCount']
                    });
                    break;
                case 'Proteomics':

                    proteomiList.push({
                        year: +year,
                        value: +d['scores']['reanalysisCount']
                    });
                    break;
                default:
                    break;
            }
        });

        const processedData = new Map<string, any>();

        const genomics = this.groupByYear(genomicsList);
        const transcri = this.groupByYear(transcriList);
        const metabolo = this.groupByYear(metaboloList);
        const proteomi = this.groupByYear(proteomiList);

        // console.log(genomics);
        // console.log(transcri);
        // console.log(metabolo);
        // console.log(proteomi);


        allList_g.forEach(g => {
            if (genomics) {
                genomics.forEach(d => {
                    if (g['year'] === d['year']) {
                        g['value'] = d['value'];
                    }
                });
            }
        });

        allList_t.forEach(g => {
            if (transcri) {
                transcri.forEach(d => {
                    if (g['year'] === d['year']) {
                        g['value'] = d['value'];
                    }
                });
            }
        });
        allList_m.forEach(g => {
            if (metabolo) {
                metabolo.forEach(d => {
                    if (g['year'] === d['year']) {
                        g['value'] = d['value'];
                    }
                });
            }
        });
        allList_p.forEach(g => {
            if (proteomi) {
                proteomi.forEach(d => {
                    if (g['year'] === d['year']) {
                        g['value'] = d['value'];
                    }
                });
            }
        });

        const allFullYearData = [];
        const data_M_P = [];
        const data_G_T = [];

        if (allList_g) {
            allList_g.forEach(d => {
                allFullYearData.push({
                    omics_type: 'Genomics', year: d['year'], value: d['value']
                });
                data_G_T.push(Number(d['value']));
            });
        }
        if (allList_t) {
            allList_t.forEach(d => {
                allFullYearData.push({
                    omics_type: 'Transcriptomics', year: d['year'], value: d['value']
                });
                data_G_T.push(Number(d['value']));
            });
        }
        if (allList_m) {
            allList_m.forEach(d => {
                allFullYearData.push({
                    omics_type: 'Metabolomics', year: d['year'], value: d['value']
                });
                data_M_P.push(Number(d['value']));
            });
        }
        if (allList_p) {
            allList_p.forEach(d => {
                allFullYearData.push({
                    omics_type: 'Proteomics', year: d['year'], value: d['value']
                });
                data_M_P.push(Number(d['value']));
            });
        }
        const dataCollection = [];
        const yearSet = new Set();
        allFullYearData.forEach(data => {
            yearSet.add(data['year']);
        });
        const max_G_T = Math.max(...data_G_T);
        const max_M_P = Math.max(...data_M_P);


        if (allList_g) {
            allList_g.forEach(d => {
                if (d['value'] !== 0) {
                    allYearData.push({
                        omics_type: 'Genomics', year: d['year'], value: d['value']
                    });
                }
            });
        }
        if (allList_t) {
            allList_t.forEach(d => {
                if (d['value'] !== 0) {
                    allYearData.push({
                        omics_type: 'Transcriptomics', year: d['year'], value: d['value']
                    });
                }
            });
        }
        if (allList_m) {
            allList_m.forEach(d => {
                if (d['value'] !== 0) {
                    allYearData.push({
                        omics_type: 'Metabolomics', year: d['year'], value: d['value']
                    });
                }
            });
        }
        if (allList_p) {
            allList_p.forEach(d => {
                if (d['value'] !== 0) {
                    allYearData.push({
                        omics_type: 'Proteomics', year: d['year'], value: d['value']
                    });
                }
            });
        }

        processedData.set('allYear', allYearData);
        processedData.set('genomicsList', allList_g);
        processedData.set('transcriList', allList_t);
        processedData.set('metaboloList', allList_m);
        processedData.set('proteomiList', allList_p);
        processedData.set('minYear', minYear);
        processedData.set('max_G_T', max_G_T);
        processedData.set('max_M_P', max_M_P);
        processedData.set('yearSet', yearSet);

        return processedData;

    }

    private prepareAllDate(priData: any, nameString: string, allYearData: any[]) {
        for (let i = 0; i < priData.length; i++) {
            allYearData.push({
                name: nameString,
                year: priData[i].year,
                value: priData[i].value
            });
        }
    }

    private groupByYear(data: any) {
        if (data.length <= 0) {
            return;
        }
        const yearSet = new Set();
        data.forEach(d => {
            yearSet.add(d['year']);
        });
        const groupedByYear = [];
        const years = Array.from(yearSet);
        years.forEach(y => {
            let totalCount = 0;
            // console.log(y);
            data.forEach(d => {
                // console.log(d['year']);
                if (Number(d['year']) === Number(y)) {
                    // console.log(totalCount);
                    totalCount = totalCount + Number(d['value']);
                    // console.log(totalCount);
                }
            });
            groupedByYear.push({
                value: totalCount, year: Number(y)
            });
        });
        return groupedByYear;
    }
}
