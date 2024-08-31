-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: 192.168.0.6    Database: apps
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `tbl_operations`
--

DROP TABLE IF EXISTS `tbl_operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_operations` (
  `protocol` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `employee_id` int NOT NULL,
  `creator_leader_id` int DEFAULT NULL,
  `client_name` varchar(100) NOT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `classification` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nomenclature` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `update_count` int NOT NULL,
  `list_service` varchar(255) DEFAULT NULL,
  `list_material` varchar(255) DEFAULT NULL,
  `observation` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `modification_at` timestamp NULL DEFAULT NULL,
  `finished_at` timestamp NULL DEFAULT NULL,
  `start_service_at` timestamp NOT NULL,
  `type_operation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`protocol`),
  KEY `idx_status` (`status`),
  KEY `idx_employee_id` (`employee_id`),
  KEY `idx_admin_id` (`creator_leader_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_operations`
--

/*!40000 ALTER TABLE `tbl_operations` DISABLE KEYS */;
INSERT INTO `tbl_operations` VALUES ('11899931260562235',8,NULL,'sdfwefsdfwef','Curitiba','L','sdfwsefw','ewfsdffef','active',182,NULL,NULL,NULL,'2024-03-03 18:39:49','2024-08-03 20:22:27',NULL,'2024-05-04 13:34:06','TIPO_COMUM'),('28193432705971138',8,NULL,'Jubileu','Matinhos','F','asdasd','asdasd','analysis',3,'{\"7\":0,\"8\":1}','{\"3-8\":2}','undefined','2024-05-04 18:32:15','2024-05-07 20:38:31',NULL,'2024-05-05 19:31:33','TIPO_COMUM'),('47687639004659370',9,7,'Awess','Matinhos','L','Gfhggj','Ythch','active',92,NULL,NULL,NULL,'2024-03-18 01:01:35','2024-04-05 15:26:56',NULL,'2024-05-04 13:34:06','TIPO_COMUM'),('69229635844401295',8,NULL,'Hdjsj','Paranaguá','F','Hdjsjdj','Hdjwjdh','paused',74,NULL,NULL,NULL,'2024-03-31 01:35:53','2024-07-22 01:08:16',NULL,'2024-05-04 13:34:06','TIPO_COMUM'),('72477770076458895',9,11,'sdfsdf','Curitiba','LF','sdfsdf','sdfsdf','paused',13,NULL,NULL,NULL,'2024-05-04 13:53:59','2024-07-25 11:51:57',NULL,'2024-05-04 16:00:56','TIPO_COMUM'),('76255796024200750',9,NULL,'sdfwerdsfdfs','Curitiba','LF','dsfw3erwesr','sdfwefdsf235','active',8,NULL,NULL,NULL,'2024-02-23 11:57:42','2024-03-24 13:05:38',NULL,'2024-05-04 13:34:06','TIPO_COMUM'),('86890899813852019',8,NULL,'asdasdasd','Curitiba','F','asdasdasd','asdasdasd','paused',7,NULL,NULL,NULL,'2024-08-11 11:41:47','2024-08-11 14:44:56',NULL,'2024-08-11 11:39:41','TIPO_CONSTRUÇÃO'),('93180269527764541',8,11,'ertert','Matinhos','F','ertert','ertert','paused',19,NULL,NULL,NULL,'2024-05-04 13:33:20','2024-08-11 14:44:45',NULL,'2024-05-04 13:34:06','TIPO_COMUM');
/*!40000 ALTER TABLE `tbl_operations` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-11 17:17:55
