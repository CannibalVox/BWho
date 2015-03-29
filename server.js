require('newrelic');
var config = require('./config.js');
var app = require('./app.js');


app.listen(config.web.port);