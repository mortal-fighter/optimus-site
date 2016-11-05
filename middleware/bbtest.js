'use strict';

const config = require('../config/common');

function bbtest(req, res, next) {
	res.render('bbtest', {wysibbOpts: config.wysibb.options});
}

module.exports = bbtest;