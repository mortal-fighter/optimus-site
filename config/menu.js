module.exports = {
	menuAdmin: [
		{
			title: 'Новости',
			href: '/admin/news' 
		}, 
		{
			title: 'Расписание',
			href: '/admin/schedule/edit'
		}, 
		{
			title: 'Цены',
			href: '/admin/prices/edit'
		}
	],
	menuSite: [
		{
			titleShort: 'Главная',
			titleFull: 'Главная страница',
			titleCaption: 'Познакомимся',
			href: '/',
			hrefSecondary: '/',
			topMenu: true 
		}, 
		{
			titleShort: 'Новости',
			titleFull: 'Новости',
			titleCaption: 'Наши изменения',
			href: '/news',
			topMenu: true
		},
		{
			titleShort: 'Расписание',
			titleFull: 'Расписание',
			titleCaption: 'Приходи к нам',
			href: '/schedule',
			topMenu: true
		}, 
		{
			titleShort: 'Контакты',
			titleFull: 'Контакты',
			titleCaption: 'Наши лидеры',
			href: '/contacts',
			topMenu: true
		},
		{
			titleShort: 'Интересное',
			titleFull: 'Интересные видео о робототехнике',
			titleCaption: 'Посмотри',
			href: '/interesting',
			topMenu: true
		},
		{
			titleShort: 'Галерея',
			titleFull: 'Галерея',
			href: '/photos',
			topMenu: false
		}
	]
};