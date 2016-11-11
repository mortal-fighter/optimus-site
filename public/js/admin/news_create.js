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
						textFull: $('#text-full').bbcode() 
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
		var textShort = $('#text-short');
		if (textShort.val().length > 300) {
			textShort.focus();
			alert('Длина поля "Краткий текст новости" превышает допустимый размер');
			return false;
		}
		return true;
	}

	$(document).ready(function() {
		initBBEditor();
		attachHandlers();
	});	
})()
