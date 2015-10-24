
function simulateTemperatures() {
	console.log('simulateTemperatures');

	var data = getDataTemperatures();
	addTemperaturesToMap(data);
}

function getDataTemperatures() {
	console.log('getDataTemperatures');

	var sensors = [];

	var sensor = {
		title: 'Puerta del sol',
		lat: 40.416906,
		lon: -3.703818,
		temperatures: getDataTemperature()
	}
	sensors.push(sensor);

	sensor = {
		title: 'Espacio Fundación Telefónica',
		lat: 40.420184,
		lon: -3.701640,
		temperatures: getDataTemperature()
	}
	sensors.push(sensor);

	sensor = {
		title: 'Estación de Chamartin',
		lat: 40.472999,
		lon: -3.683040,
		temperatures: getDataTemperature()
	}
	sensors.push(sensor);

	sensor = {
		title: 'Aeropuerto Adolfo Suárez Madrid-Barajas',
		lat: 40.483177,
		lon: -3.568917,
		temperatures: getDataTemperature()
	}
	sensors.push(sensor);

	return sensors;
}

function getDataTemperature() {
	console.log('getDataTemperature');

	var temperatures = [];

	// Generate temperature data
	var year = 2015;
	var month;
	var day;
	var hour;
	var temperature = Math.floor((Math.random() * 30) -10); // initial [-10 : 20]
	for (month=11; month<=12; month++) {
		for (day=1; day<=31; day++) {
			for (hour=0; hour<24; hour++) {
				temperature = generateTemperature(temperature);
				//console.log(day + '/' + month + '/' + year + ' (' + hour + ':00): ' + temperature);

				var newTemperature = {
					year: year,
					month: month,
					day: day,
					hour: hour,
					value: temperature
				};

				temperatures.push(newTemperature);
			}
		}
	}

	//console.log(temperatures);
	return temperatures;
}

function generateTemperature(lastTemperature) {
	var sum = Math.floor(Math.random() * 2);
	var variab = Math.floor(Math.random() * 3);

	if (sum === 1) {
		if (lastTemperature > 20) {
			lastTemperature -= variab;
		} else {
			lastTemperature += variab;
		}
	} else {
		if (lastTemperature < -10) {
			lastTemperature += variab;
		} else {
			lastTemperature -= variab;
		}
	}

	return lastTemperature;
}

function addTemperaturesToMap(temperatures) {
	console.log('addTemperaturesToMap');
	//console.log(temperatures);

	$.each(temperatures, function( index, temperature ) {
		addTemperatureToMap(temperature);
	});
}

function addTemperatureToMap(temperature) {
	//console.log('addTemperatureToMap');
	//console.log(temperature);

	var theme = 'notification-green';
	var color = '#2ECC71';

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
	        show: true,
	        temperatures: temperature.temperatures,
	        // one can customize markers by adding simplestyle properties
	        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
	        'marker-size': 'large',
	        'marker-color': color,
	        'marker-symbol': 'marker'
	    }
	}).addTo(MP.map));
}

