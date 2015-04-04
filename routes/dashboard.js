var express = require('express');
var stormpath = require('express-stormpath');
var router = express.Router();
var blocklists = require('../models/blocklists.js');

/* GET home page. */
router.get('/', stormpath.loginRequired, function(req, res, next) {
	blocklists.getForUser(req.user, function(err, results) {
		res.render('dashboard', { title: 'Dashboard', user: req.user, view:'dashboard', blocklists:results });
	});
});

module.exports = router;
