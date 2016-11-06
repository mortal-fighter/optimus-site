'use strict';

var router = require('express').Router();

router.use(function(req, res, next) {
	next();
});

router.use('/news', require('./news'));

router.use(function(req, res) {
	res.render('page_not_found');
});

module.exports = router;