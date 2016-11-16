'use strict';

function showMessage(type, text) {
	var msgDIV = $('.message');
	msgDIV.addClass('msg-' + type).html(text)
	_showMessage(msgDIV);
	msgDIV.removeClass('msg-' + type);
}

function showMessageExists() {
	var msgDIV = $('.message');
	if (msgDIV.val() !== '') {
		_showMessage(msgDIV);
	}
}

function _showMessage(div) {
	div.slideDown(600).delay(6000).fadeOut(600);
}

//todo: взял с потолка, нужно точно вычислить
const gap = 35;

function resizeColumns() {
	$('.right-col').outerWidth($('.container-fluid').outerWidth() - $('.left-col').outerWidth() - gap);
}

function attachHandlersMain() {
	// window resize
	$(window).on('resize', resizeColumns);
}

$(document).ready(function(){
	resizeColumns();
	attachHandlersMain();
});	

