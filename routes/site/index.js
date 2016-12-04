'use strict';

const router = require('express').Router();
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');

router.use(function(req, res, next) {
	req.menuGenerated = myutil.menuGenerate(menu.menuSite, req);
	next();
});

router.get('/', function(req, res, next) {
	res.render('site/homepage', {
		menu: req.menuGenerated
	});
});

router.get('/home', function(req, res, next) {
	res.render('site/homepage', {
		menu: req.menuGenerated
	});
});

router.get('/about', function(req, res, next) {
	res.render('site/about', {
		menu: req.menuGenerated
	});
});

router.get('/schedule', function(req, res, next) {
	res.render('site/schedule', {
		menu: req.menuGenerated
	});
});

router.get('/prices', function(req, res, next) {
	res.render('site/prices', {
		menu: req.menuGenerated
	});
});

router.get('/contacts', function(req, res, next) {
	res.render('site/contacts', {
		menu: req.menuGenerated
	});
});

router.get('/partners', function(req, res, next) {
	res.render('site/partners', {
		menu: req.menuGenerated
	});
});

router.use('/news', require('./news'));

router.use('/photos', require('./photos'));

router.get('/test1', function(req, res, next) {
	
});

router.use(function(req, res) {
	res.render('admin/page_not_found');
});

module.exports = router;