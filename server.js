var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/jquery', express.static('./node_modules/jquery/dist/'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist/js/'));
app.use('/bootstrapCss', express.static('./node_modules/bootstrap/dist/css'));

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

app.get('/', function (req, res) {
    res.status(200);
});

app.get('/user', function(req, res) {
	res.sendfile('./public/user.html');
	res.status(200);
});

app.get('/users', function(req, res) {
    User.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

app.post('/users', function(req, res) {
    User.create({name: req.body.name}, function(error, item) {
        console.log(req.body);
        if (error) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return res.status(201).json(item);
    });
});

app.get('/info', function(req, res) {
	res.sendfile('./public/info.html');
	res.status(200);
});

app.get("*", function(req, res) { 
	res.redirect("/");
});

exports.app = app;
exports.runServer = runServer;

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
