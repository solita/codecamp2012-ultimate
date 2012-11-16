$(document).ready(function() {

	var monthEntries = _.flatten ( _.map(data, function(x) { return x.data; }) )
	var monthAvgs = _.map(monthEntries, function(x) { return parseFloat(x.ka); })

	var chart = d3.select("body").append("div")
    	.attr("class", "chart");
	var x = d3.scale.linear()
    	.domain([d3.min(monthAvgs), d3.max(monthAvgs)])
    	.range(["0px", "420px"]);
	chart.selectAll("div")
		.data(monthAvgs)
	.enter().append("div")
		.style("width", x)
		.text(function(d) { return d; });

	$('#mybutton').click(function() {
		var circle = d3.selectAll("circle");
		circle.style("fill", "steelblue");
		circle.attr("cy", 90);
		circle.attr("r", 30);
	})
	
});

