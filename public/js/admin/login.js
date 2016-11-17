(function(window) {
	'use strict';

	function attachHandlers() {
		$('#auth-enter').on('click', function() {
			$.ajax({
				method: 'POST',
				url: '/admin/login',
				data: { 
					username: $('#login').val().trim(), 
					password: $('#password').val().trim()
				},
				success: function(data) {
					switch (data.code) {
						case 200: 
							window.location.href='/admin/news';
							break;
						case 403:
							clearForm();
							showMessage('error', data.message);
							break; 
					}
				},
				error: function() {
					showMessage('error', 'Ошибка интернет-соединения');
				}
			});
		});
	}

	function clearForm() {
		$('#password').val('');
	}

	$(document).ready(function() {
		attachHandlers();
		showMessageExists();
	});	
})(window)
