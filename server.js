var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var config = require('./config');
var Users = require('./models/user.js');
var Trip = require('./models/trips.js');
var fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));
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
    console.log(req.body);
    Users.findOne({username: req.params.username}, function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

var strategy = new BasicStrategy(function(username, password, callback) {
    User.findOne({username: username}, function(err, user) {
        if(err) {
            callback(err);
            return;
        }
        if(!user) {
            return callback(null, false, {
                message: "Incorrect username"
            });
        }
        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }
            if (!isValid) {
                return callback(null, false, {
                    message: "Incorrect password"
                });
            }
            return callback(null, user);
        });
    });
});

passport.use(strategy);
app.use(passport.initialize());

app.get('/hidden', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({
        message: 'Luke... I am your father'
    });
});

app.post('/users', jsonParser, function(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }
    if (!('username' in req.body)) {
        return res.status(422).json({
            message: "Missing field: username"
        });
    }
    var username = req.body.username;
    if (typeof username !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: username"
        });
    }
    username = username.trim();
    if (username == '') {
        return res.status(422).json({
            message: "Incorrect field length: username"
        });
    }
    if (!('password' in req.body)) {
        return res.status(422).json({
            message: "Missing field: password"
        });
    }
    var password = req.body.password;
    if (typeof password !== 'string') {
        return res.status(422).json({
            message: "Incorrect field type: password"
        });
    }
    password = password.trim();
    if (password == '') {
        return res.status(422).json({
            message: "Incorrect field length: password"
        });
    }
    var name = req.body.name;
    name = name.trim();
    if (name == '') {
        return res.status(422).json({
            message: "Missing field: name"
        });
    }
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: "Internal server error"
            });
        }
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            var user = new Users({
                name: name,
                username: username,
                password: hash
            });
            user.save(function(err) {
            if (err && err.code == 11000) {
                return res.status(500).json({
                        message: 'Username already exists'
                    });
                }
                else if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                return res.status(201).json({});
            });
        });
    });
});

app.put('/users/:id', function(req, res) {
    if (req.params.id !== req.body._id) {
        return res.status(400).send();
    } 
    Users.findOne({_id: req.params.id}, function(err, item){
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        item.residence = req.body.residence;
        item.experienceLevel = req.body.experienceLevel;
        item.gear = req.body.gear;
        item.picture.data = req.body.picture.data;
        item.picture.contentType = req.body.picture.contentType;
        item.email = req.body.email;
        item.save(function(err) {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(201).json(item);
            }
        });
    });
});

app.delete('/users/:id', function(req, res) {
    var id = req.params.id
    Users.findByIdAndRemove(id, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
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


