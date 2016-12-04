'use strict';

const config = require('../config/common.js');
const mysql = require('mysql');
const Promise = require('bluebird');

var connectionPromise = function() {
	return new Promise(function(resolve, reject) {
		var connection = mysql.createConnection({
			host: config.database.host,
			user: config.database.user,
			password: config.database.password,
			database: config.database.database
		});

		connection.connect(function(err) {
			if (err) {
				console.log('cant connect to db:', err.message, err.stack);
				reject(err);
			} else {
				connection.on('error', function(err) {
					console.log('db error', err.message, err.stack);
					/*if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
						handleDisconnect();                         
					} else {                                  
						throw err;                           
					}*/
					// try to reconnect
				});
			}
		});
	});	
}



module.exports = connectionPromise;