var MP = [];

$(document).ready(function(){
  MP.loadSplash();
  MP.mapInit();
  MP.sliderInit();
  MP.setDefaultDate();
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
    .setView([40.416775, -3.703790], 14);
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

			    	if (prop.show) {
			    		if (prop.temperatures === undefined) {
					    	var newNotification = '<div class="notification ' + prop.theme + '">';
					    	newNotification += prop.title;
				            newNotification += '</div>';

				            newText += newNotification;
			        	} else {
			        		newText += generateTemperatureNotifications(prop.temperatures);
			        	}
		        	}
	        	}
		    });
		});
    $('.notification').fadeOut(200);
    setTimeout(function(){
      $('#notifications').html(newText);
      setTimeout(function(){
        $('.notification').fadeIn(200);
      });
    }, 200);
    
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
        MP.hour = moment().add(ui.value, 'minute').format("HH");
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

MP.setDefaultDate = function(){
  $("#date-input").val(moment().format("YYYY-MM-DD"));
  MP.date = moment().format("YYYY-MM-DD");
};