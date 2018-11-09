import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import * as d3 from 'd3';
import {ChartsErrorHandler} from '../charts-error-handler/charts-error-handler';
import {Router} from '@angular/router';
import {AppConfig} from 'app/app.config';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';
import {isPlatformServer} from '@angular/common';
import {forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-annual-omicstype',
    templateUrl: './annual-omicstype.component.html',
    styleUrls: ['./annual-omicstype.component.css'],
    providers: [ {provide: AsyncInitialisedComponent, useExisting: AnnualOmicstypeComponent }]
})
export class AnnualOmicstypeComponent extends AsyncInitialisedComponent implements OnInit {

    private web_service_url = this.appConfig.getWebServiceUrl();
    isServer: boolean;
    private static getName(year: any, value: any, data: any[]): string {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].omics.length; j++) {
                if (parseInt(data[i].omics[j].year, 10) === year && data[i].omics[j].value === value) {
                    return data[i].omics[j].name;
                }
            }
        }
    }

    constructor(private router: Router,
                public appConfig: AppConfig,
                private http: HttpClient,
                @Inject(PLATFORM_ID) private platformId: string) {
        super();
        this.isServer = isPlatformServer(this.platformId);
    }

    ngOnInit() {
        if (!isPlatformServer(this.platformId)) {
            const self = this;
            const urls = [
                this.web_service_url + 'statistics/omicsByYear',
            ];

            forkJoin(
                urls.map(url => this.http.get(url))
            ).subscribe(data => {
                ChartsErrorHandler.removeGettingInfo('barchart_omicstype_annual');
                const processedData = self.prepareData(data[0] as any[]);
                self.drawGraph(processedData);
            }, err => {
                ChartsErrorHandler.outputErrorInfo('barchart_omicstype_annual');
            }, () => {
                self.componentLoaded();
            });
        }
    }

    private drawGraph(processedData: any): void {
        const self = this;

        const body = d3.select('#barchart_omicstype_annual');
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

        const x0 = d3.scaleTime().range([0, width - 30]);
        const y0 = d3.scaleLinear().range([height - heightOffset, 0]);
        const y1 = d3.scaleLinear().range([height - heightOffset, 0]);
        const xAxis = d3.axisBottom(x0).ticks(4).tickFormat(d3.timeFormat('%Y'));
        const yAxisLeft = d3.axisLeft(y0).ticks(9);
        const yAxisRight = d3.axisRight(y1).ticks(9);
        const yLine = d3.scaleLinear().range([15, 0]);
        const yNavLine = d3.axisBottom(yLine).ticks(0);

        const minDate = new Date(d3.min(annualDataExtends, d => {
            return parseInt(d['year'], 10);
        }), 0, 0);
        const maxDate = new Date(d3.max(annualDataExtends, d => {
            return parseInt(d['year'], 10);
        }), 0, 1);

        x0.domain([minDate, maxDate]);

        y0.domain([0, d3.max(annualDataExtends, d => {
            return d3.max(d['omics'], p => {
                if (p['name'] === 'genomics' || p['name'] === 'transcriptomics') {
                    return parseInt(p['value'], 10);
                }
            });
        })]);

        y1.domain([0, d3.max(annualDataExtends, d => {
            return d3.max(d['omics'], r => {
                if (r['name'] === 'metabolomics' || r['name'] === 'proteomics') {
                    return parseInt(r['value'], 10);
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
                return x0(new Date(d['year'], 0, 0));
            })
            .y(d => {
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
                toolTip.transition()
                    .duration(200)
                    .style('opacity', .9);

                toolTip.html(d.name.toString() + ': <br>' + d.value.toString() + ' datasets')
                    .style('left', ((mouse_coords[0] - 100) + 'px'))
                    .style('top', (parseInt(d3.select(this).attr('cy'), 10) - 13 + 'px'))
                    .style('width', ((d.year.toString().length + 9) * 8 + 'px'))
                    .style('padding', '5px');
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
                    + AnnualOmicstypeComponent.getName(d['year'], d['value'], annualDataExtends)
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
                return 'translate(' + (i * 0) + ',270)';
            })
            .on('click', function (d) {
                const searchWord = 'omics_type:"' + d + '"';
                // angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);//***not yet solved**/
                self.router.navigate(['search'], {queryParams: {q: searchWord}});
            });

        const legend_coords = {
            'genomics': {x: 30, y: 25, color: 'steelblue'},
            'transcriptomics': {x: 30, y: 45, color: 'steelblue'},
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
        const divHeight = 355;
        const divWidth = parseInt(body.style('width'), 10);

        const heightOffset = 50;
        const margin = {top: 25, right: 20, bottom: 20, left: 60},
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

        d3.select('#barchart_omicstype_annual_svg').remove();
        const svg = d3.select('#barchart_omicstype_annual').append('svg')
            .attr('id', 'barchart_omicstype_annual_svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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
        //     omicsTypes = _.without(omicsTypes, "omics");//***unclear question  */

        const data = annualData;
        const genomicsList = [],
            metaboloList = [],
            proteomiList = [],
            transcriList = [],
            allYearData = [];

        data.forEach(d => {

            d.omics = omicsTypes.map(name => {
                if (name !== 'year') {
                    return {name: name, value: +d[name], year: d['year']};
                }
            });
            // calculate the log value
            for (let i = 0; i < d.omics.length; i++) {

                const currOmic = d.omics[i];

                switch (currOmic.name) {
                    case 'genomics':
                        genomicsList.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                        });
                        break;
                    case 'transcriptomics':
                        transcriList.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                        });
                        break;
                    case 'metabolomics':
                        metaboloList.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                        });
                        break;
                    case 'proteomics':
                        proteomiList.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                        });
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
