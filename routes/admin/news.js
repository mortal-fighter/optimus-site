'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const menuConfig = require('../../config/menu.js');
const connectionPromise = require('../../components/connectionPromise.js');
const myUtil = require('../../components/myUtil.js');

var menuGenerated;

function validateNews(news) {

	if (!news.title) {
		throw new Error(`Parameters validation error: ${news.title}.`);
	}
	
	if (news.title.length > 180) {
		throw new Error(`Parameters validation error: textTitle.Length = ${news.textTitle.length}.`);
	} 

	if (news.textShort.length > 450) {
		throw new Error(`Parameters validation error: textShort.Length = ${news.textShort.length}.`);
	}		

	if (!news.textFull) {
		throw new Error(`Parameters validation error: textFull = ${news.textFull}.`);
	}

	if (!news.isPublished) {
		throw new Error(`Parameters validation error: isPublished = ${news.isPublished}.`);
	}

	if (!news.infoTypesId) {
		throw new Error(`Parameters validation error: infoTypesId = ${news.infoTypesId}.`);	
	}
}

router.all('*', function(req, res, next) {
	if (!req.isAuth) {
		res.send('У Вас не достаточно прав для доступа к данному ресурсу.');
	}

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

	req['user'] = {};

	next();
});

router.get('/', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		return db.queryAsync(`	SELECT id, title, text_short, text_full, is_published, info_types_id
										FROM info_units WHERE date_deleted is null`);
	}).then(function(rows) {	
		res.render('admin/admin_news_all', {
			news: rows,
			menu: menuGenerated,
			message: '',
			messageType: ''
		});
	}).catch(function(err) {
		console.log(err);
	});
});

router.get('/create', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT id, name FROM info_types`;
		console.log(sql);
		return db.queryAsync(sql);
	}).then(function(infoTypes) {
		res.render('admin/admin_news_create', {
			message: '',
			messageType: '', 
			menu: menuGenerated,
			infoTypes: infoTypes
		});	
	})
});

router.get('/edit/:id(\\d+)', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT id, name FROM info_types`;
		console.log(sql);
		return db.queryAsync(sql);
	}).then(function(infoTypes) {
		req.user.infoTypes = infoTypes;
		return db.queryAsync(`	SELECT id, title, text_short, text_full, is_published, info_types_id
										FROM info_units WHERE id = ${req.params.id}`);
	}).then(function(rows) {

		if (rows.length < 1) {
			throw new Error('No news were found.')
		} else if (rows.length > 1) {
			throw new Error('Duplicate news were found');
		}

		res.render('admin/admin_news_edit', {
			message: '',
			messageType: '', 
			menu: menuGenerated,
			newsOnce: rows[0],
			infoTypes: req.user.infoTypes
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Ошибка при загрузке'
		})
	});
});

router.post('/', function(req, res, next) {
	var isPublished;
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		validateNews(req.body);	
		
		var sql = `	INSERT INTO info_units (title, text_short, text_full, info_types_id, is_published, date_created) 
					VALUES (${req.body.title}, ${req.body.textShort}, ${req.body.textFull}, 
							${req.body.infoTypesId}, ${req.body.isPublished}, NOW())`;
		console.log(sql);
		return db.queryAsync(sql);
	}).then(function() {
		var message;
		if (isPublished) {
			message = 'Новость создана и опубликована';
		} else {
			message = 'Новость создана';
		}
		res.json({
			code: 200,
			message: message
		});
	}).catch(function(err) {
		// todo: logging
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Новость не создана'
		});
	})
});

router.put('/:id(\\d+)', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {	
		db = connection;
		validateNews(req.body); // it'll throw an exception if validation fails

		var sql = `UPDATE info_units
						SET title = ${req.body.title},
						text_short = ${req.body.textShort},
						text_full = ${req.body.textFull},
						is_published = ${req.body.isPublished},
						date_updated = NOW(),
						info_types_id = ${req.body.infoTypesId}
					WHERE id = ${req.params.id}`;
		console.log(sql);
		
		return db.queryAsync(sql);
	}).then(function() {
		res.json({
			code: 200,
			message: 'Новость успешно обновлена'
		});
	}).catch(function(err) {
		// todo: logging
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Новость не обновлена'
		});
	})
});

router.delete('/:id(\\d+)', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT COUNT(*) AS 'is_deleted' FROM info_units WHERE id = ${req.params.id} AND date_deleted IS NOT NULL;`;
		console.log(sql);
		
		return db.queryAsync(sql).then(function(rows) {
			
			// if this news is already deleted, then throwing error
			if (rows[0].is_deleted > 0) {
				throw new Error('News is already deleted');
			}

			sql = `UPDATE info_units SET date_deleted = NOW() WHERE id = ${req.params.id}`;
			console.log(sql);
			
			return db.queryAsync(sql);	
		});
	}).then(function() {
		res.json({
			code: 200,
			message: 'Новость была удалена'
		});
	}).catch(function(err) {
		// todo: logging
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Новость не удалена'
		});
	})
});

router.post('/restore', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {	
		db = connection;
		var sql = `SELECT COUNT(*) AS 'is_deleted' FROM info_units WHERE id = ${req.body.id} AND date_deleted IS NOT NULL;`;
		console.log(sql);
		
		return db.queryAsync(sql).then(function(rows) {
			
			// if this news is not deleted, then throwing error
			if (rows[0].is_deleted === 0) {
				throw new Error('Cannot restore news which is not deleted yet');
			}
		
			var sql = `	UPDATE info_units 
						SET date_deleted = NULL
						WHERE id = ${req.body.id}`;
			console.log(sql);
		
			return db.queryAsync(sql);	
		});
	}).then(function() {
		res.json({
			code: 200,
			message: 'Новость восстановлена'

		});
	}).catch(function(err) {
		// todo: logging
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Новость не восстановлена'
		});
	})
});

module.exports = router;