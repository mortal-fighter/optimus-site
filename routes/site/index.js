'use strict';

const router = require('express').Router();

router.get('/', function(req, res, next) {
	res.render('site/homepage');
});

router.get('/home', function(req, res, next) {
	res.render('site/homepage');
});

router.get('/about', function(req, res, next) {
	res.render('site/about');
});

router.get('/schedule', function(req, res, next) {
	res.render('site/schedule');
});

router.get('/prices', function(req, res, next) {
	res.render('site/prices');
});

router.get('/contacts', function(req, res, next) {
	res.render('site/contacts');
});

router.get('/news', reqiure('./news'));

router.use(function(req, res) {
	res.render('admin/page_not_found');
});

module.exports = router;