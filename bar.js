$(document).ready(function() {

	var averageYearTemperatures = _.map(data, function(d) { 
		var months = _.map(d.data, function(d) { return parseFloat(d.ka) });
		return _.reduce(months, function(a,b) {
			return a+b
		}, 0) / months.length;
	});

	var bars = $('body').prepend('<div id="yearBars" class="yearBars"><div class="title">Vuoden keskilämpötilat</div></div>')
			 .find('.yearBars');
	_.each(_.zip(years, averageYearTemperatures).reverse(), function(arr) {
		bars.append('<div class="yearBar" title="Vuosi ' + arr[0] + '" style="height: ' + (arr[1]) + 'em; margin-top: ' + (10-arr[1]) + 'em"><div class="year">' + arr[0] + '</div><div class="temp">' + ('' + arr[1]).substring(0, 4) + ' °C</div></div>');
	});

	$('body').keydown(function(event) {
		if (event.keyCode == 39) {
			var selected = $('#yearBars .selected');
			if (selected.length == 0 || $('#yearBars .yearBar').first().filter('.selected').length > 0) {
				selected.removeClass('selected');
				$('#yearBars .yearBar').last().addClass('selected');
			} else {
				var sel = $('.selected').prev().last();
				selected.removeClass('selected');
				sel.addClass('selected');
			}
		} else if (event.keyCode == 37) {
			var selected = $('#yearBars .selected');
			if (selected.length == 0 || $('#yearBars .yearBar').last().filter('.selected').length > 0) {
				selected.removeClass('selected');
				$('#yearBars .yearBar').first().addClass('selected');
			} else {
				var sel = $('.selected').next().first();
				selected.removeClass('selected');
				sel.addClass('selected');
			}
		}
		// "reverse" index of selected:
		var ix = 16 - $('#yearBars .selected').index();
		// Update the D3 graph too:
		yearIndex = ix;
		updateD3();
		updateInfo.call($('#yearBars .selected'));
		updateSquares(years[yearIndex]);
	});

	var info = $('#info-dom');

	$('#yearBars .yearBar').click(updateInfo);
	$('#yearBars .yearBar').click(function() {
		yearIndex = $(this).index();
		updateSquares(years[yearIndex]);
		updateD3();
	});
	
	function updateInfo() {
		var year = $('.year', this).text();
		var yearData = _.find(data, function(d) { return d.year == year; });
		var newInfo = info.clone();
		$('#info').remove();
		newInfo.attr('id', 'info');
		$('#info-wrapper').prepend(newInfo);
		newInfo.render(yearData, {
			data: {
				day: {
					html: function(params) {
						return '<strong>' + monthNames[parseInt(params.value)] + '</strong>';
					}
				},
				ka: {
					text: function(params) {
						return 'ka: ' + params.value + '°C';
					}
				},
				min: {
					text: function(params) {
						var temp = params.value.indexOf('(') != -1 ? params.value.substring(0, params.value.indexOf('(')) : params.value
						return 'min: ' + temp + '°C';
					}
				},
				max: {
					text: function(params) {
						var temp = params.value.indexOf('(') != -1 ? params.value.substring(0, params.value.indexOf('(')) : params.value
						return 'max: ' + temp + '°C';
					}
				}
			}
		});
	}

	$('body').append('<div id="foobar" style="position: relative; margin-top: 75px"></div>');
	updateSquares(years[0]);
});

function updateSquares(year) {
	var yearData = _.find(data, function(d) { return d.year == year; });
	var all = _.flatten(_.map(yearData.months, function(m) { return _.map(m.data, function(d){ return parseFloat(d.ka); });}));
console.log(yearData);
	var grouped = _.groupBy(all, Math.floor);

	var foobar = $('body').find('#foobar');
	foobar.empty();
	_.each(grouped, function(k, v) {
		foobar.append('<div class="foobar" style="background-color: blue; position: absolute; left:' + (Math.random()*1000) + 'px; top:' + (Math.random()*300) + '; width: ' + v + 'px; height: ' + v +'px"><div class="label">' + v + '°C</div></div>');
	});
};