(function(){
	'use strict';

	//todo: взял с потолка, нужно точно вычислить
	const gap = 35;

	function resizeColumns() {
		$('.right-col').outerWidth($('.container-fluid').outerWidth() - $('.left-col').outerWidth() - gap);
	}

	function attachHandlers() {
		// window resize
		$(window).on('resize', resizeColumns);
	}

	$(document).ready(function(){
		resizeColumns();
		attachHandlers();
	});	
})()
	
