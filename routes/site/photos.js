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

		console.log(JSON.stringify(albums));
		var photos = '';
		albums.forEach(function(album){
			photos += album.owner_id + '_' + album.thumb_id + ',';
		});
		photos = photos.substr(0, photos.length-1);
		console.log('photos: ' + photos);
		res.end();

		res.render('site/gallery_albums_all.pug', {
			albums: result.body.response,
			menu: req.menuGenerated
		}); 
	}).catch(function(err) {
		console.log(err.message, err.stack);
		res.send('Сервис недоступен');
	});
});


module.exports = router;