(function(window) {
	'use strict';

	function newsItemRemove(id) {
		$('[news-id=' + id + ']').hide();
	} 

	function newsItemRestore(id) {
		$('[news-restore-id=' + id + ']').hide();
		$('[news-id=' + id + ']').show();
	}

	function attachHandlers() {
		$('.news-add').on('click', function(evt) {
			evt.preventDefault();
			window.location.href='/admin/news/create';
		});

		$('.news-edit').on('click', function() {
			var section = $(this).parents('section.news-item');
			var id = section.attr('news-id');
			window.location.href='/admin/news/edit/' + id;
		});

		$('.news-delete').on('click', function() {
			var section = $(this).parents('section.news-item');
			var id = section.attr('news-id');
			var rawTitle = section.find('h2').html();
			var title = rawTitle.substring(0, rawTitle.lastIndexOf('<span '));
			if (confirm('Вы действительно хотите удалить "' + title + '" и все прикрепленные фотографии (это действие нельзя будет отменить)?')) {
				$.ajax({
					method: 'DELETE',
					url: '/admin/news/' + id,
					context: window,
					success: function(data) {
						switch (data.code) {
							case 200: 
								showMessage('success', data.message);
								newsItemRemove(id);
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

		$('.news-restore a').on('click', function() {
			var id = $(this).parents('.news-restore').attr('news-restore-id');
			
			$.ajax({
				method: 'POST',
				url: '/admin/news/restore',
				data: { 
					id: id
				},
				success: function(data) {
					switch (data.code) {
						case 200: 
							showMessage('success', data.message);
							newsItemRestore(id);
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

		var pageCurrent;
		var pageTotal = 0;
		$('ul.pagination li.num').each(function(index, elem) {
			if ($(this).hasClass('current')) {
				pageCurrent = parseInt($(this).html());
			}
			$(elem).on('click', function() {
				window.location.href='/admin/news/page/' + $(this).html();
			});
			pageTotal++;
		});
		$('ul.pagination li.prev').on('click', function() {
			var pageNew = (pageCurrent > 1) ? pageCurrent - 1 : 1;
			window.location.href='/admin/news/page/' + pageNew;
		});
		$('ul.pagination li.next').on('click', function() {
			var pageNew = (pageCurrent < pageTotal) ? pageCurrent + 1 : pageTotal;
			window.location.href='/admin/news/page/' + pageNew;
		});
	}

	$(document).ready(function() {
		attachHandlers();
	});

})(window);
