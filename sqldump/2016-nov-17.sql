/*
SQLyog Community v12.2.4 (64 bit)
MySQL - 5.7.16-log : Database - optimus
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`optimus` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `optimus`;

/*Table structure for table `info_types` */

DROP TABLE IF EXISTS `info_types`;

CREATE TABLE `info_types` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `info_types` */

insert  into `info_types`(`id`,`name`) values 
(1,'Новости'),
(2,'СМИ о нас'),
(3,'Родителям'),
(4,'Интересное');

/*Table structure for table `info_units` */

DROP TABLE IF EXISTS `info_units`;

CREATE TABLE `info_units` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(180) NOT NULL,
  `text_short` varchar(450) DEFAULT NULL,
  `text_full` text NOT NULL,
  `info_types_id` int(10) unsigned NOT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL,
  `date_updated` datetime DEFAULT NULL,
  `date_deleted` datetime DEFAULT NULL,
  `date_published` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `info_units_fk_info_types` (`info_types_id`),
  CONSTRAINT `info_units_fk_info_types` FOREIGN KEY (`info_types_id`) REFERENCES `info_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

/*Data for the table `info_units` */

insert  into `info_units`(`id`,`title`,`text_short`,`text_full`,`info_types_id`,`is_published`,`date_created`,`date_updated`,`date_deleted`,`date_published`) values 
(17,'DON24.RU: Первая академия робототехники начала работу в Ростове','В донской столице состоялось открытие первой академии робототехники «Оптимус». Образовательный проект направлен на привлечение детей и подростков от 7 до 17 лет к научно-техническому творчеству.','Как рассказал доктор технических наук, профессор РГУПС Андрей Чернов, в лабораториях есть модели, которые работают на железнодорожных путях, снимают фото в дыму, проходят грязь, опасные участки. Также есть образцы со шлемами виртуальной реальности, где человек становится «оком» машины. \n\nУспешных учеников будут привлекать к работе над созданием проектов, которая ведется в ведущих вузах Ростовской области. В новом учебном заведении есть возможность бесплатного обучения детей-инвалидов и ребят из многодетных семей. \n\nОсновы программирования устройств позволят юным донским техникам сделать шаг к разработке актуальных в современном мире программ управления промышленными роботами.',2,1,'2016-11-17 22:58:24','2016-11-17 23:02:22',NULL,NULL),
(18,'Общество Робототехники из Волгодонска стали победителями фестиваля «Робофинист»',NULL,'Международный фестиваль робототехники «Робофинист» проходил в Санкт-Петербурге. В нем приняли участие свыше 600 конкурсантов из России, Белоруссии, Казахстана, Словакии и других стран. В рамках фестиваля юные робототехники соревновались в разнообразных категориях: футбол роботов, соревнования роботов по сумо, воздушные гонки, следование по линии, свободная творческая категория. Волгодонск на нем представляла сборная Фототехнического клуба городской станции юных техников.\n\n«В этом турнире мы принимаем участие второй раз, но победы добились впервые за всю историю кружка робототехники», – говорит педагог Фототехнического клуба Александр Бильченко.\n\nПобедителем в творческой категории стал пятиклассник Михаил Симаков. В течение года он разрабатывал проект «Автоматизированное хранилище радиоактивных отходов» и даже успел стать с ним победителем на конференции Академии юных исследователей – ежегодном научном форуме Волгодонска.\n\nБронзовыми призерами фестиваля стали Егор Плетнев и Даниил Яцечко. Ребята выступали в категории «Большое путешествие». Она представляет собой довольно сложное задание: роботу необходимо преодолеть на своем пути подвижную помеху, найти выход из лабиринта и выбить все банки в кегельринге, кроме одной – ее необходимо вернуть на старт, выполнив все задания в обратном порядке.\n\nЕще двое вологодонских школьников остановились в шаге от призовых мест. По давней традиции, существующей в Фототехническом клубе, участники фестиваля побывали на экскурсиях в Музее обороны и блокады Ленинграда, в Павловском парке, посетили книжные магазины.',1,1,'2016-11-17 23:00:21',NULL,NULL,NULL),
(19,'Лекция по истории робототехники',NULL,'[b]15 октября[/b] в 2016 г. в Академии робототехники ОПТИМУС запланирована обширная ознакомительная лекция, связанная с историей развития робототехники. Ребята узнают много интересной информации, получат возможность собрать и запрограммировать собственного робота. Лучшие специалисты в направлении образовательной робототехники продемонстрируют интересные робототехнические проекты.\n\nВ рамках дня открытых дверей, планируется розыгрыш бесплатных абонементов на занятия.\n[b]Место проведения : Ростовская область, г. Ростов-на-Дону, пр. Стачки, 2312 ( ориентир СОШ № 60) Начало мероприятия в 12:00[/b]\n\nЗанятия расчитаны для детей от 7 лет до 18 лет.',4,1,'2016-11-17 23:06:18',NULL,NULL,NULL),
(20,'День открытых дверей в Академии робототехники \"Оптимус\"',NULL,'День открытых дверей 15 октября в 12:00',1,1,'2016-11-17 23:07:16','2016-11-17 23:19:19',NULL,NULL),
(21,'Благодарим Ивана Кустова!',NULL,'Академия робототехники «ОПТИМУС» г. Ростов-на-Дону, выражает благодарность [b]Ивану Кустову[/b], руководителю центра технического инновационного творчества ребенка «РОБОКУБ» г. Краснодара за творческое сотрудничество, помощь и поддержку в процессе организации и проведения дня открытых дверей! \nЖелаем Вам и Вашему коллективу успеха, процветания, надеемся на долгую совместную работу!!!',1,1,'2016-11-17 23:08:41',NULL,NULL,NULL),
(22,'Познавательно-развлекательные мастер-классы по робототехнике!',NULL,'Академия робототехники ОПТИМУС предлагает новый формат организации детского праздника! \n[b]Мы предлагаем познавательно-развлекательные мастер-классы по робототехнике! [/b]\nМастер-класс будет интересен как детям от 6 до 9 лет, так и их родителям. Ребята самостоятельно сконструируют и оживят своего робота и вдоволь с ним наиграются. \nМастер-класс проводится на базе наборов LEGO WEDO. \n1 педагог, 4 набора, 4 ноутбука. Количество участников не более 8 чел. \nТематика мастер-классов: \n1. Мир животных; \n2. Футбол; \n3. Путешествие. \nПродолжительность-[b] 3 часа. [/b]\nСтоимость - [b]6 тысяч рублей[/b].',1,1,'2016-11-17 23:12:36',NULL,NULL,NULL);

/*Table structure for table `session` */

DROP TABLE IF EXISTS `session`;

CREATE TABLE `session` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `time_estimate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `session` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL,
  `name` varchar(10) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`role`) values 
(1,'kir','admin'),
(2,'john','user');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;