'use strict';

const router = require('express').Router();
const fetch = require('isomorphic-fetch');
const config = require('../../config/common.js');
const logger = require('log4js').getLogger();

router.get('/', function(req, res, next) {
	
	const uri = `https://api.vk.com/method/photos.get?owner_id=${config.vk.ownerID}&album_id=${config.vk.albums.slideshow.id}&count=${config.vk.albums.slideshow.count}`;
	fetch(uri, { method: 'get' }).then(function(response) {
		if (!response.ok) {
			throw new Error('VK_IS_UNAVAILABLE');
		} 
		return response.json();
	}).then(function(responsePhotos) {	
		const photos = responsePhotos.response;
		res.render('site/homepage.pug', {
			slideshow: photos,
			menu: req.menuGenerated
		})
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		if (err.message === 'VK_IS_UNAVAILABLE') {
			res.render('site/homepage.pug', {
				menu: req.menuGenerated
			});	
		} else {
			res.send('Сервис недоступен');
		}
	});
});

module.exports = router;