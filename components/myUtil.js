'use strict';

module.exports = {
	// for `source` type look at  config/menu.js
	// `req` current request object
	menuGenerate: function(source, req) {
		var ind = -1;
		for (var i = 0; i < source.length; i++) {
			if (req.originalUrl === source[i].href) {
				ind = i;
				break;
			}
		}
		return {
			items: source,
			indexCurrent: ind
		};
	}
};