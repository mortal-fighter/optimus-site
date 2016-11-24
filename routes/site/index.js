'use strict';

const router = require('express').Router();
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');

router.use(function(req, res, next) {
	req.menuGenerated = myutil.menuGenerate(menu.menuSite, req);
	next();
});

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

router.use('/news', require('./news'));

router.use(function(req, res) {
	res.render('admin/page_not_found');
});

module.exports = router;