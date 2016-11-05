'use strict';

function func() {
	console.log($('#editor').bbcode());
}

$(document).ready(function() {
	console.log('doc ready');
	var wbbOpt = {
		lang: 'ru',
		buttons: "bold,italic,underline,|,img,link,"
	}
	$("#editor").wysibb(wbbOpt);
});