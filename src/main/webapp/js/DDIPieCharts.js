var web_service_url = 'http://wwwdev.ebi.ac.uk/Tools/ddi/ws/';
var retry_limit_time = 50;


var bub_charts_tissues_organisms = function () {
    queue()
        .defer(d3.json, web_service_url + 'statistics/tissues?size=100') // topojson polygons
        .defer(d3.json, web_service_url + 'statistics/organisms?size=100') // geojson points
        .defer(d3.json, web_service_url + 'statistics/diseases?size=100') // geojson points
        .await(draw_chart_tissues_organsims); // function that uses files

    function draw_chart_tissues_organsims(error, tissues, organisms, diseases) {
        if (error) {
            retry_limit_time--;
            if (retry_limit_time <= 0) {
                output_error_info('chart_tissues_organisms');
                return;
            }
            output_getting_info('chart_tissues_organisms');
            bub_charts_tissues_organisms();
        }
        else {
            remove_getting_info('chart_tissues_organisms');

            if (tissues[tissues.length - 1].name !== "Not available") {
                alert("the last element of tissues is not total number, charts is wrong")
            }
            ;
            if (organisms[organisms.length - 1].name !== "Not available") {
                alert("the last element of organisms is not total number, charts is wrong")
            }
            ;
            if (diseases[diseases.length - 1].name !== "Not available") {
                alert("the last element of diseases is not total number, charts is wrong")
            }
            ;

            var unavailabl_no_tissues = tissues.pop();
            var unavailable_no_organisms = organisms.pop();
            var unavailable_no_diseases = diseases.pop();

            if (tissues[0].name !== "Total") {
                alert("the first element of tissues is not total number, charts is wrong")
            }
            ;
            if (organisms[0].name !== "Total") {
                alert("the first element of tissues is not total number, charts is wrong")
            }
            ;
            if (diseases[0].name !== "Total") {
                alert("the first element of tissues is not total number, charts is wrong")
            }
            ;
            var total_tissues = tissues.shift();
            var total_organisms = organisms.shift();
            var total_diseases = diseases.shift();

            organisms = organisms.sort(function (a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });

            tissues = tissues.sort(function (a, b) {
                return (parseInt(a.value) - parseInt(b.value));
            });

            diseases = diseases.sort(function (a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });


            var bub_chart_name = 'chart_tissues_organisms';

            var body = d3.select("#" + bub_chart_name);

        var div_width_px = body.style("width");
        var div_width = div_width_px.substr(0, div_width_px.length - 2);
        var div_height_px = body.style("height");
        var div_height= div_width_px.substr(0, div_width_px.length - 2);
            //var div_width = 420;
            var diameter = div_width / 1.3,
                format = d3.format(",d"),
                color = d3.scale.category20b();

            var bubble = d3.layout.pack()
                .sort(null)
                .size([diameter * 1.3, diameter])
                .padding(1.5);
            body.selectAll("svg").remove();
            var svg = body.append("svg")
                .attr("width", diameter * 1.3)
                .attr("height", div_height)
                .attr("class", "bubble")
                .attr("style", "position:relative")
                ;

            body.selectAll("div").remove();
            var formdiv = body.append('div');
            formdiv
                .attr("class", "center")
                .attr("style", "width:266px; position:absolute; bottom: 15px; left:" + (div_width-266)/2 + "px")
            ;

            var radio_form = formdiv.append('form');

            radio_form
                .attr("id", bub_chart_name + "_form")
                .attr("class", "center")
                .attr("style", "margin-bottom:8px")
//  .attr("style","width:70%")
                .append('input')
                .attr('type', 'radio')
                .attr('name', 'dataset')
                .attr('value', 'Tissues')
                .attr('id', 'Tissues')
                .text('Tissues');
            radio_form
                .append('label')
                .text('Tissues')
                .attr('for', 'Tissues')
                .append('span')
                .append('span')
            ;
            radio_form
                .append('input')
                .attr('type', 'radio')
                .attr('name', 'dataset')
                .attr('value', 'Organisms')
                .attr('id', 'Organisms')
                .text('Organisms');
            radio_form
                .append('label')
                .text('Organisms')
                .attr('for', 'Organisms')
                .append('span')
                .append('span')
            ;
            radio_form
                .append('input')
                .attr('type', 'radio')
                .attr('name', 'dataset')
                .attr('value', 'Diseases')
                .attr('id', 'Diseases')
                .text('Diseases');
            radio_form
                .append('label')
                .text('Diseases')
                .attr('for', 'Diseases')
                .append('span')
                .append('span')
            ;

            d3.select("#" + bub_chart_name + "_form").select('input[value=Tissues]').property('checked', true);

            d3.select("#" + bub_chart_name + "_form").selectAll('input')
                .on('change', change);


            d3.select(self.frameElement).style("height", diameter + "px");

            var tooltip = d3.select('body').append("div")
                .attr("class", "chart_tooltip")
                .style("opacity", 0);


            change();


        }

        function classes(arr) {
            var classes = [];

            for (var i = 0; i < arr.length; i++)
                classes.push({
                    packageName: arr[i].name,
                    className: arr[i].name,
                    value: arr[i].value,
                    taxonomyid: arr[i].id
                });

            return {children: classes};
        }

        function change() {


            var value = this.value || 'Tissues';
            var data = [];
            var searchWord_pre;
            if (value == 'Tissues') {
                data = tissues;
                // text_total.text("Total:"+total_tissues);
                // text_unavail.text("Unavailable:"+unavailabl_no_tissues.value);
                searchWord_pre = '*:* AND tissue:"';
            }
            if (value == 'Organisms') {
                data = organisms;
                // text_total.text("Total:"+total_organisms);
                // text_unavail.text("Unavailable:"+unavailable_no_organisms.value);
                searchWord_pre = '*:* AND TAXONOMY:"';
            }
            if (value == 'Diseases') {
                data = diseases;
                // text_total.text("Total:"+total_organisms);
                // text_unavail.text("Unavailable:"+unavailable_no_organisms.value);
                searchWord_pre = '*:* AND disease:"';
            }

            svg.selectAll(".node").remove();


            var node = svg.selectAll(".node")
                .data(bubble.nodes(classes(data))
                    .filter(function (d) {
                        return !d.children;
                    }));

            node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .on("click", function (d, i) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                    var searchWord = searchWord_pre + d.className + '"';
                    if (value == 'Organisms') {
                        searchWord = searchWord_pre + d.taxonomyid + '"';
                    }
                    angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                });

//  node.append("title")
//      .text(function(d) { return d.className + ": " + format(d.value); });

            node.append("circle")
                .attr("r", function (d) {
                    return d.r;
                })
                .style("fill", function (d) {
                    return color(d.packageName);
                });

            node.append("text")
                .attr("dy", ".3em")
                .style("text-anchor", "middle")
                .style("font-size", "10px")
                .text(function (d) {
                    return d.r / d.className.length < 2.5 ? '' : d.className;
                });

            node.on("mousemove", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                var mouse_coords = d3.mouse(
                    tooltip.node().parentElement);

                tooltip.html("<strong>" + d.className + ": <br>" + d.value + "</strong> datasets" )
                    .style("left", (mouse_coords[0] +div_width/5 ) + "px")
                    .style("top", (mouse_coords[1] - 40) + "px")
                    .style("width", d.className.length * 5 + d.value.toString().length * 5 + 80 + "px");
            })
                .on("mouseout", function (d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            //     .on("mousemove", function(d){return tooltip.style("top",(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
            //     .on("mouseout", function (d){return tooltip.style("visibility", "hidden");})

// Returns a flattened hierarchy containing all leaf nodes under the root.


        };

    }
}

//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------//

var pie_charts_repos_omics = function () {

    queue()
        .defer(d3.json, web_service_url + 'statistics/domains') // topojson polygons
        .defer(d3.json, web_service_url + 'statistics/omics') // geojson points
        .await(draw_chart_repos_omics); // function that uses files

    function draw_chart_repos_omics(error, domains, omicstype) {

        if (error) {
            retry_limit_time--;
            if (retry_limit_time <= 0) {
                output_error_info('chart_repos_omics');
                return;
            }
            output_getting_info('chart_repos_omics');
            pie_charts_repos_omics();
        }
        else {
            remove_getting_info('chart_repos_omics');
            var repos = transformdomains(domains);
            omicstype.shift();
            var unavailableomics = omicstype.pop();

            var total_omics = gettotal(omicstype);
            var total_repos = gettotal(repos);

            omicstype = omicstype.sort(function (a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });
            repos = repos.sort(function (a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });


            /*
             * prepare the treemap data
             */
            var proteomics_list = "pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE";
            var metabolomics_list = "MetaboLights Dataset,MetaboLights,metabolights,metabolights_dataset,MetabolomicsWorkbench, Metabolomics Workbench, Metabolome Workbench";
            var genomics_list = "ega,EGA";

            var proteomics_child, metabolomics_child, genomics_child;
            var treemap_data = {
                "name": "Omics",
                "children": [
                    {
                        "name": "Proteomics",
                        "children": []
                    },
                    {
                        "name": "Genomics",
                        "children": []
                    },
                    {
                        "name": "Metabolomics",
                        "children": []
                    }
                ]
            };

            for (var i = 0; i < repos.length; i++) {
                if (proteomics_list.indexOf(repos[i].name) > -1) {
                    proteomics_child = {"name": repos[i].name, "size": repos[i].value};
                    treemap_data.children[0].children.push(proteomics_child);
                    continue;
                }
                if (genomics_list.indexOf(repos[i].name) > -1) {
                    genomics_child = {"name": repos[i].name, "size": repos[i].value};
                    treemap_data.children[1].children.push(genomics_child);
                    continue;
                }
                if (metabolomics_list.indexOf(repos[i].name) > -1) {
                    metabolomics_child = {"name": repos[i].name, "size": repos[i].value};
                    treemap_data.children[2].children.push(metabolomics_child);
                    continue;
                }
            }

            var piechartname = 'chart_repos_omics';
            var body = d3.select("#" + piechartname);

            var div_width_px = body.style("width");
            var div_width = div_width_px.substr(0, div_width_px.length - 2);
            //var div_width = 420;
            var width = div_width,
                height = 300,
                radius = Math.min(width, height) / 2.3;


            body.attr("position", "relative");
            d3.select("#" + piechartname).selectAll("svg").remove();
            var svg = d3.select("#" + piechartname)
                .append("svg")
                .attr("style", "height:" + height )
                .attr("style", "width:" + width )
                .attr("class", "piesvg")
                .append("g");

            svg.append("g")
                .attr("class", "slices");
            svg.append("circle")
                .attr("id", "insidecycle")
                .attr("style", "stroke:none");
            body.selectAll("div").remove();
            var formdiv = body.append('div');
            formdiv
                .attr("class", "center")
                .attr("style", "width:150px;margin-top:15px")
            ;

            var radio_form = formdiv.append('form');

            radio_form
                .attr("id", piechartname + "_form")
                .attr("class", "center")
                .attr("style", "margin-bottom:8px; ")
                .append('input')
                .attr('type', 'radio')
                .attr('name', 'dataset')
                .attr('value', 'Repos')
                .attr('id', 'Repos')
                .text('Repos');
            radio_form
                .append('label')
                .text('Repos')
                .attr('for', 'Repos')
                .append('span')
                .append('span')
            ;

            radio_form
                .append('input')
                .attr('type', 'radio')
                .attr('name', 'dataset')
                .attr('value', 'Omics')
                .attr('id', 'Omics_radio')
                .text('Omics');
            radio_form
                .append('label')
                .text('Omics')
                .attr('for', 'Omics_radio')
                .append('span')
                .append('span')
            ;

            d3.select("#" + piechartname + "_form").select('input[value=Repos]').property('checked', true)

            d3.select("#" + piechartname + "_form").selectAll('input')
                .on('change', change);


            var pie = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                    return d.value;
                });

            var arc = d3.svg.arc()
                .outerRadius(radius * 0.95)
                .innerRadius(radius * 0.6);

            svg.select("#insidecycle")
                .attr("r", radius * 0.6)
                .style("fill", "white")
                .attr("cx", 0)
                .attr("cy", 0);

            var text_name = svg.append('text')
                .attr('x', 0)
                .attr('y', 0)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr('font-size', '10px')
                .attr('fill', 'white');

            var text_value = svg.append('text')
                .attr('x', 0)
                .attr('y', 0 + radius * 0.2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr('font-size', '10px')
                .attr('fill', 'white');

            var text_total = svg.append('text')
                .attr('x', radius * 0.65)
                .attr('y', radius * -0.75)
                .attr('text-anchor', 'left')
                .attr('alignment-baseline', 'middle')
                .attr('fill', 'black');

            var text_unavail = svg.append('text')
                .attr('x', radius * 0.65)
                .attr('y', radius * -0.85)
                .attr('text-anchor', 'left')
                .attr('alignment-baseline', 'middle')
                .attr('fill', 'black');


            svg.attr("transform", "translate(" + width / 2.0 + "," + height / 1.8 + ")");

            var key = function (d) {
                return d.data.name;
            };


            var color = d3.scale.category20();
            var treemap_color = {"Proteomics": "#2CA02C", "Metabolomics": "#FF7F0E", "Genomics": "#1f77b4"};

            /*
             * draw the treemap
             var margin = {top: 40, right: 10, bottom: 10, left: 10};
             treemap_width = width - margin.left - margin.right;
             treemap_height = height - margin.top - margin.bottom;
             var treemap = d3.layout.treemap()
             .size([treemap_width, treemap_height])
             .sticky(true)
             .value(function(d) { return d.size; });
             var treemap_tooltip = d3.select('body').append("div")
             .attr("class", "tooltip")
             .style("opacity", 0);

             */

            change();


            function draw_treemap() {
                var treemap_searchWord_pre = '*:* AND repository:"';
                var treemap_div = body.append("div")
                    .attr("id", "treemap_div")
                    .style("position", "absolute")
                    .style("width", (treemap_width + margin.left + margin.right - 40 ) + "px")
                    .style("height", (treemap_height + margin.top + margin.bottom) + "px")
                    .style("margin-left", (margin.left) + "px")
                    .style("top", margin.top + "px");

                var treemap_node = treemap_div.datum(treemap_data).selectAll(".treemap_node")
                    .data(treemap.nodes)
                    .enter().append("div")
                    .attr("class", "treemap_node")
                    .call(position)
                    .style("background", function (d) {
                        return d.children ? treemap_color[d.name] : null;
                    })
                    .text(function (d) {
                        return d.children ? null : d.name;
                    })
                    .on("click", function (d, i) {
                        //location.href = treemap_searchWord_pre + d.name + '"';
                        //
                        //if (d.name == "MetaboLights Dataset")
                        //    location.href = treemap_searchWord_pre + "MetaboLights" + '"';
                        //if (d.name == "Metabolome Workbench")
                        //    location.href = treemap_searchWord_pre + "MetabolomicsWorkbench" + '"';
                    })
                    .on("mousemove", function (d, i) {
                        treemap_tooltip.transition()
                            .duration(200)
                            .style("opacity", .9);

                        var mouse_coords = d3.mouse(
                            treemap_tooltip.node().parentElement);

                        treemap_tooltip.html("<strong>" + d.name + ": <br>" + d.value + "</strong> datasets" )
                            .style("left", (mouse_coords[0] + screen.width/11) + "px")
                            .style("top", (mouse_coords[1] - 30) + "px")
                            .style("width", d.name.length * 5 + d.value.toString().length * 5 + 80 + "px");
                    })
                    .on("mouseout", function (d, i) {
                        treemap_tooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    })
            }

            function position() {
                this.style("left", function (d) {
                    return d.x + "px";
                })
                    .style("top", function (d) {
                        return d.y + "px";
                    })
                    .style("width", function (d) {
                        return Math.max(0, d.dx - 1) + "px";
                    })
                    .style("height", function (d) {
                        return Math.max(0, d.dy - 1) + "px";
                    });
            }
        }
        function transformdomains(arr) {

            var newarry = [];
            for (var i = 0; i < arr.length; i++) {
                newarry.push({
                    "name": arr[i]["domain"]["name"],
                    "value": arr[i]["domain"]["value"]
                });
            }
            return newarry;
        };

        function gettotal(arr) {
            var sum = 0;
            for (var i = 0; i < arr.length; i++)
                sum += parseInt(arr[i].value);
            return sum;
        };

        function change() {
            var value = this.value || 'Repos';
            var data;
            var searchWord_pre;
            if (value == 'Omics') {
                data = omicstype;
                text_total.text("Total:" + total_omics);
//                text_unavail.text("Unavailable:" + unavailableomics.value);
                searchWord_pre = '*:* AND omics_type:"';
                // text_total.text("Total:"+total_omics);
                svg.attr("visibility", null);
//                d3.select("#treemap_div").remove();
            }
            if (value == 'Repos') {
                data = repos;
                text_total.text("Total:" + total_repos);
//                text_unavail.text("");
                searchWord_pre = '*:* AND repository:"';
                // text_total.text("Total:"+total_repos);
                svg.attr("visibility", null);
//                d3.select("#treemap_div").remove();
            }
            /*           if (value == 'Treemap') {
             svg.attr("visibility", "hidden");
             draw_treemap();
             return;
             }
             */
            /*init the inside cycle*/
            text_name.text(data[data.length - 1].name).style("font-size", "14px");
            text_value.text(data[data.length - 1].value + " datasets").style("font-size", "12px");
            var colorinside = color(data.length - 1);
            if (value === 'Omics') colorinside = treemap_color[data[data.length - 1].name];
            svg.select("#insidecycle")
                .style("fill", colorinside)
                .style("opacity", ".95");

            /* ------- PIE SLICES -------*/
            var slice = svg.select(".slices").selectAll("path.slice")
                .data(pie(data), key);


            slice.enter()
                .insert("path")
                .style("fill", function (d, i) {
                    if (value === 'Omics') return treemap_color[d.data.name];
                    return color(i);
                })
                .attr("class", "slice")
                .on("click", function (d, i) {
                    var searchWord = searchWord_pre + d.data.name + '"';
                    if (d.data.name == "MetaboLights Dataset")
                        searchWord = searchWord_pre + "MetaboLights" + '"';
                    if (d.data.name == "Metabolome Workbench")
                        searchWord = searchWord_pre + "MetabolomicsWorkbench" + '"';
                    angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                })
                .on("mouseover", function (d, i) {
                    var temptext1 = d.data.name;
                    var temptext2 = d.data.value;
                    colorinside = color(i);
                    if (value === 'Omics') colorinside = treemap_color[d.data.name];
                    svg.select("#insidecycle")
                        .style("fill", colorinside)
                        .style("opacity", ".8");
                    text_name
                        .text(temptext1);
                    text_value
                        .text(temptext2 + " datasets");
                })
                .on("mouseout", function (d, i) {
                    colorinside = color(i);
                    if (value === 'Omics') colorinside = treemap_color[d.data.name];
                    svg.select("#insidecycle")
                        .style("fill", colorinside)
                        .style("opacity", ".95");
                })
            ;

            slice
                .transition().duration(1000)
                .attrTween("d", function (d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        return arc(interpolate(t));
                    };
                })

            ;

            slice.exit()
                .remove();
        };

    }

}


var barcharts_years_omics_types = function () {
    queue()
        .defer(d3.json, web_service_url + 'statistics/omicsByYear') // geojson points
        .await(draw_chart_omicstype_annual); // function that uses files

    function draw_chart_omicstype_annual(error, annual_data) {
        if (error) {
            retry_limit_time--;
            if (retry_limit_time <= 0) {
                output_error_info('barchart_omicstype_annual');
                return;
            }

            output_getting_info('barchart_omicstype_annual');
            barcharts_years_omics_types();
        }
        else {
            remove_getting_info('barchart_omicstype_annual');
            var body = d3.select('#barchart_omicstype_annual');
        var div_width_px = body.style("width");
        var div_width = parseInt(div_width_px.substr(0, div_width_px.length - 2));
            //var div_width = 420;
            var margin = {top: 20, right: 20, bottom: 20, left: 60},
                width = div_width - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;
            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var x1 = d3.scale.ordinal();

            var y = d3.scale.linear()
                .range([height, 0]);

            var color = d3.scale.category10();

            var xAxis = d3.svg.axis()
                .scale(x0)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".2s"));

            d3.select("#barchart_omicstype_annual").selectAll("svg").remove();
            var svg = d3.select("#barchart_omicstype_annual").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var omics_types = d3.keys(annual_data[0]).filter(function (key) {
                return key !== "year";
            });


            data = annual_data;
            console.log(annual_data);
            data.forEach(function (d) {
                d.omics = omics_types.map(function (name) {
                    if (name !== "year") return {name: name, value: +d[name], year: d["year"]};
                });
            });

            x0.domain(data.map(function (d) {
                return d.year;
            }));

            x1.domain(omics_types).rangeRoundBands([0, x0.rangeBand()]);
            y.domain([0, d3.max(data, function (d) {
                return d3.max(d.omics, function (d) {
                    return d.value;
                });
            })]);

            var tooltip = d3.select('body').append("div")
                .attr("class", "chart_tooltip")
                .style("opacity", 0);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "-3.9em")
                .attr("dx", "-4.9em")
                .style("text-anchor", "end")
                .text("Datasets No.");

            var year = svg.selectAll(".year")
                .data(data)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function (d) {
                    return "translate(" + x0(d.year) + ",0)";
                });

            year.selectAll("rect")
                .data(function (d) {
                    return d.omics;
                })
                .enter().append("rect")
                .attr("width", x1.rangeBand() * 0.8)
                .attr("x", function (d) {
                    return x1(d.name);
                })
                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("height", function (d) {
                    return height - y(d.value);
                })
                .style("fill", function (d) {
                    return color(d.name);
                })
                .attr("class", "bar")
                .on("click", function (d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);

                    var searchWord = "*:* AND omics_type:\"" + d.name + "\" AND publication_date:\"" + d.year + "\"";
                    angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                })
                .on("mouseover", function (d) {
                    var chart_div_left = document.getElementById('barchart_omicstype_annual').getBoundingClientRect().left;
                    var mouse_coords = d3.mouse(
                        tooltip.node().parentElement);
//                    console.log(parseInt(d3.select(this).attr("y")));
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html( d.value + " datasets" )
                        //.style("left", (mouse_coords[0]  ) + "px")
                        .style("left", (mouse_coords[0]* chart_div_left/950 +  "px"))
                        .style("top", (parseInt(d3.select(this).attr("y"))+635) + "px")
                        .style("height",  "20px")
                        .style("width", d.value.toString().length * 5 + 80 + "px");

                    console.log();
                })
                .on("mouseout", function (d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            ;


            d3.select('.x.axis')
                .selectAll('.tick')
                .attr("class", "hotword")
                .on('click', clickMe);

            var legend = svg.selectAll(".legend")
                .data(omics_types.slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function (d, i) {
                    return "translate(0," + i * 20 + ")";
                })
                .on("click", function (d) {
                    var searchWord = "*:* AND omics_type:\"" + d + "\"";
                    angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                });

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function (d) {
                    return d;
                });
        }

    }

    function clickMe(d) {
        var searchWord = "*:* AND publication_date:\"" + d + "\"";
        angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
    };


}

function output_error_info(errordiv) {
    var tempdiv = d3.select("#" + errordiv);

    tempdiv.selectAll("i").remove();
    tempdiv.selectAll("p").remove();
    tempdiv.append("p").attr("class", "error-info")
        .html("Sorry, accessing to this web service was temporally failed.");
}

function output_getting_info(errordiv) {
    var tempdiv = d3.select("#" + errordiv);
    if(tempdiv.select("i")[0][0]===null){
        tempdiv.append("i").attr("class", "fa fa-spinner fa-spin");
    }
}
function remove_getting_info(errordiv) {
    var tempdiv = d3.select("#" + errordiv);
    tempdiv.select("i").remove();
}
