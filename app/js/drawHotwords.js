var drawHotwords = function (){
	
queue()
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=pride&field=description') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=peptideatlas&field=description') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=massive&field=description') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=metabolights&field=description') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=ega&field=description') // geojson points

    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=pride&field=data_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=peptideatlas&field=data_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=massive&field=data_protocol') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=metabolights&field=data_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=ega&field=data_protocol') // geojson points

    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=pride&field=sample_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=peptideatlas&field=sample_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=massive&field=sample_protocol') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=metabolights&field=sample_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=20&domain=ega&field=sample_protocol') // geojson points
    .await(draw_word_cloud); // function that uses files

function draw_word_cloud(error,pride_des,metabol_des,pride_datap,metabol_datap,pride_samp,metabol_samp){
    if (error) return console.warn(error);
    //rendering logic here


  var terms={
  "PRIDE_description":pride_des,
  "PRIDE_data_protocol":pride_datap,
  "PRIDE_sample_protocol":pride_samp,
  "MetaboLights_description":metabol_des,
  "MetaboLights_data_protocol":metabol_datap,
  "MetaboLights_sample_protocol":metabol_samp
  };

  var fill = d3.scale.category20();
 
  var repoList = [
     "PRIDE",
     "MetaboLights"
  ];

  var fieldList = [
     "description",
     "sample_protocol",
     "data_protocol"
  ];


var body =  d3.select("#hotwords");
  

var svg = body.append("svg")
        .attr("width", 420)
        .attr("height", 325)
        .attr("class", "wordcloud");

var select_form = body.append("form")
        .attr("style","width:87%")
        .attr("class","center");
select_form.append("span").text("Repo: ").selectAll("span").attr("font-weight","bold");
var select_repo = select_form.append("select");
select_form.append("span").text("  Field: ");
var select_field = select_form.append("select");

select_repo.selectAll("option").data(d3.values(repoList)).enter().append("option").text(function(d) {
    return d;
});

select_field.selectAll("option").data(d3.values(fieldList)).enter().append("option").text(function(d) {
    return d;
});


select_repo.on('change',change);
select_field.on('change',change);

var old_r = "PRIDE";
var old_s = "description";
change();

function change(){
  
  var value = this.value; 
  
  if(value === "PRIDE" || 
     value === "MetaboLights")
   old_r = value;  
   
  if(value === "description" || 
     value === "data_protocol" ||
     value === "sample_protocol")
   old_s = value;  

  var hotwordss = terms[old_r+"_"+old_s];
  var maxfrequent = getmax(hotwordss);
  svg.selectAll(".cloud").remove();
  d3.layout.cloud().size([425, 320])
      .words(hotwordss)
      .padding(1)
//      .rotate(function() { return ~~(Math.random() * 2) * 2; })
       .rotate(0)
      .font("Impact")
      .text(function(d) { return d.label; }) // THE SOLUTION
      .fontSize(function(d) { return d.frequent/maxfrequent * 50; })
      .on("end", draw)
      .start();
}


  function draw(words) {
  var maxfrequent = getmax(words);
      svg.append("g")
	.attr("class","cloud")
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


 function getmax(arr){
    if(arr==null) return null;
    var max=0;
    for(var i=0; i<arr.length; i++)
      if(arr[i].frequent>max) {max=arr[i].frequent;}
    return max;
  }

}
}
