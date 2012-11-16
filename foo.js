var site = 'http://www.cs.tut.fi/~juhakn/saa_ka_';

var years = _.range(1997, 2013)
var months = _.range(1, 13);

function yearUrl(year) {
	return site + year + '.html'
};

function monthUrl(year, month) {
	return site + (month < 10 ? '0' + month : '' + month + '') + year + '.html'
};

var data;

$(document).ready(function() {
	if ($('#data *').length == 0) {
		loadData(allToJson);
	} else {
		allToJson();
	}
});

function allToJson() {
	data = yearsToJson();
}

function loadData(cb) {
	loadYear(years[0], cb);
};

function loadYear(year, cb) {
	if (year < 2013) {
		$.ajax({
	    	url: yearUrl(year),
	    	type: 'GET',
	    	success: function(res) {
	    	    $('#data').append('<div class="y' + year + '"></div>')
	    	    		  .find('.y' + year)
	    	    		  .append('<div class="data"></div>')
	    	    		  .find('.data')
	    	              .html(res.responseText);
	    	    loadMonth(year, months[0], function() {loadYear(year+1);});
	    	}
    	});
	} else {
		cb();
	}
};

function loadMonth(year, month, cb) {
	if (month < 13) {
		$.ajax({
	    	url: monthUrl(year, month),
	    	type: 'GET',
	    	success: function(res) {
	    		$('.y' + year).append('<div class="m' + month + '"></div>')
		                  .find('.m' + month)
		                  .append('<div class="data"></div>')
	    		  		  .find('.data')
		                  .html(res.responseText);
		        loadMonth(year, month+1, cb);
	    	}
		});
	} else {
		cb();
	}
}

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