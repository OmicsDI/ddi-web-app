import {ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import * as d3 from 'd3';
import {DataSetService} from '@shared/services/dataset.service';
import {DatabaseListService} from '@shared/services/database-list.service';
import {ChartsErrorHandler} from '../charts-error-handler/charts-error-handler';
import {Router} from '@angular/router';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';
import {isPlatformServer} from '@angular/common';
import {forkJoin} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-repos-omics',
    templateUrl: './repos-omics.component.html',
    styleUrls: ['./repos-omics.component.css'],
    providers: [ {provide: AsyncInitialisedComponent, useExisting: ReposOmicsComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposOmicsComponent extends AsyncInitialisedComponent implements OnInit {

    private topDomain: string;
    private webServiceUrl: string;
    private proteomicsList: string;
    private genomicsList: string;
    private metabolomicsList: string;
    private transcriptomicsList: string;
    private otherList: string;

    private pieChartName = 'chart_repos_omics';
    private body;

    private reposDataSimple = [];
    private data = [];
    private lastUpdated = [];
    private omicsDataSimple = [];
    private omicsDataNum = [];
    isServer: boolean;

    constructor(dataSetService: DataSetService,
                private databaseListService: DatabaseListService,
                private router: Router,
                private http: HttpClient,
                @Inject(PLATFORM_ID) private platformId: string) {
        super();
        this.isServer = isPlatformServer(this.platformId);
        this.topDomain = dataSetService.getTopDomain();
        this.webServiceUrl = dataSetService.getWebServiceUrl();
        this.proteomicsList = dataSetService.getProteomicsList();
        this.metabolomicsList = dataSetService.getMetabolomicsList();
        this.genomicsList = dataSetService.getGenomicsList();
        this.transcriptomicsList = dataSetService.getTranscriptomicsList();
        this.otherList = dataSetService.getOtherList();
    }

    ngOnInit() {
        if (!isPlatformServer(this.platformId)) {
            const self = this;
            var allPostFix;
            if (this.topDomain == "omics") {
               allPostFix = "all"; 
            } else {
               allPostFix = this.topDomain;
            }
            const urls = [
                this.webServiceUrl + 'statistics/domains?domain=' + this.topDomain,
                this.webServiceUrl + 'statistics/omics?domain=' + this.topDomain,
                this.webServiceUrl + 'database/' + allPostFix
            ];
            forkJoin(
                urls.map(url => this.http.get(url))
            ).subscribe(data => {
                self.draw(data[0] as any[], data[1] as any[], data[2] as any[]);
            }, err => {
                ChartsErrorHandler.outputErrorInfo(self.pieChartName);
            }, () => {
                this.componentLoaded();
            });
        }
    }

    public draw(domains: any[], omicsType: any[], databases: any[]): void {
        const self = this;
        ChartsErrorHandler.removeGettingInfo(self.pieChartName);
        const repos = self.transformDomains(domains, databases);
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
            },
            {
                'name': 'Other',
                'size': null,
                'children': []
            } 
        ];


        for (let i = 0; i < repos.length; i++) {
            var lastUpdated = new Date(this.databaseListService.getLastUpdatedByDomain(repos[i].domain,databases)).getFullYear();
            if (self.proteomicsList.indexOf(repos[i].domain) > -1) {
                reposData[0].children.push({
                    name: repos[i].repository,
                    size: repos[i].value,
                    lastUpdated: lastUpdated
                });
                continue;
            }
            if (self.genomicsList.indexOf(repos[i].domain) > -1) {
                reposData[1].children.push({
                    name: repos[i].repository,
                    size: repos[i].value,
                    lastUpdated: lastUpdated
                });
                continue;
            }
            if (self.metabolomicsList.indexOf(repos[i].domain) > -1) {
                reposData[2].children.push({
                    name: repos[i].repository,
                    size: repos[i].value,
                    lastUpdated: lastUpdated
                });
                continue;
            }
            if (self.transcriptomicsList.indexOf(repos[i].domain) > -1) {
                reposData[3].children.push({
                    name: repos[i].repository,
                    size: repos[i].value,
                    lastUpdated: lastUpdated
                });
            }
            if (self.otherList.indexOf(repos[i].domain) > -1) {
                reposData[4].children.push({
                    name: repos[i].repository,
                    size: repos[i].value,
                    lastUpdated: lastUpdated
                });
            }            
        }

        for (let i = 0; i < reposData.length; i++) {
            let total = 0;

            for (let j = 0; j < reposData[i].children.length; j++) {
                total += parseInt(reposData[i].children[j].size, 10);

                self.reposDataSimple.push({
                    name: reposData[i].children[j].name,
                    size: reposData[i].children[j].size,
                    lastUpdated: reposData[i].children[j].lastUpdated
                });

                self.data.push(reposData[i].children[j].size);
                self.lastUpdated.push(reposData[i].children[j].lastUpdated);
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

        self.drawBarGraphic(self.data, self.lastUpdated, self.reposDataSimple);
        self.setTheRadio();
        self.showTip('repository:"', self.reposDataSimple);
    }

// radio form set up ---------------------------//
    private setTheRadio(): void {
        const omicsDataNum = this.omicsDataNum
            , omicsDataSimple = this.omicsDataSimple
            , reposDataSimple = this.reposDataSimple
            , data = this.data
            , lastUpdated = this.lastUpdated
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
            .attr('style', 'width: 190px;  position: absolute; left: 50%; margin-left: -90px; bottom: 10px')
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

                self.drawBarGraphic(d, [], omicsDataSimple);
                self.showTip(searchWordPre, omicsDataSimple);
            } else if (value === 'Resources') {
                d = data;
                searchWordPre = 'repository:"';

                self.drawBarGraphic(d, lastUpdated, reposDataSimple);
                self.showTip(searchWordPre, reposDataSimple);

            }
        }
    }

//
    private drawBarGraphic(dataNow: any[], lastUpdated: any[], dataAddKey: any[]): void {
        const currentYear = new Date().getFullYear(); 
        const body = d3.select('#' + this.pieChartName);

        const divWidth = parseInt(body.style('width'), 10);
        const divHeight = 365;
        body.attr('position', 'relative');
        d3.select('#' + this.pieChartName + '_svg').remove();

        const svgHeight = divHeight - 40;
        const rectHeight = (svgHeight - 20 * 2 - 8 * 2) / 4;
        const rectWidth = (divWidth - 70) * 0.03514;
        const marginValueBefore = (divWidth - 80 - rectWidth * dataNow.length) / dataNow.length + rectWidth;
        const marginValue = marginValueBefore > 65 ? 65 : marginValueBefore;
        const lower = d3.scaleLinear().domain([0, 1000]).range([rectHeight * 4 + 38, rectHeight * 3 + 38]).clamp(true),
            middle = d3.scaleLinear().domain([1001, 5000]).range([rectHeight * 3 + 28, rectHeight * 2 + 28]).clamp(true),
            upper = d3.scaleLinear().domain([5001, 90000]).range([rectHeight * 2 + 18, rectHeight + 18]).clamp(true),
            most = d3.scaleLinear().domain([90001, 2000000]).range([rectHeight + 8, 8]).clamp(true),
            omicsColor = d3.schemeCategory10,
            reposColor = d3.scaleSequential().domain([9,1]).interpolator(d3.interpolateViridis);

        const svg = body
            .append('svg')
            .attr('width', divWidth)
            .attr('height', svgHeight)
            .attr('style', 'margin-top: 15px; font-size: 10px')
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

        svg.selectAll('legend')
        .data(["Lighter bar colour indicates more recently updated data"])
        .enter()
        .append("text")
        .attr("x", 75)
        .attr("y", 13)
        .text(function (d) {
            if (lastUpdated.length > 0) {
                // Repositories view
                return d;
            }
        });

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
                return rectHeight * 4 + 38 - lower(d);
            })
            .style('fill', function (d, i) {
                if (lastUpdated.length > 0) {
                    // Repositories view
                    // + 1 is to avoid using yellow in d3.interpolateViridis
                    return reposColor(currentYear-lastUpdated[i] + 2);
                } else {
                    // Omics view
                    return omicsColor[i % 10];
                }
            });

        svg.selectAll('rect.middle')
            .data(dataNow)
            .enter()
            .append('rect')
            .attr('class', 'middle')
            .attr('x', function (d, i) {
                return 70 + i * marginValue;
            })
            .attr('width', rectWidth)
            .attr('y', function (d) {
                return middle(d);
            })
            .attr('height', function (d) {
                return d >= 1500 ? rectHeight * 3 + 28 - middle(d) : 0;
            })
            .style('fill', function (d, i) {
                if (lastUpdated.length > 0) {
                    // Repositories view
                    // + 1 is to avoid using yellow in d3.interpolateViridis
                    return reposColor(currentYear-lastUpdated[i] + 2);
                } else {
                    // Omics view
                    return omicsColor[i % 10];
                }            
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
                return d >= 10000 ? rectHeight * 2 + 18 - upper(d) : 0;
            })
            .style('fill', function (d, i) {
                if (lastUpdated.length > 0) {
                    // Repositories view
                    // + 1 is to avoid using yellow in d3.interpolateViridis
                    return reposColor(currentYear-lastUpdated[i] + 2);
                } else {
                    // Omics view
                    return omicsColor[i % 10];
                }
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
                if (lastUpdated.length > 0) {
                    // Repositories view
                    // + 1 is to avoid using yellow in d3.interpolateViridis
                    return reposColor(currentYear-lastUpdated[i] + 2);
                } else {
                    // Omics view
                    return omicsColor[i % 10];
                }
            });

        svg.append('g').attr('transform', 'translate(60,0)')
            .call(d3.axisLeft(lower).ticks(4));

        svg.append('g').attr('transform', 'translate(60,0)')
            .call(d3.axisLeft(middle).ticks(4));

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

                var lastUpdateStr = "";
                if (dataAddKey[i].lastUpdated != undefined) {
                    lastUpdateStr = '<br>Last updated: ' +  dataAddKey[i].lastUpdated.toString();
                }
                tooltip.html(dataAddKey[i].name.toString() + ': <br>' + dataAddKey[i].size.toString() + ' datasets' + lastUpdateStr)
                    .style('left', (mouseCoords[0] - 100) + 'px')
                    .style('top', parseInt(d3.select(this).attr('y'), 10) - 30 + 'px')
                    // .style('height', '2.8em')
                    // .style('width', (self.getLength(dataAddKey[i].name, dataAddKey[i].size) * 7.5) + 'px')
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

    private transformDomains(domains: any[], database: any[]): any[] {
        return domains.reduce((acc, val) => {
            return acc.concat([{
                domain: val['domain']['name'],
                repository: this.getRepository(val['domain']['name'],database),
                value: parseInt(val['domain']['value'], 10)
            }]);
        }, []);
    }

    private getRepository(domain: string, databases: any[]) {
        for (let i = 0; i < databases.length; i += 1) {
            if (databases[i]['domain'] == domain) {
                return databases[i]['repository'];
            }
        }
        return null;
    }
}
