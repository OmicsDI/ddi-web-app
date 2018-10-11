import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {MathUtils} from '@shared/utils/math-utils';
import {DataSet} from 'model/DataSet';

@Directive({
    selector: '[appPieChart]'
})
export class PieChartDirective implements OnInit {

    @Input() dataset: DataSet;
    @Input() width: number;
    @Input() circleRadius: number;

    constructor(private el: ElementRef) {
    }

    convertData() {
        return [
            {
                'order': 1,
                'score': this.dataset.viewsCount,
                'scale': this.dataset.viewsCountScaled,
                'weight': 1,
                'color': '#3CB371',
                'background': '#006400',
                'label': 'Views'
            },
            {
                'order': 1,
                'score': this.dataset.connectionsCount,
                'scale': this.dataset.connectionsCountScaled,
                'weight': 1,
                'color': '#00BFFF',
                'background': '#337ab7',
                'label': 'Connections'
            },
            {
                'order': 2,
                'score': this.dataset.citationsCount,
                'scale': this.dataset.citationsCountScaled,
                'weight': 1,
                'color': '#FF3333',
                'background': '#8B0000',
                'label': 'Citations'
            },
            {
                'order': 3,
                'score': this.dataset.reanalysisCount,
                'scale': this.dataset.reanalysisCountScaled,
                'weight': 1,
                'color': '#9370DB',
                'background': '#4B0082',
                'label': 'Reanalyses'
            }
        ]
    }

    ngOnInit(): void {
        const body = d3.select(this.el.nativeElement),
            padding = 1,
            data = this.convertData(),
            radius = this.width / 2,
            self = this,
            format = d3.format(',d'),
            circleCenter = radius - padding - 2 * self.circleRadius,
            svg = body.append('svg').attr('width', this.width)
                .attr('height', this.width);

        for (let i = 0 ; i < data.length; i++) {
            if (data[i]['scale'] > 0 && data[i]['scale'] < 0.1) {
                data[i]['scale'] = 0.1;
            }
            data[i]['scale'] = data[i]['scale'] * 1.5;
            if (data[i]['scale'] > 1) {
                data[i]['scale'] = 1;
            }
        }

        const tool_tip = body.append('div')
            .attr('class', 'chart_tooltip d3-tip')
            .style('opacity', 0)
            .style('width', '20px')
            .style('right', 0)
            .attr('position', 'absolute');

        const graph = svg.append('g')
            .attr('transform', 'translate(' + radius + ',' + radius + ')');
        const inner = graph.append('g');
        for (let i = 0; i < data.length; i++) {
            inner.append('path')
                .attr('fill', function() { return data[i]['color']; })
                .attr('d', function () {
                    const angle = i * 360 / data.length;
                    const nextAngle = (i + 1) * 360 / data.length;
                    return 'M0 0 '
                        + MathUtils.sin(angle) * (radius - padding) * -1 + ' '
                        + MathUtils.cos(angle) * (radius - padding) * -1 + ' '
                        + `A ${radius - padding} ${radius - padding} 0 0 1 `
                        + MathUtils.sin(nextAngle) * (radius - padding) + ' '
                        + MathUtils.cos(nextAngle) * (radius - padding)
                }).on('mouseover', function () {
                    tool_tip.transition()
                        .duration(200)
                        .style('opacity', .9);
                    const mouse_coords = d3.mouse(self.el.nativeElement);
                    tool_tip.html(data[i]['label'] + ': ' +
                        format(data[i]['score']))
                        .style('right', (mouse_coords[0]) + 'px')
                        .style('top', (mouse_coords[1] - 40) + 'px')
                        .style('padding', '3px');
                })
                    .on('mouseout', function (d) {
                        tool_tip
                            .transition()
                            .duration(200)
                            .style('opacity', 0);
                    });
        }
        for (let i = 0; i < data.length; i++) {
            inner.append('path')
                .attr('fill', function() { return data[i]['background']; })
                .attr('d', function () {
                    const angle = i * 360 / data.length;
                    const nextAngle = (i + 1) * 360 / data.length;
                    const diff = radius - padding - circleCenter;
                    const r = diff * data[i]['scale'] + circleCenter;
                    return 'M0 0 '
                        + MathUtils.sin(angle) * r * -1 + ' '
                        + MathUtils.cos(angle) * r * -1 + ' '
                        + `A ${r} ${r} 0 0 1 `
                        + MathUtils.sin(nextAngle) * (r) + ' '
                        + MathUtils.cos(nextAngle) * (r)
                }).on('mouseover', function () {
                    tool_tip.transition()
                        .duration(200)
                        .style('opacity', .9);
                    const mouse_coords = d3.mouse(self.el.nativeElement);
                    tool_tip.html(data[i]['label'] + ': ' +
                        format(data[i]['score']))
                        .style('right', (mouse_coords[0]) + 'px')
                        .style('top', (mouse_coords[1] - 40) + 'px')
                        .style('padding', '3px');
                })
                    .on('mouseout', function (d) {
                        tool_tip
                            .transition()
                            .duration(200)
                            .style('opacity', 0);
                    });
        }

        for (let i = 0; i < data.length; i++) {
            const nextAngle = (i + 1) * 360 / data.length;
            inner.append('circle')
                .attr('fill', function() { return data[i]['color']; })
                .attr('r', self.circleRadius)
                .attr('cx', MathUtils.sin(nextAngle) * (radius - padding - self.circleRadius))
                .attr('cy', MathUtils.cos(nextAngle) * (radius - padding - self.circleRadius));
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i]['scale'] > 0) {
                const nextAngle = (i + 1) * 360 / data.length;
                const cx = MathUtils.sin(nextAngle) * (radius - padding - self.circleRadius);
                const cy = MathUtils.cos(nextAngle) * (radius - padding - self.circleRadius);
                const diff = radius - padding - circleCenter;
                const r = diff * data[i]['scale'] + circleCenter;
                const oxi = cx - self.circleRadius, oyi = cy - self.circleRadius;
                inner.append('circle')
                    .attr('fill', function() { return data[i]['background']; })
                    .style('clip-path', `circle(${r}px at ${-oxi}px ${-oyi}px)`)
                    .attr('r', self.circleRadius)
                    .attr('cx', cx)
                    .attr('cy', cy);
            }
        }

        graph.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('class', 'badge-circle')
            .attr('r', circleCenter)

        // const inner = svg.append('g')
        //     .attr('mask', 'url(#inner_circle)');
        //
        // for (let i = 0; i < data.length; i++) {
        //     inner.append('path')
        //         .attr('fill', function() { return MathUtils.shadeColor2(data[i]['color'], 0.5); })
        //         .attr('d', function () {
        //             const angle = i * 360 / data.length;
        //             const nextAngle = (i + 1) * 360 / data.length;
        //             return 'M0 0 '
        //                 + MathUtils.sin(angle) * (radius - padding) * -1 + ' '
        //                 + MathUtils.cos(angle) * (radius - padding) * -1 + ' '
        //                 + `A ${radius - padding} ${radius - padding} 0 0 1 `
        //                 + MathUtils.sin(nextAngle) * (radius - padding) + ' '
        //                 + MathUtils.cos(nextAngle) * (radius - padding)
        //         });
        // }
        //
        // for (let i = 0; i < data.length; i++) {
        //     const nextAngle = (i + 1) * 360 / data.length;
        //     inner.append('circle')
        //         .attr('fill', function() { return MathUtils.shadeColor2(data[i]['color'], 0.5); })
        //         .attr('r', self.circleRadius)
        //         .attr('cx', MathUtils.sin(nextAngle) * (radius - padding - self.circleRadius))
        //         .attr('cy', MathUtils.cos(nextAngle) * (radius - padding - self.circleRadius));
        // }
        // const arc = d3.arc()
        //     .innerRadius(innerRadius)
        //     .outerRadius(function (d) {
        //         return (radius - innerRadius) * (d['data'].rad) + innerRadius;
        //     });
        // const outlineArc = d3.arc()
        //     .innerRadius(innerRadius)
        //     .outerRadius(radius - 1);
        //
        //     .append('g')
        //     .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
        //
        // const max = Math.max.apply(Math, this.data.map(function(o) {return o.score; }));
        // if (max === 0) {
        //     return;
        // }
        //
        // svg.selectAll('.solidArc')
        //     .data(pie(this.data))
        //     .enter().append('path')
        //     .attr('fill', function(d) { return d['data']['color']; })
        //     .attr('class', 'solidArc')
        //     .attr('d', function (d) { return arc(d as any) });
        //
        // svg.selectAll('.outlineArc')
        //     .data(pie(this.data))
        //     .enter().append('path')
        //     .attr('fill', 'transparent')
        //     .attr('stroke', 'black')
        //     .attr('stroke-width', '1%')
        //     .attr('class', 'outlineArc')
        //     .attr('d', function (d) {return outlineArc(d as any) })
        //     .on('mouseover', function (d) {
        //         tool_tip.transition()
        //             .duration(200)
        //             .style('opacity', .9);
        //         const mouse_coords = d3.mouse(self.el.nativeElement);
        //         tool_tip.html(d['data']['label'] + ': ' +
        //             format(d['data']['score']))
        //             .style('right', (mouse_coords[0]) + 'px')
        //             .style('top', (mouse_coords[1] - 40) + 'px')
        //             .style('padding', '3px');
        //     })
        //     .on('mouseout', function (d) {
        //         tool_tip
        //             .transition()
        //             .duration(200)
        //             .style('opacity', 0);
        //     });


        // calculate the weighted mean score
        // const score =
        //     this.data.reduce(function(a, b) {
        //         // console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
        //         return a + (b.score * b.weight);
        //     }, 0) /
        //     this.data.reduce(function(a, b) {
        //         return a + b.weight;
        //     }, 0);
        // svg.append("svg:text")
        //   .attr("class", "aster-score")
        //   .attr("dy", ".35em")
        //   .attr("text-anchor", "middle") // text-align: right
        //   .text(Math.round(score));
    }

}
