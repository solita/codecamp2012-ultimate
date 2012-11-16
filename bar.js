$(document).ready(function() {

	var averageYearTemperatures = _.map(data, function(d) { 
		var months = _.map(d.data, function(d) { return parseFloat(d.ka) });
		return _.reduce(months, function(a,b) {
			return a+b
		}, 0) / months.length;
	});

	var bars = $('body').prepend('<div class="yearBars"></div>')
			 .find('.yearBars');
	_.each(_.zip(years, averageYearTemperatures), function(arr) {
		bars.append('<div class="yearBar" title="Vuosi ' + arr[0] + '" style="height: ' + (arr[1]) + 'em; margin-top: ' + (20-arr[1]) + 'em"><div class="year">' + arr[0] + '</div><div class="temp">' + arr[1] + '</div></div>');
	});
});