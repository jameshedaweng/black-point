
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

	var xml = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
		xmlDoc = $.parseXML( xml ),
		$xml = $( xmlDoc ),
		$title = $xml.find( "title" );

	console.log($title);

}

