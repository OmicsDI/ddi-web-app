/**
 * Created by mingze on 14/10/15.
 */
function drawChordDiagram(acc, domain) {
    var urlString = window.location.hash;
    var urlWords = urlString.split("/");
    var acc = urlWords[3];
    var domain = urlWords[2];
    queue()
        //.defer(d3.json, web_service_url + 'enrichment/getSimilarityInfo?accession=' + acc+ '&database=' + domain) // topojson polygons
        .defer(d3.json, 'http://localhost:9091/' + 'enrichment/getSimilarityInfo?accession=' + acc + '&database=' + domain) // topojson polygons
        .await(drawTheChord); // function that uses files

    function drawTheChord(error, similarityData) {

        inputdata = {
            connections: [],
            labels: {}
        };

        d3.select("#" + "chord_diagram").selectAll('input')
            .on('change', redraw);

        d3.select("#" + "chord_diagram").selectAll('button')
            .on('click', redraw);

        redraw();


        function redraw() {
            var chord_diagram = d3.select("#chord_diagram")
                .selectAll("svg")
                .remove();

            var chord_diagram = d3.select("#chord_diagram")
                .selectAll("div")
                .remove();

            //if(this.id == "slider1"){
            //    threshold = this.value || "0.01";
            //}

            var scope_threshold = angular.element(document.getElementById("datasetCtrl")).scope().threshold;

            prepare_inputdata(scope_threshold);

            data = [inputdata];
            var width = 650, height = 650, padding = .09;

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

        /**
         * To prepare the data for the new Chord Diagram, following the change of threshold
         * @param threshold
         */
        function prepare_inputdata(threshold) {

            inputdata = {
                connections: [],
                labels: {}
            };

            var indexOfLabels = 0;
            var labels = [];

            var main_key = acc + "@" + domain;
            //labels[indexOfLabels] = acc + "@" + domain;
            //indexOfLabels++;

            for (var i = 0; i < similarityData.scores.length; i++) {
                var connection = [], bend1 = {}, bend2 = {};
                var score = similarityData.scores[i];
                var key1 = score.key1;
                var key2 = score.key2;
                var intScore = Math.round(score.value * 100);

                //remove the connections which are less than threshold
                if (score.value < threshold) {
                    if (key1 == main_key || key2 == main_key) { //this is always true

                        if (labels.indexOf(key1) < 0) {
                            inputdata.labels[indexOfLabels] = key1;
                            labels[indexOfLabels] = key1;
                            indexOfLabels++;
                        }
                        if (labels.indexOf(key2) < 0) {
                            inputdata.labels[indexOfLabels] = key2;
                            labels[indexOfLabels] = key2;
                            indexOfLabels++;
                        }

                        bend1["group"] = labels.indexOf(key1);
                        bend1["value"] = 0;
                        bend2["group"] = labels.indexOf(key2);
                        bend2["value"] = 0;

                        connection[0] = bend1;
                        connection[1] = bend2;

                        inputdata.connections.push(connection);

                    }

                    continue;
                }

                if (labels.indexOf(key1) < 0) {
                    inputdata.labels[indexOfLabels] = key1;
                    labels[indexOfLabels] = key1;
                    indexOfLabels++;
                }
                if (labels.indexOf(key2) < 0) {
                    inputdata.labels[indexOfLabels] = key2;
                    labels[indexOfLabels] = key2;
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

        }
    }
}