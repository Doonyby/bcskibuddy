exports.DATABASE_URL = process.env.DATABASE_URL || 
						global.DATABASE_URL ||
						(process.env.NODE_ENV === 'production' ?
							'mongodb://<doonyby@gmail.com>:<Doonyby21>@ds035177.mlab.com:35177/bcskibuddy' :
							'mongodb://localhost/bcskibuddy-dev');
exports.PORT = process.env.PORT || 8080;