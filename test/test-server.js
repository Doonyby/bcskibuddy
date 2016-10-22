var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var Users = require('../models/user.js');
var Tours = require('../models/tour.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('bcskibuddy', function() {
    it('should display login page on GET', function(done) {
    	chai.request(app)
    		.get('/')
    		.end(function(err, res) {
    			res.should.have.status(200);
    			res.should.be.html;
    			done();
    		});
    });
    it('should display user home page GET User', function(done) {
    	chai.request(app)
    		.get('/user')
    		.end(function(err, res) {
    			res.should.have.status(200);
    			res.should.be.html;
    			done();
    		});
    });
    it('should display info page on GET Info', function(done) {
    	chai.request(app)
    		.get('/info')
    		.end(function(err, res) {
    			res.should.have.status(200);
    			res.should.be.html;
    			done();
    		});
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Users.create({username: 'GilesBarnet', password: 'Gilesthethird', name: 'Giles'},
                        {username: 'MilesBarnet', password: 'Milesthethird', name: 'Miles'},
                        {username: 'NilesBarnet', password: 'Nilesthethird', name: 'Niles'}, function() {
                done();
            });
        });
    });
    it('should retrieve user on GET', function(done) {
        chai.request(app)
            .get('/users/' + 'GilesBarnet')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.username.should.be.a('string');
                res.body.username.should.equal('GilesBarnet');
                res.body.password.should.equal('Gilesthethird');
                res.body.name.should.equal('Giles');
                res.body.should.have.property('_id');
                res.body.should.have.property('username');
                res.body.should.have.property('password');
                res.body.should.have.property('name');
                res.body.password.should.be.a('string');
                done();
            });
    });
    after(function(done) {
        Users.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Users.create({username: 'GilesBarnet', password: 'Gilesthethird', name: 'Giles'},
                        {username: 'MilesBarnet', password: 'Milesthethird', name: 'Miles'},
                        {username: 'NilesBarnet', password: 'Nilesthethird', name: 'Niles'}, function() {
                done();
            });
        });
    });
    it('should add a user on POST', function(done) {
        chai.request(app)
            .post('/users')
            .send({username: 'LilesBarnet', password: 'Lilesthethird', name: 'Liles'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Liles');
                res.body.password.should.be.a('string');
                done();
            });
    });
    after(function(done) {
        Users.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Users.create({username: 'GilesBarnet', password: 'Gilesthethird', name: 'Giles', _id: '580aa2afa0d976984f893207'},
                        {username: 'MilesBarnet', password: 'Milesthethird', name: 'Miles', _id: '580aa2afa0d976984f8932e9'},
                        {username: 'NilesBarnet', password: 'Nilesthethird', name: 'Niles', _id: '580aa2afa0d976984f8932j4'}, function(err, items) {
                done();
            });
        });
    });
    it('should edit an user on put given an id', function(done) {
            var user = {
                'name': 'GilesBarnetTheThird',
                'residence': 'Salt Lake City',
                'experienceLevel': 'Very',
                'gear': 'No',
                'picture': {
                    'data': './public/images/Portrait_placeholder.png',
                    'contentType': null
                },
                'email': 'trudy@dsadsd',
                '_id': '580aa2afa0d976984f893207',
            }
            chai.request(app)
            .put('/users/580aa2afa0d976984f893207')
            .send(user)
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body._id.should.equal('580aa2afa0d976984f893207')
                res.body.should.have.property('residence');
                res.body.should.have.property('email');
                res.body.name.should.equal('GilesBarnetTheThird');
                res.body.residence.should.equal('Salt Lake City');
                done();
            });
    });
    after(function(done) {
        Users.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Users.create({username: 'GilesBarnet', password: 'Gilesthethird', name: 'Giles', _id: '580aa2afa0d976984f893207'},
                        {username: 'MilesBarnet', password: 'Milesthethird', name: 'Miles', _id: '580aa2afa0d976984f8932e9'},
                        {username: 'NilesBarnet', password: 'Nilesthethird', name: 'Niles', _id: '580aa2afa0d976984f8932j4'}, function(err, items) {
                done();
            });
        });
    });
    it('should delete a user on delete', function(done) {
        chai.request(app)
            .delete('/users/580aa2afa0d976984f893207')
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.name.should.equal('Giles');
                done();
            });
    });
    after(function(done) {
        Users.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Tours.create({createdBy: 'GilesBarnet', 
                            location: 'Moab', 
                            area: 'Pine cone ridge',
                            date: '10/30/16', 
                            time: '5:00am',
                            difficulty: 'hard', 
                            comments: [{username:'Miles', comment: 'This will be good.'}],
                            usersGoing: ['NilesBarnet', 'GilesBarnet']}, function() {
                done();
            });
        });
    });
    it('should add a tour on POST', function(done) {
        chai.request(app)
            .post('/tours')
            .send({createdBy: 'MilesBarnet', 
                    location: 'Ogden', 
                    area: 'Powder Mountain',
                    date: '10/22/16', 
                    time: '5:00 am', 
                    difficulty: 'easy',
                    comments: [{username: 'MilesBarnet', comment: 'Hi there!'}, {username: 'GilesBarnet', comment: 'Why hello!'}],
                    usersGoing: ['MilesBarnet', 'GilesBarnet', 'NilesBarnet']})
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('createdBy');
                res.body.should.have.property('_id');
                res.body.time.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.createdBy.should.equal('MilesBarnet');
                res.body.comments.should.be.a('array');
                res.body.comments.should.have.length(2);
                res.body.usersGoing.should.have.length(3);
                res.body.comments[0].should.be.a('object');
                done();
            });
    });
    after(function(done) {
        Tours.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Tours.create({createdBy: 'GilesBarnet', 
                            location: 'Moab', 
                            area: 'Pine cone ridge',
                            date: '10/30/16', 
                            time: '5:00am',
                            difficulty: 'hard', 
                            comments: [{username:'Miles', comment: 'This will be good.'}],
                            usersGoing: ['NilesBarnet', 'GilesBarnet']}, 
                        {createdBy: 'MilesBarnet', 
                            location: 'Ogden', 
                            area: 'Powder Mountain',
                            date: '10/22/16', 
                            time: '5:00 am', 
                            difficulty: 'easy',
                            comments: [{username: 'MilesBarnet', comment: 'Hi there!'}, {username: 'GilesBarnet', comment: 'Why hello!'}],
                            usersGoing: ['MilesBarnet', 'GilesBarnet', 'NilesBarnet']}, function() {
                done();
            });
        });
    });
    it('should retrieve a tour by location on GET', function(done) {
        chai.request(app)
            .get('/tours/searchLocation/' + 'Ogden')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].location.should.equal('Ogden');
                res.body[0].createdBy.should.equal('MilesBarnet');
                res.body[0].comments.should.have.length(2);
                res.body[0].should.have.property('_id');
                done();
            });
    });
    after(function(done) {
        Tours.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Tours.create({createdBy: 'GilesBarnet', 
                            location: 'Moab', 
                            area: 'Pine cone ridge',
                            date: '10/30/16', 
                            time: '5:00am',
                            difficulty: 'hard', 
                            comments: [{username:'Miles', comment: 'This will be good.'}],
                            usersGoing: ['NilesBarnet', 'GilesBarnet']}, 
                        {createdBy: 'MilesBarnet', 
                            location: 'Ogden', 
                            area: 'Powder Mountain',
                            date: '10/22/16', 
                            time: '5:00 am', 
                            difficulty: 'easy',
                            comments: [{username: 'MilesBarnet', comment: 'Hi there!'}, {username: 'GilesBarnet', comment: 'Why hello!'}],
                            usersGoing: ['MilesBarnet', 'GilesBarnet', 'NilesBarnet']}, function() {
                done();
            });
        });
    });
    it('should retrieve a tour by createdBy on GET', function(done) {
        chai.request(app)
            .get('/tours/userCreated/' + 'MilesBarnet')
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].location.should.equal('Ogden');
                res.body[0].createdBy.should.equal('MilesBarnet');
                res.body[0].comments.should.have.length(2);
                res.body[0].should.have.property('_id');
                done();
            });
    });
    after(function(done) {
        Tours.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Tours.create({createdBy: 'GilesBarnet', 
                            location: 'Moab', 
                            area: 'Pine cone ridge',
                            date: '10/30/16', 
                            time: '5:00am',
                            difficulty: 'hard', 
                            comments: [{username:'Miles', comment: 'This will be good.'}],
                            usersGoing: ['NilesBarnet', 'GilesBarnet']}, 
                        {createdBy: 'MilesBarnet', 
                            location: 'Ogden', 
                            area: 'Powder Mountain',
                            date: '10/22/16', 
                            time: '5:00 am', 
                            difficulty: 'easy',
                            comments: [{username: 'MilesBarnet', comment: 'Hi there!'}, {username: 'GilesBarnet', comment: 'Why hello!'}],
                            usersGoing: ['MilesBarnet', 'GilesBarnet', 'NilesBarnet']}, function() {
                done();
            });
        });
    });
    it('should retrieve a tour by userJoined on GET', function(done) {
        chai.request(app)
            .get('/tours/userJoined/' + 'GilesBarnet')
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].location.should.equal('Moab');
                res.body[1].createdBy.should.equal('MilesBarnet');
                res.body[0].comments.should.have.length(1);
                res.body[0].should.have.property('_id');
                done();
            });
    });
    after(function(done) {
        Tours.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Tours.create({createdBy: 'GilesBarnet', 
                            location: 'Moab', 
                            area: 'Pine cone ridge',
                            date: '10/30/16', 
                            time: '5:00am',
                            difficulty: 'hard', 
                            comments: [{username:'Miles', comment: 'This will be good.'}],
                            usersGoing: ['NilesBarnet', 'GilesBarnet'],
                            _id: '580adb144cb243993ca55ddf'}, function() {
                done();
            });
        });
    });
    it('should edit a tour by joining user on put given an id', function(done) {
            chai.request(app)
            .put('/tours/joinTour/580adb144cb243993ca55ddf')
            .send({username: 'MilesBarnet'})
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body._id.should.equal('580adb144cb243993ca55ddf');
                res.body.usersGoing.should.have.length(3);
                res.body.usersGoing[2].should.equal('MilesBarnet');
                done();
            });
    });
    after(function(done) {
        Tours.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Tours.create({createdBy: 'GilesBarnet', 
                            location: 'Moab', 
                            area: 'Pine cone ridge',
                            date: '10/30/16', 
                            time: '5:00am',
                            difficulty: 'hard', 
                            comments: [{username:'Miles', comment: 'This will be good.'}],
                            usersGoing: ['NilesBarnet', 'GilesBarnet'],
                            _id: '580adb144cb243993ca55ddf'}, function() {
                done();
            });
        });
    });
    it('should edit a tour by user leaving on put given an id', function(done) {
            chai.request(app)
            .put('/tours/leaveTour/580adb144cb243993ca55ddf')
            .send({username: 'NilesBarnet'})
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body._id.should.equal('580adb144cb243993ca55ddf');
                res.body.usersGoing.should.have.length(1);
                res.body.usersGoing[0].should.equal('GilesBarnet');
                done();
            });
    });
    after(function(done) {
        Tours.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Tours.create({createdBy: 'GilesBarnet', 
                            location: 'Moab', 
                            area: 'Pine cone ridge',
                            date: '10/30/16', 
                            time: '5:00am',
                            difficulty: 'hard', 
                            comments: [{username:'Miles', comment: 'This will be good.'}],
                            usersGoing: ['NilesBarnet', 'GilesBarnet'],
                            _id: '580adb144cb243993ca55ddf'}, function() {
                done();
            });
        });
    });
    it('should edit a tour by adding comment on put given an id', function(done) {
            chai.request(app)
            .put('/tours/addComment/580adb144cb243993ca55ddf')
            .send({username: 'GilesBarnet', comment: 'I am adding a comment'})
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('_id');
                res.body._id.should.equal('580adb144cb243993ca55ddf');
                res.body.comments.should.have.length(2);
                res.body.comments[0].should.be.a('object');
                res.body.comments[1].username.should.equal('GilesBarnet');
                res.body.comments[0].username.should.equal('Miles');
                done();
            });
    });
    after(function(done) {
        Tours.remove(function() {
            done();
        });
    });
});

describe('bcskibuddy', function() {
    before(function(done) {
        server.runServer(function() {
            Tours.create({createdBy: 'GilesBarnet', 
                            location: 'Moab', 
                            area: 'Pine cone ridge',
                            date: '10/30/16', 
                            time: '5:00am',
                            difficulty: 'hard', 
                            comments: [{username:'Miles', comment: 'This will be good.'}],
                            usersGoing: ['NilesBarnet', 'GilesBarnet'],
                            _id: '580adb144cb243993ca55ddf'}, 
                        {createdBy: 'MilesBarnet', 
                            location: 'Ogden', 
                            area: 'Powder Mountain',
                            date: '10/22/16', 
                            time: '5:00 am', 
                            difficulty: 'easy',
                            comments: [{username: 'MilesBarnet', comment: 'Hi there!'}, {username: 'GilesBarnet', comment: 'Why hello!'}],
                            usersGoing: ['MilesBarnet', 'GilesBarnet', 'NilesBarnet'],
                            _id: '580adb144cb243993ca55dgf'}, function(err, items) {
                done();
            });
        });
    });
    it('should delete a tour by id on DELETE', function(done) {
        chai.request(app)
            .delete('/tour/deleteTour/580adb144cb243993ca55ddf')
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body._id.should.equal('580adb144cb243993ca55ddf');
                res.body.createdBy.should.equal('GilesBarnet');
                res.body.comments.should.have.length(1);
                res.body.should.have.property('_id');
                done();
            });
    });
    after(function(done) {
        Tours.remove(function() {
            done();
        });
    });
});