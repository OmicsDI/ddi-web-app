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

var totaltissues = gettotal(tissues);
var totalorganisms = gettotal(organisms);

 console.log(totaltissues);
 console.log(totalorganisms);
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

var width = 480,
    height = 325,
	radius = Math.min(width, height) / 2;
 
var piechartname = 'chart_tissues_organisms';

var body = d3.select("#"+piechartname);

var svg = d3.select("#"+piechartname)
	.append("svg")
    .attr("style","height:"+height)
    .attr("style","width:"+width-10)
	.attr("class", "piesvg")
	.append("g");

svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");
svg.append("circle")
    .attr("id","insidecycle")
    .attr("style","stroke:none");

var label_data = ['Tissues', 'Organisms'];
   
body.append('form')
  .attr("id",piechartname+"_form")
  .attr("class","center")
  .selectAll('label')
  .data(label_data).enter()
  .append('label')
    .text(function (d) { return d;})
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value',function (d) { return d; })
    .text(function (d) { return d; })
  
  
  d3.select("#"+piechartname+"_form").select('input[value=Tissues]').property('checked',true)

  d3.select("#"+piechartname+"_form").selectAll('input')
    .on('change',change);


var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.7)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.8)
	.outerRadius(radius * 0.8);

    svg.select("#insidecycle")
    .attr("r", radius*0.4)
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
                .attr('x', 0)
                .attr('y', radius*0.85)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline','middle')
                .attr('fill', 'black');
                
var text_unavail = svg.append('text')
                .attr('x', 0)
                .attr('y', radius*0.95)
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline','middle')
                .attr('fill', 'black');



svg.attr("transform", "translate(" + width / 2.5 + "," + height / 2 + ")");

var key = function(d){ return d.data.name; };



var color = d3.scale.category20();



change();


function change() {


    var value = this.value || 'Tissues';
    var data ; 
    if(value == 'Tissues') { 
    	data = tissues;
    	text_total.text("Total:"+totaltissues);
    	text_unavail.text("Unavailable:"+unavailableNoTissues.value);
    }
    if(value == 'Organisms') {
    	data = organisms;
    	text_total.text("Total:"+totalorganisms);
    	text_unavail.text("Unavailable:"+unavailableNoTissues.value);
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
              alert("you have clicked"+d.data.name);
              // window.open("browse.html#/search?q="+d.text);
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

	/* ------- TEXT LABELS -------*/

	var text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text.enter()
		.append("text")
		.style("fill", function(d,i) { return color(i); })
		.attr("dy", ".35em")
		.text(function(d) {
			 return d.data.name;
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

	
	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = 0.8*radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	text.exit()
		.remove();

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);
	
	polyline.enter()
		.append("polyline")
		.style("stroke", function(d,i) { return color(i); });

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = 0.8*radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	
	polyline.exit()
		.remove();
};
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


omicstype.shift();
var subdomains= domains[0]['subdomains'];

var repos = transformsubdomains(subdomains);



var totalomics = gettotal(omicstype);
var totalrepos = gettotal(repos);
// var totaltissues = gettotal(tissues);
// var totalorganisms = gettotal(organisms);

//  console.log(totaltissues);
//  console.log(totalorganisms);


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
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");
svg.append("circle")
    .attr("id","insidecycle")
    .attr("style","stroke:none");

var label_data = ['Repos', 'Omics'];
   
body.append('form')
  .attr("id",piechartname+"_form")
  .attr("class","center")
  .selectAll('label')
  .data(label_data).enter()
  .append('label')
    .text(function (d) { return d;})
  .append('input')
    .attr('type','radio')
    .attr('name','dataset')
    .attr('value',function (d) { return d; })
    .text(function (d) { return d; })
  
  
  d3.select("#"+piechartname+"_form").select('input[value=Repos]').property('checked',true)

  d3.select("#"+piechartname+"_form").selectAll('input')
    .on('change',change);


var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) {
		return d.value;
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

    svg.select("#insidecycle")
    .attr("r", radius*0.4)
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
                .attr('x', 0)
                .attr('y', radius*0.9)
                .attr('text-anchor', 'middle')
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

    }
    if(value == 'Repos') {
    	data = repos;
    	text_total.text("Total:"+totalrepos);

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
              alert("you have clicked"+d.data.name);
              // window.open("browse.html#/search?q="+d.text);
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

	/* ------- TEXT LABELS -------*/

	var text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text.enter()
		.append("text")
		.style("fill", function(d,i) { return color(i); })
		.attr("dy", ".35em")
		.text(function(d) {
			 return d.data.name;
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

	
	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = 0.8*radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	text.exit()
		.remove();

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(data), key);
	
	polyline.enter()
		.append("polyline")
		.style("stroke", function(d,i) { return color(i); });

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = 0.8*radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [arc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});
	
	polyline.exit()
		.remove();
};
}
}