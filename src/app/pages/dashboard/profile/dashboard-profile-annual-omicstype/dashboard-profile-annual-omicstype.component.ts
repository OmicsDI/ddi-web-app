import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as d3 from 'd3';
import {ChartsErrorHandler} from '../charts-error-handler/charts-error-handler';
import {DataSetService} from 'services/dataset.service';
import {AppConfig} from '../../../../app.config';
import {Profile} from 'model/Profile';
import {ProfileService} from 'services/profile.service';

import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-dashboard-profile-annual-omicstype',
    templateUrl: './dashboard-profile-annual-omicstype.component.html',
    styleUrls: ['./dashboard-profile-annual-omicstype.component.css']
})
export class DashboardProfileAnnualOmicstypeComponent implements OnInit, OnChanges {

    @Output()
    notifyHomeLoader: EventEmitter<string> = new EventEmitter<string>();
    private username: string;
    private web_service_url = this.appConfig.getWebServiceUrl();
    private retryLimitTimes = 2;
    private userServiceUrl: string;

    @Input() profile: Profile = new Profile();

    private static getName(year: any, value: any, data: any[]): string {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].omics.length; j++) {
                if (data[i].omics[j].year === year && data[i].omics[j].value === value) {
                    return data[i].omics[j].name;
                }
            }
        }
    }

    constructor(private router: Router, private dataSetService: DataSetService,
                private route: ActivatedRoute, public appConfig: AppConfig, public profileService: ProfileService) {
        this.userServiceUrl = dataSetService.getProfileServiceUrl();
    }

    ngOnInit() {
        this.startRequest();

        // Listen page size
        Observable.fromEvent(window, 'resize')
            .debounceTime(100) // timer
            .subscribe((event) => {
                this.startRequest();
            });

        this.web_service_url = this.dataSetService.getWebServiceUrl();

    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName of Object.keys(changes)) {
            const chng = changes[propName];
            const cur = JSON.stringify(chng.currentValue);
            const prev = JSON.stringify(chng.previousValue);
            if (propName === 'profile') {
                this.profile = chng.currentValue;
            }
            this.startRequest();
        }
    }

    private startRequest() {
        d3.queue()
            .defer(d3.json, this.userServiceUrl + 'users/' + this.profile.userId + '/omicsbyyears?r=' + Math.random()) // geojson points
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
                    const processedData = this.prepareData(annualData);
                    this.draw(processedData);
                }
            });
    }

    private draw(processedData: any) {

        this.drawGraph(processedData);
        const self = this;
        d3.select(window)
            .on('resize.annual_omicstype', function () {
                if (self.router.url === '/home') {
                    self.drawGraph(processedData);
                }
            });
    }

    private drawGraph(processedData: any): void {
        const self = this;

        const body = d3.select('#barchart_omicstype_annual_dashboard');
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
        const omicsTypes = processedData.get('omicsTypes');

        const minDate = new Date(d3.min(annualDataExtends, d => {
            return parseInt(d['year'], 10);
        }), 0, 0);
        const maxDate = new Date(d3.max(annualDataExtends, d => {
            return parseInt(d['year'], 10);
        }), 0, 1);

        const x0 = d3.scaleTime().range([0, width - 30]);
        const y0 = d3.scaleLinear().range([height - heightOffset, 0]);
        const y1 = d3.scaleLinear().range([height - heightOffset, 0]);
        const xAxis = d3.axisBottom(x0).ticks(
            new Date().getFullYear() - (minDate.getFullYear())).tickFormat(d3.timeFormat('%Y'));
        const yAxisLeft = d3.axisLeft(y0).ticks(2);
        const yAxisRight = d3.axisRight(y1).ticks(2);
        const yLine = d3.scaleLinear().range([15, 0]);
        const yNavLine = d3.axisBottom(yLine).ticks(0);


        x0.domain([new Date((minDate.getFullYear()).toString()), new Date()]);

        y0.domain([0, d3.max(annualDataExtends, d => {
            return d3.max(d['omics'], p => {
                if (p['name'] === 'genomics' || p['name'] === 'transcriptomics') {
                    return parseInt(p['value'], 10);
                }
            });
        })]);

        y1.domain([0, d3.max(annualDataExtends, d => {
            return d3.max(d['omics'], record => {
                if (record['name'] === 'metabolomics' || record['name'] === 'proteomics') {
                    return parseInt(record['value'], 10);
                }
            });
        })
        ]);

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

        svg.append('path')
            .style('stroke', 'steelblue')
            .attr('d', valueline(genomicsList));

        svg.append('path')
            .style('stroke', 'steelblue')
            .style('stroke-dasharray', ('3, 3'))
            .attr('d', valueline(transcriList));

        svg.append('path')        // Add the valueline2 path.
            .attr('class', 'line')
            .style('stroke', 'red')
            .attr('d', valueline2(metaboloList));

        svg.append('path')
            .attr('class', 'line')
            .style('stroke', 'red')
            .style('stroke-dasharray', ('3, 3'))
            .attr('d', valueline2(proteomiList));

        svg.selectAll('path')
            .style('stroke-width', '2')
            .style('fill', 'none');

        svg.selectAll('circle')
            .data(allYear)
            .enter()
            .append('circle')
            .attr('cx', function (d, i) {
                return x0(new Date(d.year, 0, 0));
            })
            .attr('cy', function (d) {
                if (d.name === 'Genomics' || d.name === 'Transcriptomics') {
                    return y0(d.value);
                } else if (d.name === 'Metabolomics' || d.name === 'Proteomics') {
                    return y1(d.value);
                }
            })
            .attr('fill', function (d) {
                if (d.name === 'Genomics' || d.name === 'Transcriptomics') {
                    return 'steelblue';
                } else if (d.name === 'Metabolomics' || d.name === 'Proteomics') {
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

                const barchart_omicstype_annual_dashboard = d3.select('#barchart_omicstype_annual_dashboard').style('height');
                const barchart_omicstype_annual_dashboard_height = barchart_omicstype_annual_dashboard.substring(
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
                    Number(barchart_omicstype_annual_dashboard_height) - Number(barchart_citations_dashboard_height) -
                    Number(barchart_connections_dashboard_height) - Number(barchart_views_dashboard_height) -
                    Number(barchart_reanalisys_dashboard_height) + mouse_coords[1] - 40;
                // console.log('position:'+position);

                toolTip.html(d.name.toString() + ': <br>' + d.value.toString() + ' datasets')
                    .style('left', ((mouse_coords[0] + 5) + 'px'))
                    .style('top', (position + 'px'))
                    .style('height', '3em')
                    .style('width', ((d.year.toString().length + 9) * 8 + 'px'))
                    .style('padding', '5px');

                toolTip.transition()
                    .duration(200)
                    .style('opacity', .9);
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
                    + DashboardProfileAnnualOmicstypeComponent.getName(d['year'], d['value'], annualDataExtends)
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
        const legend = svg.selectAll('.legend')
            .data(omicsTypes.slice().reverse())
            .enter().append('g')
            .attr('class', 'legend')
            .attr('transform', function (d, i) {
                return 'translate(' + (i * 0) + ',200)';
            })
            .on('click', function (d) {
                const searchWord = '*:* AND omics_type:"' + d + '"';
                // angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);//***not yet solved**/
                // console.log("this.router.navigate");
                self.router.navigate(['search'], {queryParams: {q: searchWord}});
            });

        const legend_coords = {
            'genomics': {x: -15, y: 25, color: 'steelblue'},
            'transcriptomics': {x: -15, y: 45, color: 'steelblue'},
            'metabolomics': {x: (width + 10) / 2, y: 25, color: 'red'},
            'proteomics': {x: (width + 10) / 2, y: 45, color: 'red'}
        };

        legend.append('path')
            .attr('class', 'omics-line')
            .style('stroke-width', '2')
            .attr('d', d => {
                return 'M ' + legend_coords[d]['x'] + ' ' + (legend_coords[d]['y'] + 8) +
                    ' L ' + (legend_coords[d]['x'] + 14) + ' ' + (legend_coords[d]['y'] + 8);
            })
            .style('stroke', d => {
                return legend_coords[d]['color'];
            })
            .style('stroke-dasharray', d => {
                if (d === 'transcriptomics' || d === 'proteomics') {
                    return ('3, 3');
                } else {
                    return ('0, 0');
                }
            });

        legend.append('text')
            .attr('x', d => {
                return legend_coords[d]['x'] + 20;
            })
            .attr('y', d => {
                return legend_coords[d]['y'];
            })
            .attr('dy', '.85em')
            .style('text-anchor', 'start')
            .text(d => {
                return (d.substr(0, 1).toUpperCase() + d.substr(1, d.length - 1));
            });


    }

    private initSvg(body: any): any {

        const svgProperties = new Map<string, any>();
        // let body = d3.select('#barchart_omicstype_annual');
        const divWidthPx = body.style('width');
        let divWidth = parseInt(divWidthPx.substr(0, divWidthPx.length - 2), 10);
        const latestDatasetsDivHeightPx = d3.select('#barchart_omicstype_annual_dashboard').style('height');
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
            tool_tip = body.append('div')
                .attr('id', 'bar_chart_tooltip')
                .attr('class', 'chart_tooltip')
                .style('opacity', 0)
                .attr('position', 'absolute');
        }

        d3.select('#barchart_omicstype_annual_dashboard_svg').remove();
        const svg = d3.select('#barchart_omicstype_annual_dashboard').append('svg')
            .attr('id', 'barchart_omicstype_annual_dashboard_svg')
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

        const processedData = new Map<string, any>();
        const omicsTypes = d3.keys(annualData[0]).filter(key => {
            return key !== 'year';
        });
        const data = annualData;
        const years = [];

        data.forEach(d => {
            years.push(Number(d['year']));
        });

        const max = Math.max(...years);
        const min = Math.min(...years);


        const genomicsList = [],
            metaboloList = [],
            proteomiList = [],
            transcriList = [],
            allYearData = [];

        for (let i = min; i <= max; i++) {
            genomicsList.push({
                year: +i,
                value: 0
            });
            metaboloList.push({
                year: +i,
                value: 0
            });
            proteomiList.push({
                year: +i,
                value: 0
            });
            transcriList.push({
                year: +i,
                value: 0
            });
        }

        data.forEach(d => {

            d.omics = omicsTypes.map(name => {
                if (name !== 'year') {
                    return {name: name, value: +d[name], year: d['year']};
                }
            });
            for (let i = 0; i < d.omics.length; i++) {

                const currOmic = d.omics[i];

                switch (currOmic.name) {
                    case 'genomics':
                        if (currOmic.value !== 0) {
                            genomicsList.push({
                                year: +currOmic.year,
                                value: +currOmic.value
                            });
                        }

                        break;
                    case 'transcriptomics':
                        if (currOmic.value !== 0) {
                            transcriList.push({
                                year: +currOmic.year,
                                value: +currOmic.value
                            });
                        }
                        break;
                    case 'metabolomics':
                        if (currOmic.value !== 0) {
                            metaboloList.push({
                                year: +currOmic.year,
                                value: +currOmic.value
                            });
                        }
                        break;
                    case 'proteomics':
                        if (currOmic.value !== 0) {
                            proteomiList.push({
                                year: +currOmic.year,
                                value: +currOmic.value
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        });
        this.prepareAllDate(genomicsList, 'Genomics', allYearData);
        this.prepareAllDate(transcriList, 'Transcriptomics', allYearData);
        this.prepareAllDate(metaboloList, 'Metabolomics', allYearData);
        this.prepareAllDate(proteomiList, 'Proteomics', allYearData);

        processedData.set('annualDataExtends', data);
        processedData.set('allYear', allYearData);
        processedData.set('genomicsList', genomicsList);
        processedData.set('transcriList', transcriList);
        processedData.set('metaboloList', metaboloList);
        processedData.set('proteomiList', proteomiList);
        processedData.set('omicsTypes', omicsTypes);
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
}
