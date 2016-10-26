'use strict';

function scalePhotos() {
	var cont = $('.content');
	const boxSizing = cont.css('boxSizing');
	const contentWidth = cont.width();
	const contentPaddings = parseInt(cont.css('paddingLeft')) + parseInt(cont.css('paddingRight'));
	const freeSpace = 60;
	const delta = 40;

	if (boxSizing === 'border-box') {
		const photoWidth = (contentWidth - freeSpace - delta) / 3;
	} else if {
		const photoWidth = (contentWidth - contentPaddings - freeSpace - delta) / 3;
	}

	
	
	$('.content .photo').css('width', photoWidth + 'px');
}

$(document).ready(function() {
	scalePhotos();
});