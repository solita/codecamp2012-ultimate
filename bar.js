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
	});

	var info = $('#info-dom');

	$('#yearBars .yearBar').click(function() {
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
	});
	
});