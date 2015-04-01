var express = require('express');
var stormpath = require('express-stormpath');
var form = require('express-form');
var filter = form.filter;
var validate = form.validate;
var router = express.Router();
var csurf = require('csurf');
var csrfProtection = csurf({cookie:true});

/* GET home page. */
router.get('/', stormpath.loginRequired, csrfProtection, function(req, res, next) {
	res.render('account/account', { title: 'Account', user: req.user, view:'account', csrfToken: req.csrfToken() });
});

router.post('/update-password', stormpath.loginRequired, csrfProtection,
	form(
		filter('oldPassword', 'Current Password').required(),
		filter('password', 'Password').required(),
		filter('confirmPassword', 'Confirm Password').equals('field::password', 'Confirm Password is not the same as Password.')
	),
	function(req, res) {
		if (!req.form.isValid)
			res.send(JSON.stringify({error:req.form.errors[0]}));
		else {
			if (req.app.get('stormpathApplication').authenticateAccount({
				username: req.user.username,
				password: req.form.oldPassword
			}, function(err, result) {
				if (err) {
					res.send(JSON.stringify({error:err.userMessage}));
				} else {
					req.user.password = req.form.password
					req.user.save(function(err, userMessage) {
						if (err) {
							res.send(JSON.stringify({error:err.userMessage}));
						} else {
							res.send(JSON.stringify({redirect:'/account'}));
						}
					});
				}
			}));
		}
	});

router.post('/delete', stormpath.loginRequired, csrfProtection,
	form(
		filter('deleteConfirm', 'Delete Confirmation').required().equals('I\'ll miss you!')
	),
	function(req, res) {
		res.url = '/account';
		if (!req.form.isValid)
			res.render('account/account', {title: 'Account', user: req.user, view: 'account', delete_error:req.form.errors[0]});
		else {
			req.user.delete(function(err) {
				if (err) {
					res.render('account/account', {title: 'Account', user: req.user, view: 'account', delete_error:err.userMessage})
				} else {
					res.redirect('/logout')
				}
			});
		}
	});

module.exports = router;
