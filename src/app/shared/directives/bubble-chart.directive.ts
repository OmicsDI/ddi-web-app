import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Directive({
    selector: '[appBubbleChart]'
})
export class BubbleChartDirective implements OnInit {
    @Input() opts: {
        size: number,
        outerRadius: number
    };

    constructor(private el: ElementRef) {

    }

    extend(...args) {
        for (let i = 1; i < args.length; i++) {
            for (const key in args[i]) {
                if (args[i].hasOwnProperty(key)) {
                    args[0][key] = args[i][key];
                }
            }
        }
        return args[0];
    }
    ngOnInit(): void {
        const defaultViewBoxSize = this.opts['size'];
        const defaultInnerRadius = this.opts['size'] / 3;
        const defaultOuterRadius = this.opts['size'] / 2;
        const defaultRadiusMin = this.opts['size'] / 10;
        const pi2 = Math.PI * 2;
        const svg = d3.select(this.el.nativeElement).append('svg');

        const options = {};
        this.extend(options, {
            container: '.bubbleChart',
            viewBoxSize: defaultViewBoxSize,
            innerRadius: defaultInnerRadius,
            outerRadius: defaultOuterRadius,
            radiusMin: defaultRadiusMin,
            intersectDelta: 0,
            transitDuration: 1000
        }, this.opts);

        this.extend(options, {
            radiusMax: (options['outerRadius'] - options['innerRadius']) / 2,
            intersectInc: options['intersectDelta']
        }, this.opts);
        const maxWidth = parseInt(d3.select(this.el.nativeElement).style('width'), 10);
        if (!options['size']) {
            options['size'] = maxWidth;
        } else {
            options['size'] = options['size'] < maxWidth ? options['size'] : maxWidth;
        }

        const BubbleChart = svg
            .attr('preserveAspectRatio', 'xMidYMid')
            .attr('width', options['size'])
            .attr('height', options['size'])
            .attr('class', 'bubbleChart, center')
            .attr('viewBox', function (d) {return ['0 0', options['viewBoxSize'], options['viewBoxSize']].join(' ')});

        const innerRadius = options['innerRadius'];
        const outerRadius = options['outerRadius'];
        const centerPoint = this.opts['size'] / 2;
        const intervalMax = this.opts['size'] * this.opts['size'];
        let values, valueMax, circlePositions;
        const items = options['data']['items'];

        const bb = {
            getValues: function () {
                const _values = [];
                for (let i = 0; i < items.length; i++) {
                    _values.push(options['data'].eval(items[i]));
                }
                return _values;
            },

            randomCirclesPositions: function (delta) {
                const circles = [];
                let interval = 0;
                while (circles.length < items.length && ++interval < intervalMax) {
                    const val = values[circles.length];
                    const rad = Math.max((val.length * options['radiusMax']) / valueMax, options['radiusMin']);
                    const dist = innerRadius + rad + Math.random() * (outerRadius - innerRadius - rad * 2);
                    const angle = Math.random() * pi2;
                    const cx = centerPoint + dist * Math.cos(angle);
                    const cy = centerPoint + dist * Math.sin(angle);

                    let hit = false;
                    for (let i = 0; i < circles.length; i++) {
                        const dx = circles[i]['cx'] - cx;
                        const dy = circles[i]['cy'] - cy;
                        const r = circles[i].r + rad;
                        if (dx * dx + dy * dy < Math.pow(r - delta, 2)) {
                            hit = true;
                            break;
                        }
                    }
                    if (!hit) {
                        circles.push({cx: cx, cy: cy, r: rad, item: items[circles.length]});
                    }
                }
                if (circles.length < items.length) {
                    if (delta === options['radiusMin']) {
                        throw {
                            message: 'Not enough space for all bubble. Please change the options.',
                            options: options
                        }
                    }
                    return bb.randomCirclesPositions(delta + options['intersectInc']);
                }
                return circles;
            },

            moveToCenter: function (_node) {
                _node.classed('active', true)
                    .transition().duration(options['transitDuration'])
                    .attr('transform', function (d, i) {
                        const dx = centerPoint - d['cx'];
                        const dy = centerPoint - d['cy'];
                        return 'translate(' + dx + ',' + dy + ')';
                    })
                    .select('circle')
                    .attr('r', function (d) {return options['innerRadius']; });
            },

            moveToReflection: function (_node, swapped) {
                _node.transition()
                    .duration(options['transitDuration'])
                    .delay(function (d, i) {return i * 10; })
                    .attr('transform', swapped ? '' : function (d, i) {
                        const dx = 2 * (centerPoint - d['cx']);
                        const dy = 2 * (centerPoint - d['cy']);
                        return 'translate(' + dx + ',' + dy + ')';
                    })
                    .select('circle')
                    .attr('r', function (d) {return d.r; });
            },

            reset: function (_node) {
                _node.classed('active', false);
                // node.selectAll("text.clickMe").remove();

                // node.selectAll("text.termCount").transition().duration(1000)
                //  .style("font-size", function (d) { return d.termCount.fontSize + "px";});
                //
                // node.selectAll("text.termLabel").transition().duration(1000)
                //  .attr("dy", function (d) {return d.termLabel.dy;})
                //  .style("font-size", function (d) { return d.termLabel.fontSize + "px";});
            },

            onClick: function (_node) {
                let swapped = false;
                _node.style('cursor', 'pointer').on('click', function (d) {
                    const d3Node = d3.select(this);
                    bb.reset(BubbleChart.selectAll('.node'));
                    bb.moveToCenter(d3Node);
                    bb.moveToReflection(BubbleChart.selectAll('.node:not(.active)'), swapped);
                    swapped = !swapped;
                });
            }
        };

        values = bb.getValues();
        valueMax = 6;

        circlePositions = bb.randomCirclesPositions(options['intersectDelta']);

        const node = BubbleChart.selectAll('.node')
            ['data'](circlePositions)
            .enter().append('g')
            .attr('class', function (d) {return ['node', options['data'].classed(d['item'])].join(' '); });
        const fnColor = d3.scaleOrdinal(d3.schemeCategory10);
        node.append('circle')
            .attr('r', function (d, i) {return d['r']; })
            .attr('cx', function (d, ) {
                return d['cx'];
            })
            .attr('cy', function (d, i) {
                return d['cy'];
            })
            .style('fill', function (d) {
                return options['data'].color !== undefined ? options['data'].color(d['item']) : fnColor(d['item'].text);
            })
            .attr('opacity', '0.8');
        node
            .append('text')
            .classed('count', true)
            .style('font-size', '28px')
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .attr('dy', '0px')
            .attr('x', function (d, ) {return d['cx']; })
            .attr('y', function (d, i) {return d['cy']; })
            .text(function (d) {
                return d['item']['count']; });
        node
            .append('text')
            .classed('text', true)
            .style('font-size', '14px')
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .attr('dy', '20px')
            .attr('x', function (d, ) {return d['cx']; })
            .attr('y', function (d, i) {return d['cy']; })
            .text(function (d) {
                return d['item']['text']; });
        bb.onClick(node);
        const firstNode = BubbleChart.selectAll('.node')
            .filter(function (d, i) {return i === 0; });
        bb.reset(BubbleChart.selectAll('.node'));
        bb.moveToCenter(firstNode);
        bb.moveToReflection(BubbleChart.selectAll('.node:not(.active)'), true);
    }
}
