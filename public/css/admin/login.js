(function(window) {
	'use strict';

	function clearForm() {
		$('#password').val('');
	}

	function attachHandlers() {
		$('#auth-enter').on('click', function() {
			$.ajax({
				method: 'POST',
				url: '/admin/login',
				data: { 
					login: $('#login').val().trim(), 
					password: $('#password').val().trim()
				},
				success: function(data) {
					switch (data.code) {
						case 200: 
							window.location.href='/admin/news';
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
		});
	}

	$(document).ready(function(){
		showMessageExists();
		attachHandlers();
	});
})(window);


