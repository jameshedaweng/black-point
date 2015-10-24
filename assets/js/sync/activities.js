
function downloadActivities() {
	console.log('downloadActivities');

	var urlActivities = 'http://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.geo';

	var data = getDataActivities(urlActivities);
	parseActivities(data);
}

function simulateDownloadActivities() {
	console.log('simulateDownloadActivities');

	var localPathActivities = 'assets/data/206974-0-agenda-eventos-culturales-100.geo';

	var data = getDataActivities(localPathActivities);
	parseActivities(data);
}

function getDataActivities(url) {
	console.log('getDataActivities');

	$.get(url, function(data) {
		console.log('success!!');
		parseActivities(data);
	});
}

function parseActivities(data) {
	console.log('parseActivities');

	var xml = data,
		xmlDoc = $.parseXML( xml ),
		$xml = $( xmlDoc ),
		$entry = $xml.find( "entry" );

	console.log($entry);

	addActivitiesToMap($entry);
}

function addActivitiesToMap(activities) {
	$.each(activities, function( index, value ) {
		//addActivityToMap(value);
	});
}

function addActivityToMap(activity) {
	console.log('addActivityToMap');
	console.log(activity);

	L.mapbox.featureLayer({
	    // this feature is in the GeoJSON format: see geojson.org
	    // for the full specification
	    type: 'Feature',
	    geometry: {
	        type: 'Point',
	        // coordinates here are in longitude, latitude order because
	        // x, y is the standard for GeoJSON and many formats
	        coordinates: [
	          -3.707398,
	          40.415363
	        ]
	    },
	    properties: {
	        title: 'Peregrine Espresso',
	        description: '1718 14th St NW, Washington, DC',
	        // one can customize markers by adding simplestyle properties
	        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
	        'marker-size': 'large',
	        'marker-color': '#BE9A6B',
	        'marker-symbol': 'cafe'
	    }
	}).addTo(MP.map);

}

