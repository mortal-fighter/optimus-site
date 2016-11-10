'use strict';

const router = require('express').Router();
const Promise = require('bluebird');
const config = require('../../config/common.js');
const menuConfig = require('../../config/menu.js');
const mysql = require('mysql');
const myUtil = require('../../components/myUtil.js');

var menuGenerated;

//todo: what will be if error happends?
const connection = Promise.promisifyAll(mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.password,
	database: config.database.database
}));

router.all('*', function(req, res, next) {
	menuGenerated = myUtil.menuGenerate(menuConfig.menuAdmin, req);
	
	next();
});

router.get('/', function(req, res, next) {
	Promise.resolve().then(function() {
		return connection.queryAsync(`	SELECT id, title, text_short, text_full
										FROM info_units WHERE info_types_id = ?`, ['1']);
	}).then(function(rows) {	
		res.render('admin_news_all', {
			news: rows,
			menu: menuGenerated
		});
	}).catch(function(err) {
		console.log(err);
	});
});

router.get('/create', function(req, res, next) {
	
	res.render('admin_news_create', {
		message: '',
		messageType: 'success', 
		menu: menuGenerated
	});
});

router.post('/', function(req, res, next) {
	res.send('CREATE');
});

router.put('/:id(\\d+)', function(req, res, next) {
	res.send('UPDATE');
});

router.delete('/:id(\\d+)', function(req, res, next) {
	res.send('DELETE');
});

module.exports = router;

//optimus.ru/admin/news/all
//optimus.ru/admin/news/edit 
// POST - создание новости
// PUT(id) - редактирование
// DELETE(id) - удаление

//arr.forEach(callback[, thisArg])