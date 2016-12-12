'use strict';

const router = require('express').Router();
const myUtil = require('../../components/myUtil.js');
const Promise = require('bluebird');
const connectionPromise = require('../../components/connectionPromise.js');
const menuConfig = require('../../config/menu.js');

var menuGenerated;

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

	next();
});

router.get('/', function(req, res, next) {
	res.redirect('/admin/schedule/edit');
});

router.get('/edit', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `SELECT id, html FROM schedule WHERE id=1;`;
		console.log(sql);
		return db.queryAsync(sql);
	}).then(function(rows) {
		//todo: check rows to be fetched
		res.render('admin/admin_schedule_edit', {
			message: '',
			messageType: '', 
			menu: menuGenerated,
			scheduleOnce: rows[0] 
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Ошибка при загрузке'
		})
	});
});

router.put('/', function(req, res, next) {
	var db = null;
	connectionPromise().then(function(connection) {
		db = connection;
		var sql = `UPDATE schedule SET html = ${req.body.html} WHERE id = 1;`;
		console.log(sql);
		return db.queryAsync(sql);
	}).then(function() {
		res.json({
			code: 200,
			message: 'Расписание успешно обновлено'
		});
	}).catch(function(err) {
		// todo: logging
		console.log(err.message, err.stack);
		res.json({
			code: 404,
			message: 'Расписание не обновлено'
		});
	});
});

module.exports = router;