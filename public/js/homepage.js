(function(window) {
	'use strict';

	function attachHandlers() {
		$('#btn-news').on('click', function() { window.location.href='/news/category/1' });
		$('#btn-about').on('click', function() { window.location.href='/about' });
		$('#btn-schedule').on('click', function() { window.location.href='/schedule' });
	}

	$(document).ready(function() {
		attachHandlers();
	});
})(window);