'use strict';

const router = require('express').Router();
const menu = require('../../config/menu.js');
const myutil = require('../../components/myUtil.js');
const myrequest = require('../../components/myRequest.js');
const config = require('../../config/common.js');

router.get('/', function(req, res, next) {
	myrequest.httpsRequestAsync({
		host: 'api.vk.com',
		port: 443,
		method: 'GET',
		path: '/method/photos.getAlbums?owner_id=' + config.vk.ownerID
	}).then(function(result) {
		const albums = JSON.parse(result.body).response;
		var photos = '';

		var emptyCoverAlbumId = 0;
		for (var i = 0; i < albums.length; i++) {
			if (albums[i].thumb_id !== '0') {
				// construct request string (if only the album cover exists)
				photos += config.vk.ownerID + '_' + albums[i].thumb_id + ',';
			} else {
				// if it's not, then memory the index...
				emptyCoverAlbumId = i;
			}
		}
		// ... and remove the corresponding element from the array of albums
		albums.splice(emptyCoverAlbumId, 1);

		photos = photos.substr(0, photos.length-1);
		return myrequest.httpsRequestAsync({
			host: 'api.vk.com',
			port: 443,
			method: 'GET',
			path: '/method/photos.getById?photos=' + photos
		}).then(function(result) {
			const covers = JSON.parse(result.body).response;
			
			res.render('site/gallery_albums_all.pug', {
				albums: albums,
				covers: covers,
				menu: req.menuGenerated
			});	
		}).catch(function(err) {
			throw err;
		}); 
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});

router.get('/:albumId(\\d+)/:albumTitle', function(req, res, next) {
	myrequest.httpsRequestAsync({
		host: 'api.vk.com',
		port: 443,
		method: 'GET',
		path: `/method/photos.get?owner_id=${config.vk.ownerID}&album_id=${req.params.albumId}&rev=1`
	}).then(function(result) {
		const photos = JSON.parse(result.body).response;
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
		console.log(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});

module.exports = router;