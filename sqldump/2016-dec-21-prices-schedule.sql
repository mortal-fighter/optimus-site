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

/*Table structure for table `prices` */

DROP TABLE IF EXISTS `prices`;

CREATE TABLE `prices` (
  `id` int(10) NOT NULL,
  `html` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `prices` */

insert  into `prices`(`id`,`html`) values 
(1,'<table style=\"width: 100%;\" border=\"1\" cellspacing=\"5\" cellpadding=\"5\">\n<tbody>\n<tr>\n<td><span style=\"color: #333399;\"><strong><span style=\"font-size: 12pt;\">Количество занятий</span></strong></span></td>\n<td><span style=\"color: #333399;\"><strong><span style=\"font-size: 12pt;\">Стоимость (руб.)</span></strong></span></td>\n</tr>\n<tr>\n<td><span style=\"font-size: 12pt;\">16 занятий</span></td>\n<td><span style=\"font-size: 12pt;\">5000</span></td>\n</tr>\n<tr>\n<td><span style=\"font-size: 12pt;\">8 занятий</span></td>\n<td><span style=\"font-size: 12pt;\">2800</span></td>\n</tr>\n<tr>\n<td><span style=\"font-size: 12pt;\">4 занятия</span></td>\n<td><span style=\"font-size: 12pt;\">1600</span></td>\n</tr>\n<tr>\n<td><span style=\"font-size: 12pt;\">Разовое занятие</span></td>\n<td><span style=\"font-size: 12pt;\">450</span></td>\n</tr>\n</tbody>\n</table>');

/*Table structure for table `schedule` */

DROP TABLE IF EXISTS `schedule`;

CREATE TABLE `schedule` (
  `id` int(10) NOT NULL,
  `html` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `schedule` */

insert  into `schedule`(`id`,`html`) values 
(1,'<table style=\"width: 100%;\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td style=\"width: 205px; text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">ПОНЕДЕЛЬНИК</span></td>\n<td style=\"width: 140px; text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">ВТОРНИК</span></td>\n<td style=\"width: 202px; text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">ПЯТНИЦА</span></td>\n<td style=\"width: 202px; text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">СУББОТА</span></td>\n<td style=\"width: 205px; text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">ВОСКРЕСЕНЬЕ</span></td>\n</tr>\n<tr>\n<td style=\"width: 205px; background-color: #2d9fe0; text-align: center;\">\n<p><strong><span style=\"color: #000000; font-size: 12pt;\">9.00-10.30</span></strong></p>\n<p><span style=\"color: #000000; font-size: 12pt;\">Младшая группа (идет набор)</span></p>\n</td>\n<td style=\"width: 140px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 202px; background-color: #2d9fe0;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>9.00-10.30</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Младшая группа (идет набор)</span></p>\n</td>\n<td style=\"width: 202px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 205px; background-color: #cd7dd1;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>9.00-10.30</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Младшая группа (идет набор)</span></p>\n</td>\n</tr>\n<tr>\n<td style=\"width: 205px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 140px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 202px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 202px; background-color: #cd7dd1;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>11.00-12.30</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Младшая группа (идет набор)</span></p>\n</td>\n<td style=\"width: 205px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n</tr>\n<tr>\n<td style=\"width: 205px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 140px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 202px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 202px; background-color: #b548a3;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>13.30-15.00</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Младшая группа</span></p>\n</td>\n<td style=\"width: 205px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n</tr>\n<tr>\n<td style=\"width: 205px; background-color: #1850a3;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>15.45-17.15</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Младшая группа (идет набор)</span></p>\n</td>\n<td style=\"width: 140px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 202px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 202px; background-color: #4bb854;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>15.45-17.15</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Старшая&nbsp;группа</span></p>\n</td>\n<td style=\"width: 205px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n</tr>\n<tr>\n<td style=\"width: 205px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n<td style=\"width: 140px; background-color: #fcbc97;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>18.00-19.30</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Старшая&nbsp;группа</span></p>\n</td>\n<td style=\"width: 202px; background-color: #fcbc97;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>18.00-19.30</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Старшая&nbsp;группа (идет набор)</span></p>\n</td>\n<td style=\"width: 202px; background-color: #386b1a;\">\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\"><strong>17.30-19.00</strong></span></p>\n<p style=\"text-align: center;\"><span style=\"color: #000000; font-size: 12pt;\">Старшая&nbsp;группа (идет набор)</span></p>\n</td>\n<td style=\"width: 205px;\"><span style=\"color: #000000; font-size: 12pt;\">&nbsp;</span></td>\n</tr>\n</tbody>\n</table>');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
