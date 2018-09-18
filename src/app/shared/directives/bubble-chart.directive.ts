import {Directive, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[appBubbleChart]'
})
export class BubbleChartDirective implements OnInit {
    @Input() opts: {
        size: number,
        outerRadius: number
    };

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

        // if (typeof options['data'].color !== "function") {
        //  options['data'].color = d3.scale.category20();
        // }

        const innerRadius = options['innerRadius'];
        const outerRadius = options['outerRadius'];
        const centerPoint = this.opts['size'] / 2;
        const intervalMax = this.opts['size'] * this.opts['size'];
        let values, valueMax, circlePositions;
        const items = options['data'].items;

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
                    const rad = Math.max((val * options['radiusMax']) / valueMax, options['radiusMin']);
                    const dist = innerRadius + rad + Math.random() * (outerRadius - innerRadius - rad * 2);
                    const angle = Math.random() * pi2;
                    const cx = centerPoint + dist * Math.cos(angle);
                    const cy = centerPoint + dist * Math.sin(angle);

                    let hit = false;
                    circles.forEach(circle => {
                        const dx = circle.cx - cx;
                        const dy = circle.cy - cy;
                        const r = circle.r + rad;
                        if (dx * dx + dy * dy < Math.pow(r - delta, 2)) {
                            hit = true;
                            return false;
                        }
                    });
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

            moveToCenter: function (e) {
                const toCenterPoint = d3.svg.transform()
                    .translate(function (d) {
                        const cx = e.select('circle').attr('cx');
                        const dx = centerPoint - d.cx;
                        const dy = centerPoint - d.cy;
                        return [dx, dy];
                    });

                e.classed('active', true)
                    .transition().duration(options['transitDuration'])
                    .attr('transform', toCenterPoint)
                    .select('circle')
                    .attr('r', function (d) {return options['innerRadius']; });
            },

            moveToReflection: function (e, swapped) {
                const toReflectionPoint = d3.svg.transform()
                    .translate(function (d) {
                        const dx = 2 * (centerPoint - d.cx);
                        const dy = 2 * (centerPoint - d.cy);
                        return [dx, dy];
                    });

                e.transition()
                    .duration(options['transitDuration'])
                    .delay(function (d, i) {return i * 10; })
                    .attr('transform', swapped ? '' : toReflectionPoint)
                    .select('circle')
                    .attr('r', function (d) {return d.r; });
            },

            reset: function (e) {
                e.classed('active', false);
                // node.selectAll("text.clickMe").remove();

                // node.selectAll("text.termCount").transition().duration(1000)
                //  .style("font-size", function (d) { return d.termCount.fontSize + "px";});
                //
                // node.selectAll("text.termLabel").transition().duration(1000)
                //  .attr("dy", function (d) {return d.termLabel.dy;})
                //  .style("font-size", function (d) { return d.termLabel.fontSize + "px";});
            },

            onClick: function (e) {
                let swapped = false;
                e.style('cursor', 'pointer').on('click', function (d) {
                    const d3Node = d3.select(this);
                    bb.reset(BubbleChart.selectAll('.node'));
                    bb.moveToCenter(d3Node);
                    bb.moveToReflection(BubbleChart.selectAll('.node:not(.active)'), swapped);
                    swapped = !swapped;
                });
            }
        }

        values = bb.getValues();
        valueMax = values.reduce(function (x, y) {
            return ( x > y ? x : y );
        }, 0);

        const BubbleChart = d3.select(options['container']).append('svg')
            .attr('preserveAspectRatio', 'xMidYMid')
            .attr('width', options['size'])
            .attr('height', options['size'])
            .attr('class', 'bubbleChart')
            .attr('viewBox', function (d) {return ['0 0', options['viewBoxSize'], options['viewBoxSize']].join(' ')});

        circlePositions = bb.randomCirclesPositions(options['intersectDelta']);

        const node = BubbleChart.selectAll('.node')
            ['data'](circlePositions)
            .enter().append('g')
            .attr('class', function (d) {return ['node', options['data'].classed(d.item)].join(' '); });

        const fnColor = d3.scale.category20();
        node.append('circle')
            .attr({r: function (d) {return d.r; }, cx: function (d) {return d.cx; }, cy: function (d) {return d.cy; }})
            .style('fill', function (d) {
                return options['data'].color !== undefined ? options['data'].color(d.item) : fnColor(d.item.text);
            })
            .attr('opacity', '0.8');

        bb.onClick(node);
        return BubbleChart;
    }
}
