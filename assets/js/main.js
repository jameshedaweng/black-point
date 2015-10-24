var MP = [];

$(document).ready(function(){
  MP.mapInit();
  simulateDownloadActivities();
});

MP.mapInit = function(){
  L.mapbox.accessToken = 'pk.eyJ1IjoiamFtZXNoZWRhd2VuZyIsImEiOiJxNGxvT1h3In0.q1gGwhVt7lQ7Tji5NV2jUQ';
  MP.map = L.mapbox.map('map', 'jameshedaweng.hig7dplk')
    .setView([40.415363, -3.707398], 14);
};
