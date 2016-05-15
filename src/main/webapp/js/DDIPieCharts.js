//var web_service_url = 'http://wwwdev.ebi.ac.uk/Tools/omicsdi/ws/';

var web_service_url = 'http://localhost:9091/';
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

            function isSmall(value) {
                return value.value >= 3;
            }

            function isMedium(value) {
                return value.value >= 7;
            }

            function isBigger(value) {
                return value.value >= 20;
            }

            organisms = organisms.filter(isBigger);
            tissues   = tissues.filter(isMedium)
            diseases  = diseases.filter(isMedium)

            var bub_chart_name = 'chart_tissues_organisms';

            var body = d3.select("#" + bub_chart_name);

        var div_width_px = body.style("width");
        var div_width = div_width_px.substr(0, div_width_px.length - 2);
        var div_height_px = body.style("height");
        var div_height= div_height_px.substr(0, div_height_px.length - 2);
            //var div_width = 420;
            var diameter = Math.min(div_height, div_width)/1.15,
                format = d3.format(",d"),
                color = d3.scale.category20b();
            var bubble = d3.layout.pack()
                .sort(null)
                .size([diameter * 1.3, diameter])
                .padding(1.5);
            body.selectAll("svg").remove();
            var svg = body.append("svg")
                .attr("width", diameter * 1.3)
                .attr("height", diameter*1.3)
                .attr("class", "bubble center")
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

            var tooltip = document.getElementById("tissue_organism_chart_tooltip");
            if( tooltip == null){
                tooltip = body.append("div")
                    .attr("class", "chart_tooltip")
                    .attr("id", "tissue_organism_chart_tooltip")
                    .style("opacity", 0);
            }


            change();


        }

        function classes(arr) {
            var classes = [];
            for (var i = 0; i < arr.length; i++){
                var value_before_log_calc = arr[i].value_before_log_calc == null ? arr[i].value : arr[i].value_before_log_calc;
                classes.push({
                    packageName: arr[i].name,
                    className: arr[i].name,
                    value: arr[i].value,
                    value_before_log_calc: value_before_log_calc,
                    taxonomyid: arr[i].id
                });
            }
            return {children: classes};
        }

        function calculate_logged_value(data){
            var newdata = [];
            for(var i = 0; i < data.length; i++){
                var item = {
                    id:data[i].id,
                    label:data[i].label,
                    name:data[i].name,
                    value:1 + Math.floor(Math.log(data[i].value)),
                    value_before_log_calc: data[i].value
                };
                newdata.push(item);
            }
            return newdata;
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
                data = calculate_logged_value(organisms);
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
                    console.log(d);
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
                    document.getElementById("tissue_organism_chart_tooltip").parentElement);
                    //tooltip.node().parentElement);

                tooltip.html("<strong>" + d.className + ": <br>" + d.value_before_log_calc + "</strong> datasets" )
                    .style("left", (mouse_coords[0] + 25) + "px")
                    .style("top", (mouse_coords[1] - 40) + "px")
                    .style("width", d.className.length * 5 + d.value_before_log_calc.toString().length * 5 + 80 + "px");
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
            omicstype.pop();

            omics = omicstype.sort(function (a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });
            repos = repos.sort(function (a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });


            /*
             * prepare the treemap data
             */
            var proteomics_list = "pride,peptideatlas,peptide_atlas,massive,PRIDE,PeptideAtlas,MassIVE";
            var metabolomics_list = "MetaboLights Dataset,MetaboLights,metabolights,metabolights_dataset,MetabolomicsWorkbench, Metabolomics Workbench, Metabolome Workbench, GNPS, MetabolomeExpress, GPMdb";
            var genomics_list = "ega,EGA";
            var transcriptomics_list = "ArrayExpress, arrayexpress-repository";

            var repos_data = [
                    {
                        "name": "Proteomics",
                        "size": null,
                        "children": []
                    },
                    {
                        "name": "Genomics",
                        "size": null,
                        "children": []
                    },
                    {
                        "name": "Metabolomics",
                        "size": null,
                        "children": []
                    },
                    {
                        "name": "Transcriptomics",
                        "size": null,
                        "children": []
                    }
                ];

            var repos_data_simple = [];
            var data = [];
            var omics_data_simple = [];
            var omics_data_num = [];

            for (var i = 0; i < repos.length; i++) {
                if (proteomics_list.indexOf(repos[i].name) > -1) {
                    repos_data[0].children.push({
                        name: repos[i].name,
                        size: repos[i].value
                    });
                    continue;
                }
                if (genomics_list.indexOf(repos[i].name) > -1) {
                    repos_data[1].children.push({
                        name: repos[i].name,
                        size: repos[i].value
                    });
                    continue;
                }
                if (metabolomics_list.indexOf(repos[i].name) > -1) {
                    repos_data[2].children.push({
                        name: repos[i].name,
                        size: repos[i].value
                    });
                    continue;
                }
                if (transcriptomics_list.indexOf(repos[i].name) > -1) {
                    repos_data[3].children.push({
                        name: repos[i].name,
                        size: repos[i].value
                    });
                    continue;
                }
            }
            for (var i = 0; i < repos_data.length; i++) {

                var total = 0;

                for (var j = 0; j < repos_data[i].children.length; j++) {
                  total += parseInt(repos_data[i].children[j].size);

                  repos_data_simple.push({
                    name: repos_data[i].children[j].name,
                    size: repos_data[i].children[j].size
                  });

                  data.push(repos_data[i].children[j].size);
                }
                repos_data[i].size = total;
            }

            for (var i = 0; i < omics.length; i++) {
                omics_data_simple.push({
                    name: omics[i].name,
                    size: omics[i].value
                });
                omics_data_num.push(omics[i].value);
            }

            var piechartname = 'chart_repos_omics';
            var body = d3.select("#" + piechartname);
            var div_width = parseInt(body.style("width"));
            var div_height = parseInt(body.style("height"));
            var width = div_width;

            var tool_tip, svg;

            function drawLineGraphy (data_now) {

              body.attr("position", "relative");


              if (!tool_tip) {
                  tool_tip = body.append("div")
                    .attr("id", "chart_repos_omics_tooltip")
                    .attr("class", "chart_tooltip")
                    .style('opacity', 0)
                    .attr("position", "absolute");
              }

              var svg_height = parseInt(body.style("height")) - 60;
              var rect_height = (parseInt(svg_height - 20*2 - 8*2))/3;     //(body - gap * 2 - paddingTopAndBotton)/3
              var rect_width = 25;
              var lower = d3.scale.linear().domain([0,1000]).range([rect_height*3 + 48,rect_height*2 + 48]).clamp(true),
                  upper = d3.scale.linear().domain([1001,5000]).range([rect_height*2 + 28,rect_height + 28]).clamp(true),
                  most  = d3.scale.linear().domain([5001, 70000]).range([rect_height + 8, 8]).clamp(true),
                  color = d3.scale.category10();

              if (!svg) {
                svg = body.append("svg").attr("width", width).attr("height",  svg_height).attr('margin-top', 10);
              }

              if (svg.selectAll("rect")) {
                svg.selectAll("rect").remove();
              }

              svg.selectAll("rect.lower")
                 .data(data_now).enter()
                 .append("rect")
                 .attr("class", "lower")
                 .attr("x", function(d, i) { return 70 + i * 35; })
                 .attr("width", rect_width)
                 .attr("y", function(d) { return lower(d); })
                 .attr("height", function(d) { return rect_height * 3 + 48 - lower(d); })
                 .style("fill", color);

              svg.selectAll("rect.upper")
                 .data(data_now)
                 .enter()
                 .append("rect")
                 .attr("class", "upper")
                 .attr("x", function(d, i) { return 70 + i * 35; })
                 .attr("width", rect_width)
                 .attr("y", function(d) { return upper(d); })
                 .attr("height", function(d) { return d >= 1500 ? rect_height * 2 + 28 - upper(d) : 0; })
                 .style("fill", color);

              svg.selectAll("rect.most")
                 .data(data_now).enter()
                 .append("rect")
                 .attr("class", "most")
                 .attr("x", function(d, i) {return 70 + i * 35;})
                 .attr("width", rect_width)
                 .attr("y", function(d) {return most(d);})
                 .attr("height", function(d) {return d >= 10000 ? rect_height + 8 - most(d): 0})
                 .style('fill', color);


              svg.append("g").attr("transform", "translate(60,0)")
                 .call(d3.svg.axis().scale(lower).orient("left").ticks(4));

              svg.append("g").attr("transform", "translate(60,0)")
                 .call(d3.svg.axis().scale(upper).orient("left").ticks(4));

              svg.append("g").attr("transform", 'translate(60,0)')
                 .call(d3.svg.axis().scale(most).orient("left").ticks(4));
            }

            //mouse over tips
            function showTip(searchWord_pre, data_add_key) {
                body.selectAll("rect")
                  .on("mouseover", function(d, i) {
                      i = i % data_add_key.length;
                      var mouse_coords = d3.mouse(document.getElementById("chart_repos_omics_tooltip").parentElement)
                      d3.select(this).attr('cursor', 'pointer');

                      tool_tip.transition()
                              .duration(200)
                              .style("opacity", .9);


                      tool_tip.html(data_add_key[i].name.toString() + ": <br>" + data_add_key[i].size.toString() + " datasets"  )
                              .style("left", (mouse_coords[0]) + "px")
                              .style("top",  (parseInt(d3.select(this).attr("y"))) + "px")
                              .style("height", "40px")
                              .style("width", (data_add_key[i].name.toString().length + 10) * 4 + "px");
                  })
                  .on("mouseout", function () {
                      tool_tip.transition()
                              .duration(500)
                              .style('opacity', '0');
                  })
                  .on("click", function(d, i) {
                      tool_tip.transition()
                              .duration(500)
                              .style("opacity", 0);

                      searchWord = searchWord_pre + data_add_key[i].name.toString() + '"';
                      if (data_add_key[i].name.toString() == "MetaboLights Dataset")
                           searchWord = searchWord_pre + "MetaboLights" + '"';
                      if (data_add_key[i].name.toString() == "Metabolome Workbench")
                           searchWord = searchWord_pre + "MetabolomicsWorkbench" + '"';
                        angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                  })
            }

            drawLineGraphy(data);
            showTip('*:* AND repository:"', repos_data_simple);


//add form container
            var formdiv = body.append('div');
            formdiv
                .attr("class", "center")
                .attr("style", "width:150px;margin-top: 24px")
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

            var treemap_color = {"Proteomics": "#2CA02C", "Metabolomics": "#FF7F0E", "Genomics": "#c6f69c", "Transcriptomics":"#1f77b4"};


        }

        function change() {
            var value = this.value || 'Repos';
            var d;
            var searchWord_pre;
            if (value == 'Omics') {
                d = omics_data_num;
                searchWord_pre = '*:* AND omics_type:"';

                drawLineGraphy(d);
                showTip(searchWord_pre, omics_data_simple);
            }
            if (value == 'Repos') {
                d = data;
                searchWord_pre = '*:* AND repository:"';
                drawLineGraphy(d);
                showTip(searchWord_pre, repos_data_simple);
            }
        }

        var key = function (d) {
          return d.data.name;
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
        var most_access_div_height_px = d3.select('#most_accessed_datasets').style('height');
        var div_height = parseInt(most_access_div_height_px.substr(0, most_access_div_height_px.length - 2));
        var height_offset = 50;
            //var div_width = 420;
            var margin = {top: 20, right: 20, bottom: 20, left: 60},
                width = div_width - margin.left - margin.right,
                height = div_height*3.05 - margin.top - margin.bottom;
            var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var x1 = d3.scale.ordinal();

            var y = d3.scale.linear()
                .range([height - height_offset, 0]);

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
            data.forEach(function (d) {
                d.omics = omics_types.map(function (name) {
                    if (name !== "year") return {name: name, value: +d[name], year: d["year"]};
                });

                //calculate the log value
                for(var i = 0; i<d.omics.length; i++){
                    d.omics[i].value_before_log_calc = d.omics[i].value;
                    d.omics[i].value = Math.log(d.omics[i].value);
                }
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

            var tooltip = document.getElementById("annual_bar_chart_tooltip");
            if( tooltip == null) {
                tooltip = body.append("div")
                    .attr("class", "chart_tooltip")
                    .attr("id", "annual_bar_chart_tooltip")
                    .style("opacity", 0);
            }

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height - height_offset) + ")")
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
                .text("# Datasets(Log)");

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
                    return height - y(d.value) - height_offset;
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

                        document.getElementById('annual_bar_chart_tooltip').parentElement);
                        //tooltip.node().parentElement);
//                    console.log(parseInt(d3.select(this).attr("y")));
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html( d.value_before_log_calc + " datasets" )
                        .style("left", (mouse_coords[0])+  "px")
                        .style("top", (parseInt(d3.select(this).attr("y"))) + "px")
                        .style("height",  "20px")
                        .style("width", d.value_before_log_calc.toString().length * 5 + 65 + "px");

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
                    return "translate(" + (i * 0) + ",200)";
                })
                .on("click", function (d) {
                    var searchWord = "*:* AND omics_type:\"" + d + "\"";
                    angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
                });
            var legend_coords = {
            "genomics":{x:38, y:25},
            "proteomics":{x:38, y:45},
            "metabolomics":{x:(width)/2, y:25},
            "transcriptomics":{x:(width)/2, y:45},

            };
            legend.append("rect")
                .attr("x", function(d){return legend_coords[d]['x'];})
                .attr("y", function(d){return legend_coords[d]['y']})
                .attr("width", 14)
                .attr("height", 14)
                .style("fill", color);

            legend.append("text")
                .attr("x", function(d){return legend_coords[d]['x'] + 20 })
                .attr("y", function(d){return legend_coords[d]['y']})
                .attr("dy", ".85em")
                .style("text-anchor", "front")
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
