var web_service_url = 'http://wwwdev.ebi.ac.uk/Tools/ddi/ws/';
var drawHotwords = function () {

    queue()
       .defer(d3.json, web_service_url+'term/frequentlyTerm/list?size=40&domain=omics&field=description')
       .defer(d3.json, web_service_url+'term/frequentlyTerm/list?size=40&domain=omics&field=data_protocol')
       .defer(d3.json, web_service_url+'term/frequentlyTerm/list?size=40&domain=omics&field=sample_protocol')
       .await(draw_word_cloud);

    function draw_word_cloud(error,
                             omics_des,
                             omics_datap,
                             omics_samp) {
        if (error) {
            outputerrorinfo();
            return;
        }

       var terms = {
            "Omics_description": omics_des,
            "Omics_data_protocol": omics_datap,
            "Omics_sample_protocol": omics_samp
        };

        var fieldList = [
            "description",
            "sample_protocol",
            "data_protocol"
        ];

        var fill = d3.scale.category20b();

        var body = d3.select("#hotwords");

        var div_width_px = body.style("width");
        var div_width = div_width_px.substr(0, div_width_px.length - 2);
        //var divwidth = 420;

        body.selectAll("svg").remove();
        var svg = body.append("svg")
            .attr("width", div_width)
            .attr("height", 325)
            .attr("class", "wordcloud");

        body.selectAll("div").remove();
        var formdiv = body.append('div');
        formdiv
            .attr("class", "center")
            .attr("style", "width:280px")
        ;

        var radio_form = formdiv.append('form');

        radio_form
            .attr("id", "hotwords" + "_form")
            .attr("class", "center")
            .attr("style", "margin-bottom:8px")
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'dataset')
            .attr('value', 'description')
            .attr('id', 'description')
            .text('description');
        radio_form
            .append('label')
            .text('description')
            .attr('for', 'description')
            .append('span')
            .append('span')
        ;
        radio_form
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'dataset')
            .attr('value', 'sample_protocol')
            .attr('id', 'sample')
            .text('sample');
        radio_form
            .append('label')
            .text('sample')
            .attr('for', 'sample')
            .append('span')
            .append('span')
        ;
        radio_form
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'dataset')
            .attr('value', 'data_protocol')
            .attr('id', 'data')
            .text('data');
        radio_form
            .append('label')
            .text('data')
            .attr('for', 'data')
            .append('span')
            .append('span')
        ;

        d3.select("#hotwords_form").select('input[value=description]').property('checked', true);

        d3.select("#hotwords_form").selectAll('input')
            .on('change', change);

        var wordcloud_tooltip = document.getElementById("word_cloud_chart_tooltip");
        if( wordcloud_tooltip == null) {
             wordcloud_tooltip = body.append("div")
                .attr("class", "chart_tooltip")
                .attr("id", "word_cloud_chart_tooltip")
                .style("opacity", 0);
        }



        var field = "";
        change();

        function change() {

            field = this.value || "description";
            var hotwordss = terms["Omics" + "_" + field];
            var maxfrequent = getmax(hotwordss);
            svg.selectAll(".cloud").remove();
            d3.layout.cloud().size([div_width-10, 320])
                .words(hotwordss)
                .padding(1)
                .rotate(0)
                .font("Impact")
                .text(function (d) {
                    return d.label;
                }) // THE SOLUTION
                .fontSize(function (d) {
                    if(field=="PeptideAtlas")return d.frequent / maxfrequent * 20;
                    return d.frequent / maxfrequent * 50;
                })
                .on("end", draw)
                .start();
        }


        function draw(words) {
            var maxfrequent = getmax(words);
            svg.append("g")
                .attr("class", "cloud")
                .attr("transform", "translate(" + div_width/2.2 + ",180)")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function (d) {
                    if(field=="PeptideAtlas")return d.frequent / maxfrequent * 20 +"px";
                    return d.frequent / maxfrequent * 40 + "px";
                })
                .style("font-family", "Impact")
                .style("fill", function (d, i) {
                    return fill(i);
                })
                .attr("text-anchor", "middle")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function (d) {
                    return d.label;
                })
                .attr("class", "hotword")
                .on("click", function (d, i) {
                    // alert("you have clicked"+d.label);

                    wordcloud_tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);

                    //location.href = "#/search?q=" + "\""+ d.label + "\"";
                    // location.href = ("#/search?q=" + d.label);
                    var searchWord = "\"" + d.label + "\"";
                    console.log("clicked here");
                    angular.element(document.getElementById('queryCtrl')).scope().meta_search(searchWord);

                })

                .on("mousemove", function (d, i) {
                    var mouse_coords = d3.mouse(
                        wordcloud_tooltip.node().parentElement);

                    wordcloud_tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);

                    wordcloud_tooltip.html("<strong>" + d.frequent + "</strong> datasets"  )
                        .style("left",(mouse_coords[0]+25) + "px")
                        .style("top", (mouse_coords[1]-25) + "px")
                        .style("height", "20px")
                        .style("width", d.frequent.toString().length * 10 + 70 + "px");
                })
                .on("mouseout", function (d, i) {
                    wordcloud_tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                })
                ;
        }


        function getmax(arr) {
            if (arr == null) return null;
            var max = 0;
            for (var i = 0; i < arr.length; i++)
                if (arr[i].frequent > max) {
                    max = arr[i].frequent;
                }
            return max;
        }

        function outputerrorinfo() {
            d3.select("#hotwords").append("p").attr("class", "error-info")
                .html("Sorry, accessing to the word cloud web service was temporally failed.");
        }


    }
}
