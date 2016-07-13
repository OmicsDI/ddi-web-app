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
            omicstype = deal_case_sensitive_ids(omicstype);

            omics = omicstype.sort(function (a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });
            repos = repos.sort(function (a, b) {
                return parseInt(a.value) - parseInt(b.value);
            });


            /*
             * prepare the treemap data
             */
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


            function drawBarGraphy (data_now, data_add_key) {

              body.attr("position", "relative");

              d3.select("#" + piechartname + "_svg").remove();



              var svg_height = parseInt(body.style("height")) - 40;
              var rect_height = (parseInt(svg_height - 20*2 - 8*2))/3;     //(body - gap * 2 - paddingTopAndBotton)/3
              var rect_width = (width - 70) * 0.06514;
              var margin_value_before = (width - 70 - rect_width * data_now.length) / data_now.length + rect_width;
              var margin_value = margin_value_before > 65 ? 65 : margin_value_before;
              var lower = d3.scale.linear().domain([0,1000]).range([rect_height*3 + 28,rect_height*2 + 28]).clamp(true),
                  upper = d3.scale.linear().domain([1001,5000]).range([rect_height*2 + 18,rect_height + 18]).clamp(true),
                  most  = d3.scale.linear().domain([5001, 80000]).range([rect_height + 8, 8]).clamp(true),
                  color = d3.scale.category10();

              var svg = body.append("svg").attr("width", width).attr("height",  svg_height).attr('margin-top', 10).attr("id", piechartname + "_svg");


              if (svg.selectAll("rect")) {
                svg.selectAll("rect").remove();
              }

              if (svg.selectAll("g")) {
                svg.selectAll("g").remove();
              }

              if (svg.selectAll("text")) {
                svg.selectAll("text").remove();
              }

              svg.selectAll("text")
                 .data(data_add_key).enter()
                 .append("text")
                 .attr("class", "xAxisText")
                 .attr("x", function(d,i){ return 70 + i * margin_value;})
                 .attr("y", svg_height - 17)
                 .attr("text-anchor", "front")
                 .attr("font-family", "sans-serif")
                 .attr("font-size", "0.8em")
                 .attr("font-weight", "300")
                 .text(function(d) { return d.name.toString().length > 4 ? d.name.substr(0, 4) + ".." : d.name;})
                 .attr("transform", function(d, i) {
                   return "rotate(-45 " + (75 + i * margin_value) + " " + (svg_height + 10) + ")translate(0,10)";
                 });

              svg.selectAll("rect.lower")
                 .data(data_now).enter()
                 .append("rect")
                 .attr("class", "lower")
                 .attr("x", function(d, i) { return 70 + i * margin_value; })
                 .attr("width", rect_width)
                 .attr("y", function(d) { return lower(d); })
                 .attr("height", function(d) { return rect_height * 3 + 28 - lower(d); })
                 .style("fill", color);

              svg.selectAll("rect.upper")
                 .data(data_now)
                 .enter()
                 .append("rect")
                 .attr("class", "upper")
                 .attr("x", function(d, i) { return 70 + i * margin_value; })
                 .attr("width", rect_width)
                 .attr("y", function(d) { return upper(d); })
                 .attr("height", function(d) { return d >= 1500 ? rect_height * 2 + 18 - upper(d) : 0; })
                 .style("fill", color);

              svg.selectAll("rect.most")
                 .data(data_now).enter()
                 .append("rect")
                 .attr("class", "most")
                 .attr("x", function(d, i) {return 70 + i * margin_value;})
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
                d3.select("#" + piechartname + "_tooltip").remove();
                var tool_tip = body.append("div")
                    .attr("id", piechartname + "_tooltip")
                    .attr("class", "chart_tooltip")
                    .style('opacity', 0)
                    .attr("position", "absolute");
                body.selectAll("rect")
                  .on("mouseover", function(d, i) {
                      i = i % data_add_key.length;
                      var mouse_coords = d3.mouse(document.getElementById(piechartname + "_tooltip").parentElement)
                      d3.select(this).attr('cursor', 'pointer');

                      tool_tip.transition()
                              .duration(200)
                              .style("opacity", .9);

                      tool_tip.html(data_add_key[i].name.toString() + ": <br>" + data_add_key[i].size.toString() + " datasets"  )
                              .style("left", (mouse_coords[0]) + "px")
                              .style("top",  (parseInt(d3.select(this).attr("y") - 30)) + "px")
                              .style("height", "2.5em")
                              .style("width", (getLength(data_add_key[i].name,data_add_key[i].size) * 7.5) + "px")
                              .style("padding", "3px")
                              .style("font-size", "monospace");
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

            function getLength(name, value) {
              var nameLength = name.toString().length;
              var valueLength = (value.toString() + " " + "datasets").length;
              return nameLength > valueLength ? nameLength : valueLength;
            }

            drawBarGraphy(data, repos_data_simple);
            showTip('*:* AND repository:"', repos_data_simple);


//add form container
            d3.select('#' + piechartname + '_formdiv').remove();

            var formdiv = body.append('div');
                formdiv
                    .attr("id", "#" + piechartname + "_formdiv")
                    .attr("class", "center")
                    .attr("style", "width: 150px; position: absolute; bottom: 15px; left:" + (div_width/2-40) + "px");


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

                drawBarGraphy(d, omics_data_simple);
                showTip(searchWord_pre, omics_data_simple);
            }
            if (value == 'Repos') {
                d = data;
                searchWord_pre = '*:* AND repository:"';
                drawBarGraphy(d, repos_data_simple);
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

        function deal_case_sensitive_ids(omicstype){
           var new_omicstype = [];
           if(omicstype==null || omicstype.length<1) return; 
           omicstype.forEach(
               function(d){
                    var index = findInNewArray(d.id.toLowerCase());
                    if(index < 0) {
                        d.id = d.id.toLowerCase();
                        new_omicstype.push(d);
                    }
                    else{
                        new_omicstype[index].value = parseInt(new_omicstype[index].value) + parseInt(d.value);
                    }
                    
                    function findInNewArray(tempid){
                        var index = -1;
                        for(var i=0; i<new_omicstype.length; i++){
                            if(new_omicstype[i].id == tempid){
                                index = i;
                                return index;
                            }
                        }
                        return index;
                    }
                   
                   }
           );
            
            return new_omicstype;
        }
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
        var latest_datasets_div_height_px = d3.select('#latestdatasetspanel').style('height');
        var div_height = parseInt(latest_datasets_div_height_px.substr(0, latest_datasets_div_height_px.length - 2));
        div_height = 288;

            //prepare graph data
        var body = d3.select('#barchart_omicstype_annual');
        var div_width = parseInt(body.style("width"));
        // var div_height= parseInt(d3.select('#latestdatasetspanel').style('height'));
        var height_offset = 50;
            //var div_width = 420;
            var margin = {top: 20, right: 20, bottom: 20, left: 60},
                width = div_width - margin.left - margin.right,
                height = div_height - margin.top - margin.bottom;

	     body.attr("position", "relative");

            var tool_tip = null;
            if (!tool_tip) {
              tool_tip = body.append("div")
                             .attr("id", "bar_chart_tooltip")
                             .attr("class", "chart_tooltip")
                             .style("opacity", 0)
                             .attr("position", "absolute");
            }

            d3.select("#barchart_omicstype_annual").selectAll("svg").remove();
            var svg = d3.select("#barchart_omicstype_annual").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            //prepare data
            var omics_types = d3.keys(annual_data[0]).filter(function (key) {
                return key !== "year";
            });


            data = annual_data;
            var genomics_list = [],
                metabolo_list = [],
                proteomi_list = [],
                transcri_list = [],
            		allYearData   = [];

            data.forEach(function (d) {
                d.omics = omics_types.map(function (name) {
                    if (name !== "year") return {name: name, value: +d[name], year: d["year"]};
                });

                //calculate the log value
                for(var i = 0; i<d.omics.length; i++){
                    var currOmic = d.omics[i];

                    switch (currOmic.name) {
                      case "genomics":
                          genomics_list.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                          })
                        break;
                      case "transcriptomics":
                          transcri_list.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                          })
                        break;
                      case "metabolomics":
                          metabolo_list.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                          })
                        break;
                      case "proteomics":
                          proteomi_list.push({
                            year: +currOmic.year,
                            value: +currOmic.value
                          })
                        break;
                      default: break;
                  }
                }
            });

           function prepareAllDate(priData, nameString) {
              for(var i = 0;i < priData.length;i++) {
                allYearData.push({
                  name: nameString,
                  year: priData[i].year,
                  value: priData[i].value
                })
              }
            }

            prepareAllDate(genomics_list, "Genomics");
            prepareAllDate(transcri_list, "Transcriptomics");
            prepareAllDate(metabolo_list, "Metabolomics");
            prepareAllDate(proteomi_list, "Proteomics");

            //year show bug fixed here,adjust time linear to scale linear
            // var x0 = d3.scale.linear().range([0, width - 30]);
            var parseDate = d3.time.format("%Y").parse;

            var x0 = d3.time.scale().range([0, width - 30]);

            var y0 = d3.scale.linear().range([height - height_offset, 0]);
            var y1 = d3.scale.linear().range([height - height_offset, 0]);

            var xAxis = d3.svg.axis().scale(x0)
                .orient("bottom").ticks(4).tickFormat(d3.time.format("%Y"));

            var yAxisLeft = d3.svg.axis().scale(y0)
                .orient("left").ticks(9);

            var yAxisRight = d3.svg.axis().scale(y1)
                .orient("right").ticks(9);

            var yLine = d3.scale.linear().range([15, 0]);
            var yNavLine = d3.svg.axis().scale(yLine)
                .orient("bottom").ticks(0);

            var minDate = new Date(d3.min(data, function(d){ return d.year}), 0, 0);
            var maxDate = new Date(d3.max(data, function(d){ return d.year}), 0, 1);

            x0.domain([minDate, maxDate]);

            y0.domain([0, d3.max(data, function (d) {
                return d3.max(d.omics, function (d) {
                    if (d.name === "genomics" || d.name === "transcriptomics") {
                      return d.value;
                    }
                });
            })]);

            y1.domain([0, d3.max(data, function (d) {
                return d3.max(d.omics, function (d) {
                  if (d.name === "metabolomics" || d.name === "proteomics") {
                    return d.value;
                  }
                });
            })]);

            var valueline = d3.svg.line()
                .x(function(d) { return x0(new Date(d.year, 0, 0)); })
                .y(function(d) { return y0(d.value); });

            var valueline2 = d3.svg.line()
                .x(function(d) { return x0(new Date(d.year, 0, 0)); })
                .y(function(d) { return y1(d.value); });


            //draw
            svg.append("path")        // Add the valueline path.
                .style("stroke", "steelblue")
        		    .attr("d", valueline(genomics_list));

            svg.append("path")
                .style("stroke", "steelblue")
                .style("stroke-dasharray", ("3, 3"))
        		    .attr("d", valueline(transcri_list));

            svg.append("path")        // Add the valueline2 path.
                .attr("class", "line")
        		    .style("stroke", "red")
        		    .attr("d", valueline2(metabolo_list));

            svg.append("path")
                .attr("class", "line")
        		    .style("stroke", "red")
                .style("stroke-dasharray", ("3, 3"))
        		    .attr("d", valueline2(proteomi_list));

            svg.selectAll("path")
               .style('stroke-width', '2')
               .style('fill', 'none');

      	    svg.selectAll("circle")
               .data(allYearData)
               .enter()
               .append("circle")
               .attr("cx", function(d, i) {
                 return x0(new Date(d.year, 0, 0));
               })
               .attr("cy", function(d) {
                 if (d.name == "Genomics" || d.name == "Transcriptomics") {
                   return y0(d.value);
                 }else if(d.name == "Metabolomics" || d.name == "Proteomics"){
                    return y1(d.value);
                 }
               })
               .attr("fill", function(d) {
                 if (d.name == "Genomics" || d.name == "Transcriptomics") {
                   return "steelblue";
                 }else if(d.name == "Metabolomics" || d.name == "Proteomics"){
                    return "red";
                 }
               });


            svg.selectAll("circle")
              .attr("r", 4)
              .style("cursor", "pointer")
              .on("mouseover", function(d,i){
                   var mouse_coords = d3.mouse(document.getElementById("bar_chart_tooltip").parentElement);
                   tool_tip.transition()
                           .duration(200)
                           .style("opacity", .9);

                   tool_tip.html(d.name.toString() + ": <br>" + d.value.toString() + " datasets")
                           .style("left", ((mouse_coords[0] + 5) + "px"))
                           .style("top", (parseInt(d3.select(this).attr("cy") - 13) + "px"))
                           .style("height", "2.5em")
                           .style("width", ((d.year.toString().length + 9) * 8 + "px"))
                           .style("padding", "5px");
              })
              .on("mouseout", function(){
                   tool_tip.transition()
                          .duration(500)
                          .style("opacity", 0);
              })
              .on("click", function(d) {
                  tool_tip.transition()
                         .duration(500)
                         .style("opacity", 0);

                 var searchWord = "*:* AND omics_type:\"" + getName(d.year, d.value) + "\" AND publication_date:\"" + d.year + "\"";
                 angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);
              });

            svg.append("g")            // Add the X Axis
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height - height_offset) + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .style("fill", "steelblue")
                .call(yAxisLeft);

            svg.append("g")
                .attr("class", "y axis")
                .style("fill", "red")
                .attr("transform", "translate(" + (width - 30) + " ,0)")
                .call(yAxisRight);

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
                "genomics":{x:30, y:25, color: "steelblue"},
                "transcriptomics":{x:30, y:45 ,color: "steelblue"},
                "metabolomics":{x:(width + 10)/2, y:25, color: "red"},
                "proteomics":{x:(width + 10)/2, y:45, color: "red"},
            };

            legend.append("path")
                  .attr("class", "omics-line")
                  .style("stroke-width", "2")
                  .attr("d", function(d) {
                    return "M " + legend_coords[d]["x"] + " " + (legend_coords[d]["y"] + 8) +
                           " L " + (legend_coords[d]["x"] + 14) + " " + (legend_coords[d]["y"] + 8);
                  })
                  .style("stroke", function(d) {
                    return legend_coords[d]["color"];
                  })
                  .style("stroke-dasharray", function(d) {
                    if (d === "transcriptomics" || d === "proteomics") {
                      return ("3, 3");
                    }else {
                      return ("0, 0");
                    }
                  });

            legend.append("text")
                .attr("x", function(d){return legend_coords[d]['x'] + 20 })
                .attr("y", function(d){return legend_coords[d]['y']})
                .attr("dy", ".85em")
                .style("text-anchor", "front")
                .text(function (d) {
                    return (d.substr(0,1).toUpperCase() + d.substr(1,d.length - 1));
                });
      	    function getName(year, value) {
                for(var i = 0;i < data.length;i++) {
                   for(var j = 0;j < data[i].omics.length;j++) {
                      if(data[i].omics[j].year == year && data[i].omics[j].value == value) {
                        return data[i].omics[j].name;
                      }
                   }
                }
            }

        }
    }
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
