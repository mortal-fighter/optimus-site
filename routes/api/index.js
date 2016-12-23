'use strict';

const router = require('express').Router();
const Promise = require('bluebird');

router.use('/news', require('./news'));

router.use('/sendmail', require('./sendmail'));

router.use(function(req, res) {
	res.render('page_not_found');
});

module.exports = router;