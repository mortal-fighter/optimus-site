'use strict';

$(document).ready(function(){
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
});