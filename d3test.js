;
$(document).ready(function() {

	$('#mybutton').click(function() {
		var circle = d3.selectAll("circle");
		circle.style("fill", "steelblue");
		circle.attr("cy", 90);
		circle.attr("r", 30);
	}

		)
	
});

