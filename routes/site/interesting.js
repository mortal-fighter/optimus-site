'use strict';

const router = require('express').Router();
const logger = require('log4js').getLogger();
const Promise = require('bluebird');
const menu = require('../../config/menu.js');
const fetch = require('isomorphic-fetch');

router.get('/', function(req, res, next) {
	res.send('hello world!');
});

module.exports = router;