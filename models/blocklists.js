var database = require('./db/blocklists.js');
var cache = require('./cache/blocklists.js');
var model = require('./model.js');

function Blocklist(row) {
	this.id = row.id;
	this.title = row.title;
}

Blocklist.protoype = {

};

function getIdFromAccount(user) {
	var lastIndex = user.href.lastIndexOf('/');
	return user.href.substring(lastIndex+1);

}

var blocklist_model = {
	getForUser: function(user, finalCallback) {
		var userId = getIdFromAccount(user);

		return model.cacheAndDatabaseList(
			function(callback) {
				cache.getForUser(userId, callback);
			},
			function(callback) {
				return database.getForUser(userId, callback);
			},
			function(data, callback) {
				callback(null, new Blocklist(data));
			},
			function(results) {
				cache.saveForUser(userId, results);
			},
			finalCallback
		);
	}
};

module.exports = blocklist_model;