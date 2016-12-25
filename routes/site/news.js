'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const connectionPromise = require('../../components/connectionPromise.js');
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');

router.get('/', function(req, res, next) { 
	res.redirect('/news/category/1');
});

router.get('/category/:category(\\d+)', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		return db.queryAsync(`
							SELECT count(*) as count FROM info_types 
							WHERE id = ${req.params.category};`
		).then((results) => {
			if (results[0].count === 0) {
				throw new Error(`Parameters validation: There is no such category '${req.params.cagetory}'`);
			}

			const query = `	SELECT id, title, text_short, text_full, is_published, info_types_id,
								DATE_FORMAT(CAST(date_created AS CHAR), '%d.%m.%Y') date_created,
								DATE_FORMAT(CAST(date_published AS CHAR), '%d.%m.%Y') date_published 
							FROM info_units 
							WHERE date_deleted IS NULL 
								AND is_published = 1
								AND info_types_id = ${req.params.category}
							ORDER BY date_published DESC;`;
			return db.queryAsync(query);
		}).then((rows) => {	
			res.render('site/news.pug', {
				news: rows,
				menu: req.menuGenerated
			});
		})
	}).catch(function(err) {
		console.log(err.message, err.stack);
		next();
	});
});

router.get('/:id(\\d+)', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection
		return db.queryAsync(`
			SELECT title, date_published, text_short, text_full 
			FROM info_units WHERE id = ${req.params.id}`);
	}).then(function(rows) {	
		res.render('_news_once.pug', {
			newsOnce: rows[0]
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});

module.exports = router;