var config = require('./config');
var express = require('express');
var stormpath = require('express-stormpath');
var logger = require('morgan');
var bull = require('bull');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var dashboard = require('./routes/dashboard');
var account = require('./routes/account');

var rclient = require('./models/cache/cache.js');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(stormpath.init(app, {
  secretKey: config.stormpath.session_secret,
  cache: 'redis',
  cacheClient: rclient,
  enableAutoLogin: true,
  enableGivenName:false,
  requireGivenName:false,
  enableSurname:false,
  requireSurname:false,
  enableConfirmPassword:true,
  requireConfirmPassword:true,
  enableFacebook:true,
  enableGoogle:true,
  enableForgotPassword:true,
  enableAccountVerification:true,
  expandProviderData:true,
  social: {
    facebook: {
      appId: config.facebook.appId,
      appSecret: config.facebook.secret
    },
    google: {
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret
    }
  }
}));

app.use('/', routes);
app.use('/dashboard', dashboard);
app.use('/account', account);

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