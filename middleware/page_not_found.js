'use strict';

function pageNotFound(req, res, next) {
    res.render("page_not_found");
}

module.exports = pageNotFound;