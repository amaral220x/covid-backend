
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
-- Table structure for table `bairro`
--

DROP TABLE IF EXISTS `bairro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bairro` (
  `codbairro` int NOT NULL,
  `nome` varchar(32) DEFAULT NULL,
  `area` float DEFAULT NULL,
  `fk_Regiao_Administrativa_codra` int DEFAULT NULL,
  `fk_Regiao_de_Planejamento_cod_rp` varchar(4) DEFAULT NULL,
  `bolsa_familia_sim` int NOT NULL DEFAULT '0',
  `bolsa_familia_nao` int NOT NULL DEFAULT '0',
  `faixa_renda_acima_1_5` int NOT NULL DEFAULT '0',
  `faixa_renda_baixa_renda` int NOT NULL DEFAULT '0',
  `faixa_renda_extrema_pobreza` int NOT NULL DEFAULT '0',
  `faixa_renda_pobreza` int NOT NULL DEFAULT '0',
  `extrema_pobreza_cadastrado` int NOT NULL DEFAULT '0',
  `extrema_pobreza_sem_registro` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`codbairro`),
  KEY `FK_Bairro_2` (`fk_Regiao_Administrativa_codra`),
  KEY `FK_Bairro_3` (`fk_Regiao_de_Planejamento_cod_rp`),
  CONSTRAINT `FK_Bairro_2` FOREIGN KEY (`fk_Regiao_Administrativa_codra`) REFERENCES `regiao_administrativa` (`codra`) ON DELETE RESTRICT,
  CONSTRAINT `FK_Bairro_3` FOREIGN KEY (`fk_Regiao_de_Planejamento_cod_rp`) REFERENCES `regiao_de_planejamento` (`cod_rp`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bairro`
--

LOCK TABLES `bairro` WRITE;
/*!40000 ALTER TABLE `bairro` DISABLE KEYS */;
INSERT INTO `bairro` VALUES (1,'Saúde                     ',363818,1,'1.1',159,392,29,22,354,9,416,0),(2,'Gamboa                    ',1112900,1,'1.1',951,2,262,131,2,59,2,0),(3,'Santo Cristo              ',1684720,1,'1.1',931,2,259,159,2,62,2,0),(4,'Caju                      ',5347480,1,'1.1',2,5,639,634,4,265,5,0),(5,'Centro                    ',5424740,2,'1.1',2,6,703,379,5,150,6,0),(6,'Catumbi                   ',539458,3,'1.1',1,1,252,279,1,177,1,0),(7,'Rio Comprido              ',3342510,3,'1.1',2,3,598,635,2,468,3,0),(8,'Cidade Nova               ',934853,3,'1.1',449,502,121,95,415,78,487,0),(9,'Estácio                   ',980401,3,'1.1',1,2,365,442,1,258,2,0),(10,'São Cristóvão             ',4105640,7,'1.1',2,3,480,416,3,221,4,0),(11,'Mangueira                 ',798129,7,'1.1',2,5,472,262,5,65,6,0),(12,'Benfica                   ',1736410,7,'1.1',2,3,496,507,3,426,4,1),(13,'Paquetá                   ',1705680,21,'1.1',214,475,61,34,422,28,479,0),(14,'Santa Teresa              ',5157130,23,'1.1',2,3,492,486,2,225,3,0),(15,'Flamengo                  ',1646250,4,'2.1',611,390,156,92,349,25,411,0),(16,'Glória                    ',1140070,4,'2.1',434,550,97,71,468,40,566,0),(17,'Laranjeiras               ',2493510,4,'2.1',549,936,124,86,804,19,1,0),(18,'Catete                    ',681027,4,'2.1',619,625,150,114,529,42,663,0),(19,'Cosme Velho               ',892540,4,'2.1',265,497,63,67,374,30,491,0),(20,'Botafogo                  ',4798960,4,'2.1',2,1,535,363,1,110,1,0),(21,'Humaitá                   ',1054480,4,'2.1',197,53,62,27,54,4,68,0),(22,'Urca                      ',2319000,4,'2.1',106,41,21,7,39,2,43,0),(23,'Leme                      ',977199,5,'2.1',541,564,136,158,436,75,558,0),(24,'Copacabana                ',4100850,5,'2.1',3,2,766,709,2,349,2,0),(25,'Ipanema                   ',3084910,6,'2.1',722,1,197,196,861,99,1,0),(26,'Leblon                    ',2153100,6,'2.1',377,201,141,80,180,14,208,0),(27,'Lagoa                     ',5109890,6,'2.1',60,32,22,8,33,1,35,0),(28,'Jardim Botânico           ',2689200,6,'2.1',225,131,70,48,108,11,129,0),(29,'Gávea                     ',2579640,6,'2.1',251,192,50,42,171,25,205,0),(30,'Vidigal                   ',1621380,6,'2.1',1,1,261,356,1,128,1,0),(31,'São Conrado               ',6488570,6,'2.1',192,160,25,37,133,7,177,0),(32,'Praça da Bandeira         ',719910,8,'2.2',397,277,93,77,224,42,284,0),(33,'Tijuca                    ',10065600,8,'2.2',4,3,1,1,2,721,3,0),(34,'Alto da Boa Vista         ',31495700,8,'2.2',627,469,139,165,320,104,428,0),(35,'Maracanã                  ',1667300,9,'2.2',419,196,91,53,149,30,206,0),(36,'Vila Isabel               ',3217130,9,'2.2',2,3,552,625,2,415,3,0),(37,'Andaraí                   ',2261300,9,'2.2',1,1,365,413,1,274,1,0),(38,'Grajaú                    ',5739100,9,'2.2',1,1,262,256,792,172,1,0),(39,'Manguinhos                ',2618350,10,'3.1',2,4,508,682,3,543,4,0),(40,'Bonsucesso                ',2199720,10,'3.1',1,1,295,254,1,141,1,0),(41,'Ramos                     ',2793530,10,'3.1',2,2,437,576,1,391,2,0),(42,'Olaria                    ',3689830,10,'3.1',2,2,548,491,2,220,2,0),(43,'Penha                     ',5811320,11,'3.5',4,8,990,870,7,424,8,0),(44,'Penha Circular            ',4623380,11,'3.5',2,4,589,558,3,333,4,0),(45,'Brás de Pina              ',3522220,11,'3.5',2,4,637,644,3,281,4,0),(46,'Cordovil                  ',3856800,31,'3.5',2,4,502,490,3,248,4,0),(47,'Parada de Lucas           ',2197970,31,'3.5',1,2,306,396,1,272,2,0),(48,'Vigário Geral             ',3385310,31,'3.5',2,4,545,679,3,371,4,0),(49,'Jardim América            ',1973970,31,'3.5',2,3,485,632,2,376,3,0),(50,'Higienópolis              ',1157470,12,'3.4',917,728,176,172,571,166,731,0),(51,'Jacaré                    ',842566,13,'3.2',2,4,559,662,4,798,4,0),(52,'Maria da Graça            ',824990,12,'3.4',270,257,61,54,219,21,264,0),(53,'Del Castilho              ',1440910,12,'3.4',903,1,208,200,1,57,1,0),(54,'Inhaúma                   ',3485270,12,'3.4',1,2,387,362,2,114,2,0),(55,'Engenho da Rainha         ',2225640,12,'3.4',1,2,292,239,1,73,2,0),(56,'Tomás Coelho              ',1747530,12,'3.4',1,2,269,274,1,52,2,0),(57,'São Francisco Xavier      ',648908,13,'3.2',308,412,78,45,317,15,440,0),(58,'Rocha                     ',1311630,13,'3.2',725,1,164,184,1,62,1,0),(59,'Riachuelo                 ',928108,13,'3.2',432,410,94,77,337,26,437,0),(60,'Sampaio                   ',884408,13,'3.2',792,1,163,193,1,85,1,0),(61,'Engenho Novo              ',2644850,13,'3.2',2,4,656,632,3,223,4,0),(62,'Lins de Vasconcelos       ',2669200,13,'3.2',2,4,521,473,3,167,4,0),(63,'Méier                     ',2470930,13,'3.2',1,1,348,168,1,24,1,0),(64,'Todos os Santos           ',1012640,13,'3.2',432,476,112,81,438,15,518,0),(65,'Cachambi                  ',2250160,13,'3.2',1,1,312,241,1,71,1,0),(66,'Engenho de Dentro         ',3920440,13,'3.2',2,4,705,479,4,104,5,0),(67,'Água Santa                ',2426230,13,'3.2',327,717,83,69,660,14,744,0),(68,'Encantado                 ',1060150,13,'3.2',719,1,225,127,1,40,1,0),(69,'Piedade                   ',3887100,13,'3.2',2,4,658,531,4,114,5,0),(70,'Abolição                  ',616333,13,'3.2',502,718,163,81,652,16,781,0),(71,'Pilares                   ',1836420,13,'3.2',1,2,342,271,2,69,2,0),(72,'Vila Kosmos               ',1519250,14,'3.3',802,753,148,218,596,135,731,0),(73,'Vicente de Carvalho       ',1835710,14,'3.3',1,1,286,324,1,277,1,0),(74,'Vila da Penha             ',1435720,14,'3.3',814,451,199,167,379,89,455,0),(75,'Vista Alegre              ',515209,14,'3.3',422,286,100,99,239,49,274,0),(76,'Irajá                     ',7477840,14,'3.3',4,3,936,902,3,550,3,0),(77,'Colégio                   ',2261110,14,'3.3',1,2,282,420,2,396,2,0),(78,'Campinho                  ',984510,15,'3.3',525,715,111,133,567,78,705,0),(79,'Quintino Bocaiúva         ',4323790,15,'3.3',1,1,300,269,1,141,1,0),(80,'Cavalcanti                ',1924150,15,'3.3',817,1,158,178,1,119,1,0),(81,'Engenheiro Leal           ',708274,15,'3.3',370,627,62,89,473,69,624,0),(82,'Cascadura                 ',2838970,15,'3.3',1,2,353,377,1,189,2,0),(83,'Madureira                 ',3787610,15,'3.3',2,5,616,668,4,391,5,0),(84,'Vaz Lobo                  ',1101220,15,'3.3',773,1,175,176,1,122,1,0),(85,'Turiaçú                   ',1255810,15,'3.3',816,1,166,162,1,97,1,0),(86,'Rocha Miranda             ',2886710,15,'3.3',2,3,555,473,3,280,3,0),(87,'Honório Gurgel            ',1374850,15,'3.3',1,2,319,320,2,180,2,0),(88,'Osvaldo Cruz              ',2071130,15,'3.3',1,10,1,0,9,1,9,0),(89,'Bento Ribeiro             ',3037850,15,'3.3',1,2,377,337,1,179,2,0),(90,'Marechal Hermes           ',3886230,15,'3.3',2,2,411,409,1,311,2,0),(91,'Ribeira                   ',861925,20,'3.7',87,50,18,20,35,16,43,0),(92,'Zumbi                     ',161118,20,'3.7',59,30,14,14,16,14,21,0),(93,'Cacuia                    ',2068690,20,'3.7',724,551,166,182,380,130,487,0),(94,'Pitangueiras              ',604130,20,'3.7',709,719,158,224,465,171,615,0),(95,'Praia da Bandeira         ',379406,20,'3.7',149,71,32,37,51,16,66,0),(96,'Cocotá                    ',490102,20,'3.7',341,265,102,83,200,47,252,0),(97,'Bancários                 ',978047,20,'3.7',918,830,223,296,524,206,708,0),(98,'Freguesia (Ilha)          ',4056400,20,'3.7',1,1,362,441,1,281,1,1),(99,'Jardim Guanabara          ',3205880,20,'3.7',417,137,82,48,107,37,145,0),(100,'Jardim Carioca            ',1621130,20,'3.7',1,1,374,489,936,334,1,0),(101,'Tauá                      ',1672550,20,'3.7',1,2,375,552,1,462,1,0),(102,'Moneró                    ',520557,20,'3.7',113,54,29,18,34,17,47,0),(103,'Portuguesa                ',1186410,20,'3.7',1,1,249,341,669,240,857,0),(104,'Galeão                    ',18957400,20,'3.7',2,2,368,688,1,526,2,0),(105,'Cidade Universitária      ',4690710,20,'3.7',543,167,75,94,104,27,182,0),(106,'Guadalupe                 ',3820010,22,'3.6',4,5,802,813,3,603,5,0),(107,'Anchieta                  ',4345730,22,'3.6',3,5,757,1,4,742,5,0),(108,'Parque Anchieta           ',3905790,22,'3.6',1,1,354,288,1,222,1,0),(109,'Ricardo de Albuquerque    ',2116870,22,'3.6',1,2,313,359,1,345,2,0),(110,'Coelho Neto               ',2511970,25,'3.6',2,3,443,425,2,229,3,0),(111,'Acari                     ',1605520,25,'3.6',3,5,457,933,4,992,5,0),(112,'Barros Filho              ',1723860,25,'3.6',1,1,172,306,1,297,1,0),(113,'Costa Barros              ',1814830,25,'3.6',3,7,648,1,5,914,6,0),(114,'Pavuna                    ',8311410,25,'3.6',5,7,1,1,5,1,7,1),(115,'Jacarepaguá               ',75796500,16,'4.1',6,6,1,1,4,1,5,0),(116,'Anil                      ',3500410,16,'4.1',2,1,521,737,1,392,1,0),(117,'Gardênia Azul             ',1236290,16,'4.1',2,2,430,837,1,545,2,0),(118,'Cidade de Deus            ',1273020,34,'4.1',5,11,845,1,9,732,11,0),(119,'Curicica                  ',3339570,16,'4.1',3,5,1,1,4,881,5,0),(120,'Freguesia (Jacarepaguá)   ',10328400,16,'4.1',951,904,212,192,716,98,936,0),(121,'Pechincha                 ',2830920,16,'4.1',1,823,232,234,639,129,807,0),(122,'Taquara                   ',13206600,16,'4.1',6,6,1,1,5,997,6,0),(123,'Tanque                    ',5567990,16,'4.1',2,3,567,728,2,536,3,0),(124,'Praça Seca                ',6499980,16,'4.1',4,5,898,1,4,743,5,0),(125,'Vila Valqueire            ',4232220,16,'4.1',1,1,255,343,1,198,1,0),(126,'Joá                       ',1689690,24,'4.2',4,1,1,1,1,0,1,0),(127,'Itanhangá                 ',13197700,24,'4.2',3,4,644,1,3,966,3,1),(128,'Barra da Tijuca           ',48150600,24,'4.2',489,305,102,95,258,44,315,0),(129,'Camorim                   ',8859910,24,'4.2',479,568,129,128,425,85,533,0),(130,'Vargem Pequena            ',14438300,24,'4.2',1,3,461,603,2,493,3,0),(131,'Vargem Grande             ',39380400,24,'4.2',1,1,259,309,1,295,1,0),(132,'Recreio dos Bandeirantes  ',30655600,24,'4.2',1,2,445,480,2,411,2,0),(133,'Grumari                   ',9598830,24,'4.2',7,16,0,1,14,3,14,0),(134,'Deodoro                   ',4640510,33,'5.1',603,1,90,137,835,121,1,0),(135,'Vila Militar              ',10756700,33,'5.1',145,219,26,32,185,25,222,0),(136,'Campo dos Afonsos         ',3252290,33,'5.1',12,6,1,2,4,0,9,0),(137,'Jardim Sulacap            ',7869200,33,'5.1',327,265,58,47,214,28,290,0),(138,'Magalhães Bastos          ',1975950,33,'5.1',1,2,306,353,1,214,2,0),(139,'Realengo                  ',26054200,33,'5.1',10,16,1,2,12,1,16,0),(140,'Padre Miguel              ',4865790,17,'5.1',4,6,779,936,5,680,6,0),(141,'Bangu',35966200,17,'5.1',12,19,2,2,15,2,19,0),(142,'Senador Camará            ',16908600,17,'5.1',7,11,1,1,8,1,11,0),(143,'Santíssimo                ',8319610,18,'5.2',3,5,711,630,4,604,5,0),(144,'Campo Grande',104445000,18,'5.2',16,27,3,3,21,1,28,0),(145,'Senador Vasconcelos       ',6441770,18,'5.2',1,2,399,386,2,181,2,0),(146,'Inhoaíba                  ',8287880,18,'5.2',4,8,824,783,6,626,9,0),(147,'Cosmos                    ',11261300,18,'5.2',5,8,989,1,6,758,9,1),(148,'Paciência                 ',27418000,19,'5.3',8,17,1,1,14,1,18,0),(149,'Santa Cruz                ',125044000,19,'5.3',16,35,3,3,29,2,36,0),(150,'Sepetiba                  ',11621300,19,'5.3',4,12,989,824,10,411,12,0),(151,'Guaratiba                 ',131787000,26,'5.4',9,15,1,2,12,2,14,0),(152,'Barra de Guaratiba        ',9442030,26,'5.4',368,428,75,53,332,48,429,0),(153,'Pedra de Guaratiba        ',3636910,26,'5.4',1,1,231,276,940,168,1,0),(154,'Rocinha                   ',1437190,27,'2.1',4,8,936,1,6,632,8,0),(155,'Jacarezinho               ',943874,28,'3.2',1,2,292,286,1,233,2,0),(156,'Complexo do Alemão        ',2960860,29,'3.4',7,13,1,1,10,1,12,0),(157,'Maré                      ',4268760,30,'3.1',8,13,1,2,9,2,12,0),(158,'Vasco da Gama             ',863075,7,'1.1',938,1,205,226,1,173,1,0),(159,'Parque Colúmbia           ',1517130,25,'3.6',892,1,175,248,1,213,1,0),(160,'Gericinó',2534300,17,'5.1',0,0,0,0,0,0,0,0),(161,'Lapa',298326,2,'1.1',36,73,5,5,65,4,79,0),(162,'Vila Kennedy',1473740,17,'5.1',2,7,495,476,6,328,7,0),(163,'Jabour',327327,17,'5.1',1,0,1,0,0,0,0,0),(164,'Ilha de Guaratiba',7714620,26,'5.4',8,5,0,5,5,3,5,0);
/*!40000 ALTER TABLE `bairro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-11 22:01:44
