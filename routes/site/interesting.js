'use strict';

const router = require('express').Router();
const logger = require('log4js').getLogger();
const Promise = require('bluebird');
const menu = require('../../config/menu.js');
const fetch = require('isomorphic-fetch');
const config = require('../../config/common.js');

router.get('/', function(req, res, next) {
	const url = `https://www.googleapis.com/youtube/v3/search?key=${config.youtube.key}&part=snippet&maxResults=${config.youtube.count}&q=${encodeURIComponent(config.youtube.searchString)}`;
	fetch(url, {method: 'get'}).then(function(response) {
		if (!response.ok) {
			throw new Error('YOUTUBE_IS_UNAVAILABLE');
		}
		return response.json(); 
	}).then(function(responseObj) {
		var videos = [];
		for (var i = 0, len = responseObj.items.length; i < len; i++) {
			if (responseObj.items[i].id.kind === 'youtube#video') {
				videos.push(responseObj.items[i]);
			}
		}
		
		res.render('site/interesting_all.pug', {
			menu: req.menuGenerated,
			videos: videos
		});
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		if (err.message === 'YOUTUBE_IS_UNAVAILABLE') {
			res.render('site/interesting_all.pug', {
				menu: req.menuGenerated
			});	
		} else {
			res.send('Сервис недоступен');
		}
	});
});

module.exports = router;