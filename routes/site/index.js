'use strict';

const router = require('express').Router();
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');
const connectionPromise = require('../../components/connectionPromise.js');
const logger = require('log4js').getLogger();

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
	var schedule = null;
	var prices = null;

	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT html FROM schedule WHERE id = 1;`;
		return db.queryAsync(sql);	
	}).then(function(rows) {
		schedule = rows[0];
		var sql = `SELECT html FROM prices WHERE id = 1;`;
		return db.queryAsync(sql);
	}).then(function(rows) {
		prices = rows[0];
		res.render('site/schedule', {
			menu: req.menuGenerated,
			scheduleOnce: schedule,
			pricesOnce: prices
		});
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		res.status(500).send('Внутренняя ошибка сервера');
	})
});

router.get('/contacts', function(req, res, next) {
	res.render('site/contacts', {
		menu: req.menuGenerated
	});
});

router.use('/news', require('./news'));

router.use('/photos', require('./photos'));

router.use('/interesting', require('./interesting'));

router.use(function(req, res) {
	logger.warn(`path '${req.originalUrl}' was not found`);
	res.render('admin/page_not_found');
});

module.exports = router;