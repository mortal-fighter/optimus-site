'use strict';

const config = require('../config/common.js');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: config.database.host,
	user: config.database.user,
	password: config.database.pass,
	database: config.database.database
});

function login(req, res, next) {
	connection.query('SELECT id, name, role FROM `user`', function(err, rows) {
		if (err) {
			res.render('login');
			throw err;
		}
		res.render('login', {users: rows});	
	});	
	
}

module.exports = login;