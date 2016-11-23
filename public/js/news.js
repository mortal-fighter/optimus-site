(function() {
	'use strict';

	var currentScroll;

	function attachHandlers() {

		$('#tabs').on('tabsload', function( event, ui ) {
			// attach handlers to all link inside a tab
			$('.news-link').on('click', function() {
				showPopupNews($(this).attr('news-id'));
			});
		});
		
		$('.popup-header, .popup-content').on('click', function(evt) {
			evt.stopPropagation();
		});
		$('#popup-window, .popup-close').on('click', function() {
			_closePopup();	
		});
	}

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

	function showPopupNews(newsId) {
		$.ajax({
			method: 'GET',
			url: '/api/news/' + newsId,
			dataType: 'html',
			success: function(html) {
				$('.popup-content').html(html);
				_showPopup();
			},
			error: function() {
				alert('Ошибка сетевого соединения');
			}
		});
	}

	$(document).ready(function() {
		$('#tabs').tabs();
		attachHandlers();
	});
})(window);
