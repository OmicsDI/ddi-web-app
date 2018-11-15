import {Directive, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';
import {MathUtils} from '@shared/utils/math-utils';
import {DataSet} from 'model/DataSet';
import {isPlatformServer, Location} from '@angular/common';
import {MegaNumberPipe} from '@shared/pipes/mega-number.pipe';

@Directive({
    selector: '[appPieChart]'
})
export class PieChartDirective implements OnChanges {

    @Input() dataset: DataSet;
    @Input() width: number;
    @Input() circleRadius: number;

    constructor(private el: ElementRef,
                private location: Location,
                @Inject(PLATFORM_ID) private platformId,
                private megaNumber: MegaNumberPipe) {
    }

    convertData() {
        return [
            {
                'score': this.dataset.viewsCount || 0,
                'scale': this.dataset.viewsCountScaled || 0,
                'color': '#2E8B57',
                'label': 'Views'
            },
            {
                'score': this.dataset.connectionsCount || 0,
                'scale': this.dataset.connectionsCountScaled || 0,
                'color': '#0099cc',
                'label': 'Connections'
            },
            {
                'score': this.dataset.citationsCount || 0,
                'scale': this.dataset.citationsCountScaled || 0,
                'color': '#FF0000',
                'label': 'Citations'
            },
            {
                'score': this.dataset.reanalysisCount || 0,
                'scale': this.dataset.reanalysisCountScaled || 0,
                'color': '#4B0082',
                'label': 'Reanalyses'
            },
            {
                'score': this.dataset.downloadCount || 0,
                'scale': this.dataset.downloadCountScaled || 0,
                'color': '#FFA500',
                'label': 'Downloads'
            }
        ]
    }

    normalise_number_leaves(data, max_leaves) {
        const total_scale = data.reduce((a, b) => a + b['scale'], 0);
        let max_scale = 0;
        let index_max_scale = 0;
        for (let i = 0; i < data.length; i++) {
            data[i]['norm_leaves'] = (data[i]['scale'] / total_scale) * (1 / max_leaves);
            if (max_scale < data[i]['norm_leaves']) {
                max_scale = data[i]['norm_leaves'];
                index_max_scale = i;
            }
        }
        let current_total_leaves = 0;
        for (let i = 0; i < data.length; i++) {
            if (i !== index_max_scale && data[i]['norm_leaves'] > 0) {
                if (data[i]['norm_leaves'] < 1) {
                    data[i]['norm_leaves'] = 1;
                } else {
                    data[i]['norm_leaves'] = Math.round(data[i]['norm_leaves']);
                }
            }
            current_total_leaves += data[i]['norm_leaves'];
        }
        data[index_max_scale]['norm_leaves'] = max_leaves - current_total_leaves;
    }

    svg_linear_gradient_direction(angle) {
        if (angle < 45) {
            return {x: 50 * MathUtils.tan(angle) + 50, y: 0};
        } else if (angle < 90) {
            return {x: 100, y : 50 * MathUtils.tan(90 - angle)};
        } else if (angle < 135) {
            return {x: 100, y: 50 * MathUtils.tan(135 - angle) + 50};
        } else if (angle < 180) {
            return {x: 50 * MathUtils.tan(180 - angle) + 50, y: 100};
        } else if (angle < 225) {
            return {x: 50 * MathUtils.tan(225 - angle), y: 100};
        } else if (angle < 270) {
            return {x: 0, y: 50 * MathUtils.tan(270 - angle) + 50};
        } else if (angle <= 315) {
            return {x: 0, y: 50 * MathUtils.tan(315 - angle)};
        } else if (angle < 360) {
            return {x: 50 * MathUtils.tan(angle), y: 0};
        }
    }

    initialize(): void {
        let abs_path = this.location.prepareExternalUrl(this.location.path());
        if (isPlatformServer(this.platformId)) {
            abs_path = this.location.path();
        }
        const body = d3.select(this.el.nativeElement),
            data = this.convertData(),
            self = this;
        body.html('');
        body.style('position', 'relative');
        const svg = body.append('svg').attr('width', this.width)
                .attr('viewBox', '0 0 720 720')
                .attr('height', this.width);

        const tool_tip = body.append('div')
            .attr('class', 'mt-card')
            .style('position', 'absolute')
            .style('display', 'none')
            .style('width', '220px')
            .style('background', 'white')
            .style('right', 0)
            .style('z-index', '9999')
            .attr('position', 'absolute');
        const defs = svg.append('defs');
        const omics_score = Math.round(data.reduce((a, b) => a + b['scale'] * 1000, 0));
        const leafs = [];
        self.normalise_number_leaves(data, 12);
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i]['norm_leaves']; j++) {
                leafs.push(data[i]);
            }
        }
        for (let i = 0; i < 12; i++) {
            const coordinate = this.svg_linear_gradient_direction(i * 360 / 12);
            const gradient =  defs.append('linearGradient').attr('id', self.dataset.id + '_gradient_' + i)
                .attr('x1', 100 - coordinate.x + '%')
                .attr('y1', 100 - coordinate.y + '%')
                .attr('x2', coordinate.x + '%')
                .attr('y2', coordinate.y + '%');
            gradient.append('stop').attr('offset', '0%').attr('style', 'stop-color:rgb(255,255,255);stop-opacity:1');
            if (i < leafs.length) {
                gradient.append('stop').attr('offset', '100%')
                    .attr('style', 'stop-color:' + leafs[i]['color'] + ';stop-opacity:1');
            } else {
                gradient.append('stop').attr('offset', '100%').attr('style', 'stop-color:#D3D3D3;stop-opacity:1');
            }
        }
        let color_index = 0;
        const graph = svg.append('g')
            .attr('style', 'cursor: pointer')
            .attr('transform', 'matrix(2.769449835201722,0,0,2.769449835201722,-623.698285897772,-621.9327602781555)');
        graph.append('path').attr('d', 'm 378.9895761619361,264.3949755505212 c -5.7581064046051,-9.760471988086' +
            ' -13.9767744892666,-17.8967349868568 -23.7880988708504,-23.5771958597846 -19.6283610230305,11.35944983617' +
            ' -32.8333198402356,32.5714433799553 -32.8333198402356,56.8810218555477 8e-13,24.309578475592' +
            ' 13.1997639769653,45.5005305810539 32.8281250000002,56.859980417222 -11.3189343625164,-19.6517526426536' +
            ' -12.1487673822503,-44.6243573250858 0.00602185554,-65.67706984024 5.9880211686214,-10.3715569008459' +
            ' 14.3702453380125,-18.4586997617603 24.0528968555452,-24.0266605769822 -0.088750556225,-0.1532609037314' +
            ' -0.1756740404876,-0.307601595516 -0.2656250000002,-0.4600759957605 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');
        graph.append('path').attr('d', 'm 420.8837824508476,288.3712819635018 c -0.1064304300389,-11.3318698969113 ' +
            '-3.1558742772426,-22.4874143880489 -8.8125,-32.3125 -22.6783841986818,0.023391619623 -44.7202107622013,11.79103748485 ' +
            '-56.8749999999976,32.8437500000043 -12.1547892377953,21.0527125151545 -11.3189343625162,46.0044973573463 ' +
            '3e-13,65.6562500000003 0.023391619619,-22.6783841986843 11.7910374848463,-44.7202107622037 32.8437499999955,' +
            '-56.8750000000028 10.371556900848,-5.9880211686176 21.6743474022139,-8.8005802455077 32.8437500000001,-8.7812500000001 ' +
            '-2.297844251e-4,-0.1771031141508 0.00166261591,-0.3542278162052 -2e-13,-0.5312500000001 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');
        graph.append('path').attr('d', 'm 445.1770761619407,330.0824755505187 c 5.5737634923062,-9.8669024181249 ' +
            '8.5106398987825,-21.0526092640995 8.5244011291495,-32.3896958597847 -19.6517526426534,-11.3189343625115 ' +
            '-44.6243573250855,-12.1487673822458 -65.6770698402401,0.00602185555 -21.0527125151536,12.1547892377968 ' +
            '-32.8047333803807,34.1815962185377 -32.8281249999998,56.8599804172223 11.359449836168,-19.6283610230347 ' +
            '32.5714433799533,-32.8333198402394 56.8810218555426,-32.8333198402444 11.9760423372391,2e-12 23.1708255835205,' +
            '3.2156476404536 32.8341468555453,8.8170894230179 0.088352557926,-0.1534906881563 0.1785537757177,-0.3059389796057 ' +
            '0.2656249999998,-0.4600759957606 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');
        graph.append('path').attr('d', 'm 445.3600888638353,378.352075674592 c 9.760471988086,-5.758106404605 ' +
            '17.8967349868569,-13.9767744892664 23.5771958597846,-23.7880988708504 -11.3594498361699,-19.6283610230302 ' +
            '-32.5714433799552,-32.8333198402352 -56.8810218555477,-32.8333198402357 -24.309578475592,9e-13 -45.5005305810539,' +
            '13.1997639769654 -56.8599804172219,32.8281250000004 19.6517526426538,-11.3189343625165 44.6243573250856,-12.1487673822505 ' +
            '65.6770698402401,0.00602185554 10.371556900846,5.9880211686212 18.4586997617602,14.3702453380126 24.0266605769822,' +
            '24.0528968555453 0.1532609037312,-0.088750556225 0.307601595516,-0.1756740404876 0.4600759957604,-0.2656250000003 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');

        graph.append('path').attr('d', 'm 421.3837824508547,420.2462819635038 c 11.3318698969114,-0.1064304300389 ' +
            '22.4874143880489,-3.1558742772425 32.3124999999998,-8.8125000000003 -0.023391619623,-22.6783841986814 -11.7910374848499,' +
            '-44.720210762201 -32.8437500000043,-56.8749999999976 -21.0527125151545,-12.1547892377952 -46.004497357346,-11.3189343625162 ' +
            '-65.65625,4e-13 22.6783841986841,0.023391619619 44.7202107622035,11.7910374848462 56.8750000000027,32.8437499999955 ' +
            '5.9880211686178,10.371556900848 8.8005802455077,21.674347402214 8.78125,32.8437500000002 0.1771031141507,-2.297844253e-4 ' +
            '0.3542278162053,0.00166261591 0.5312500000001,-2e-13 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');

        graph.append('path').attr('d', 'm 379.6725888638378,444.5395756745965 c 9.8669024181249,5.5737634923063 ' +
            '21.0526092640994,8.5106398987828 32.3896958597846,8.5244011291495 11.3189343625117,-19.6517526426532 12.1487673822459,' +
            '-44.6243573250854 -0.00602185555,-65.6770698402401 -12.1547892377967,-21.0527125151536 -34.1815962185376,-32.8047333803806 ' +
            '-56.8599804172221,-32.8281249999996 19.6283610230345,11.3594498361679 32.8333198402394,32.5714433799532 32.8333198402444,' +
            '56.8810218555426 -2.1e-12,11.9760423372391 -3.2156476404539,23.1708255835205 -8.8170894230179,32.8341468555455 ' +
            '0.1534906881566,0.088352557925 0.3059389796059,0.1785537757177 0.4600759957606,0.2656249999997 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');

        graph.append('path').attr('d', 'm 331.4029887397643,444.7225883764912 c 5.758106404605,9.7604719880859 ' +
            '13.9767744892662,17.896734986857 23.7880988708504,23.5771958597845 19.6283610230303,-11.3594498361699 32.8333198402354,' +
            '-32.5714433799552 32.8333198402359,-56.8810218555478 -1.1e-12,-24.309578475592 -13.1997639769654,-45.5005305810537 ' +
            '-32.8281250000003,-56.8599804172217 11.3189343625163,19.6517526426537 12.1487673822505,44.6243573250857 -0.00602185554,' +
            '65.67706984024 -5.9880211686216,10.3715569008459 -14.370245338013,18.4586997617602 -24.0528968555454,24.0266605769824 ' +
            '0.088750556226,0.1532609037307 0.1756740404877,0.307601595516 0.2656250000002,0.4600759957603 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');

        graph.append('path').attr('d', 'm 289.5087824508529,420.7462819635105 c 0.106430430039,11.3318698969113 ' +
            '3.1558742772424,22.4874143880491 8.8125000000001,32.3124999999998 22.6783841986818,-0.023391619623 44.7202107622011,' +
            '-11.7910374848498 56.8749999999978,-32.8437500000043 12.1547892377952,-21.0527125151546 11.3189343625161,-46.0044973573459 ' +
            '-5e-13,-65.6562499999997 -0.023391619619,22.6783841986841 -11.7910374848461,44.7202107622035 -32.8437499999954,' +
            '56.8750000000026 -10.3715569008481,5.9880211686177 -21.6743474022142,8.8005802455077 -32.8437500000004,8.7812500000003 ' +
            '2.297844263e-4,0.1771031141507 -0.00166261591,0.3542278162052 3e-13,0.5312499999998 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');

        graph.append('path').attr('d', 'm 265.2154887397601,379.0350883764934 c -5.5737634923061,9.8669024181251 ' +
            '-8.5106398987828,21.0526092640995 -8.5244011291495,32.3896958597847 19.6517526426535,11.3189343625118 44.6243573250854,' +
            '12.1487673822458 65.6770698402401,-0.00602185555 21.0527125151537,-12.1547892377968 32.8047333803805,-34.1815962185374 ' +
            '32.8281249999995,-56.859980417222 -11.359449836168,19.6283610230345 -32.5714433799531,32.8333198402395 -56.8810218555425,' +
            '32.8333198402444 -11.9760423372391,-2.2e-12 -23.1708255835207,-3.2156476404538 -32.8341468555456,-8.8170894230179 ' +
            '-0.088352557924,0.1534906881571 -0.1785537757177,0.3059389796057 -0.2656249999997,0.4600759957606 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');

        graph.append('path').attr('d', 'm 265.0324760378657,330.7654882524203 c -9.760471988086,5.7581064046052' +
            ' -17.8967349868572,13.9767744892663 -23.5771958597847,23.7880988708502 11.35944983617,19.6283610230307 ' +
            '32.5714433799553,32.8333198402353 56.8810218555478,32.8333198402359 24.309578475592,-9e-13 45.5005305810537,' +
            '-13.1997639769654 56.8599804172215,-32.8281250000001 -19.6517526426535,11.3189343625163 -44.6243573250855,12.1487673822505' +
            ' -65.6770698402397,-0.00602185554 -10.3715569008459,-5.9880211686215 -18.4586997617603,-14.3702453380129 -24.0266605769824,' +
            '-24.0528968555454 -0.1532609037301,0.088750556226 -0.3076015955161,0.1756740404876 -0.4600759957603,0.2656250000003 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');

        graph.append('path').attr('d', 'm 289.0087824508462,288.8712819635089 c -11.3318698969114,0.106430430039 ' +
            '-22.4874143880491,3.1558742772423 -32.3124999999999,8.8125 0.023391619623,22.6783841986819 11.7910374848502,44.720210762201' +
            ' 32.8437500000042,56.8749999999978 21.0527125151547,12.1547892377951 46.0044973573459,11.318934362516 65.6562499999998,' +
            '-5e-13 -22.6783841986841,-0.023391619619 -44.7202107622035,-11.791037484846 -56.8750000000025,-32.8437499999955 ' +
            '-5.9880211686176,-10.3715569008482 -8.8005802455075,-21.6743474022142 -8.7812500000001,-32.8437500000003 -0.1771031141501,' +
            '2.297844264e-4 -0.3542278162053,-0.00166261591 -0.53125,3e-13 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index++ + '\')')
            .attr('style', 'stroke:none');

        graph.append('path').attr('d', 'm 330.7199760378628,264.5779882524163 c -9.8669024181249,-5.5737634923063 ' +
            '-21.0526092640994,-8.5106398987829 -32.3896958597846,-8.5244011291496 -11.3189343625118,19.6517526426536 -12.1487673822455,' +
            '44.6243573250852 0.00602185555,65.6770698402401 12.154789237797,21.0527125151536 34.1815962185375,32.8047333803803 ' +
            '56.8599804172221,32.8281249999995 -19.6283610230345,-11.359449836168 -32.8333198402396,-32.571443379953 -32.8333198402443,' +
            '-56.8810218555425 2.1e-12,-11.9760423372393 3.2156476404538,-23.1708255835206 8.8170894230178,-32.8341468555454 ' +
            '-0.1534906881565,-0.088352557924 -0.3059389796056,-0.1785537757178 -0.4600759957605,-0.2656249999999 z')
            .attr('fill', 'url(\'' + abs_path + '#' + self.dataset.id + '_gradient_' + color_index + '\')')
            .attr('style', 'stroke:none');

        graph.append('circle')
            .attr('cx', 355)
            .attr('cy', 355)
            .attr('fill', 'white')
            .attr('r', self.circleRadius);
        graph.append('text').attr('x', 355)
            .attr('y', 355)
            .attr('dy', '.3em')
            .attr('style', 'font-size: 32px')
            .attr('text-anchor', 'middle')
            .text(self.megaNumber.transform(omics_score, 1));

        if (!isPlatformServer(this.platformId)) {
            svg.on('mouseenter', function () {
                tool_tip.html('');
                tool_tip.transition()
                    .duration(200)
                    .style('display',  'block');
                for (let i = 0; i < data.length; i++) {
                    const tool_tip_box = tool_tip.append('div').style('width', '100%')
                        .style('display', 'flex').style('align-items', 'center');
                    const tool_tip_circle = tool_tip_box.append('svg').attr('viewBox', '0 0 36 36')
                        .attr('width', '28px')
                        .attr('height', '28px')
                        .attr('class', 'circular-chart');
                    tool_tip_circle
                        .append('path').attr('class', 'circle-bg')
                        .attr('d', 'M18 2.0845\n' +
                            '          a 15.9155 15.9155 0 0 1 0 31.831\n' +
                            '          a 15.9155 15.9155 0 0 1 0 -31.831');
                    if (data[i]['score'] > 0) {
                        tool_tip_circle.append('path')
                            .attr('class', 'circle')
                            .attr('stroke-dasharray', data[i]['scale'] * 100 + ', 100')
                            .style('stroke', data[i]['color'])
                            .attr('d', 'M18 2.0845\n' +
                                '          a 15.9155 15.9155 0 0 1 0 31.831\n' +
                                '          a 15.9155 15.9155 0 0 1 0 -31.831');
                    }
                    const percent = data[i]['scale'] * 100;
                    let percent_display = Math.round(percent) + '';
                    if (percent > 0 && percent < 1) {
                        percent_display = '<1'
                    }
                    tool_tip_circle.append('text')
                        .attr('x', '18').attr('y', '22')
                        .attr('class', 'percentage').text(percent_display);
                    tool_tip_box.append('p').style('margin', '0 10px').style('padding', '0')
                        .text(data[i]['score'] + ' ' + data[i]['label']);
                }
                tool_tip.append('hr').style('width', '96%').style('margin', '10px auto');
                tool_tip.append('div').style('width', '100%')
                    .style('padding', '0 0 10px 10px')
                    .text('Omics score: ').append('b').text(omics_score);
                tool_tip.append('div').style('width', 0).style('height', 0)
                    .style('border-top', '8px solid transparent')
                    .style('border-bottom', '8px solid transparent')
                    .style('position', 'absolute')
                    .style('top', '110px')
                    .style('right', '-8px')
                    .style('border-left', '8px solid #C0C0C0');
                tool_tip.append('div').style('width', 0).style('height', 0)
                    .style('border-top', '8px solid transparent')
                    .style('border-bottom', '8px solid transparent')
                    .style('position', 'absolute')
                    .style('top', '110px')
                    .style('right', '-7px')
                    .style('border-left', '8px solid white');
                tool_tip
                    .style('right', self.width + 10 + 'px')
                    .style('top', '-100px')
                    .style('padding', '3px');
            }).on('mouseleave', function (d) {
                tool_tip
                    .transition()
                    .duration(200)
                    .style('display', 'none');
            });
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.dataset) {
            this.initialize();
        }
    }
}
