(function(window) {
	'use strict';

	function attachHandlers() {
		$('#btn-gallery').on('click', function() { window.location.href='/photos' });
		$('#btn-about').on('click', function() { window.location.href='/about' });
		$('#btn-schedule').on('click', function() { window.location.href='/schedule' });
	}

	$(document).ready(function() {
		attachHandlers();
	});
})(window);