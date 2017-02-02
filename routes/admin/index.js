'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const logger = require('log4js').getLogger();

router.use(function(req, res, next) {
	Promise.resolve().then(function() {
		if (req.cookies['34ma8R'] === 'QCMcpz') {
			req.isAuth = true;
		} else {
			req.isAuth = false;
		}
		next();
	}).catch(function(err) {
		logger.error(err);
		next();
	});
});

router.use('/news', require('./news'));

router.use('/schedule', require('./schedule'));

router.use('/prices', require('./prices'));

router.use('/', require('./login'));

router.use(function(req, res) {
	logger.warn(`path '${req.originalUrl}' was not found`);
	res.render('site/page_not_found');
});

module.exports = router;