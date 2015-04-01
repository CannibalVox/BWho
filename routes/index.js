var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (!req.user)
  		res.render('welcome', { title: 'Welcome', user: req.user, view: 'welcome' });
  	else
  		res.redirect('/dashboard');
});

router.get('/contact', function(req, res, next) {
	res.render('contact', { title: 'Contact', user: req.user, view: 'contact' });
});

module.exports = router;
