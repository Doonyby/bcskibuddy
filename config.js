exports.DATABASE_URL = process.env.DATABASE_URL || 
						global.DATABASE_URL ||
						(process.env.NODE_ENV === 'production' ?
							'mongodb://heroku_pxdljgjq:7h6vnof1rcnkhrdl136m39hr3g@ds151137.mlab.com:51137/heroku_pxdljgjq' :
							'mongodb://localhost/bcskibuddy-dev');
exports.PORT = process.env.PORT || 8080;