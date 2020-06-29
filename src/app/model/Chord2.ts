/**
 * Created by Ricardo on 6/13/2017.
 */
// / <reference path="../../../node_modules/@types/d3/index.d.ts" />
import * as d3 from 'd3';

const inputdata = {
    connections: [],
    labels: {},
    labelArray: []
};

export class Chord2 {
    chord = {};
    chords;
    groups: any[];
    connections;
    padding = 0;
    sortGroups;
    sortSubgroups;
    sortChords;
    width = 960;
    height = 900;
    innerRadius = Math.min(this.width, this.height) * .30;
    outerRadius = this.innerRadius * 1.1;
    fontsize = 15;
    colorschemeArcs = ['#000000', '#FFDD89', '#957244', '#F26223', '#d9d9d9'];
    fillChords = d3.schemeCategory10;

    public constructor() {
    }

    public init(selection: any) {
        const self = this;
        let tooltip: any = document.getElementById('chord_diagram_tooltip');
        if (tooltip == null) {
            tooltip = d3.select('#chord_diagram').append('div')
                .attr('id', 'chord_diagram_tooltip')
                .attr('class', 'chart_tooltip')
                .style('left', '5px')
                .style('top', '5px')
                .style('opacity', 1);
        }

        let tooltip_click: any = document.getElementById('chord_diagram_tooltip_click');
        if (tooltip_click == null) {
            tooltip_click = d3.select('#chord_diagram').append('div')
                .attr('id', 'chord_diagram_tooltip_click')
                .attr('class', 'chart_tooltip')
                .style('left', '5px')
                .style('top', '5px')
                .style('opacity', 1);
        }

        selection.each(function (_d, i) {
            const sub_selection = d3.select(this);

            self.connections = _d.connections;

            sub_selection.append('g')
                .attr('class', 'arc')
                .selectAll('path')
                .data(self.cgroups())
                .enter().append('path')
                .style('fill', function (d: any) {
                    return self.fillChords[d.index % self.fillChords.length];
                })
                .attr('d', d3.arc().innerRadius(self.innerRadius).outerRadius(self.outerRadius))
                .attr('transform', 'translate(' + self.width / 2 + ',' + self.height / 2 + ')')
                .on('click', self.fade(sub_selection, .0))
                .on('mouseover', self.fade(sub_selection, .2))
                .on('mousemove', function (d) {
                    const mouse_coords = d3.mouse(
                        tooltip_click.node().parentElement);

                    tooltip_click.transition()
                        .duration(200)
                        .style('opacity', .9);

                    tooltip_click.html('Click to hide the similarity scores between the others')
                    // .style("left", (mouse_coords[0]  ) + "px")
                        .style('left', (mouse_coords[0] * 1 + 'px'))
                        .style('top', ((mouse_coords[1] - 30) + 'px'))
                        .style('z-index', '1');
                })
                .on('mouseout', function (d) {
                    tooltip_click.transition()
                        .duration(100)
                        .style('opacity', .0);
                });

            sub_selection.append('g')
                .attr('class', 'chord')
                .selectAll('path')
                .data(self.cchords())
                .enter().append('path')
                .attr('class', 'hotword')
                .attr('transform', 'translate(' + self.width / 2 + ',' + self.height / 2 + ')')
                .attr('d', d3.ribbon().radius(self.innerRadius))
                .style('fill', function (d: any) {
                    return self.fillChords[d.polygon % self.fillChords.length];
                })
                .style('opacity', 1)
                .style('fill-opacity', .67)
                .style('stroke', '#000')
                .style('stroke-width', '.5px')
                .on('mousemove', function (d: any) {
                    const mouse_coords = d3.mouse(
                        tooltip.node().parentElement);

                    tooltip.transition()
                        .duration(200)
                        .style('opacity', .9);

                    tooltip.html('similarity score-dataset:' + d.source.value / 100)
                    // .style("left", (mouse_coords[0]  ) + "px")
                        .style('left', (mouse_coords[0] * 1 + 'px'))
                        .style('top', ((mouse_coords[1] - 30) + 'px'));
                })
                .on('mouseout', function (d) {
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', .0);
                });

            const groupsNo = self.cgroups().length;

            const labels = _d.labels ||
                (d3.range(self.cgroups().length).map(function (n) {
                    return 'group' + n;
                }));
            const groupLabels = function (d) {
                return {
                    angle: (d.startAngle + d.endAngle) / 2,
                    label: labels[d.index]
                };
            };

            sub_selection.append('g').selectAll('g')
                .data(self.cgroups().map(groupLabels))
                .enter()
                .append('g')
                .attr('transform', 'translate(' + self.width / 2 + ',' + self.height / 2 + ')')
                .append('g')
                .attr('transform', function (d) {
                    return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ')'
                        + 'translate(' + (self.outerRadius + 10) + ',0)';
                })
                .append('text')
                .attr('x', 8)
                .attr('dy', '.35em')
                .attr('transform',
                    function (d) {
                        return d.angle > Math.PI ? 'rotate(180)translate(-16)' : null;
                    })
                .attr('class', 'hotword')
                .style('fill', function (d) {
                    if (inputdata.labelArray.indexOf(d.label) === 0) {
                        return 'red';
                    } else {
                        return 'black';
                    }
                })
                .style('font-size', Math.ceil(self.fontsize / 1.8) + 'px')
                .style('text-anchor',
                    function (d) {
                        return d.angle > Math.PI ? 'end' : null;
                    })
                .text(function (d) {
                    const acc = d.label.replace(/@.*/, '');
                    return acc;
                })
                .on('click', function (d) {
                    const acc = d.label.replace(/@.*/, '');
                    let domain = d.label.replace(/.*@/, '');
                    if (domain === 'MetabolomicsWorkbench') {
                        domain = 'metabolomics_workbench';
                    }
                    // TODO: routerLink
                    location.href = 'dataset/' + domain + '/' + acc;
                })
                .on('mouseover', function (d) {
                    const acc = d.label.replace(/@.*/, '');
                    const mouse_coords = d3.mouse(
                        tooltip.node().parentElement);

                    tooltip.transition()
                        .duration(200)
                        .style('opacity', .9);

                    tooltip.html('' + acc)
                        .style('left', (mouse_coords[0] + 'px'))
                        .style('top', ((mouse_coords[1] - 30) + 'px'));
                })
                .on('mouseout', function (d) {
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', 0);
                });
        });
    }

    fade(selection, opacity) {
        return function (g, i) {
            selection.selectAll('.chord path')
                .transition()
                .style('opacity', 1);

            selection.selectAll('.chord path')
                .filter(function (d) {
                    return !((i + '') in d.groups);
                })
                .transition()
                .style('opacity', opacity);
        };
    }

    cwidth(x) {
        // if (!arguments.length) return this.width;
        this.width = x;
        this.innerRadius = Math.min(this.width, this.height) * .30;
        this.outerRadius = this.innerRadius * 1.1;
        this.chords = this.groups = null;
        return this;
    }

    cheight(x: number) {
        // if (!arguments.length) return this.height;
        this.height = x;
        this.innerRadius = Math.min(this.width, this.height) * .30;
        this.outerRadius = this.innerRadius * 1.1;
        this.chords = this.groups = null;
        return this;
    }

    cpadding(x) {
        if (!arguments.length) {
            return this.padding;
        }
        this.padding = x;
        this.chords = this.groups = null;
        return this;
    }

    cchords() {
        if (!this.chords) {
            this.relayout();
        }
        return this.chords;
    }

    cgroups() {
        if (!this.groups) {
            this.relayout();
        }
        return this.groups;
    };

    relayout() {
        const self = this,
            subgroups = [],
            groupSums = {},
            subgroupIndex = [],
            polygons = [];
        let poly = {
                edges: [],
                vertices: {}
            },
            samebase: any = [],
            ngroups = 0,
            groupIndex,
            pt1, pt2,
            pt, ep,
            k, x, x0, i, j, h;

        self.chords = [];
        self.groups = [];

        const connections = self.connections;

        k = 0; i = -1;
        while (++i < connections.length) {
            j = -1;
            while (++j < connections[i].length) {
                ep = connections[i][j].group;
                if (ep in groupSums) {
                    groupSums[ep] += connections[i][j].value;
                } else {
                    groupSums[ep] = connections[i][j].value;
                    ++ngroups;
                }
                k += connections[i][j].value;
            }
        }


        // ----added by mingze----------------------------------
        k = 100 * ngroups; // added by mingze, give 100 space for each group
        for (i = 0; i < ngroups; i++) {
            groupSums[i] = 100;
        }
        //
        // --------------------------------------

        groupIndex = d3.range(ngroups);

        if (self.sortGroups) {

            groupIndex.sort(function (a, b) {
                return self.sortGroups(groupSums[a], groupSums[b]);
            });
        }
        k = (2 * Math.PI - self.padding * ngroups) / k;

        i = -1;
        while (++i < connections.length) {
            // If the current connections element is a singleton,
            // skip this altogether: no chord, it's empty space in the segment.
            if (connections[i].length > 1) {
                j = 0;
                while (++j < connections[i].length) {
                    // the polygon keeps track of links which share groups.
                    poly.edges.push({
                        source: connections[i][j - 1],
                        target: connections[i][j]
                    });
                    // the only purpose of poly.vertices is later lookup,
                    // so I use it as a set. I convert vertices ID to string with + ''
                    poly.vertices[connections[i][j - 1].group + ''] = '';
                }
                poly.vertices[connections[i][j - 1].group + ''] = '';
                // close the polygon, unless it has only one side.
                if (poly.edges.length > 1) {
                    poly.edges.push({
                        source: connections[i][0],
                        target: connections[i][j - 1]
                    });
                }
                polygons.push(poly);
                poly = {
                    edges: [],
                    vertices: {}
                };
            }
        }

        i = -1;
        while (++i < ngroups) {
            subgroups[i] = [];
            j = -1;
            while (++j < polygons.length) {
                samebase = {
                    'ribbons': [],
                    'basevalue': 0
                };
                h = -1;
                while (++h < polygons[j].edges.length) {
                    if (polygons[j].edges[h].source.group === i) {
                        samebase.ribbons.push(polygons[j].edges[h]);
                        samebase.basevalue = polygons[j].edges[h].source.value;
                    } else if (polygons[j].edges[h].target.group === i) {
                        samebase.ribbons.push(polygons[j].edges[h]);
                        samebase.basevalue = polygons[j].edges[h].target.value;
                    }
                }
                subgroups[i].push(samebase);
            }
        }

        // Now I handle the empty spaces, i.e. singletons in connections
        i = -1;
        while (++i < connections.length) {
            if (connections[i].length === 1) {
                subgroups[connections[i][0].group]
                    .push({
                        'ribbons': [],
                        'basevalue': connections[i][0].value
                    });
            }
        }

        // last pass on subgroups to create indices
        i = -1;
        while (++i < ngroups) {
            subgroupIndex.push(d3.range(subgroups[i].length));
        }
        // Sort subgroups…
        if (self.sortSubgroups) {
            subgroupIndex.forEach(function (d, r) {
                d.sort(function (a, b) {
                    return self.sortSubgroups(subgroups[r][a].basevalue,
                        subgroups[r][b].basevalue);
                });
            });
        }

        x = 0; i = -1;
        while (++i < ngroups) {
            const di = groupIndex[i];
            x0 = x; j = -1;
            while (++j < subgroupIndex[di].length) {
                const dj = subgroupIndex[di][j],
                    // take numerical ID as subgroup key
                    v = subgroups[di][dj].basevalue,
                    // a0 = x,
                    //   a1 = x += v * k;  //modified by Mingze, for get the rignt start point of each group??? not sure
                    a1 = v * k;
                // here you should directly modify the "edges",
                // then access them back via polygons
                // I now extend polygons elements with new properties.
                h = -1;
                while (++h < subgroups[di][dj].ribbons.length) {
                    // pick the right end of the edge to be augmented
                    pt1 = subgroups[di][dj].ribbons[h].source;
                    pt2 = subgroups[di][dj].ribbons[h].target;
                    if (pt1.group === di) {
                        pt = pt1;
                    } else {
                        pt = pt2;
                    }
                    // Only one of the two groups per iteration
                    // is augmented with the 'geometry' property.
                    // I will read this object back from the 'polygons' object.
                    pt['geometry'] = {
                        index: di,
                        subindex: dj,
                        // startAngle: a0, //modified by Mingze, to make each bend start from same point, 0 of this group
                        startAngle: x0,
                        endAngle: x0 + a1,
                        value: v
                    };

                }
            }
            x += 100 * k;
            self.groups[di] = {
                index: di,
                startAngle: x0,
                endAngle: x,
                value: (x - x0) / k
            };
            x += self.padding;
        }

        // Generate chords for each (non-empty) subgroup-subgroup link.
        // We only use one-one(a pair) style polygon here --by Mingze
        i = -1;
        while (++i < polygons.length) { // to make the host dataset's chords in the uppest position
            // i = polygons.length;
            // while (--i > 0) {
            j = -1;
            while (++j < polygons[i].edges.length) {
                const source = polygons[i].edges[j].source.geometry,
                    target = polygons[i].edges[j].target.geometry;
                if (source && target && (source.value || target.value)) {
                    self.chords.push(source.value < target.value
                        ? {
                            source: target,
                            target: source,
                            groups: polygons[i].vertices,
                            polygon: i
                        }
                        : {
                            source: source,
                            target: target,
                            groups: polygons[i].vertices,
                            polygon: i
                        });
                }
            }
        }

        if (self.sortChords) {
            this.resort();
        }
    }

    resort() {
        const self = this;
        self.chords.sort(function (a, b) {
            return self.sortChords(
                (a.source.value + a.target.value) / 2,
                (b.source.value + b.target.value) / 2);
        });
    }


}
