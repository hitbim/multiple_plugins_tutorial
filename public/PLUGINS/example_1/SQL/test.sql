CREATE TABLE `myFirstPluginDb` (
  `id` int(11) DEFAULT NULL,
  `uid` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pass` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datetime` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`htb_x_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
