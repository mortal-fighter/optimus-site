(function(window) {
	'use strict';

	function attachHandlers() {
		
		$('#photo-next').on('click', function() {
			var files = $('#photos').get(0).files;
			
			if (files.length === 0) {
				$('#photos').focus();
				alert('Должна быть выбрана хотя бы одна фотография');
				return;
			} else if (files.length > 10) {
				$('#photos').focus();
				alert('Можно загружать не более 10 фото за раз');
				return;
			}

			var filesFiltered = [];
			var filesRejected = [];

			for (var i = 0; i < files.length; i++) {
				if (files[i].size <= 10485760 ) { // 10 mb
					filesFiltered.push(files[i]);
				} else {
					filesRejected.push(files[i]);
				}
			}
			var formData = new FormData();
			for (var i = 0; i < filesFiltered.length; i++) {
				formData.append('uploads', filesFiltered[i], filesFiltered[i].name);
			}
			formData.append('infoUnitId', $('#frm-photos').attr('info_unit_id'));

			$.ajax({
				url: '/admin/news/upload_photos',
				type: 'POST',
				data: formData,
				processData: false,
				contentType: false,
				success: function(data) {
					switch (data.code) {
						case 200: 
							window.location.href='/admin/news/' + $('#frm-photos').attr('info_unit_id') + '/photos';
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

		$('#photo-cancel').on('click', function() {
			window.location.href='/admin/news';
		})

		$('#photo-remove').on('click', function() {
			if (confirm('Вы действительно хотите удалить все фотографии?')) {
				$.ajax({
					url: '/admin/news/remove_all_photos',
					type: 'delete',
					data: {
						infoUnitId: $('#frm-photos').attr('info_unit_id') 
					},
					success: function(data) {
						switch (data.code) {
							case 200: 
								window.location.href='/admin/news/' + $('#frm-photos').attr('info_unit_id') + '/photos';
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

	function initControls() {
		if ($('.image-container li').length > 0) {
			$('#photo-remove').show();
		} else {
			$('#photo-remove').hide();
		}

		$('#progress').hide();
	}

	$(document).ready(function() {
		initControls();
		attachHandlers();
	});

})(window)