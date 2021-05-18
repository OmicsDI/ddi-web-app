import {ChangeDetectionStrategy, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import * as d3 from 'd3';

import {FrequentlyTerm} from 'app/model/FrequentlyTerm';
import {DataSetService} from '@shared/services/dataset.service';
import {Router} from '@angular/router';
import {AsyncInitialisedComponent} from '@shared/components/async/async.initialised.component';
import {isPlatformServer} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';

const cloud = require('d3-cloud');

@Component({
    selector: 'app-hotwords',
    templateUrl: './hotwords.component.html',
    styleUrls: ['./hotwords.component.css'],
    providers: [ {provide: AsyncInitialisedComponent, useExisting: HotwordsComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotwordsComponent extends AsyncInitialisedComponent implements OnInit {

    private webServiceUrl: string;
    private terms: {
        Omics_description: FrequentlyTerm[],
        Omics_data_protocol: FrequentlyTerm[],
        Omics_sample_protocol: FrequentlyTerm[]
    };

    private hotwordsName = 'hotwords';
    private body: any;
    private divWidth: number;
    private fill: string[];
    private field: string;

    constructor(private datasetService: DataSetService,
                private router: Router,
                private http: HttpClient,
                @Inject(PLATFORM_ID) private platformId: string) {
        super();
    }

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            return;
        }
        this.webServiceUrl = this.datasetService.getWebServiceUrl();
        this.body = d3.select('#' + this.hotwordsName);
        this.fill = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
        this.field = '';
        this.terms = {
            Omics_description: [],
            Omics_data_protocol: [],
            Omics_sample_protocol: []
        };
        this.startRequest();
    }

    private startRequest() {
        const self = this;
        const webServiceUrl = this.webServiceUrl;

        const urls = [
            webServiceUrl + 'term/frequentlyTerm/list?size=40&domain=omics&field=description',
            webServiceUrl + 'term/frequentlyTerm/list?size=40&domain=omics&field=data_protocol',
            webServiceUrl + 'term/frequentlyTerm/list?size=40&domain=omics&field=sample_protocol'
        ];
        forkJoin(
            urls.map(url => this.http.get(url))
        ).subscribe(data => {
            self.drawWordCloud(null, data[0] as FrequentlyTerm[], data[1] as FrequentlyTerm[], data[2] as FrequentlyTerm[]);
        }, err => {
            self.drawWordCloud(err, [], [], []);
        }, () => {
            self.componentLoaded();
        })
    }

    private drawWordCloud(error: any, omicsDes: FrequentlyTerm[], omicsDatap: FrequentlyTerm[], omicsSamp: FrequentlyTerm[]): void {
        const self = this;

        if (error) {
            this.outputErrorInfo();
            return;
        }

        self.terms.Omics_description = omicsDes;
        self.terms.Omics_data_protocol = omicsDatap;
        self.terms.Omics_sample_protocol = omicsSamp;
        self.field = '';

        self.addWordCloudOrChange();  // draw wordcloud
        self.addInputAndLabel();      // draw form input and label
        self.addWordCloudToolTip();   // draw wordcloud tooltip
    }

    private addWordCloudToolTip(): void {
        const wordcloud_tooltip = document.getElementById('word_cloud_chart_tooltip');
        if (wordcloud_tooltip == null) {
            d3.select('#' + this.hotwordsName)
                .append('div')
                .attr('class', 'chart_tooltip')
                .attr('id', 'word_cloud_chart_tooltip')
                .style('opacity', 0);
        }
    }

    private addInputAndLabel(): void {
        const self = this;

        d3.select('#' + self.hotwordsName).selectAll('div').remove();

        const formdiv = d3.select('#' + self.hotwordsName).append('div');
        formdiv.style('margin-bottom', '20px');
        const radio_form = formdiv.append('form');
        radio_form
            .attr('id', self.hotwordsName + '_form')
            .attr('class', 'center')
            .attr('style', 'width: 260px; position: absolute; left: 50%; margin-left: -130px; bottom: 10px')
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'dataset')
            .attr('value', 'description')
            .attr('id', 'description')
            .text('Description');
        radio_form
            .append('label')
            .text('Description')
            .attr('for', 'description')
            .append('span')
            .append('span');
        radio_form
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'dataset')
            .attr('value', 'sample_protocol')
            .attr('id', 'sample')
            .text('Sample');
        radio_form
            .append('label')
            .text('Sample')
            .attr('for', 'sample')
            .append('span')
            .append('span');
        radio_form
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'dataset')
            .attr('value', 'data_protocol')
            .attr('id', 'data')
            .text('Data');
        radio_form
            .append('label')
            .text('Data')
            .attr('for', 'data')
            .append('span')
            .append('span');

        d3.select('#hotwords_form').select('input[value=description]').property('checked', true);

        d3.select('#hotwords_form')
            .selectAll('input')
            .on('click', function (d: any, i, ele) {
                self.field = d3.select(this).attr('value');        // ignore this exception raised by editor
                self.addWordCloudOrChange();
            });
    }

    private addWordCloudOrChange(): void {
        const self = this
            , body = d3.select('#' + self.hotwordsName)
            , divWidth = self.divWidth = parseInt(body.style('width'), 10)
            , wordcloud_tooltip: any = d3.select('#word_cloud_chart_tooltip');
        let svg = body.select('#word_cloud_svg');

        if (svg.empty()) {
            svg = body.append('svg')
                .attr('id', 'word_cloud_svg')
                .attr('class', 'wordcloud')
                .attr('style', 'margin-top: 10px;')
                .attr('height', 325);
        }

        if (wordcloud_tooltip.empty()) {
            d3.select('#' + self.hotwordsName)
                .append('div')
                .attr('class', 'chart_tooltip')
                .attr('id', 'word_cloud_chart_tooltip')
                .style('opacity', 0);
        }

        svg.attr('width', divWidth);

        self.field = self.field || 'description';
        const thisField = self.field
            , hotwordss = self.terms['Omics_' + thisField]
            , maxfrequent = self.getMax(hotwordss);

        let fontSizePara = 45;
        if (thisField === 'description') {
            fontSizePara = 60;
        }
        if (thisField === 'sample_protocol') {
            fontSizePara = 40;
        }
        if (thisField === 'data_protocol') {
            fontSizePara = 45;
        }
        svg.selectAll('.cloud').remove();
        cloud().size([divWidth - 10, 325])
            .words(hotwordss)
            .padding(1)
            .rotate(0)
            .font('Impact')
            .text(function (d) {
                return d.label;
            }) // THE SOLUTION
            .fontSize(function (d) {
                return Math.sqrt(d.frequent) / Math.sqrt(maxfrequent) * fontSizePara * divWidth / 500;
            })
            .on('end', function (ws) {
                self.draw(ws, fontSizePara);
            })
            .start();

    }

    private draw(words: any[], fontSizePara: number): void {
        const self = this
            , maxfrequent = self.getMax(words)
            , svg = d3.select('#word_cloud_svg');

        svg.append('g')
            .attr('class', 'cloud')
            .attr('transform', 'translate(' + self.divWidth / 2.2 + ',160)')
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', function (d: any) {
                return Math.sqrt(parseInt(d.frequent, 10)) / Math.sqrt(maxfrequent) * fontSizePara * self.divWidth / 500 + 'px';
            })
            .style('font-family', 'Impact')
            .style('fill', function (d, i) {
                return self.fill[i % self.fill.length];
            })
            .attr('text-anchor', 'middle')
            .attr('transform', function (d: any) {
                return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
            })
            .text(function (d: any) {
                return d.label;
            })
            .attr('class', 'hotword')
            .on('click', function (d: any, i) {

                d3.select('#word_cloud_chart_tooltip')
                    .transition()
                    .duration(500)
                    .style('opacity', 0);

                const searchWord = '"' + d.label + '"';
                // angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                // redirect logic remains to do
                self.router.navigate(['search'], {queryParams: {q: searchWord}});
            })
            .on('mousemove', function (d, i) {
                const wordcloud_tooltip = d3.select('#word_cloud_chart_tooltip')
                    , mouse_coords = d3.mouse(document.getElementById('word_cloud_svg'));

                wordcloud_tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);

                wordcloud_tooltip.html('<strong>' + d.frequent + '</strong> datasets')
                    .style('left', (mouse_coords[0] + 25) + 'px')
                    .style('top', (mouse_coords[1] - 25) + 'px');
            })
            .on('mouseout', function (d, i) {
                d3.select('#word_cloud_chart_tooltip')
                    .transition()
                    .duration(500)
                    .style('opacity', 0);
            });
    }

    private getMax(arr: FrequentlyTerm[]): number {
        if (!arr || !Array.isArray(arr)) {
            return null;
        }
        return arr.reduce((max, val) => {
            const intFre = parseInt(val.frequent, 10);
            return max > intFre ? max : intFre;
        }, 0);
    }

    private outputErrorInfo() {
        d3.select('#' + this.hotwordsName)
            .append('p')
            .attr('class', 'error-info')
            .html('Sorry, the word cloud service is temporarily unavailable.'); 
   }
}
