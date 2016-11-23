'use strict';

const router = require('express').Router();
const Promise = require('bluebird');

router.use(function(req, res, next) {
	Promise.resolve().then(function() {
		if (req.cookies['34ma8R'] === 'QCMcpz') {
			req.isAuth = true;
		} else {
			req.isAuth = false;
		}
		next();
	}).catch(function(err) {
		console.log(err);
		next();
	});
});

router.use('/news', require('./news'));

router.use('/', require('./login'));

router.use(function(req, res) {
	res.render('site/page_not_found');
});

module.exports = router;