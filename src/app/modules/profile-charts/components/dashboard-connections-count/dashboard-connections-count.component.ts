import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as d3 from 'd3';
import {DataSetService} from '@shared/services/dataset.service';
import {AppConfig} from 'app/app.config';
import {ProfileService} from '@shared/services/profile.service';
import {DataSetDetail} from 'model/DataSetDetail';

@Component({
    selector: 'app-dashboard-connections-count',
    templateUrl: './dashboard-connections-count.component.html',
    styleUrls: ['./dashboard-connections-count.component.css']
})
export class DashboardConnectionsCountComponent implements OnInit {

    @Output()
    notifyHomeLoader: EventEmitter<string> = new EventEmitter<string>();
    private web_service_url = this.appConfig.getWebServiceUrl();
    private userServiceUrl: string;
    dataSets: DataSetDetail[];
    @Input() datasets: DataSetDetail[] = [];

    private static getName(year: any, value: any, data: any[]): string {
        for (let i = 0; i < data.length; i++) {
            if (data[i].year === year && data[i].value === value) {
                return data[i].omics_type;
            }
        }
    }

    constructor(private dataSetService: DataSetService,
                private route: ActivatedRoute,
                public appConfig: AppConfig,
                public profileService: ProfileService,
                private router: Router) {
        this.userServiceUrl = dataSetService.getProfileServiceUrl();
    }

    ngOnInit() {
        this.startRequest(this.datasets);
        this.web_service_url = this.dataSetService.getWebServiceUrl();
    }

    private startRequest(datasetDetail: DataSetDetail[]) {

        const processedData = this.prepareData(datasetDetail);
        this.drawGraph(processedData);
    }

    private drawGraph(processedData: any): void {
        const self = this;

        const body = d3.select('#barchart_connections_dashboard');
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
        const omicsTypes = ['genomics', 'transcriptomics', 'metabolomics', 'proteomics'];

        const yearSet = processedData.get('yearSet');

        const x0 = d3.scaleTime().range([0, width - 30]);
        const y0 = d3.scaleLinear().range([height - heightOffset, 0]);
        const y1 = d3.scaleLinear().range([height - heightOffset, 0]);
        const xAxis = d3.axisBottom(x0).ticks(yearSet.size + 2);
        const yAxisLeft = d3.axisLeft(y0).ticks(1);
        const yAxisRight = d3.axisRight(y1).ticks(1);
        const yLine = d3.scaleLinear().range([15, 0]);
        const yNavLine = d3.axisBottom(yLine).ticks(0);


        const minpointer = processedData.get('minYear');
        const max_G_T = processedData.get('max_G_T');
        const max_M_P = processedData.get('max_M_P');
        x0.domain([new Date(Number(minpointer) - 1, 0, 0), new Date()]);

        y0.domain([0, Number(max_G_T)]);
        y1.domain([0, Number(max_M_P)]);


        const valueline = d3.line()
            .x(d => {return x0(new Date(d['year'], 0, 0)); })
            .y(d => {return y0(parseInt(d['value'], 10)); });

        const valueline2 = d3.line()
            .x(d => {return x0(new Date(d['year'], 0, 0)); })
            .y(d => {return y1(parseInt(d['value'], 10)); });

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
                if (d['omics_type'] === 'Genomics' || d['omics_type'] === 'Transcriptomics') {
                    return y0(d['value']);
                } else if (d['omics_type'] === 'Metabolomics' || d['omics_type'] === 'Proteomics') {
                    return y1(d['value']);
                }
            })
            .attr('fill', function (d) {
                if (d['omics_type'] === 'Genomics' || d['omics_type'] === 'Transcriptomics') {
                    return 'steelblue';
                } else if (d['omics_type'] === 'Metabolomics' || d['omics_type'] === 'Proteomics') {
                    return 'red';
                }
            });

        svg.selectAll('circle')
            .attr('r', 4)
            .style('cursor', 'pointer')
            .on('mouseover', function (d: any, i: number) {
                const mouse_coords = d3.mouse(document.getElementById('barchart_connections_dashboard'));

                toolTip.html(d.omics_type.toString() + ': <br>' + d.value.toString() + ' datasets')
                    .style('left', ((mouse_coords[0] - 10) + 'px'))
                    .style('top', ((mouse_coords[1] - 35 ) + 'px'))
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

                const searchWord = 'omics_type:"'
                    + DashboardConnectionsCountComponent.getName(d['year'], d['value'], allYear)
                    + '" AND publication_date:"' + d['year'] + '"';

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
                return 'translate(' + (i * 0) + ',100)';
            })
            .on('click', function (d) {
                const searchWord = 'omics_type:"' + d + '"';
                self.router.navigate(['search'], {queryParams: {q: searchWord}});
            });

        const legend_coords = {
            'genomics': {x: 0, y: 5, color: 'steelblue'},
            'transcriptomics': {x: 0, y: 35, color: 'steelblue'},
            'metabolomics': {x: (width + 10) / 2, y: 5, color: 'red'},
            'proteomics': {x: (width + 10) / 2, y: 35, color: 'red'}
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
        const divHeight = 100;
        const divWidth = parseInt(body.style('width'), 10);

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

        d3.select('#barchart_connections_dashboard_svg').remove();
        const svg = d3.select('#barchart_connections_dashboard').append('svg')
            .attr('id', 'barchart_connections_dashboard_svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom + 80)
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
                year = date.toString().substr(date.toString().lastIndexOf(' ') + 1, 4);
            }
            years.push(Number(year));
        });
        const maxYear = Math.max(...years);
        const minYear = Math.min(...years);
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

        const genomicsList = [],
            metaboloList = [],
            proteomiList = [],
            transcriList = [],
            allYearData = [];
        annualData.forEach(d => {
            const date = d['dates']['publication'];
            let year;
            if (date.toString().indexOf('-') >= 0) {
                year = date.toString().substr(0, 4);
            } else {
                year = date.toString().substr(date.toString().lastIndexOf(' ') + 1, 4);
            }
            const searchCount = d['scores'] != null ? d['scores']['searchCount'] : 0;
            switch (d['omics_type'].toString()) {
                case 'Genomics':

                    genomicsList.push({
                        year: +year,
                        value: +searchCount
                    });
                    break;
                case 'Transcriptomics':

                    transcriList.push({
                        year: +year,
                        value: +searchCount
                    });
                    break;
                case 'Metabolomics':

                    metaboloList.push({
                        year: +year,
                        value: +searchCount
                    });
                    break;
                case 'Proteomics':

                    proteomiList.push({
                        year: +year,
                        value: +searchCount
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
            const count: number = Number(data['value']);
            dataCollection.push(count);
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
            data.forEach(d => {
                if (Number(d['year']) === Number(y)) {
                    totalCount = totalCount + Number(d['value']);
                }
            });
            groupedByYear.push({
                value: totalCount, year: Number(y)
            });
        });
        return groupedByYear;
    }
}
