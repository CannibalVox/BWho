var config = require('../../config.js');
var url = require('url');
var redisUrl   = url.parse(config.redis.host);
var rclient = require("redis").createClient(redisUrl.port, redisUrl.hostname, {no_ready_check: true});
var redisPassword = redisUrl.auth.split(":")[1];
rclient.auth(redisPassword);
rclient.on('error', function(error) {
	console.log(error);
});

module.exports = rclient;