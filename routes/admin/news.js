'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const menuConfig = require('../../config/menu.js');
const connectionPromise = require('../../components/connectionPromise.js');
const myUtil = require('../../components/myUtil.js');
const sizeOfAsync = Promise.promisify(require('image-size'));
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const logger = require('log4js').getLogger();

const multer  = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/img/uploads')
	},
	filename: function (req, file, cb) {
		const i = file.originalname.lastIndexOf('.');
		const ext = file.originalname.substr(i);
		cb(null, Date.now() + ext);
	}
})
const uploader = multer({ 
	storage: storage,
	fileFilter: function (req, file, cb) {
		if (file.mimetype !== 'image/jpeg') {
			cb(null, false);
			return;	
		}
		cb(null, true);
	}
});

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
		res.status(403).send('У Вас не достаточно прав для доступа к данному ресурсу.');
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
		return db.queryAsync(`	SELECT id, title, text_short, text_full, info_types_id, 
								DATE_FORMAT(CAST(date_created AS CHAR), '%d.%m.%Y') date_created, 
								DATE_FORMAT(CAST(date_published AS CHAR), '%d.%m.%Y') date_published,
								date_created sort
								FROM info_units WHERE date_deleted is null
								ORDER BY sort DESC`);
	}).then(function(rows) {	
		res.render('admin/admin_news_all', {
			news: rows,
			menu: menuGenerated,
			message: '',
			messageType: ''
		});
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		res.render('admin/server_error.pug');
	});
});

router.get('/create', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT id, name FROM info_types`;
		return db.queryAsync(sql);
	}).then(function(infoTypes) {
		res.render('admin/admin_news_create', {
			message: '',
			messageType: '', 
			menu: menuGenerated,
			infoTypes: infoTypes
		});	
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		res.render('admin/server_error.pug');
	});
});

router.get('/:newsId(\\d+)/photos/', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		return db.queryAsync(`
			SELECT id, src_small, src_big, width, height
			FROM info_units_photos
			WHERE info_unit_id = ${req.params.newsId} 
			AND date_deleted is NULL;`);
	}).then(function(photos) {
		res.render('admin/admin_photos', {
			message: '',
			messageType: '', 
			menu: menuGenerated,
			photos: photos,
			infoUnitId: req.params.newsId
		});	
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		res.render('admin/server_error.pug');
	});
});

router.get('/edit/:id(\\d+)', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT id, name FROM info_types`;
		return db.queryAsync(sql);
	}).then(function(infoTypes) {
		req.user.infoTypes = infoTypes;
		return db.queryAsync(`	SELECT id, title, text_short, text_full, info_types_id,
								DATE_FORMAT(CAST(date_published AS CHAR), '%d.%m.%Y') date_published
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
		logger.error(err.message, err.stack);
		res.render('admin/server_error.pug');
	});
});

router.post('/', function(req, res, next) {
	var isPublished;
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		validateNews(req.body);	
		
		var datePublished = (req.body.isPublished === '\'1\'') ? 'NOW()' : 'NULL';
		var sql = `	INSERT INTO info_units (title, text_short, text_full, info_types_id, date_created, date_published) 
					VALUES (${req.body.title}, ${req.body.textShort}, ${req.body.textFull}, 
							${req.body.infoTypesId}, NOW(), ${datePublished})`;
		return db.queryAsync(sql);
	}).then(function(result) {
		var message;
		if (isPublished) {
			message = 'Новость создана и опубликована';
		} else {
			message = 'Новость создана';
		}
		res.json({
			code: 200,
			message: message,
			id: result.insertId
		});
	}).catch(function(err) {
		logger.error(err.message, err.stack);
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

		var datePublished = (req.body.isPublished === '\'1\'') ? 'NOW()' : 'NULL';

		var sql = `UPDATE info_units
						SET title = ${req.body.title},
						text_short = ${req.body.textShort},
						text_full = ${req.body.textFull},
						date_updated = NOW(),
						date_published = ${datePublished},
						info_types_id = ${req.body.infoTypesId}
					WHERE id = ${req.params.id}`;
		return db.queryAsync(sql);
	}).then(function() {
		res.json({
			code: 200,
			message: 'Новость успешно обновлена',
			id: req.params.id
		});
	}).catch(function(err) {
		logger.error(err.message, err.stack);
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
		return db.queryAsync(sql).then(function(rows) {
			
			// if this news is already deleted, then throwing error
			if (rows[0].is_deleted > 0) {
				throw new Error('News is already deleted');
			}

			sql = `UPDATE info_units SET date_deleted = NOW() WHERE id = ${req.params.id}`;
			return db.queryAsync(sql);	
		});
	}).then(function(result) {
		var sql = `UPDATE info_units_photos SET date_deleted = NOW() WHERE info_unit_id = ${req.params.id};`
		return db.queryAsync(sql);
	}).then(function(result) {
		res.json({
			code: 200,
			message: 'Новость была удалена'
		});
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Новость не удалена'
		});
	})
});

router.post('/upload_photos', uploader.array('uploads'), function(req, res, next) {
	
	function convertResourceLocator(path) {
		var uri = path.replace(/\\/g, '/');
		var ind = uri.indexOf('/');
		var res = uri.substr(ind);
		return res;
	}

	//todo: handle errors when file uploading
	var db = null;
	var newPhotoHref = [];
	
	connectionPromise().then(function(connection) {
		
		db = connection;
		
		var promises = [];
		for (var i = 0; i < req.files.length; i++) {
			promises.push(sizeOfAsync(req.files[i].path));
		}
		
		return Promise.all(promises);
	
	}).then(function(dimensionsArray) {
		
		var sql = `	INSERT INTO info_units_photos(src_small, src_big, info_unit_id, width, height, date_created)
					VALUES 
			`;

		for (var i = 0; i < req.files.length; i++) {
			
			var hrefSmallImg = convertResourceLocator(req.files[i].path);
			newPhotoHref.push(hrefSmallImg);

			sql += `('${hrefSmallImg}', '${hrefSmallImg}', ${req.body.infoUnitId}, ${dimensionsArray[0].width}, ${dimensionsArray[0].height}, NOW())`;
			if (i !== (req.files.length - 1)) {
				sql += ', ';
			}
		}	

		return db.queryAsync(sql);
	
	}).then(function(result) {
		
		res.json({
			code: 200,
			newPhotos: newPhotoHref,
			message: 'Фотографии успешно добавлены'
		});

	}).catch(function(err) {
	
		logger.error(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Ошибка при добавлении фотографий'
		});
	
	});
});

router.delete('/remove_all_photos', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;

		var sql = `UPDATE info_units_photos SET date_deleted = NOW() WHERE info_unit_id = ${req.body.infoUnitId};`;
		return db.queryAsync(sql);	
	}).then(function(result) {
		
		res.json({
			code: 200,
			message: 'Фотографии успешно удалены'
		});

	}).catch(function(err) {
	
		logger.error(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Ошибка при удалении фотографий'
		});
	
	});
});

module.exports = router;