var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('bcskibuddy', function() {
    it('should display hello world on GET', function(done) {
    	chai.request(app)
    		.get('/')
    		.end(function(err, res) {
    			res.should.have.status(200);
    			res.should.be.html;
    			done();
    		});
    });
    it('should display hello world user on GET User', function(done) {
    	chai.request(app)
    		.get('/user')
    		.end(function(err, res) {
    			res.should.have.status(200);
    			res.should.be.html;
    			done();
    		})
    })
});

