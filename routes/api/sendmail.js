'use strict';
const router = require('express').Router();
const mailer = require('../../components/mailer.js');
const Promise = require('bluebird');
const fetch = require('isomorphic-fetch');
const config = require('../../config/common.js');
const FormData = require('form-data');

router.post('/', function (req, res, next) {
	Promise.resolve().then(function() {
		if (req.body.userName.match(/$\s*^/) ||  
			!req.body.userEmail.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/) ||
			req.body.userMessage.match(/$\s*^/) ) {
			
			throw new Error('VALIDATION_HAS_FAILED');
		}

		var uri = 'https://www.google.com/recaptcha/api/siteverify';
		var form = new FormData();
		form.append('secret', config.recaptcha.secret);
		form.append('response', req.body.recaptchaResponse);
		form.append('remoteip', req.ip);
		var opts = {
			method: 'post',
			body: form
		};
		return fetch(uri, opts).then(function(response) {

			if (!response.ok) {
				throw new Error('GOOGLE_IS_UNAVAILABLE');
			} 

			return response.json();
		});
	}).then(function(result) {
		if (result.success) {
			const mailOptions = {
				from: 'Сайт Академии',
				to: 'academy.optimus@yandex.ru',
				subject: `Вопрос от посетителя ${req.body.userName}`,
				text: `
					Вопрос от посетителя ${req.body.userName} (${req.body.userEmail}).
					Текст вопроса: 

					${req.body.userMessage}
				`,
				html: `
					<p>Вопрос от посетителя <b>${req.body.userName}</b> (<b>${req.body.userEmail}</b>).</p>
					<p>Текст вопроса:</p> 
					<p>${req.body.userMessage}</p>
				`
			};
			
			mailer.sendMail(mailOptions);

			res.json({
				code: 200,
				message: 'Ваше письмо успешно отправлено! Мы скоро Вам ответим!'
			});
		} else {
			res.json({
				code: 200,
				message: 'Введен неправильный код reCaptcha'
			});
		}

	}).catch(function(err) {
		console.log(err.message, err.stack);
		if (err.message === 'VALIDATION_HAS_FAILED') {
			res.json({
				code: 200,
				message: 'Письмо не может быть отправленно: проверьте, пожалуйста, введенную информацию'
			});
		} else {
			res.json({
				code: 500,
				message: 'Письмо не может быть отправлено сейчас. Пожалуйста повторите попытку позднее.'
			});	
		}
	});
});

module.exports = router;