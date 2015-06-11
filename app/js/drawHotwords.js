var drawHotwords = function (){

queue()
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=pride&field=description') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=peptide_atlas&field=description') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=massive&field=description') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=metabolights&field=description') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=metabolome_workbench&field=description') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=ega&field=description') // geojson points

    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=pride&field=data_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=peptide_atlas&field=data_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=massive&field=data_protocol') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=metabolights&field=data_protocol') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=metabolome_workbench&field=data_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=ega&field=data_protocol') // geojson points

    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=pride&field=sample_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=peptide_atlas&field=sample_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=massive&field=sample_protocol') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=metabolights&field=sample_protocol') // geojson points
    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=metabolights&field=sample_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=metabolome_workbench&field=sample_protocol') // geojson points
//    .defer(d3.json, 'http://localhost:9091/dataset/terms?size=40&domain=ega&field=sample_protocol') // geojson points
    .await(draw_word_cloud); // function that uses files

function draw_word_cloud(error,
        pride_des,pepatlas_des,massive_des,metabol_des,metabow_des,
        pride_datap,metabol_datap,metabow_datap,
        pride_samp,metabol_samp,metabow_samp
        ){
    if (error) {
        outputerrorinfo();
        return;
    }
    //rendering logic here

  //some content is blank actually
   metabow_samp = [
            {"label":"<Null>","frequent":"1"}
   ];
   pepatlas_samp = [
            {"label":"<Null>","frequent":"1"}
   ];
   pepatlas_datap = [
            {"label":"<Null>","frequent":"1"}
   ];
   massive_samp = [
            {"label":"<Null>","frequent":"1"}
   ];
   massive_datap = [
            {"label":"<Null>","frequent":"1"}
   ];

  var terms={
  "PRIDE_description":pride_des,
  "PRIDE_data_protocol":pride_datap,
  "PRIDE_sample_protocol":pride_samp,
  "PeptideAtlas_description":pepatlas_des,
  "PeptideAtlas_data_protocol":pepatlas_datap,
  "PeptideAtlas_sample_protocol":pepatlas_samp,
  "MassIVE_description":massive_des,
  "MassIVE_data_protocol":massive_datap,
  "MassIVE_sample_protocol":massive_samp,
  "MetaboLights_description":metabol_des,
  "MetaboLights_data_protocol":metabol_datap,
  "MetaboLights_sample_protocol":metabol_samp,
  "Metabolomics_Workbench_description":metabow_des,
  "Metabolomics_Workbench_data_protocol":metabow_datap,
  "Metabolomics_Workbench_sample_protocol":metabow_samp
  };

  var fill = d3.scale.category20();
 
  var repoList = [
     "PRIDE",
     "PeptideAtlas",
     "MassIVE",
     "MetaboLights",
     "Metabolomics_Workbench"
  ];

  var fieldList = [
     "description",
     "sample_protocol",
     "data_protocol"
  ];


var body =  d3.select("#hotwords");

var divwidth= body.style("width");  

var svg = body.append("svg")
        .attr("width", divwidth)
        .attr("height", 325)
        .attr("class", "wordcloud");

var select_form = body.append("form")
//        .attr("style","width:87%")
        .attr("style","margin-bottom:8px")
        .attr("class","center");
select_form.append("span").text("Repo: ").attr("font-weight","bold");
var select_repo = select_form.append("select");
var divfield = select_form.append("div").attr("style","display:block");
divfield.append("span").text("  Field: ");
var select_field = divfield.append("select");

select_repo.selectAll("option").data(d3.values(repoList)).enter()
    .append("option").text(function(d) {
    return d;})
    .attr("id",function(d){return d;})
    ;

select_field.selectAll("option").data(d3.values(fieldList)).enter()
    .append("option").text(function(d) {
    return d;})
    .attr("id",function(d){return d;})
    ;


select_repo.on('change',change);
select_field.on('change',change);

var old_r = "PRIDE";
var old_s = "description";
change();

function change(){
  
  var value = this.value; 
  
  if(value === "PRIDE" || 
     value === "PeptideAtlas" ||
     value === "MassIVE" ||
     value === "MetaboLights" ||
     value === "Metabolomics_Workbench")
   old_r = value;  
   
  if(value === "description" || 
     value === "data_protocol" ||
     value === "sample_protocol")
   old_s = value;  




   if(
     value === "PeptideAtlas" ||
     value === "MassIVE") 
     {
        select_field.select("#data_protocol").attr("disabled","disabled");
        select_field.select("#sample_protocol").attr("disabled","disabled");
     }
    if(
     value === "Metabolomics_Workbench"
     )
     {
        select_field.select("#data_protocol").attr("disabled",null);
        select_field.select("#sample_protocol").attr("disabled","disabled");
     }
     
    if(
     value === "PRIDE" ||
     value === "MetaboLights" 
     )
     {
        select_field.select("#data_protocol").attr("disabled",null);
        select_field.select("#sample_protocol").attr("disabled",null);
     }




  if(
     value === "data_protocol" 
     )
  {
      select_repo.select("#PeptideAtlas").attr("disabled","disabled");
      select_repo.select("#MassIVE").attr("disabled","disabled");
  }


  if(
     value === "sample_protocol" 
     )
  {
      select_repo.select("#PeptideAtlas").attr("disabled","disabled");
      select_repo.select("#MassIVE").attr("disabled","disabled");
      select_repo.select("#Metabolomics_Workbench").attr("disabled","disabled");
  }


  if(
     value === "description" 
     )
  {
      select_repo.select("#PeptideAtlas").attr("disabled",null);
      select_repo.select("#MassIVE").attr("disabled",null);
      select_repo.select("#Metabolomics_Workbench").attr("disabled",null);
  }

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

function outputerrorinfo(){
    d3.select("#hotwords").append("p").attr("class","error-info")
        .html("Sorry, accessing to the word cloud web service was temporally failed.");
}


}
}
