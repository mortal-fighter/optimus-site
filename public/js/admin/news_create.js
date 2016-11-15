(function() {
	'use strict';
	
	function initBBEditor() {
		var wbbOpt = {
			lang: 'ru',
			buttons: 'bold,italic,underline'
		}
		$('#text-full').wysibb(wbbOpt);
	}

	function attachHandlers() {
		$('#news-create').on('click', function() {
			if (validateForm()) {
				$.ajax({
					method: 'POST',
					url: '/admin/news',
					data: { 
						title: $('#title').val().trim(), 
						textShort: $('#text-short').val().trim(), 
						textFull: $('#text-full').bbcode(),
						isPublished: $('#is-published').prop('checked')
					},
					success: function(data) {
						switch (data.code) {
							case 200: 
								showMessage('success', data.message);
								break;
							case 404:
								showMessage('error', data.message);
								break; 
						}
					},
					error: function() {
						showMessage('error', 'Ошибка интернет-соединения');
					}
				});
			}
		});
		$('#news-cancel').on('click', function() {
			//todo: is it always corrent return address
			window.location.href='/admin/news';
		});
	}

	function validateForm() {
		var title = $('#title');
		if (title.val().length > 120) {
			title.focus();
			alert('Длина поля "Заголовок новости" превышает допустимый размер');
			return false;
		}
		if (title.val() === '' || title.val() === ' ') {
			title.focus();
			alert('Поле "Заголовок новости" не может быть пустым');
			return false;
		}

		var textShort = $('#text-short');
		if (textShort.val().length > 300) {
			textShort.focus();
			alert('Длина поля "Краткий текст новости" превышает допустимый размер');
			return false;
		}
		
		var textFull = $('#text-full');
		if (textFull.bbcode() === '' || textFull.bbcode() === ' ') {
			textFull.focus();
			alert('Поле "Полный текст новости" не может быть пустым');
			return false;
		}

		return true;
	}

	function showMessage(type, text) {
		var msgDIV = $('.message');
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

	$(document).ready(function() {
		initBBEditor();
		attachHandlers();
		showMessageExists();
	});	
})()
