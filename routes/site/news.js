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
	var news = null;

	connectionPromise().then(function(connection) {
		db = connection;
		return db.queryAsync(`
							SELECT count(*) as count FROM info_types 
							WHERE id = ${req.params.category};`
		).then((results) => {
			if (results[0].count === 0) {
				throw new Error(`Parameters validation: There is no such category '${req.params.cagetory}'`);
			}

			const query = `	SELECT id, title, text_short, text_full, info_types_id,
								DATE_FORMAT(CAST(date_created AS CHAR), '%d.%m.%Y') date_created,
								DATE_FORMAT(CAST(date_published AS CHAR), '%d.%m.%Y') date_published,
								date_created sort 
							FROM info_units 
							WHERE date_deleted IS NULL 
								AND date_published IS NOT NULL
								AND info_types_id = ${req.params.category}
							ORDER BY sort DESC;`;
			return db.queryAsync(query);
		}).then((rows) => {	
			news = rows;
			
			var idsList = '';
			for (var i = 0, len = rows.length; i < len; i++) {
				idsList += rows[i].id;
				if (i !== len - 1) {
					idsList += ',';
				}
			}

			const query = `	SELECT src_small, info_unit_id, width, height
							FROM info_units_photos
							WHERE info_unit_id IN (${idsList})
							AND date_deleted IS NULL;`;

			return db.queryAsync(query);
		}).then((rows) => {
			res.render('site/news.pug', {
				news: news,
				photos: rows,
				menu: req.menuGenerated
			});
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		next();
	});
});

router.get('/:id(\\d+)', function(req, res, next) {
	var db = null;
	var newsOnce = null;
	var photos = null;

	connectionPromise().then(function(connection) {
		db = connection
		return db.queryAsync(`
			SELECT title, text_short, text_full, 
			DATE_FORMAT(CAST(date_published AS CHAR), '%d.%m.%Y') date_published,
			DATE_FORMAT(CAST(date_created AS CHAR), '%d.%m.%Y') date_created 
			FROM info_units WHERE id = ${req.params.id}`);
	}).then(function(rows) {	
		newsOnce = rows[0];
		return db.queryAsync(`
			SELECT id, src_small, src_big, width, height
			FROM info_units_photos
			WHERE info_unit_id = ${req.params.id} AND date_deleted is NULL;`);
	}).then(function(rows) {
		photos = rows;
		res.render('_news_once.pug', {
			newsOnce: newsOnce,
			photos: photos
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});

module.exports = router;