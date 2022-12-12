
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: refined
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `regiao_administrativa`
--

DROP TABLE IF EXISTS `regiao_administrativa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regiao_administrativa` (
  `codra` int NOT NULL,
  `regiao_adm` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`codra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regiao_administrativa`
--

LOCK TABLES `regiao_administrativa` WRITE;
/*!40000 ALTER TABLE `regiao_administrativa` DISABLE KEYS */;
INSERT INTO `regiao_administrativa` VALUES (1,'PORTUARIA               '),(2,'CENTRO                  '),(3,'RIO COMPRIDO            '),(4,'BOTAFOGO                '),(5,'COPACABANA              '),(6,'LAGOA                   '),(7,'SAO CRISTOVAO           '),(8,'TIJUCA                  '),(9,'VILA ISABEL             '),(10,'RAMOS                   '),(11,'PENHA                   '),(12,'INHAUMA                 '),(13,'MEIER                   '),(14,'IRAJA                   '),(15,'MADUREIRA               '),(16,'JACAREPAGUA             '),(17,'BANGU                   '),(18,'CAMPO GRANDE            '),(19,'SANTA CRUZ              '),(20,'ILHA DO GOVERNADOR      '),(21,'PAQUETA                 '),(22,'ANCHIETA                '),(23,'SANTA TEREZA            '),(24,'BARRA DA TIJUCA         '),(25,'PAVUNA                  '),(26,'GUARATIBA               '),(27,'ROCINHA                 '),(28,'JACAREZINHO             '),(29,'COMPLEXO DO ALEMÃO      '),(30,'COMPLEXO DA MARE        '),(31,'VIGARIO GERAL           '),(33,'REALENGO                '),(34,'CIDADE DE DEUS          ');
/*!40000 ALTER TABLE `regiao_administrativa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-11 22:01:45
