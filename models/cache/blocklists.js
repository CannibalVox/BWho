var rclient = require('./cache.js');

var blocklist_cache = {
	getForUser: function(userId, callback) {
		rclient.get('blocklist.user:'+userId,function(error, value) {
			if (error || !value)
				return callback(error, undefined);

			value = JSON.parse(value);
			return callback(null, value);
		});
	},
	saveForUser: function(userId, value) {
		rclient.set('blocklist.user:'+userId,JSON.stringify(value));
		rclient.expire('blocklist.user:'+userId,120);
	}
};

module.exports = blocklist_cache;