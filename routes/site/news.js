'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const connectionPromise = require('../../components/connectionPromise.js');
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');
const logger = require('log4js').getLogger();

router.get('/', function(req, res, next) { 
	res.redirect('/news/category/1/page/1');
});

router.get('/category/:category(\\d+)/page/:page(\\d+)', function(req, res, next) {
	var db = null;
	var news = null;
	var countRows = null;

	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `	SELECT COUNT(*) num_rows
					FROM info_units 
					WHERE date_deleted IS NULL 
						AND date_published IS NOT NULL
						AND info_types_id = ${req.params.category};`;
		return db.queryAsync(sql).then((results) => {
			countRows = results[0].num_rows;
			const query = `	SELECT id, title, text_short, text_full, info_types_id,
								DATE_FORMAT(CAST(date_created AS CHAR), '%d.%m.%Y') date_created,
								DATE_FORMAT(CAST(date_published AS CHAR), '%d.%m.%Y') date_published,
								date_created sort 
							FROM info_units 
							WHERE date_deleted IS NULL 
								AND date_published IS NOT NULL
								AND info_types_id = ${req.params.category}
							ORDER BY sort DESC
							LIMIT ${(req.params.page-1)*10}, 10;`;
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
				menu: req.menuGenerated,
				category: req.params.category,
				pagination: {
					currentPage: req.params.page,
					step: 10,
					totalPages: Math.trunc(countRows / 10) + 1
				}
			});
		});
	}).catch(function(err) {
		logger.error(err.message, err.stack);
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
		logger.error(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});

module.exports = router;