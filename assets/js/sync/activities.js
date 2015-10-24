
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

	activities.each(function(){
        var $activity = $(this); 
        var newActivity = {
        	title: $activity.find("title").text(),
        	content: $activity.find("content").text(),
        	category: $activity.find("category").attr("term"),
        	lat: parseFloat($activity.find("lat").text()),
        	lon: parseFloat($activity.find("long").text())
        }

        var novPos = newActivity.title.indexOf(' de noviembre');
        if (novPos == -1)
        	novPos = newActivity.content.indexOf(' de noviembre');
        var dicPos = newActivity.title.indexOf(' de diciembre');
        if (dicPos == -1)
        	dicPos = newActivity.content.indexOf(' de diciembre');

        // Parse category
        if (novPos != -1 || dicPos != -1) {
	        if (newActivity.category != undefined) {
		        newActivity.category = newActivity.category.substr(newActivity.category.lastIndexOf("/")+1, newActivity.category.length);

		        addActivityToMap(newActivity);
	    	}
	    }
    });
}

function addActivityToMap(activity) {
	var category = activity.category;
	var theme;
	var color;
	var symbol;

	switch(category) {
    case "VisitasTuristicas":
        theme = 'notification-rose';
		color = '#E74C3C';
		symbol = 'monument';
        break;
    case "ItinerariosOtrasActividadesAmbientales":
        theme = 'notification-purple';
		color = '#8E44AD';
		symbol = 'art-gallery';
        break;
    case "Exposiciones":
        theme = 'notification-turquoise';
		color = '#1ABC9C';
		symbol = 'museum';
        break;
    case "Conciertos":
        theme = 'notification-green';
		color = '#2ECC71';
		symbol = 'music';
        break;
    case "ConferenciasColoquios":
        theme = 'notification-yellow';
		color = '#F39C12';
		symbol = 'place-of-worship';
        break;
    default:
        theme = 'notification-yellow';
		color = '#F39C12';
		symbol = 'place-of-worship';
        break;
	}

	MP.layers.push(L.mapbox.featureLayer({
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
	        theme: theme,
	        color: color,
	        show: true,
	        // one can customize markers by adding simplestyle properties
	        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
	        'marker-size': 'medium',
	        'marker-color': color,
	        'marker-symbol': symbol
	    }
	}).addTo(MP.map));
}

