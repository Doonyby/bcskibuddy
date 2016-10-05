var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var Users = require('./models/user.js');
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

app.get('/users/:username', function(req, res) {
    Users.find({username: req.params.username}, function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

app.post('/users', function(req, res) {
    Users.create({name: req.body.name, username: req.body.username, password: req.body.password}, function(error, item) {
        console.log(error);
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


