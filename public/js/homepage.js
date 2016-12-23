(function(window) {
	'use strict';

	var currentScroll;

	function _closePopup() {
		$(document).scrollTop(currentScroll);
		$('#popup-window').fadeOut(400);
	}

	function _showPopup() {
		currentScroll = $(document).scrollTop();
		$(document).scrollTop(0);
		$('#popup-window').height($(document).height());
		$('#popup-window').fadeIn(400);
	}

	function attachHandlers() {
		$('#btn-gallery').on('click', function() { window.location.href='/photos' });
		$('#btn-about').on('click', function() { window.location.href='/about' });
		$('#btn-schedule').on('click', function() { window.location.href='/schedule' });
		
		$('#btn-sendmessage').on('click', function() { 
			var userName = $('#sm-name').val();
			var userEmail = $('#sm-email').val();
			var userMessage = $('#sm-text').val();

			if (userName.match(/$\s*^/)) {
				alert('Поле \'Имя\' не может быть пустым.');
				$('#sm-name').focus();
				return;
			}

			if (!userEmail.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) {
				alert('Поле \'e-mail\' заполнено неправильно.');
				$('#sm-email').focus();
				return;	
			}

			if (userMessage.match(/$\s*^/)) {
				alert('Поле \'Текст сообщения\' не может быть пустым.');
				$('#sm-text').focus();
				return;	
			}

			$.ajax({
				method: 'POST',
				url: '/api/sendmail/',
				dataType: 'json',
				data: {
					userName: userName,
					userEmail: userEmail,
					userMessage: userMessage
				},
				success: function(result) {
					alert(result.message);
				},
				error: function() {
					alert('Ошибка сетевого соединения');
				}
			});
		});


	}

	$(document).ready(function() {
		attachHandlers();
	});
})(window);