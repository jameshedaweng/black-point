
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

	addActivitiesToMap($entry);
}

function addActivitiesToMap(activities) {
	console.log('addActivitiesToMap');
	console.log(activities);

	var cont = 0;
	activities.each(function(){
        var $activity = $(this); 
        var newActivity = {
        	title: $activity.find("title").text(),
        	category: $activity.find("category").attr("term"),
        	lat: parseFloat($activity.find("lat").text()),
        	lon: parseFloat($activity.find("long").text())
        }

        // Parse category
        if (newActivity.category != undefined) {
	        newActivity.category = newActivity.category.substr(newActivity.category.lastIndexOf("/")+1, newActivity.category.length);

	        addActivityToMap(newActivity);
    	}
    });
}

function addActivityToMap(activity) {
	//console.log('addActivityToMap');
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
	          activity.lon,
	          activity.lat
	        ]
	    },
	    properties: {
	        title: activity.title,
	        // one can customize markers by adding simplestyle properties
	        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
	        'marker-size': 'large',
	        'marker-color': '#BE9A6B',
	        'marker-symbol': 'star'
	    }
	}).addTo(MP.map);
}

