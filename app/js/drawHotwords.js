var drawHotwords = function (){
	
  var hotwords_url="http://localhost:9091/dataset/terms?size=40";
  // var hotwords_url="data/data.json";
  var hotwords; 
 hotwords = d3.json(hotwords_url, function(error,json) {
    if (error) return console.warn(error);
    //rendering logic here

  var fill = d3.scale.category20();
 
  function getmax(arr){
    var max=0;
    for(var i=0; i<arr.length; i++)
      if(arr[i].frequent>max) {max=arr[i].frequent;}
    return max;
  }

  var maxfrequent = getmax(json);

  d3.layout.cloud().size([410, 325])
      .words(json)
      .padding(1)
      .rotate(function() { return ~~(Math.random() * 2) * 5; })
      // .rotate(0)
      .font("Impact")
      .fontSize(function(d) { return d.frequent/maxfrequent * 40; })
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
        .style("font-size", function(d) { return d.frequent/maxfrequent * 40+ "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.label; })
        .attr("class","hotword")
        .on("click", function(d,i){
              // alert("you have clicked"+d.label);
              location.href = "browse.html#/search?q="+d.label;
              // window.open("browse.html#/search?q="+d.label);
        })
        ;
  }

});

}