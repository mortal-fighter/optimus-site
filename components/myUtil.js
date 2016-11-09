'use strict';

module.exports = {
	// for `source` type look at  config/menu.js
	// `req` current request object
	menuGenerate: function(source, req) {
		var ind = -1;
		for (var i = 0; i < menuConfig.menuAdmin.length; i++) {
			if (req.baseUrl === menuConfig.menuAdmin[i].href) {
				ind = i;
				break;
			}
		};
		return {
				items: menuConfig.menuAdmin,
				indexCurrent: ind
			}
	}
};