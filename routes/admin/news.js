'use strict';

var router = require('express').Router();

router.get('/', function(req, res, next) {
	res.render('admin_news_startup');
});

router.get('startup', function(req, res, next) {
	next();
});

router.get('create', function(req, res, next) {
	
});

router.post('/', function(req, res, next) {

});

module.exports = router;