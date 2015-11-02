/**
 * Created by mingze on 14/10/15.
 */
function drawChordDiagram(acc, domain) {
    var urlString = window.location.hash;
    var urlWords = urlString.split("/");
    var acc = urlWords[3];
    acc = "PXD000002";
    var domain = urlWords[2];
    domain = "PRIDE Archive";
    queue()
        //.defer(d3.json, web_service_url + 'enrichment/getSimilarityInfo?accession=' + acc+ '&database=' + domain) // topojson polygons
        .defer(d3.json, 'http://localhost:9091/'+ 'enrichment/getSimilarityInfo?accession=' + acc+ '&database=' + domain) // topojson polygons
        .await(drawTheChord); // function that uses files

    function drawTheChord(error, similarityData){
        inputdata = {
            connections: [
            ],
            labels: {}
        };

        var indexOfLabels = 1;
        var labels = [];
        inputdata.labels[0] = acc + "@" + domain;
        labels[0] = acc + "@" + domain;

        for(var i =0; i<similarityData.scores.length; i++){
            var connection=[], bend1={}, bend2={};
            var score = similarityData.scores[i];
            var key1 = score.key1;
            var key2 = score.key2;
            var intScore = Math.ceil(score.value * 100);

            if(labels.indexOf(key1) < 0) {
                inputdata.labels[indexOfLabels] = key1;
                labels[indexOfLabels]=key1;
                indexOfLabels++;
            }
            if(labels.indexOf(key2) < 0) {
                inputdata.labels[indexOfLabels] = key2;
                labels[indexOfLabels]=key2;
                indexOfLabels++;
            }

            bend1["group"] = labels.indexOf(key1);
            bend1["value"] = intScore;
            bend2["group"] = labels.indexOf(key2);
            bend2["value"] = intScore;

            connection[0] = bend1;
            connection[1] = bend2;

            inputdata.connections.push(connection);
        }


        console.log(inputdata.labels);
        console.log(inputdata.connections);


        d3.select("#" + "chord_diagram").selectAll('input')
            .on('change', redraw);

        redraw();


        function redraw() {
            var chord_diagram = d3.select("#chord_diagram")
                .selectAll("svg")
                .remove();

            threshold =  100 * this.value;


            data = [inputdata];
            var width = 680, height = 650, padding = .09;

            chart = d3.chord2()
                .width(width)
                .height(height)
                .padding(padding);

            var chord_diagram = d3.select("#chord_diagram")
                .selectAll("svg")
                .data(data)
                .enter()
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(chart);
        }
    }
}