
function downloadParkings() {
	console.log('downloadParkings');

	var urlParkings = 'http://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.geo';

	var data = getDataParkings(urlParkings);
	parseParkings(data);
}

function simulateDownloadParkings() {
	console.log('simulateDownloadParkings');

	var localPathParkings = 'assets/data/202625-0-aparcamientos-publicos.geo';

	var data = getDataParkings(localPathParkings);
	parseParkings(data);
}

function getDataParkings(url) {
	console.log('getDataParkings');

	$.get(url, function(data) {
		console.log('success!!');
		parseParkings(data);
	});
}

function parseParkings(data) {
	console.log('parseParkings');

	var xml = data,
		xmlDoc = $.parseXML( xml ),
		$xml = $( xmlDoc ),
		$entry = $xml.find( "entry" );

	addParkingsToMap($entry);
}

function addParkingsToMap(parkings) {
	console.log('addParkingsToMap');
	console.log(parkings);

	parkings.each(function(){
        var $parking = $(this); 
        var newParking = {
        	title: $parking.find("title").text(),
        	lat: parseFloat($parking.find("lat").text()),
        	lon: parseFloat($parking.find("long").text())
        }

		addParkingToMap(newParking);
    });
}

function addParkingToMap(parking) {
	//console.log('addParkingToMap');
	//console.log(parking);

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
	          parking.lon,
	          parking.lat
	        ]
	    },
	    properties: {
	        title: parking.title,
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

