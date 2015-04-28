var pieCharts_Tissues_Organisms = function()
{
// var piechats_url="data/testjson.json";



queue()
    .defer(d3.json, 'http://localhost:9091/stats/tissues') // topojson polygons
    .defer(d3.json, 'http://localhost:9091/stats/organisms') // geojson points
    .await(draw_chart_tissues_organsims); // function that uses files

function draw_chart_tissues_organsims(error, tissues, organisms) {

//prepare the dataset of total

// indexoftottiss = findElement(tissues, "name", "Total");
// var totaltissues = tissues[indexoftottiss]; 

// indexoftotorg = findElement(organisms, "name", "Total");
// var totalorganisms= organisms[indexoftotorg]; 

// console.log(indexoftottiss + totaltissues);
// console.log(indexoftotorg + totalorganisms);

tissues.shift();
organisms.shift();
 var unavailableNoTissues = tissues.pop();
 var unavailableNoOrganisms = organisms.pop(); 

 var totaltissues = gettotal(tissues);
 var totalorganisms = gettotal(organisms);

 // console.log(totaltissues);
 // console.log(totalorganisms);
 console.log(unavailableNoTissues);



function findElement(arr, propName, propValue) {
  for (var i=0; i < arr.length; i++)
    if (arr[i][propName] == propValue)
      return i;

  // will return undefined if not found; you could return a default instead
}


function gettotal(arr) {
	var sum = 0;
  for (var i=0; i < arr.length; i++)
  	   sum += parseInt(arr[i].value);
      return sum;
}

var diameter = 320,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubchartname = 'chart_tissues_organisms';

var body = d3.select("#"+bubchartname);

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter*1.3, diameter])
    .padding(1.5);

var svg = body.append("svg")
    .attr("width", diameter*1.3)
    .attr("height", diameter)
    .attr("class", "bubble");
   
var radioform = body.append('form');

  radioform
  .attr("id",bubchartname+"_form")
  .attr("class","center")
  .attr("style","margin-bottom:8px")
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','Tissues')
    .attr('id','Tissues' )
    .text('Tissues');
  radioform 
   .append('label')
     .text('Tissues')
     .attr('for','Tissues')
     .append('span')
     .append('span')
     ;

  radioform
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','Organisms')
    .attr('id','Organisms' )
    .text('Organisms');
  radioform 
   .append('label')
     .text('Organisms')
     .attr('for','Organisms')
     .append('span')
     .append('span')
     ;

  d3.select("#"+bubchartname+"_form").select('input[value=Tissues]').property('checked',true);

  d3.select("#"+bubchartname+"_form").selectAll('input')
    .on('change',change);


d3.select(self.frameElement).style("height", diameter + "px");




change();


function change() {


    var value = this.value || 'Tissues';
    var data = [] ; 
    if(value == 'Tissues') { 
    	 data = tissues;
    	// text_total.text("Total:"+totaltissues);
    	// text_unavail.text("Unavailable:"+unavailableNoTissues.value);
    }
    if(value == 'Organisms') {
    	data = organisms;
    	// text_total.text("Total:"+totalorganisms);
    	// text_unavail.text("Unavailable:"+unavailableNoOrganisms.value);
    }

  svg.selectAll(".node").remove();


  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(data))
      .filter(function(d) { return !d.children; }));

  node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", function(d,i){
               // alert("you have clicked"+d.data.name);
               // window.open("browse.html#/search?q="+d.name);
              location.href = "browse.html#/search?q="+d.name;
               });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { console.log(d.r+":"+d.className.length); return d.r/d.className.length<3 ? '': d.className; });
  
  node.on("mouseover", function(d){return tooltip.style("visibility", "visible");})
  //     .on("mousemove", function(d){return tooltip.style("top",(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
  //     .on("mouseout", function (d){return tooltip.style("visibility", "hidden");})

// Returns a flattened hierarchy containing all leaf nodes under the root.


};
function classes(arr) {
  var classes = [];

    for(var i = 0; i < arr.length; i++)
    classes.push({packageName: arr[i].name, className: arr[i].name, value: arr[i].value});

  return {children: classes};
}

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

var pieCharts_Repos_Omics= function()
{

queue()
    .defer(d3.json, 'http://localhost:9091/stats/domains') // topojson polygons
    .defer(d3.json, 'http://localhost:9091/stats/omicsType') // geojson points
    .await(draw_chart_Repos_Omics); // function that uses files

function draw_chart_Repos_Omics(error, domains, omicstype) {


var subdomains= domains[0]['subdomains'];
var repos = transformsubdomains(subdomains);
omicstype.shift();
var unavailableomics = omicstype.pop();

var totalomics = gettotal(omicstype);
var totalrepos = gettotal(repos);



// function findElement(arr, propName, propValue) {
//   for (var i=0; i < arr.length; i++)
//     if (arr[i][propName] == propValue)
//       return i;

//   // will return undefined if not found; you could return a default instead
// }


function gettotal(arr) {
	var sum = 0;
  for (var i=0; i < arr.length; i++)
  	   sum += parseInt(arr[i].value);
      return sum;
}



function transformsubdomains(arr){
     
    var newarry = [];
    for(var i=0; i<arr.length; i++)
    {
    	newarry.push({"name":arr[i]["domain"]["name"],
    	"value":arr[i]["domain"]["value"]});
    }
    return newarry;
}

var width = 480,
    height = 325,
	radius = Math.min(width, height) / 2;
 
var piechartname = 'chart_repos_omics';

var body = d3.select("#"+piechartname);

var svg = d3.select("#"+piechartname)
	.append("svg")
    .attr("style","height:"+height)
    .attr("style","width:"+width-10)
	.attr("class", "piesvg")
	.append("g");

svg.append("g")
	.attr("class", "slices");
// svg.append("g")
// 	.attr("class", "labels");
// svg.append("g")
// 	.attr("class", "lines");
svg.append("circle")
    .attr("id","insidecycle")
    .attr("style","stroke:none");

// body.append('form')
//   .attr("id",piechartname+"_form")
//   .attr("class","center")
//   .attr("style","margin-bottom:8px")
//   .selectAll('label')
//   .data(label_data).enter()
//   .append('label')
//     .text(function (d) { return d;})
//   .append('input')
//     .attr('type','radio')
//     .attr('name','dataset')
//     .attr('value',function (d) { return d; })
//     .text(function (d) { return d; })
 var radioform = body.append('form');
  radioform
  .attr("id",piechartname+"_form")
  .attr("class","center")
  .attr("style","margin-bottom:8px; width:40%")
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','Repos')
    .attr('id','Repos' )
    .text('Repos');
  radioform 
   .append('label')
     .text('Repos')
     .attr('for','Repos')
     .append('span')
     .append('span')
     ;

  radioform
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value','Omics')
    .attr('id','Omics' )
    .text('Omics');
  radioform 
   .append('label')
     .text('Omics')
     .attr('for','Omics')
     .append('span')
     .append('span')
     ; 
  
  d3.select("#"+piechartname+"_form").select('input[value=Repos]').property('checked',true)

  d3.select("#"+piechartname+"_form").selectAll('input')
    .on('change',change);


var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.95)
	.innerRadius(radius * 0.5);

// var outerArc = d3.svg.arc()
// 	.innerRadius(radius * 0.9)
// 	.outerRadius(radius * 0.9);

    svg.select("#insidecycle")
    .attr("r", radius*0.5)
    .style("fill","white")
    .attr("cx", 0)
    .attr("cy", 0);

var text_name = svg.append('text')
                .attr('x', 0)
                .attr('y', 0)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline','middle')
                .attr('fill', 'white');

var text_value = svg.append('text')
                .attr('x', 0)
                .attr('y', 0+radius*0.2)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline','middle')
                .attr('fill', 'white');

 var text_total = svg.append('text')
                 .attr('x', radius*0.65)
                 .attr('y', radius*-0.75)
                 .attr('text-anchor', 'left')
                 .attr('alignment-baseline','middle')
                 .attr('fill', 'black');
                
var text_unavail = svg.append('text')
                .attr('x', radius*0.65)
                .attr('y', radius*-0.85)
                .attr('text-anchor', 'left')
                .attr('alignment-baseline','middle')
                .attr('fill', 'black');
                



svg.attr("transform", "translate(" + width / 2.5 + "," + height / 2 + ")");

var key = function(d){ return d.data.name; };



var color = d3.scale.category20();



change();


function change() {


    var value = this.value || 'Repos';
    var data ; 
    if(value == 'Omics') { 
    	data = omicstype;
    	text_total.text("Total:"+totalomics);
    	text_unavail.text("Unavailable:"+unavailableomics.value);
    	// text_total.text("Total:"+totalomics);

    }
    if(value == 'Repos') {
    	data = repos;
    	text_total.text("Total:"+totalrepos);
    	text_unavail.text("");
    	// text_total.text("Total:"+totalrepos);

    }



    text_name.text("");
    text_value.text("");
	svg.select("#insidecycle") 
    	.style("fill", "white");

	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);


	slice.enter()
		.insert("path")
		.style("fill", function(d,i) { return color(i); })
		.attr("class", "slice")
		.on("click", function(d,i){
               // alert("you have clicked"+d.data.name);
               // window.open("browse.html#/search?q="+d.data.name);
               location.href = "browse.html#/search?q="+d.data.name;
               })
		.on("mouseover", function(d,i) {
			var temptext1 = d.data.name;
			var temptext2 = d.data.value;
			colorinside = color(i);
            svg.select("#insidecycle") 
    		.style("fill", colorinside );
    		text_name
		    .text( temptext1);
    		text_value
		    .text(temptext2);
        })
		;

	slice		
		.transition().duration(1000)
		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

        ;

	slice.exit()
		.remove();
};
}
}