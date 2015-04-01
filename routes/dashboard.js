var express = require('express');
var stormpath = require('express-stormpath');
var router = express.Router();

/* GET home page. */
router.get('/', stormpath.loginRequired, function(req, res, next) {
	res.render('dashboard', { title: 'Dashboard', user: req.user, view:'dashboard' });
});

module.exports = router;
