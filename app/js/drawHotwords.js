var drawHotwords = function (){
	
  var hotwords_url="data/data.json";
  var hotwords; 
 hotwords = d3.json(hotwords_url, function(error,json) {
    if (error) return console.warn(error);
    //rendering logic here

  var fill = d3.scale.category20();
  
  d3.layout.cloud().size([410, 325])
      .words(json)
      .padding(1)
      .rotate(function() { return ~~(Math.random() * 2) * 5; })
      // .rotate(0)
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    // d3.select("#hotwords").append("svg")
    d3.select("#hotwords").append("svg")
        .attr("width", 470)
        .attr("height", 350)
        .attr("class", "wordcloud")
      .append("g")
        .attr("transform", "translate(200,180)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; })
        .on("click", function(d,i){
              alert("you have clicked"+d.text);
              window.open("browse.html#/search?q="+d.text);
        })
        ;
  }

});

}