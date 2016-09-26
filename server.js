var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.status(200);
});

app.get('/user', function(req, res) {
	res.sendfile('./public/user.html');
	res.status(200);
});

// app.get('/location/trips', function(req, res) {
//		display mockUpcomingTrips{}
// });

app.get("*", function(req, res) { 
	res.redirect("/");
});

app.listen(process.env.PORT || 8080, function(err) {
	if (err) {
		console.log('port 8080 not working');
	}
	else {
		console.log('listening on port 8080');
	}
});


exports.app = app;
