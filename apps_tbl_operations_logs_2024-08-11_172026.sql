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
-- Table structure for table `tbl_operations_logs`
--

DROP TABLE IF EXISTS `tbl_operations_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_operations_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `protocol` varchar(30) NOT NULL,
  `employee_id` int NOT NULL,
  `creator_leader_id` int DEFAULT NULL,
  `client_name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `classification` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `nomenclature` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `update_count` int NOT NULL,
  `list_service` varchar(255) DEFAULT NULL,
  `list_material` varchar(255) DEFAULT NULL,
  `observation` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modification_at` timestamp NULL DEFAULT NULL,
  `finished_at` timestamp NULL DEFAULT NULL,
  `start_service_at` timestamp NOT NULL,
  `type_operation` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_employee_id` (`employee_id`),
  KEY `idx_protocol` (`protocol`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=804 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_operations_logs`
--

/*!40000 ALTER TABLE `tbl_operations_logs` DISABLE KEYS */;
INSERT INTO `tbl_operations_logs` VALUES (795,'86890899813852019',8,NULL,'asdasdasd','Curitiba','F','asdasdasd','asdasdasd','paused',1,NULL,NULL,NULL,'2024-08-11 11:41:47','2024-08-11 11:56:12',NULL,'2024-08-11 11:39:41','TIPO_CONSTRUÇÃO'),(796,'86890899813852019',8,NULL,'asdasdasd','Curitiba','F','asdasdasd','asdasdasd','active',2,NULL,NULL,NULL,'2024-08-11 11:41:47','2024-08-11 11:56:13',NULL,'2024-08-11 11:39:41','TIPO_CONSTRUÇÃO'),(797,'86890899813852019',8,NULL,'asdasdasd','Curitiba','F','asdasdasd','asdasdasd','paused',3,NULL,NULL,NULL,'2024-08-11 11:41:47','2024-08-11 12:28:28',NULL,'2024-08-11 11:39:41','TIPO_CONSTRUÇÃO'),(798,'86890899813852019',8,NULL,'asdasdasd','Curitiba','F','asdasdasd','asdasdasd','active',4,NULL,NULL,NULL,'2024-08-11 11:41:47','2024-08-11 12:28:59',NULL,'2024-08-11 11:39:41','TIPO_CONSTRUÇÃO'),(799,'86890899813852019',8,NULL,'asdasdasd','Curitiba','F','asdasdasd','asdasdasd','paused',5,NULL,NULL,NULL,'2024-08-11 11:41:47','2024-08-11 13:53:21',NULL,'2024-08-11 11:39:41','TIPO_CONSTRUÇÃO'),(800,'86890899813852019',8,NULL,'asdasdasd','Curitiba','F','asdasdasd','asdasdasd','active',6,NULL,NULL,NULL,'2024-08-11 11:41:47','2024-08-11 13:53:22',NULL,'2024-08-11 11:39:41','TIPO_CONSTRUÇÃO'),(801,'93180269527764541',8,11,'ertert','Matinhos','F','ertert','ertert','active',18,NULL,NULL,NULL,'2024-05-04 13:33:20','2024-08-11 14:44:28',NULL,'2024-05-04 13:34:06','TIPO_COMUM'),(802,'93180269527764541',8,11,'ertert','Matinhos','F','ertert','ertert','paused',19,NULL,NULL,NULL,'2024-05-04 13:33:20','2024-08-11 14:44:45',NULL,'2024-05-04 13:34:06','TIPO_COMUM'),(803,'86890899813852019',8,NULL,'asdasdasd','Curitiba','F','asdasdasd','asdasdasd','paused',7,NULL,NULL,NULL,'2024-08-11 11:41:47','2024-08-11 14:44:56',NULL,'2024-08-11 11:39:41','TIPO_CONSTRUÇÃO');
/*!40000 ALTER TABLE `tbl_operations_logs` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-11 17:20:28
