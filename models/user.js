var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	residence: {
		type: String
	},
	experienceLevel: {
		type: String
	},
	gear: {
		type: String
	},
	picture: {
		data: Buffer,
		contentType: String
	},
	email: {
		type: String
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;