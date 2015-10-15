/**
 * Created by mingze on 14/10/15.
 */
function drawChordDiagram()
{
    inputdata = {
        connections: [


            [{group: 0, value: 50},
                {group: 1, value: 50}],

            [{group: 0, value: 90},
                {group: 2, value: 90}],

            [{group: 0, value: 35},
                {group: 3, value: 35}],

            [{group: 3, value: 80},
                {group: 2, value: 80}],

            [{group: 3, value: 70},
                {group: 1, value: 70}],

        ],
        labels: {0: "0_nice", 1: "1_rich", 2: "2_smart", 3: "3_lucky"}
    };

    d3.select("#" +"chord_diagram").selectAll('input')
        .on('change', redraw);

    redraw();


    function redraw() {
        var chord_diagram = d3.select("#chord_diagram")
            .selectAll("svg")
            .remove();

        inputdata.labels[3] = "3_" + this.value;
        data = [inputdata];
        var width = 480, height = 450, padding = .09;

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