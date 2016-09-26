var totalTripLocations = ["logan", "ogden", "salt lake", "provo", "uintas", "skyline", "moab", "abajos"];

var mockUpcomingTrips = {
	"upcomingTrips": [
		{
			"id": "1",
			"location": "logan",
			"area": "black smith",
			"date": "novermber 3",
			"time": "6:00am",
			"difficulty": "easy",
			"usersGoing": ["dan", "jaimie", "linley", "luna"]
		},
		{
			"id": "2",
			"location": "ogden",
			"area": "snow basin",
			"date": "novermber 4",
			"time": "6:00am",
			"difficulty": "moderate",
			"usersGoing": ["dan", "jaimie", "linley", "luna"]
		},
		{
			"id": "3",
			"location": "salt lake",
			"area": "little cottonwood",
			"date": "novermber 5",
			"time": "6:00am",
			"difficulty": "hard",
			"usersGoing": ["dan", "jaimie", "linley", "luna"]
		},
		{
			"id": "4",
			"location": "provo",
			"area": "big springs",
			"date": "novermber 6",
			"time": "6:00am",
			"difficulty": "extreme",
			"usersGoing": ["dan", "jaimie", "linley", "luna"]
		},
		{
			"id": "5",
			"location": "uintas",
			"area": "soap stone",
			"date": "novermber 7",
			"time": "6:00am",
			"difficulty": "easy",
			"usersGoing": ["dan", "jaimie", "linley", "luna"]
		},
		{
			"id": "6",
			"location": "skyline",
			"area": "unknown",
			"date": "novermber 8",
			"time": "6:00am",
			"difficulty": "moderate",
			"usersGoing": ["dan", "jaimie", "linley", "luna"]
		},
		{
			"id": "7",
			"location": "moab",
			"area": "la sals",
			"date": "novermber 9",
			"time": "6:00am",
			"difficulty": "hard",
			"usersGoing": ["dan", "jaimie", "linley", "luna"]
		},
		{
			"id": "8",
			"location": "abajos",
			"area": "unknown",
			"date": "novermber 10",
			"time": "6:00am",
			"difficulty": "extreme",
			"usersGoing": ["dan", "jaimie", "linley", "luna"]
		},
	]
};

mockUpcomingTrips.upcomingTrips.forEach(function(object) {
	var area = object.area;
	var date = object.date;
	var time = object.time;
	var difficulty = object.difficulty;
	var party = object.usersGoing.length;
	$('#tripInfo').html('<li><p>' + date + ": " + time + '</p><p>Area: ' + area + 
		'</p><p>Planned difficulty: ' + difficulty + 
		'</p><p>Group size: <a href="partySize">' + party + '</a></p></li>');
});