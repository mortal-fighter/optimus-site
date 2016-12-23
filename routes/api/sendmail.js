'use strict';
const router = require('express').Router();
const mailer = require('../../components/mailer.js');
const Promise = require('bluebird');

router.post('/', function (req, res, next) {
	Promise.resolve().then(function() {
		if (req.body.userName.match(/$\s*^/) ||  
			!req.body.userEmail.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/) ||
			req.body.userMessage.match(/$\s*^/) ) {
			
			res.json({
				code: 404,
				message: 'Письмо не может быть отправленно: проверьте, пожалуйста, введенную информацию'
			});
		
		}

		const mailOptions = {
			from: 'Сайт Академии',
			to: 'kirillmybox@rambler.ru',
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

	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.json({
			code: 500,
			message: 'Письмо не может быть отправлено сейчас. Пожалуйста повторите попытку позднее.'
		});
	});
});

module.exports = router;