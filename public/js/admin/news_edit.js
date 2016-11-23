(function(window) {
	'use strict';

	function initBBEditor() {
		var wbbOpt = {
			lang: 'ru',
			buttons: 'bold,italic,underline'
		}
		$('#text-full').wysibb(wbbOpt);
	}

	function attachHandlers() {
		
		$('#news-edit').on('click', function() {
			var id = $('form.news-form').attr('news-id');

			if (validateForm()) {
				$.ajax({
					method: 'PUT',
					url: '/admin/news/' + id,
					context: window,
					data: { 
						title: $('#title').val().trim(), 
						textShort: $('#text-short').val().trim(), 
						textFull: $('#text-full').htmlcode(),
						isPublished: $('#is-published').prop('checked'),
						infoTypesId: $('#info-types-id').val()
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
			//todo: is it always corrent return address ?
			window.location.href='/admin/news';
		});
	}

	function validateForm() {
		var title = $('#title');
		if (title.val().length > 180) {
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
		if (textShort.val().length > 450) {
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

	$(document).ready(function() {
		initBBEditor();
		attachHandlers();
		showMessageExists();
	});	

})(window);



