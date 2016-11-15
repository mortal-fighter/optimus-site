'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const config = require('../../config/common.js');
const menuConfig = require('../../config/menu.js');
const mysql = require('mysql');
const myUtil = require('../../components/myUtil.js');

var menuGenerated;

function validateNews(news) {
	if (!news.title) {
		throw new Error(`Parameters validation error: ${news.title}.`);
	}
	
	if (news.title.length > 120) {
		throw new Error(`Parameters validation error: textTitle.Length = ${news.textTitle.length}.`);
	} 

	if (news.textShort.length > 120) {
		throw new Error(`Parameters validation error: textShort.Length = ${news.textShort.length}.`);
	}		

	if (!news.textFull) {
		throw new Error(`Parameters validation error: textFull = ${news.textFull}.`);
	}
	
	if (news.textFull.length > 300) {
		throw new Error(`Parameters validation error: textFull.Length = ${news.textFull.length}.`);
	}	

	if (!news.isPublished) {
		throw new Error(`Parameters validation error: isPublished = ${news.isPublished}.`);
	}
}

//todo: what will be if error happends?
const connection = Promise.promisifyAll(mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: config.database.database
}));

router.all('*', function(req, res, next) {
	menuGenerated = myUtil.menuGenerate(menuConfig.menuAdmin, req);
	

	// The following processes data, received from the form into sql query values
	var obj = req.body;
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			//convert 'true'/'false' into 1/0 (checkbox values in mind...)
			switch (obj[key]) {
				case 'true':
					obj[key] = 1;
					break;
				case 'false':
					obj[key] = 0;
					break;
			}

			//convert blank strings into 'NULL's
			if (obj[key].length === 0) {
				obj[key] = 'NULL';	
			} 

			//escaping all, except 'NULL', into single quotes, preparing it for sql query
			if (obj[key] !== 'NULL') {
				obj[key] = '\'' + obj[key] + '\'';
			}
		
		}
	}

	next();
});

router.get('/', function(req, res, next) {
	Promise.resolve().then(function() {
		return connection.queryAsync(`	SELECT id, title, text_short, text_full, is_published
										FROM info_units WHERE info_types_id = ?`, ['1']);
	}).then(function(rows) {	
		res.render('admin_news_all', {
			news: rows,
			menu: menuGenerated
		});
	}).catch(function(err) {
		console.log(err);
	});
});

router.get('/create', function(req, res, next) {
	
	res.render('admin_news_create', {
		message: '',
		messageType: 'success', 
		menu: menuGenerated
	});
});

router.post('/', function(req, res, next) {
	var isPublished;
	Promise.resolve().then(function() {
		if (req.body.title.length > 120) {
			throw new Error('Parameters validation error. Length = ' + req.body.title.length);
		} 
		if (req.body.textShort.length > 300) {
			throw new Error('Parameters validation error. Length = ' + req.body.textShort.length);
		}
		
		//todo: fix a bug
		var textShort = (req.body.title) ? '\'' + req.body.title + '\'' : 'NULL';
		isPublished = req.body.isPublished;
		var sql = `	INSERT INTO info_units (title, text_short, text_full, info_types_id, isPublished) 
					VALUES ('${req.body.title}', ${textShort}, '${req.body.textFull}', 1, ${req.body.isPublished})`;
		console.log(sql);
		return connection.queryAsync(sql);
	}).then(function() {
		var message;
		if (isPublished) {
			message = 'Новость создана и опубликована';
		} else {
			message = 'Новость создана';
		}
		res.json({
			code: 200,
			data: {
				message: message
			}
		});
	}).catch(function(err) {
		// todo: logging
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			data: {
				message: 'Новость не создана'
			}
		});
	})
});

router.put('/:id(\\d+)', function(req, res, next) {
	Promise.resolve().then(function() {	
		
		validateNews(req.body); // it'll throw an exception if validation fails

		var sql = `	UPDATE info_units 
					SET title = ${req.body.title},
						text_short = ${req.body.textShort},
						text_full = ${req.body.textFull},
						is_published = ${req.body.isPublished},
						date_updated = NOW()
					WHERE id = ${req.params.id}`;
		console.log(sql);
		
		return connection.queryAsync(sql);
	}).then(function() {
		res.json({
			code: 200,
			data: {
				message: 'Новость успешно обновлена'
			}
		});
	}).catch(function(err) {
		// todo: logging
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			data: {
				message: 'Новость не обновлена'
			}
		});
	})
});

router.delete('/:id(\\d+)', function(req, res, next) {
	Promise.resolve().then(function() {
		
		var sql = `SELECT COUNT(*) AS 'is_deleted' FROM info_units WHERE id = ${req.params.id} AND date_deleted IS NOT NULL;`;
		console.log(sql);
		
		return connection.queryAsync(sql).then(function(rows) {
			
			// if this news is already deleted, then throwing error
			if (rows[0].is_deleted > 0) {
				throw new Error('News is already deleted');
			}

			sql = `UPDATE info_units SET date_deleted = NOW() WHERE id = ${req.params.id}`;
			console.log(sql);
			
			return connection.queryAsync(sql);	
		});
	}).then(function() {
		res.json({
			code: 200,
			data: {
				message: 'Новость была удалена'
			}
		});
	}).catch(function(err) {
		// todo: logging
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			data: {
				message: 'Новость не удалена'
			}
		});
	})
});

module.exports = router;

//optimus.ru/admin/news/all
//optimus.ru/admin/news/edit 
// POST - создание новости
// PUT(id) - редактирование
// DELETE(id) - удаление

//arr.forEach(callback[, thisArg])