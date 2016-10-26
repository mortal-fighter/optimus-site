'use strict';

function restricted(req, res, next) {
	res.send('<h1>Это секретная страница!!!</h1');
}

module.exports = restricted;