'use strict';

function showMessage(type, text) {
	var msgDIV = $('.message');
	msgDIV.removeClass('msg-success').removeClass('msg-error');
	msgDIV.addClass('msg-' + type).html(text)
	_showMessage(msgDIV);
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
const gap = 60;

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

