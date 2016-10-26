var mongoose = require('mongoose');

var TourSchema = new mongoose.Schema({
	createdBy: {
		type: String,
		required: true
	},	
	location: {
		type: String,
		required: true
	},
	area: {
		type: String
	},
	date: {
		type: Date,
		required: true
	},
	time: {
		type: String
	},
	difficulty: {
		type: String
	},
	comments: {
		type: Array
	},
	usersGoing: {
		type: Array
	}
});

var Tour = mongoose.model('Tour', TourSchema);
module.exports = Tour;
