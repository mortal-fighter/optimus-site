'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const config = require('../../config/common.js');

function loginMiddleware(req, res, next) {
	Promise.resolve().then(function() {
		res.render('admin/login', {
			messageType: '',
			message: ''
		});
	}).catch(function(err) {
		console.log(err.message, err.stack);
		next();
	});
};

router.get('/', loginMiddleware);

router.get('/login', loginMiddleware);

router.post('/login', function(req, res, next) {
	Promise.resolve().then(function() {
		//todo: should make authorization much more secure!
		if (req.body.username !== config.auth.username || req.body.password !== config.auth.password) {
			res.json({
				code: 403,
				messageType: 'error',
				message: 'Неправильное имя пользователя или пароль'
			});
		} else {
			res.cookie('34ma8R', 'QCMcpz');
			res.json({
				code: 200,
				messageType: 'success',
				message: 'Вход разрешен'
			});
		}
	}).catch(function(err) {
		console.log(err.message, err.stack);
		next();
	});
});

module.exports = router;