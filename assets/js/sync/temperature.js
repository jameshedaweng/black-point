
function simulateTemperatures() {
	console.log('simulateTemperatures');

	var data = getDataTemperatures();
	parseTemperatures(data);
}

function getDataTemperatures() {
	console.log('getDataTemperatures');

	// Generate temperature data
	var year = 2015;
	var month;
	var day;
	var temperature = Math.floor((Math.random() * 30) -10); // initial [-10 : 20]
	for (month=11; month<=12; month++) {
		for (day=1; day<=31; day++) {
			temperature = generateTemperature(temperature);
			console.log(day + '/' + month + '/' + year + ': ' + temperature);
		}
	}

	console.log(moment());
}

function generateTemperature(lastTemperature) {
	var sum = Math.floor(Math.random() * 2);
	var variab = Math.floor(Math.random() * 2);

	if (sum === 1) {
//console.log('suma: ' + variab);

		lastTemperature += variab;
	} else {
//console.log('resta: ' + variab);

		lastTemperature -= variab;
	}

	return lastTemperature;
}

function parseTemperatures(data) {
	console.log('parseTemperatures');

	var xml = data,
		xmlDoc = $.parseXML( xml ),
		$xml = $( xmlDoc ),
		$entry = $xml.find( "entry" );

	addTemperaturesToMap($entry);
}

function addTemperaturesToMap(temperatures) {
	console.log('addTemperaturesToMap');
	console.log(temperatures);

	temperatures.each(function(){
        var $temperature = $(this); 
        var newTemperature = {
        	title: $temperature.find("title").text(),
        	lat: parseFloat($temperature.find("lat").text()),
        	lon: parseFloat($temperature.find("long").text())
        }

		addTemperatureToMap(newTemperature);
    });
}

function addTemperatureToMap(temperature) {
	//console.log('addTemperatureToMap');
	//console.log(temperature);

	var theme = 'notification-blue';
	var color = '#3498DB'; // blueTheme

	MP.layers.push(L.mapbox.featureLayer({
	    // this feature is in the GeoJSON format: see geojson.org
	    // for the full specification
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        // coordinates here are in longitude, latitude order because
	        // x, y is the standard for GeoJSON and many formats
	        coordinates: [
	          temperature.lon,
	          temperature.lat
	        ]
	    },
	    properties: {
	        title: temperature.title,
	        theme: theme,
	        color: color,
	        // one can customize markers by adding simplestyle properties
	        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
	        'marker-size': 'large',
	        'marker-color': color,
	        'marker-symbol': 'car'
	    }
	}).addTo(MP.map));
}

