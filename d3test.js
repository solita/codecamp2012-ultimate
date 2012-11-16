var yearIndex = 0;

function updateD3() {
	var y = data[yearIndex];
	var monthAvgs = _.map(y.data, function(x) { return parseFloat(x.ka); })
	var monthEntries = _.flatten ( _.map(data, function(x) { return x.data; }) )
	//var monthAvgs = _.map(monthEntries, function(x) { return parseFloat(x.ka); })

	$('#d3chart').empty();
	var chart = d3.select("#d3chart").append("div")
    	.attr("class", "chart");
	var x = d3.scale.linear()
    	.domain([d3.min(monthAvgs), d3.max(monthAvgs)])
    	.range(["0px", "420px"]);
	chart.selectAll("div")
		.data(monthAvgs)
	.enter().append("div")
		.style("width", x)
		.style("background",
			function(d) {
				var red = Math.max(0, Math.floor(d)*10);
				return d3.rgb(red, 0, Math.max(0, 100-red));
			} )
		.text(function(d) { return d; });
}

$(document).ready(function() {

	updateD3();

	$('#mybutton').click(function() {
		var circle = d3.selectAll("circle");
		circle.style("fill", "steelblue");
		circle.attr("cy", 90);
		circle.attr("r", 30);
//		for (var i = 0; i < monthAvgs.length; i++) {
//			monthAvgs[i] = monthAvgs[i] / 2;
//		}
	})
	
});

