(function(window) {
	'use strict';

	
	function _closePopup() {
		$('body').removeClass('stop-scrolling');
		$('#popup-window').fadeOut(400);
	}

	function _showPopup() {
		$('body').addClass('stop-scrolling');
		$('#popup-window').height($(document).height());
		$('#popup-window').fadeIn(400);
	}

	function _initPopup() {
		$('.popup-header, .popup-content').on('click', function(evt) {
			evt.stopPropagation();
		});
		$('#popup-window, .popup-close').on('click', function() {
			_closePopup();	
		});
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

			_showPopup();

			$('#recaptcha-test').on('click', function() {
				const result = $('#g-recaptcha-response').val();
				if (result === '') {
					alert('Чтобы продолжить поставьте отметку в поле \'Я не робот\'');
					return;
				}

				//$(this).prop('disabled', true);

				$.ajax({
					method: 'POST',
					url: '/api/sendmail',
					dataType: 'json',
					data: {
						userName: userName,
						userEmail: userEmail,
						userMessage: userMessage,
						recaptchaResponse: result
					},
					success: function(result) {
						alert(result.message);
						_closePopup();
					},
					error: function() {
						alert('Ошибка сетевого соединения');
						_closePopup();
					}
				});
			});
		});


	}

	$(document).ready(function() {
		_initPopup();
		attachHandlers();
	});
})(window);