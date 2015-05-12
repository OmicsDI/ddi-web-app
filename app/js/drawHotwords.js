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
  }

  var fill = d3.scale.category20();
 



  var body =  d3.select("#hotwords");
  
  var leftdiv = body.append("div")
                .style("float","left")
		.attr("Opacity",0.5)
	        .attr("width","1em");
  var rightdiv= body.append("div")
                .attr("position","absolute")
                .attr("bottom","0px")
                .style("right","0px")
	        .attr("width","320");

var svg = rightdiv.append("svg")
        .attr("width", 320)
        .attr("height", 325)
        .attr("class", "wordcloud");

var radioform_v = leftdiv.append('form');
var radioform_h = rightdiv.append('form');

  radioform_v
  .attr("id","radioform_v")
  .attr("class","center")
  .attr("style","margin-bottom:8px")
  .attr("style","width:50%")
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','PRIDE')
    .attr('id','PRIDE' )
    .text('PRIDE');
  radioform_v 
   .append('label')
     .text('PRIDE')
     .attr('for','PRIDE')
     .append('span')
     .append('span')
     ;

  radioform_v
  .append('input')
    .attr('class','block')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','MetaboLights')
    .attr('id','MetaboLights' )
    .text('MetaboLights');
  radioform_v
   .append('label')
     .text('MetaboL')
     .attr('for','MetaboLights')
     .append('span')
     .append('span')
     ;
/*
  radioform_h
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','PeptideAtlas')
    .attr('id','PeptideAtlas' )
    .text('PeptideAtlas');
  radioform_h
   .append('label')
     .text('PeptideAtlas')
     .attr('for','PeptideAtlas')
     .append('span')
     .append('span')
     ;


  radioform_h
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','MassIVE')
    .attr('id','MassIVE' )
    .text('MassIVE');
  radioform_h
   .append('label')
     .text('MassIVE')
     .attr('for','MassIVE')
     .append('span')
     .append('span')
     ;

  radioform_h
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','PeptideAtlas')
    .attr('id','PeptideAtlas' )
    .text('PeptideAtlas');
  radioform_h
   .append('label')
     .text('PeptideAtlas')
     .attr('for','PeptideAtlas')
     .append('span')
     .append('span')
     ;
*/
/*
  radioform_h
  .attr("id","radioform_h")
  .attr("class","center")
  .attr("style","width:70%")
  .append('input')
    .attr('type','radio')
    .attr('name','dataset2')
    .attr('value','description')
    .attr('id','description' )
    .text('description');
  radioform_h 
   .append('label')
     .text('description')
     .attr('for','description')
     .append('span')
     .append('span')
     ;
*/

  radioform_h
  .attr("id","radioform_h")
  .attr("class","center")
  .attr("style","margin-bottom:8px")
  .attr("style","width:100%")
  .append('input')
    .attr('type','radio')
    .attr('name','dataset2')
    .attr('value','data_protocol')
    .attr('id','data_protocol' )
    .text('data_protocol');
  radioform_h 
   .append('label')
     .text('data_protocol')
     .attr('for','data_protocol')
     .append('span')
     .append('span')
     ;

  radioform_h
  .append('input')
    .attr('type','radio')
    .attr('name','dataset2')
    .attr('value','sample_protocol')
    .attr('id','sample_protocol' )
    .text('sample_protocol');
  radioform_h 
   .append('label')
     .text('sample_protocol')
     .attr('for','sample_protocol')
     .append('span')
     .append('span')
     ;

  radioform_h
  .append('input')
    .attr('type','radio')
    .attr('name','dataset2')
    .attr('value','description')
    .attr('id','description2' )
    .text('description');
  radioform_h 
   .append('label')
     .text('description')
     .attr('for','description2')
     .append('span')
     .append('span')
     ;
  

  d3.select("#radioform_v").select('input[value=PRIDE]').property('checked',true);
  d3.select("#radioform_h").select('input[value=description]').property('checked',true);

  d3.select("#radioform_v").selectAll('input')
    .on('change',change);

  d3.select("#radioform_h").selectAll('input')
    .on('change',change);
var old_v = "PRIDE";
var old_h = "description";
change();

function change(){
  
  var value = this.value; 
  
  
  if(value === "PRIDE" || 
     value === "MetaboLights")
   old_v = value;  
   
  if(value === "description" || 
     value === "data_protocol" ||
     value === "sample_protocol")
   old_h = value;  

  var hotwordss = terms[old_v+"_"+old_h];
  var maxfrequent = getmax(hotwordss);
  svg.selectAll(".cloud").remove();
  d3.layout.cloud().size([325, 320])
      .words(hotwordss)
      .padding(1)
//      .rotate(function() { return ~~(Math.random() * 2) * 2; })
       .rotate(0)
      .font("Impact")
      .text(function(d) { return d.word; }) // THE SOLUTION
      .fontSize(function(d) { return d.frequent/maxfrequent * 50; })
      .on("end", draw)
      .start();
}


  function draw(words) {
  var maxfrequent = getmax(words);
      svg.append("g")
	.attr("class","cloud")
        .attr("transform", "translate(160,180)")
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
