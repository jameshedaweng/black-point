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

	    var newRecText = '';
	    var newNotificationText = '';

	    $.each(MP.layers, function( index, value ) {
		    value.eachLayer(function(layer) {
		    	if (bounds.contains(layer.getLatLng())) {
			    	//console.log(layer.feature);

			    	var prop = layer.feature.properties;

			    	if (prop.show) {
			    		if (prop.temperatures === undefined) {
					    	var newNotification = '<div class="notification ' + prop.theme + '"><i class="';
                    newNotification += prop.glyph;
                    newNotification += '"></i>';
                    newNotification += '<div class="notification-icon">';
					    	    newNotification += prop.title;
				            newNotification += '</div></div>';
				            newNotificationText += newNotification;
			        	} else {
			        		newRecText += generateTemperatureNotifications(prop.temperatures);
			        	}
		        	}
	        	}
		    });
		});

		$('.notification').fadeOut(200);
		setTimeout(function(){
			$('#notifications').html(newNotificationText);
			setTimeout(function(){
				$('.notification').fadeIn(200);
			});
		}, 200);

		$('.now').fadeOut(200);
		setTimeout(function(){
			$('#now').html(newRecText);
			setTimeout(function(){
				$('.now').fadeIn(200);
			});
		}, 200);
    });
};

MP.sliderInit = function(){
  $("#slider-label").html(moment().format("HH:00"));
  $("#current-time").html(moment().format("HH:00"));
  $("#slider-label").css("left", 15 + (moment().hour())/24*100 + "%");
  $("#slider-label").css("margin-left", -25);
  $("#slider").slider({
    animate: "fast",
    max: 24,
    min: 0,
    step: 1,
    value: moment().hour(),
    slide: function(event, ui) {
      var delay = function() {
        var handleIndex = $(ui.handle).data('index.uiSliderHandle');
        var label = "#slider-label";
        var time = moment().startOf('day').add(ui.value, 'hour').format("HH:mm");
        MP.hour = moment().startOf('day').add(ui.value, 'hour').format("HH");
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
  MP.hour = moment().format("HH");
};

MP.setDefaultDate = function(){
  $("#date-input").val(moment().format("YYYY-MM-DD"));
  $("#current-date").html(moment().format("MMM Do, YYYY"));
  $("#date-input").change(function(){
    $("#current-date").html(moment($("#date-input").val()).format("MMM Do, YYYY"));
  });
  MP.date = moment();
};