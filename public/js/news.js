(function(window) {
	'use strict';

	function attachHandlers() {

		$('.news-link, #text-short').on('click', function() {
			showPopupNews($(this).parent().attr('news-id'));
		});
		
		$('.popup-header, .popup-content').on('click', function(evt) {
			evt.stopPropagation();
		});
		$('#popup-window, .popup-close').on('click', function() {
			_closePopup();	
		});

		const category = parseInt($('div.news.content').attr('category'));
		var pageCurrent;
		var pageTotal = 0;
		$('ul.pagination li.num').each(function(index, elem) {
			if ($(this).hasClass('current')) {
				pageCurrent = parseInt($(this).html());
			}
			$(elem).on('click', function() {
				window.location.href='/news/category/' + category + '/page/' + $(this).html();
			});
			pageTotal++;
		});
		$('ul.pagination li.prev').on('click', function() {
			var pageNew = (pageCurrent > 1) ? pageCurrent - 1 : 1;
			window.location.href='/news/category/' + category + '/page/' + pageNew;
		});
		$('ul.pagination li.next').on('click', function() {
			var pageNew = (pageCurrent < pageTotal) ? pageCurrent + 1 : pageTotal;
			window.location.href='/news/category/' + category + '/page/' + pageNew;
		});
	}

	function _closePopup() {
		$('body').removeClass('stop-scrolling');
		$('#popup-window').fadeOut(400);
	}

	function _showPopup() {
		$('body').addClass('stop-scrolling');
		$('#popup-window').height($(document).height());
		$('#popup-window').fadeIn(400);
	}

	function _contentTrulyLoadedPromise() {
		// This is needed because images loads not immediate, but with delay (so this affects their sizes)
		return new Promise(function(resolve, reject) {
			var iterCount = 0;
			var interval = setInterval(function() {
				var allLoaded = true;
				$('.popup-content img').each(function(ind, item) {
					if ($(item).width() < 50) {
						allLoaded = false;
					}
				});

				if (allLoaded) {
					clearInterval(interval);
					resolve();
				} else if (iterCount > 100) {
					clearInterval(interval);
					reject(new Error('TOO_MUCH_ITERATIONS'));
				}

				iterCount++;
			}, 50);
		});
	}

	function _setPopupHeightPosition() {
		// set appropriate height and position to popup
		const delta = $('body').height() - $('.popup-container').height();
		if (delta > 150) {
			// case 1: short window, set standard top and bottom margins
			$('.popup-container').css('marginTop', '100px').css('marginBottom', '50px');
		} else if (delta < 150 && delta > 0) {
			// case 2: transitional case, vertical margins is set to delta / 2
			$('.popup-container').css('marginTop', (delta / 2) + 'px').css('marginBottom', (delta / 2) + 'px');
		} else {
			// case 3: larger window, set little top and bottom margins and reduce .popup-content's size
			const margins = 100;
			const heightHeader = 30;
			const paddings = 40;
			$('.popup-container').css('marginTop', '50px').css('marginBottom', '50px');
			$('.popup-content').height($('body').height() - margins - heightHeader - paddings);
		}
	}

	function _resetHeightPosition() {
		$('.popup-container, .popup-content').removeAttr('style');
	}

	function initPopup(htmlContent) {
		_resetHeightPosition();

		$('.popup-content').html(htmlContent);
		
		_contentTrulyLoadedPromise().then(function() {
			_showPopup();
			_setPopupHeightPosition();
		}).catch(function(err) {
			if (err) {
				console.error('ERROR (POPUP WINDOW): ' + err.message, err.stack);
			}
		});
	}

	function showPopupNews(newsId) {
		$.ajax({
			method: 'GET',
			url: '/news/' + newsId,
			dataType: 'html',
			success: function(html) {
				
				initPopup(html);
				
				$('.image-container').magnificPopup({
					delegate: 'a',
					type: 'image',
					gallery: {
						enabled: true,
						tPrev: 'Предыдущее (Стрелка "Влево")',
						tNext: 'Следующее (Стрелка "Вправо")'
					},
					preload: [1,3]
				});

			},
			error: function() {
				alert('Ошибка сетевого соединения');
			}
		});
	}

	$(document).ready(function() {
		attachHandlers();
	});
})(window);
