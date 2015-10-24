var MP = [];

$(document).ready(function(){
  simulateDownloadActivities();
  MP.mapInit();
});

MP.mapInit = function(){
  L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXNoZWRhd2VuZyIsImEiOiJxNGxvT1h3In0.q1gGwhVt7lQ7Tji5NV2jUQ';
  var map = L.mapbox.map('map', 'jameshedaweng.hig7dplk')
    .setView([40.415363, -3.707398], 14);
  map.scrollWheelZoom.disable();
};
