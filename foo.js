var site = 'http://www.cs.tut.fi/~juhakn/saa_ka_';

var years = _.range(1997, 2013)
var months = _.map(_.range(1, 13), function(m) {
	return m < 10 ? '0' + m : '' + m + ''
});

function yearUrl(year) {
	return site + year + '.html'
};

function monthUrl(year, month) {
	return site + month + year + '.html'
};

var data;

$(document).ready(function() {
	if ($('#data *').length == 0) {
		loadData();
	}
	data = yearsToJson();
});

function loadData() {
	_.each(years, function(year) {
		$.ajax({
	    	url: yearUrl(year),
	    	type: 'GET',
	    	success: function(res) {
	    	    $('#data').append('<div class="y' + year + '"></div>')
	    	    		  .find('.y' + year)
	    	    		  .append('<div class="data"></div>')
	    	    		  .find('.data')
	    	              .html(res.responseText);
	    	}
    	});

    	_.each(months, function(month) {
			$.ajax({
		    	url: monthUrl(year, month),
		    	type: 'GET',
		    	success: function(res) {
		    	    $('.y' + year).append('<div class="m' + month + '"></div>')
		    	                  .find('.m' + month)
		    	                  .append('<div class="data"></div>')
	    	    		  		  .find('.data')
		    	                  .html(res.responseText);
		    	}
	    	});
		});
	});
};

function yearsToJson() {
	return _.map(years, function(year) {
		return {'year': year,
		 		'data': dataToJson('#data .y' + year + ' > .data'),
		 		'months': monthsToJson(year)};
	});
};

function monthsToJson(year) {
	return _.map(months, function(month) {
		return {'month': month, 'data': dataToJson('#data .y' + year + ' .m' + month + ' > .data')};
	});
};

function dataToJson(data) {
	return _.map($('tr:has(td)', data), function(tr){
		return {'day': $($('td *', tr)[0]).text(),
				'ka': $($('td *', tr)[1]).text(),
				'min': $($('td *', tr)[2]).text(),
				'max': $($('td *', tr)[3]).text()
		};
	});
};