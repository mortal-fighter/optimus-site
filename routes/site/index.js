'use strict';

const router = require('express').Router();
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');
const connectionPromise = require('../../components/connectionPromise.js');

router.use(function(req, res, next) {
	req.menuGenerated = myutil.menuGenerate(menu.menuSite, req);
	next();
});

router.get('/', require('./homepage'));

router.get('/about', function(req, res, next) {
	res.render('site/about', {
		menu: req.menuGenerated
	});
});

router.get('/schedule', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT html FROM schedule WHERE id = 1;`;
		console.log(sql);
		return db.queryAsync(sql);	
	}).then(function(rows) {
		res.render('site/schedule', {
			menu: req.menuGenerated,
			scheduleOnce: rows[0] 
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.status(500).send('Внутренняя ошибка сервера');
	})
});

router.get('/prices', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT html FROM prices WHERE id = 1;`;
		console.log(sql);
		return db.queryAsync(sql);	
	}).then(function(rows) {
		res.render('site/prices', {
			menu: req.menuGenerated,
			pricesOnce: rows[0] 
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.status(500).send('Внутренняя ошибка сервера');
	})
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

router.use(function(req, res) {
	res.render('admin/page_not_found');
});

module.exports = router;