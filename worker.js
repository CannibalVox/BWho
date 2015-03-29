require('newrelic');

var config = require('./config');
var express = require('express');
var redis = require('redis');
var request = require('request');
var crypto = require('crypto');
var async = require('async');
var url = require('url');
var _ = require('underscore');
var winston = require('winston');
var bull = require('bull');

var redisUrl   = url.parse(config.redis.host);
var rclient = require("redis").createClient(redisUrl.port, redisUrl.hostname, {no_ready_check: true});
rclient.auth(redisUrl.auth.split(":")[1]);

// var q = kue.createQueue({
//   prefix: 'q',
//   redis: {
//     port: config.redis.port,
//     host: config.redis.host
//   }
// });

var logger = new (winston.Logger)({
	transports: [
	  new (winston.transports.Console)({ level: config.logging_level })
	]
});

function log(level, system, msg, meta) {
	if (config.logging && config.logging != 0) {
		
		if (meta) {
			logger.log(level, '[API][' + system + '] ' + msg, meta);
		} else {
			logger.log(level, '[API][' + system + '] ' + msg);
		}	
	}
}