import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {DataSetService} from '@shared/services/dataset.service';
import {ChartsErrorHandler} from '../charts-error-handler/charts-error-handler';
import {Router} from '@angular/router';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';

@Component({
    selector: 'app-repos-omics',
    templateUrl: './repos-omics.component.html',
    styleUrls: ['./repos-omics.component.css'],
    providers: [ {provide: AsyncInitialisedComponent, useExisting: ReposOmicsComponent }]
})
export class ReposOmicsComponent extends AsyncInitialisedComponent implements OnInit {

    private webServiceUrl: string;
    private proteomicsList: string;
    private genomicsList: string;
    private metabolomicsList: string;
    private transcriptomicsList: string;

    private pieChartName = 'chart_repos_omics';
    private body;

    private reposDataSimple = [];
    private data = [];
    private omicsDataSimple = [];
    private omicsDataNum = [];

    constructor(dataSetService: DataSetService, private router: Router) {
        super();
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
        const self = this;
        const urls = [
            this.webServiceUrl + 'statistics/domains',
            this.webServiceUrl + 'statistics/omics'
        ];

        Promise.all(urls.map(url => d3.json(url))).then(function([domains, omicstype]) {
            self.draw(domains as any[], omicstype as any[]);
        }, (err) => {
            ChartsErrorHandler.outputErrorInfo(self.pieChartName);
        });
        this.componentLoaded();
    }

    public draw(domains: any[], omicsType: any[]): void {
        const self = this;
        ChartsErrorHandler.removeGettingInfo(self.pieChartName);

        const repos = self.transformDomains(domains);
        omicsType.shift();
        omicsType.pop();
        omicsType = self.dealCaseSensitiveIds(omicsType);


        omicsType.sort((a, b) => {
            return a.value - b.value;
        });
        repos.sort((a, b) => {
            return a.value - b.value;
        });

        /**
         * prepare the treemap data
         */
        const reposData = [
            {
                'name': 'Proteomics',
                'size': null,
                'children': []
            },
            {
                'name': 'Genomics',
                'size': null,
                'children': []
            },
            {
                'name': 'Metabolomics',
                'size': null,
                'children': []
            },
            {
                'name': 'Transcriptomics',
                'size': null,
                'children': []
            }
        ];


        for (let i = 0; i < repos.length; i++) {
            if (self.proteomicsList.indexOf(repos[i].name) > -1) {
                reposData[0].children.push({
                    name: repos[i].name,
                    size: repos[i].value
                });
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
            }
        }

        for (let i = 0; i < reposData.length; i++) {
            let total = 0;

            for (let j = 0; j < reposData[i].children.length; j++) {
                total += parseInt(reposData[i].children[j].size, 10);

                self.reposDataSimple.push({
                    name: reposData[i].children[j].name,
                    size: reposData[i].children[j].size
                });

                self.data.push(reposData[i].children[j].size);
            }
            reposData[i].size = total;
        }

        for (let i = 0; i < omicsType.length; i++) {
            self.omicsDataSimple.push({
                name: omicsType[i].name,
                size: omicsType[i].value
            });
            self.omicsDataNum.push(omicsType[i].value);
        }

        const body = self.body = d3.select('#' + self.pieChartName);

        self.drawBarGraphic(self.data, self.reposDataSimple);
        self.setTheRadio();
        self.showTip('repository:"', self.reposDataSimple);

        // give different namespace after 'resize' to add window listener
        d3.select(window).on('resize.repos_omics', function () {
            if (self.router.url === '/home') {
                self.drawBarGraphic(self.data, self.reposDataSimple);
                self.showTip('repository:"', self.reposDataSimple);
            }
        });
    }

// radio form set up ---------------------------//
    private setTheRadio(): void {
        const omicsDataNum = this.omicsDataNum
            , omicsDataSimple = this.omicsDataSimple
            , reposDataSimple = this.reposDataSimple
            , data = this.data
            , pieChartName = this.pieChartName
            , body = this.body;

        const divWidth = parseInt(body.style('width'), 10);
        let formDiv = d3.select('#' + pieChartName + '_formdiv');
        if (formDiv.empty()) {
            formDiv = body.append('div');
        }
        formDiv
            .attr('id', pieChartName + '_formdiv');

        let radioForm = d3.select('#' + pieChartName + '_radio_form');
        if (radioForm.empty()) {
            radioForm = formDiv.append('form');
        } else {
            return;
        }

        radioForm
            .attr('id', pieChartName + '_radio_form')
            .attr('class', 'center')
            .attr('style', 'margin-bottom:8px; width: 190px')
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

        d3.select('#' + this.pieChartName + '_radio_form')
            .selectAll('input')
            .on('change', change);

        d3.select('#' + this.pieChartName + '_radio_form')
            .select('input[value=Resources]')
            .property('checked', true);

        const self = this;

        function change() {
            const value = this.value || 'Resources';
            let d: any[]
                , searchWordPre: string;

            if (value === 'Omics') {
                d = omicsDataNum;
                searchWordPre = 'omics_type:"';

                self.drawBarGraphic(d, omicsDataSimple);
                self.showTip(searchWordPre, omicsDataSimple);
            } else if (value === 'Resources') {
                d = data;
                searchWordPre = 'repository:"';

                self.drawBarGraphic(d, reposDataSimple);
                self.showTip(searchWordPre, reposDataSimple);

            }
        }
    }

//
    private drawBarGraphic(dataNow: any[], dataAddKey: any[]): void {
        const body = d3.select('#' + this.pieChartName);

        const divWidth = parseInt(body.style('width'), 10);
        const divHeight = 365;
        body.attr('position', 'relative');
        d3.select('#' + this.pieChartName + '_svg').remove();

        const svgHeight = divHeight - 40;
        const rectHeight = (svgHeight - 20 * 2 - 8 * 2) / 3;
        const rectWidth = (divWidth - 70) * 0.04514;
        const marginValueBefore = (divWidth - 70 - rectWidth * dataNow.length) / dataNow.length + rectWidth;
        const marginValue = marginValueBefore > 65 ? 65 : marginValueBefore;
        const lower = d3.scaleLinear().domain([0, 1000]).range([rectHeight * 3 + 28, rectHeight * 2 + 28]).clamp(true),
            upper = d3.scaleLinear().domain([1001, 5000]).range([rectHeight * 2 + 18, rectHeight + 18]).clamp(true),
            most = d3.scaleLinear().domain([5001, 80000]).range([rectHeight + 8, 8]).clamp(true),
            color = d3.schemeCategory10;

        const svg = body
            .append('svg')
            .attr('width', divWidth)
            .attr('height', svgHeight)
            .attr('style', 'margin-top: 15px; margin-bottom: 10px')
            .attr('id', this.pieChartName + '_svg');

        if (svg.selectAll('rect')) {
            svg.selectAll('rect').remove();
        }

        if (svg.selectAll('g')) {
            svg.selectAll('g').remove();
        }

        if (svg.selectAll('text')) {
            svg.selectAll('text').remove();
        }

        svg
            .selectAll('rect.lower')
            .data(dataNow)
            .enter()
            .append('rect')
            .attr('class', 'lower')
            .attr('x', function (d, i) {
                return 70 + i * marginValue;
            })
            .attr('width', rectWidth)
            .attr('y', function (d) {
                return lower(d);
            })
            .attr('height', function (d) {
                return rectHeight * 3 + 28 - lower(d);
            })
            .style('fill', function (d, i) {
                return color[i % 10];
            });

        svg.selectAll('rect.upper')
            .data(dataNow)
            .enter()
            .append('rect')
            .attr('class', 'upper')
            .attr('x', function (d, i) {
                return 70 + i * marginValue;
            })
            .attr('width', rectWidth)
            .attr('y', function (d) {
                return upper(d);
            })
            .attr('height', function (d) {
                return d >= 1500 ? rectHeight * 2 + 18 - upper(d) : 0;
            })
            .style('fill', function (d, i) {
                return color[i % 10];
            });

        svg.selectAll('rect.most')
            .data(dataNow)
            .enter()
            .append('rect')
            .attr('class', 'most')
            .attr('x', function (d, i) {
                return 70 + i * marginValue;
            })
            .attr('width', rectWidth)
            .attr('y', function (d) {
                return most(d);
            })
            .attr('height', function (d) {
                return d >= 10000 ? rectHeight + 8 - most(d) : 0;
            })
            .style('fill', function (d, i) {
                return color[i % 10];
            });


        svg.append('g').attr('transform', 'translate(60,0)')
            .call(d3.axisLeft(lower).ticks(4));

        svg.append('g').attr('transform', 'translate(60,0)')
            .call(d3.axisLeft(upper).ticks(4));

        svg.append('g').attr('transform', 'translate(60,0)')
            .call(d3.axisLeft(most).ticks(4));

        this.setTheRadio();
    }

    /**
     * Find the right index of the column bar when we click to any positions in the bar chart
     * see https://multiomics.atlassian.net/browse/OF-62
     * @param {number} i: index of the position where we click to the chart
     * @param {number} length: number columns in the chart
     * @returns {any}
     */
    private findIndex(i: number, length: number) {
        if (i > length) {
            return this.findIndex(i - length, length);
        }
        return i;
    }

    private showTip(searchWordPre: string, dataAddKey: any[]): void {
        const self = this
            , pieChartName = self.pieChartName;
        d3.select('#' + pieChartName + '_tooltip').remove();

        const tooltip = self.body
            .append('div')
            .attr('id', pieChartName + '_tooltip')
            .attr('class', 'chart_tooltip')
            .style('opacity', 0)
            .attr('position', 'absolute');

        self.body.selectAll('rect')
            .on('mouseover', function (d, i) {
                i = i % dataAddKey.length;
                const mouseCoords = d3.mouse(document.getElementById(pieChartName + '_tooltip').parentElement);
                d3.select(this).attr('cursor', 'pointer');

                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);

                tooltip.html(dataAddKey[i].name.toString() + ': <br>' + dataAddKey[i].size.toString() + ' datasets')
                    .style('left', (mouseCoords[0]) + 'px')
                    .style('top', parseInt(d3.select(this).attr('y'), 10) - 30 + 'px')
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
                    .style('opacity', 0);
                const index = self.findIndex(i, dataAddKey.length);
                let searchWord = searchWordPre + dataAddKey[index].name.toString() + '"';
                if (dataAddKey[index].name.toString() === 'MetaboLights Dataset') {
                    searchWord = searchWordPre + 'MetaboLights' + '"';
                }
                if (dataAddKey[index].name.toString() === 'Metabolome Workbench') {
                    searchWord = searchWordPre + 'MetabolomicsWorkbench' + '"';
                }
                if (dataAddKey[index].name.toString() === 'Expression Atlas Experiments') {
                    searchWord = searchWordPre + 'ExpressionAtlas' + '"';
                }

                self.router.navigate(['search'], {queryParams: {q: searchWord}});
                // angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                // ---------------------------------------- redirect ----------------------------------------//
            });
    }

    private getLength(name: string, value: string): number {
        const nameLen = name.toString().length
            , valueLen = (value.toString() + ' datasets').length;

        return nameLen > valueLen ? nameLen : valueLen;
    }

    private dealCaseSensitiveIds(omicstype: any[]): any[] {
        if (!omicstype || omicstype.length < 1) {
            return;
        }

        const singleOmicsType = [];
        omicstype.forEach(m => {
            m.id = m.id.toLowerCase();
            m.value = parseInt(m.value, 10);

            if (singleOmicsType.length <= 0) {
                singleOmicsType.push(m);
            } else {
                let isRepeated = false;
                singleOmicsType.forEach(n => {
                    if (m.id === n.id) {
                        n.value = n.value + m.value;
                        isRepeated = true;
                    }
                });
                if (!isRepeated) {
                    singleOmicsType.push(m);
                }
            }
        });
        return singleOmicsType;
    }

    private transformDomains(domains: any[]): any[] {
        return domains.reduce((acc, val) => {
            return acc.concat([{
                name: val['domain']['name'],
                value: parseInt(val['domain']['value'], 10)
            }]);
        }, []);
    }
}
