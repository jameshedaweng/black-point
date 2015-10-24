var MP = [];

$(document).ready(function(){
  MP.loadSplash();
  MP.mapInit();
  MP.sliderInit();
  simulateDownloadActivities();
  simulateDownloadParkings();
  simulateTemperatures();
});

MP.loadSplash = function(){
  setTimeout(function(){
    $(".splash").fadeOut();
  }, 2000);
};

MP.mapInit = function(){
  L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXNoZWRhd2VuZyIsImEiOiJxNGxvT1h3In0.q1gGwhVt7lQ7Tji5NV2jUQ';
  MP.map = L.mapbox.map('map', 'jameshedaweng.0b40c805')
    .setView([40.415363, -3.707398], 14);
  MP.map.scrollWheelZoom.disable();

  MP.layers = [];

  MP.map.on('move', function() {
	    // Get the map bounds - the top-left and bottom-right locations.
	    var bounds = MP.map.getBounds();

	    var newText = '';

	    $.each(MP.layers, function( index, value ) {
		    value.eachLayer(function(layer) {
		    	if (bounds.contains(layer.getLatLng())) {
			    	//console.log(layer.feature);

			    	var prop = layer.feature.properties;

			    	var newNotification = '<div class="notification ' + prop.theme + '">';
			    	newNotification += prop.title;
		            newNotification += '</div>';

		            newText += newNotification;
	        	}
		    });
		});

	    $('#notifications').html(newText);
	});
};

MP.sliderInit = function(){
  $("#slider-label").html(moment().format("HH:mm"));
  $("#current-time").html(moment().format("HH:mm"));
  $("#slider").slider({
    animate: "fast",
    max: 720,
    min: -720,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      var delay = function() {
        var handleIndex = $(ui.handle).data('index.uiSliderHandle');
        var label = "#slider-label";
        var time = moment().add(ui.value, 'minute').format("HH:mm");
        $(label).html(time).position({
          my: 'center bottom',
          at: 'center top',
          of: ui.handle,
          offset: "0, 15"
        });
        $("#current-time").html(time);
      };
      setTimeout(delay, 5);
    }
  });
  $('#slider').draggable();
};