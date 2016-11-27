'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const mysql = require('mysql');
const config = require('../../config/common.js');
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');

//todo: what will be if error happends?
const connection = Promise.promisifyAll(mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: config.database.database
}));

router.get('/', function(req, res, next) { 
	res.redirect('/news/category/1');
});

router.get('/category/:category(\\d+)', function(req, res, next) {
	Promise.resolve().then(() => {
		return connection.queryAsync(`
							SELECT count(*) as count FROM info_types 
							WHERE id = ${req.params.category};`
		).then((results) => {
			if (results[0].count === 0) {
				throw new Error(`Parameters validation: There is no such category '${req.params.cagetory}'`);
			}
			return connection.queryAsync(`	
								SELECT id, title, text_short, text_full, is_published, info_types_id
								FROM info_units 
								WHERE date_deleted IS NULL 
									AND is_published = 1
									AND info_types_id = ${req.params.category}
								ORDER BY date_published DESC;`);
		}).catch(function(err) {
			next(); // -> 404 page
		});

		
	}).then((rows) => {	
		res.render('site/news.pug', {
			news: rows,
			menu: req.menuGenerated
		});

	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});

router.get('/:id(\\d+)', function(req, res, next) {
	Promise.resolve().then(function() {
		return connection.queryAsync(`
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