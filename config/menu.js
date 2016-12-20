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
			hrefSecondary: '/' 
		}, 
		{
			titleShort: 'Новости',
			titleFull: 'Новости',
			titleCaption: 'Наши изменения',
			href: '/news'
		},
		{
			titleShort: 'Расписание',
			titleFull: 'Расписание',
			titleCaption: 'Приходи к нам',
			href: '/schedule'
		}, 
		{
			titleShort: 'Контакты',
			titleFull: 'Контакты',
			titleCaption: 'Наши лидеры',
			href: '/contacts'
		}
	]
};