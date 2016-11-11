(function() {
	'use strict';
	
	function initBBEditor() {
		var wbbOpt = {
			lang: 'ru',
			buttons: 'bold,italic,underline'
		}
		$('#text-full').wysibb(wbbOpt);
	}

	function attachHandlers() {
		$('#news-create').on('click', function() {
			$.ajax({
				method: 'POST',
				url: '/admin/news',
				data: { 
					title: encodeURIComponent($('#title').val()), 
					textShort: encodeURIComponent($('#text-short').val()), 
					textFull: encodeURIComponent($('#text-full').bbcode()) 
				}
			})
		});
		$('#news-cancel').on('click', function() {
			//todo: is it always corrent return address
			window.location.href='/admin/news';
		});
	}

	$(document).ready(function() {
		initBBEditor();
		attachHandlers();
	});	
})()
