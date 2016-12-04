'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const db = require('../../components/db.js')

router.get('/type/:type(\\d+)', function(req, res, next) {
	Promise.resolve().then(function() {
		return db.queryAsync(`	
SELECT id, title, text_short, text_full, is_published, info_types_id
FROM info_units 
WHERE date_deleted IS NULL 
	AND is_published = 1
	AND info_types_id = ${req.params.type}
ORDER BY date_published DESC`);
	}).then(function(rows) {	
		res.render('_news_by_cat.pug', {
			news: rows
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});

router.get('/:id(\\d+)', function(req, res, next) {
	Promise.resolve().then(function() {
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