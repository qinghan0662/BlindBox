-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: blindbox_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blind_boxes`
--

DROP TABLE IF EXISTS `blind_boxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blind_boxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '盲盒名称',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '盲盒描述',
  `price` decimal(10,2) NOT NULL COMMENT '盲盒价格',
  `coverImage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default_cover.jpg' COMMENT '封面图片URL',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active' COMMENT '盲盒状态',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `creatorId` int NOT NULL COMMENT '创建者用户ID',
  `sales` int NOT NULL DEFAULT '0' COMMENT '被下单次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blind_boxes`
--

LOCK TABLES `blind_boxes` WRITE;
/*!40000 ALTER TABLE `blind_boxes` DISABLE KEYS */;
INSERT INTO `blind_boxes` VALUES (1,'哈基米盲盒','包含多款猫咪造型玩具',39.90,'https://tse2-mm.cn.bing.net/th/id/OIP-C.2EPEKg6AuXgTRLDFlEBnlAHaHa?w=173&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3','active','2025-07-27 18:24:59','2025-07-29 08:45:27',NULL,1,134),(8,'狐狸盲盒','狡黠狐狸玩偶',49.90,'https://tse3-mm.cn.bing.net/th/id/OIP-C.0P24NQUAG26PxX4Es22BUAHaHa?w=164&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7','active','2025-07-27 20:00:38','2025-07-29 06:18:39',NULL,1,82),(9,'小猪盲盒','萌萌小猪造型玩具',39.90,'https://ts1.tc.mm.bing.net/th/id/OIP-C.NI1dgvUWr6uQ0ba2GuTfIwHaHa?w=199&h=211&c=8&rs=1&qlt=90&o=6&cb=thwsc4&dpr=1.3&pid=3.1&rm=2','active','2025-07-27 20:00:38','2025-07-29 08:43:46',NULL,1,64),(10,'小鱼盲盒','趣味小鱼造型玩具',29.90,'https://tse4-mm.cn.bing.net/th/id/OIP-C.aYQFpgyKBp6Fxn9i8giN7gHaGq?w=212&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7','active','2025-07-27 20:03:07','2025-07-28 08:04:17',NULL,1,51),(11,'小熊盲盒','憨态可掬小熊玩具',59.90,'https://tse2-mm.cn.bing.net/th/id/OIP-C.rcsCoqiOR1glLi57olYHEAHaHf?w=178&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3','active','2025-07-27 20:03:07','2025-07-28 16:39:13',NULL,1,71),(12,'鹿鹿盲盒','呆萌小鹿造型玩具',44.90,'https://tse4-mm.cn.bing.net/th/id/OIP-C.sQui9IwMdGS2UvrQ4tyIfwHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3','active','2025-07-27 20:04:33','2025-07-29 08:29:53',NULL,1,44),(14,'蟑螂盲盒','可爱蟑螂造型玩具',19.90,'https://tse1-mm.cn.bing.net/th/id/OIP-C.CZWyLCJ5KXvvYdltfedX-QHaHa?w=162&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7','active','2025-07-27 20:05:02','2025-07-28 17:16:19',NULL,1,28);
/*!40000 ALTER TABLE `blind_boxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `blindBoxId` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` int DEFAULT '5',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'111',5,'2025-07-29 06:06:38','2025-07-29 06:06:38'),(2,1,1,'22',5,'2025-07-29 06:06:50','2025-07-29 06:06:50'),(3,1,8,'8888',5,'2025-07-29 06:18:44','2025-07-29 06:18:44'),(4,2,1,'好好看',5,'2025-07-29 06:21:01','2025-07-29 06:21:01'),(5,4,12,'好看',5,'2025-07-29 08:30:25','2025-07-29 08:30:25'),(6,4,1,'好棒！\n',5,'2025-07-29 08:32:55','2025-07-29 08:32:55'),(7,5,9,'好看',5,'2025-07-29 08:43:19','2025-07-29 08:43:19');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `blindBoxId` int NOT NULL COMMENT '盲盒ID',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `resultType` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resultName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `blindBoxId` (`blindBoxId`),
  CONSTRAINT `orders_ibfk_14` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_15` FOREIGN KEY (`blindBoxId`) REFERENCES `blind_boxes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,'pending','2025-07-28 07:55:59','2025-07-28 07:55:59',NULL,NULL),(2,1,1,'pending','2025-07-28 07:56:01','2025-07-28 07:56:01',NULL,NULL),(3,1,1,'pending','2025-07-28 07:56:27','2025-07-28 07:56:27',NULL,NULL),(4,1,1,'pending','2025-07-28 07:57:40','2025-07-28 07:57:40',NULL,NULL),(5,1,1,'pending','2025-07-28 07:58:53','2025-07-28 07:58:53',NULL,NULL),(6,1,1,'pending','2025-07-28 07:59:00','2025-07-28 07:59:00',NULL,NULL),(7,1,1,'pending','2025-07-28 07:59:02','2025-07-28 07:59:02',NULL,NULL),(9,1,12,'pending','2025-07-28 08:07:35','2025-07-28 08:07:35',NULL,NULL),(10,1,1,'pending','2025-07-28 08:12:49','2025-07-28 08:12:49',NULL,NULL),(11,1,1,'pending','2025-07-28 08:13:44','2025-07-28 08:13:44',NULL,NULL),(12,1,1,'pending','2025-07-28 08:16:27','2025-07-28 08:16:27',NULL,NULL),(14,1,12,'pending','2025-07-28 09:02:00','2025-07-28 09:02:00',NULL,NULL),(15,1,12,'pending','2025-07-28 09:11:27','2025-07-28 09:11:27',NULL,NULL),(16,1,9,'pending','2025-07-28 13:48:02','2025-07-28 13:48:02',NULL,NULL),(17,1,1,'pending','2025-07-28 16:27:20','2025-07-28 16:27:20',NULL,NULL),(18,1,1,'pending','2025-07-28 16:31:06','2025-07-28 16:31:06',NULL,NULL),(19,1,1,'pending','2025-07-28 16:31:22','2025-07-28 16:31:22',NULL,NULL),(20,1,1,'pending','2025-07-28 16:35:18','2025-07-28 16:35:18',NULL,NULL),(21,1,1,'pending','2025-07-28 16:36:05','2025-07-28 16:36:05',NULL,NULL),(23,1,8,'pending','2025-07-28 16:38:35','2025-07-28 16:38:35',NULL,NULL),(25,1,14,'pending','2025-07-28 17:06:03','2025-07-28 17:06:03',NULL,NULL),(26,1,14,'pending','2025-07-28 17:15:50','2025-07-28 17:15:50',NULL,NULL),(28,1,14,'pending','2025-07-28 17:16:06','2025-07-28 17:16:06',NULL,NULL),(30,1,14,'pending','2025-07-28 17:16:10','2025-07-28 17:16:10',NULL,NULL),(33,1,14,'pending','2025-07-28 17:16:11','2025-07-28 17:16:11',NULL,NULL),(58,2,1,'pending','2025-07-29 06:20:50','2025-07-29 06:20:50','经典款','哈基米经典款'),(59,4,12,'pending','2025-07-29 08:29:53','2025-07-29 08:29:53','经典款','鹿鹿经典款'),(60,4,9,'pending','2025-07-29 08:31:53','2025-07-29 08:31:53','经典款','小猪经典款'),(62,5,9,'pending','2025-07-29 08:42:32','2025-07-29 08:42:32','经典款','小猪经典款'),(64,5,1,'pending','2025-07-29 08:45:27','2025-07-29 08:45:27','经典款','哈基米经典款');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shows`
--

DROP TABLE IF EXISTS `shows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL COMMENT '用户ID',
  `blindBoxId` int NOT NULL COMMENT '盲盒ID',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '秀内容',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '秀图片',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shows`
--

LOCK TABLES `shows` WRITE;
/*!40000 ALTER TABLE `shows` DISABLE KEYS */;
/*!40000 ALTER TABLE `shows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码（加密存储）',
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号',
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci DEFAULT 'user' COMMENT '用户角色',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `status` enum('active','banned') COLLATE utf8mb4_unicode_ci DEFAULT 'active' COMMENT '用户状态',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `username_33` (`username`),
  UNIQUE KEY `phone_2` (`phone`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `phone_3` (`phone`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `phone_4` (`phone`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `phone_5` (`phone`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `phone_6` (`phone`),
  UNIQUE KEY `username_6` (`username`),
  UNIQUE KEY `phone_7` (`phone`),
  UNIQUE KEY `username_7` (`username`),
  UNIQUE KEY `phone_8` (`phone`),
  UNIQUE KEY `username_8` (`username`),
  UNIQUE KEY `phone_9` (`phone`),
  UNIQUE KEY `username_9` (`username`),
  UNIQUE KEY `phone_10` (`phone`),
  UNIQUE KEY `username_10` (`username`),
  UNIQUE KEY `phone_11` (`phone`),
  UNIQUE KEY `username_11` (`username`),
  UNIQUE KEY `phone_12` (`phone`),
  UNIQUE KEY `username_12` (`username`),
  UNIQUE KEY `phone_13` (`phone`),
  UNIQUE KEY `username_13` (`username`),
  UNIQUE KEY `phone_14` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'haha','$2b$10$52kHpRIv09s0Ftovgm5bSOye4TG0VOsHXmZ4OxSjnXWyex8KtOUpq','197 2199 6889','user','2025-07-26 15:08:45','2025-07-26 15:08:45',NULL,'active'),(2,'xixi','$2b$10$OqGwjFqmgqZI.9MiIOeNc.I2PHNHYYMFBppXqz9THOhjYz3wdXcUe','13228295677','user','2025-07-29 06:20:35','2025-07-29 06:20:35',NULL,'active'),(3,'狐狸','$2b$10$h9SqUxtnY7CoeUwYMnfpXexGfy6aKTB/DiwX8HbnKukkxVYtbLMei','15633569987','user','2025-07-29 07:02:52','2025-07-29 07:02:52',NULL,'active'),(4,'蟑螂','$2b$10$qnXeKhuf2eRft7KovhSuHuF0.kFdBqYF7rP3S5eLQiNz8hOpA8WG2','13669844456','user','2025-07-29 08:27:49','2025-07-29 08:27:49',NULL,'active'),(5,'小鱼','$2b$10$Bm85x/7AvJRRLZSDvdX2tefxG2bdLb7O/FtMUNNlBgYVO8X9t784a','16689897856','user','2025-07-29 08:41:02','2025-07-29 08:41:02',NULL,'active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-29 17:22:23
