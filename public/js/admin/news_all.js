(function(window) {
	'use strict';

	function newsItemRemove(id) {
		$('[news-id=' + id + ']').hide();
		$('[news-restore-id=' + id + ']').show();
	} 

	function newsItemRestore(id) {
		$('[news-restore-id=' + id + ']').hide();
		$('[news-id=' + id + ']').show();
	}

	function attachHandlers() {
		$('.news-edit').on('click', function() {
			var section = $(this).parents('section.news-item');
			var id = section.attr('news-id');
			window.location.href='/admin/news/edit/' + id;
		});

		$('.news-delete').on('click', function() {
			var section = $(this).parents('section.news-item');
			var id = section.attr('news-id');
			var title = section.find('h2').html();

			if (confirm('Вы действительно хотите удалить "' + title + '"?')) {
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
	}

	$(document).ready(function() {
		attachHandlers();
	});

})(window);
