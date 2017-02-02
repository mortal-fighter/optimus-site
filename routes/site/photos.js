'use strict';

const router = require('express').Router();
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');
const fetch = require('isomorphic-fetch');
const config = require('../../config/common.js');
const logger = require('log4js').getLogger();

router.get('/', function(req, res, next) {
	fetch('https://api.vk.com/method/photos.getAlbums?owner_id=' + config.vk.ownerID, { method: 'get' }).then(function(response) {

		if (!response.ok) {
			throw new Error('VK_IS_UNAVAILABLE');
		} 

		return response.json();
	}).then(function(responseAlbums) {

		var albums = responseAlbums.response;

		var photos = '';

		for (var i = 0, len = albums.length; i < len; i++) {
			if (albums[i].thumb_id === '0' || albums[i].title.match(/служебный/i)) {
				albums.splice(i, 1);
				len--;
				i--
			} else {
				photos += config.vk.ownerID + '_' + albums[i].thumb_id + ',';
			} 
		}
		
		photos = photos.substr(0, photos.length-1);
		
		return fetch('https://api.vk.com/method/photos.getById?photos=' + photos, {method: 'get'}).then(function(response) {
			return response.json();
		}).then(function(responseCovers) {

			const covers = responseCovers.response;
			
			res.render('site/gallery_albums_all.pug', {
				albums: albums,
				covers: covers,
				menu: req.menuGenerated
			});	

		});
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		if (err.message === 'VK_IS_UNAVAILABLE') {
			res.render('site/gallery_albums_all.pug', {
				menu: req.menuGenerated
			});	
		} else {
			res.send('Сервис недоступен');
		}
	});
});

router.get('/:albumId(\\d+)/:albumTitle', function(req, res, next) {
	const uri = `https://api.vk.com/method/photos.get?owner_id=${config.vk.ownerID}&album_id=${req.params.albumId}&rev=1`;
	fetch(uri, { method: 'get' }).then(function(response) {
			
		if (!response.ok) {
			throw new Error('VK_IS_UNAVAILABLE');
		} 

		return response.json();
	}).then(function(responsePhotos) {	

		const photos = responsePhotos.response;
		
		res.render('site/gallery_albums_one.pug', {
			photos: photos,
			menu: req.menuGenerated,
			breadcrumbs: [
			{
				title: 'Все альбомы',
				href: '/photos'
			},
			{
				title: decodeURIComponent(req.params.albumTitle),
				href: ''
			}],
			albumTitle: decodeURIComponent(req.params.albumTitle)
		});	
	}).catch(function(err) {
		logger.error(err.message, err.stack);
		if (err.message === 'VK_IS_UNAVAILABLE') {
			res.render('site/gallery_albums_one.pug', {
				menu: req.menuGenerated,
				breadcrumbs: [
				{
					title: 'Все альбомы',
					href: '/photos'
				},
				{
					title: decodeURIComponent(req.params.albumTitle),
					href: ''
				}]
			});	
		} else {
			res.send('Сервис недоступен');
		}
	});
});

module.exports = router;