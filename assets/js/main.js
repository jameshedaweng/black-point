var MP = [];

$(document).ready(function(){
  MP.mapInit();
  simulateDownloadActivities();
});

MP.mapInit = function(){
  L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXNoZWRhd2VuZyIsImEiOiJxNGxvT1h3In0.q1gGwhVt7lQ7Tji5NV2jUQ';
  MP.map = L.mapbox.map('map', 'jameshedaweng.hig7dplk')
    .setView([40.415363, -3.707398], 14);
  MP.map.scrollWheelZoom.disable();

  MP.map.on('move', function() {
	    // Construct an empty list to fill with onscreen markers.
	    var inBounds = [],
	    // Get the map bounds - the top-left and bottom-right locations.
	        bounds = MP.map.getBounds();

	    MP.layer.eachLayer(function(marker) {
	    	console.log(marker.feature);
	    });

	    // Display a list of markers.
	    console.log(inBounds);
	});
};
