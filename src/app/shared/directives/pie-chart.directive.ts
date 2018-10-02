import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Directive({
    selector: '[appPieChart]'
})
export class PieChartDirective implements OnInit {

    @Input() data: any;
    @Input() width: number;
    @Input() height: number;

    constructor(private el: ElementRef) {
    }

    ngOnInit(): void {
        const radius = Math.min(this.width, this.height) / 2,
            innerRadius = 0.3 * radius,
            self = this,
            body = d3.select(this.el.nativeElement),
            format = d3.format(',d'),
            pie = d3.pie()
                .sort(null)
                .value(function(d) { return d['weight']; });

        const tool_tip = body.append('div')
            .attr('class', 'chart_tooltip d3-tip')
            .style('opacity', 0)
            .style('width', '20px')
            .style('right', 0)
            .attr('position', 'absolute');
        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(function (d) {
                return (radius - innerRadius) * (d['data'].rad) + innerRadius;
            });
        const outlineArc = d3.arc()
            .innerRadius(innerRadius * 0.999)
            .outerRadius(innerRadius);
        const svg = body.append('svg').attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

        const max = Math.max.apply(Math, this.data.map(function(o) {return o.score; }));
        if (max === 0) {
            return;
        }

        svg.selectAll('.solidArc')
            .data(pie(this.data))
            .enter().append('path')
            .attr('fill', function(d) { return d['data']['color']; })
            .attr('class', 'solidArc')
            .attr('d', function (d) { return arc(d as any) })
            .on('mouseover', function (d) {
                tool_tip.transition()
                    .duration(200)
                    .style('opacity', .9);
                const mouse_coords = d3.mouse(self.el.nativeElement);
                tool_tip.html(d['data']['label'] + ': ' +
                    format(d['data']['score']))
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

        svg.selectAll('.outlineArc')
            .data(pie(this.data))
            .enter().append('path')
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('class', 'outlineArc')
            .attr('d', function (d) {return outlineArc(d as any) });


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
