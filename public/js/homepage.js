'use strict';

function centerContentAsync() {
	function centerContent() {
		// Center all content vertically
		var slideshowHeight = $('.aslider .aslide img').eq(0).height();
		var contentHeight = $('.title').height() + slideshowHeight;
		var paddingTotal = screen.height - contentHeight;
		$('.home').css('top', paddingTotal / 3 + 'px');

		// Center title horizontally
		var titleWidth = $('.title').width();
		$('.title').css('marginLeft', (screen.width - titleWidth) / 2);
	}

	var interval;
	interval = setInterval(function() {
		if ($('.aslider .aslide img').height() > 100) {
			clearInterval(interval);
			centerContent();
		}
	}, 100);
}

$(document).ready(function() {
	if (screen.width < 768) {
		centerContentAsync();
		$('.navbar-brand *').hide();		
	} else {
		$('.title').hide();
	}
});