var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.html('public/index.html');
    res.status(200);
});

app.get("*", function(req, res) { 
	res.redirect("/")
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
