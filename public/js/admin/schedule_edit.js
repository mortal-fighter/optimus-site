(function(window) {
	'use strict';

	function validateForm() {
		var html = $('#schedule-html').val();
		if (html === '' || html === ' ') {
			tinyMCE.activeEditor.focus();
			alert('Поле \'Расписание\' не может быть пустым');
			return false;
		}
		return true;
	}

	function initHandlers() {
		$('#schedule-edit').on('click', function() {
			tinyMCE.triggerSave(); // this will sync editor and texarea contents
			if (validateForm()) {
				$.ajax({
					method: 'PUT',
					url: '/admin/schedule',
					context: window,
					data: { 
						html: $('#schedule-html').val()
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
	}

	$(document).ready(function(){
		initHandlers();

		tinymce.init({
			selector: '#schedule-html',
			height: 300,
			theme: 'modern',
			language: 'ru',
			content_css: [
				'/lib/bootstrap/bootstrap.min.css',
				'/lib/bootstrap/bootstrap-theme.css',
				'/css/main.css',
				'/css/schedule.css'
			],
			plugins: [
				'searchreplace',
				'table contextmenu',
				'paste textcolor colorpicker'
			],
			toolbar1: 	'undo redo | bold italic | alignleft aligncenter alignright alignjustify | forecolor backcolor' + 
						'styleselect formatselect fontselect fontsizeselect | bullist numlist'
		});
	});
})(window);
