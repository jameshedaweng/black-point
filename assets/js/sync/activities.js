
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

        // Parse day
        var novDay = 0;
        var novPos = newActivity.title.indexOf(' de noviembre');
        if (novPos == -1) {
        	novPos = newActivity.content.indexOf(' de noviembre');
        	if (novPos != -1) {
        		novDay = parseInt(newActivity.content.substr(novPos-2, 2));
        	}
        } else {
        	novDay = parseInt(newActivity.title.substr(novPos-2, 2));
        }
        var decDay = 0;
        var dicPos = newActivity.title.indexOf(' de diciembre');
        if (dicPos == -1) {
        	dicPos = newActivity.content.indexOf(' de diciembre');
        	if (dicPos != -1) {
        		decDay = parseInt(newActivity.content.substr(dicPos-2, 2));
        	}
        } else {
        	decDay = parseInt(newActivity.title.substr(dicPos-2, 2));
        }

        //console.log('novDay: ' + novDay);
        //console.log('decDay: ' + decDay);

        // Parse category
        if (novPos != -1 || dicPos != -1) {
	        if (newActivity.category != undefined) {
		        newActivity.category = newActivity.category.substr(newActivity.category.lastIndexOf("/")+1, newActivity.category.length);

		        // Add date
		        if (novDay != 0) {
		        	newActivity.day = novDay;
		        	newActivity.month = 11;
		        	newActivity.year = 2015;
		        } else if (decDay != 0) {
		        	newActivity.day = decDay;
		        	newActivity.month = 12;
		        	newActivity.year = 2015;
		        }

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
	var glyph;

	switch(category) {
    case "VisitasTuristicas":
        theme = 'notification-rose';
		color = '#E74C3C';
		symbol = 'monument';
		glyph = 'bi_interface-places';
        break;
    case "ItinerariosOtrasActividadesAmbientales":
        theme = 'notification-blue';
		color = '#3498DB';
		symbol = 'art-gallery';
		glyph = ' bi_environment-mountain-a';
        break;
    case "Exposiciones":
        theme = 'notification-turquoise';
		color = '#1ABC9C';
		symbol = 'museum';
		glyph = 'bi_building-museum';
        break;
    case "Conciertos":
        theme = 'notification-green';
		color = '#2ECC71';
		symbol = 'music';
		glyph = 'bi_music-group-note-a';
        break;
    case "ConferenciasColoquios":
        theme = 'notification-yellow';
		color = '#F39C12';
		symbol = 'place-of-worship';
		glyph = 'bi_doc-book-mark';
        break;
    default:
        theme = 'notification-yellow';
		color = '#F39C12';
		symbol = 'place-of-worship';
		glyph = 'bi_com-bubble-dot';
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
	        glyph: glyph,
	        color: color,
	        show: true,
	        date: {
	        	year: activity.year,
	        	month: activity.month,
	        	day: activity.day
	        },
	        // one can customize markers by adding simplestyle properties
	        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
	        'marker-size': 'medium',
	        'marker-color': color,
	        //'marker-symbol': symbol
	    }
	}).addTo(MP.map));
}

