$(document).ready(function() {
	$('#par').html('<p>Test to see if client.js is working.</p>');
	$('#myBtn').click(function() {
		$('.modal').modal('toggle');
	});
});

// mockUpcomingTrips.upcomingTrips.forEach(function(object) {
// 	var area = object.area;
// 	var date = object.date;
// 	var time = object.time;
// 	var difficulty = object.difficulty;
// 	var party = object.usersGoing.length;
// 	$('#tripInfo').html('<li><p>' + date + ": " + time + '</p><p>Area: ' + area + 
// 		'</p><p>Planned difficulty: ' + difficulty + 
// 		'</p><p>Group size: <a href="partySize">' + party + '</a></p></li>');
// });