'use strict';

const router = require('express').Router();
const myrequest = require('../../components/myRequest.js');
const config = require('../../config/common.js');

router.get('/', function(req, res, next) {
	
	myrequest.httpsRequestAsync({
		host: 'api.vk.com',
		port: 443,
		method: 'GET',
		path: '/method/photos.get?owner_id=' + 
			config.vk.ownerID + 
			'&album_id=' + config.vk.albums.slideshow.id + 
			'&count=' + config.vk.albums.slideshow.count
	}).then(function(result) {
		const photos = JSON.parse(result.body).response;
		console.log(photos);
		res.render('site/homepage.pug', {
			slideshow: photos,
			menu: req.menuGenerated
		})
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});

module.exports = router;