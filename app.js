var config = require('./config');
var express = require('express');
var redis = require('redis');
var request = require('request');
var crypto = require('crypto');
var async = require('async');
var url = require('url');
var _ = require('underscore');
var logger = require('morgan');
var bull = require('bull');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

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

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;