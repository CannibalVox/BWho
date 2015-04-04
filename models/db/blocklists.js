var database = require('./database.js');

var blocklist_db = {
	getForUser: function(userId, callback) {
		var conn = database.open(function(error, client, done) {
			if (database.checkError(error, client, done)) {
				callback(error, null);
				return;
			}

			client.query('SELECT id, title FROM blocklists WHERE user_id=$1', [userId], function(err, result) {
				if (database.checkError(error, client, done)) {
					callback(error, null);
					return;
				}

				done();
				callback(error, result.rows);
			});
		});
	}
};

module.exports = blocklist_db;