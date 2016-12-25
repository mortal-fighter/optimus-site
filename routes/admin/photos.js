'use strict';

const Promise = require('bluebird');
const myUtil = require('../../components/myUtil.js');
const router = require('express').Router();
const menuConfig = require('../../config/menu.js');

var menuGenerated;

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

router.get('/create', function(req, res, next) {
	Promise.resolve().then(function() {
		res.render('admin/admin_photos_create', {
			message: '',
			messageType: '',
			menu: menuGenerated
		});	
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.end();
	})
});

module.exports = router;