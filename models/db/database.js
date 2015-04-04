var pg = require('pg');
var config = require('../../config.js');

var database = {
	open: function(callback) {
		pg.connect(config.postgre.connection, callback);
	},
	checkError: function(error, client, done) {
		if (!error) return false;

		done(client);
		console.error(error);
		return true;
	}
};

module.exports = database;