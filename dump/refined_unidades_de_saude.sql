
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
-- Table structure for table `unidades_de_saude`
--

DROP TABLE IF EXISTS `unidades_de_saude`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades_de_saude` (
  `CNES` int NOT NULL,
  `equipes` varchar(32) DEFAULT NULL,
  `fk_Bairro_codbairro` int,
  `nome` varchar(64) DEFAULT NULL,
  `endereco` varchar(64) DEFAULT NULL,
  KEY `FK_Unidades_de_Saude_2` (`fk_Bairro_codbairro`),
  CONSTRAINT `FK_Unidades_de_Saude_2` FOREIGN KEY (`fk_Bairro_codbairro`) REFERENCES `bairro` (`codbairro`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades_de_saude`
--

LOCK TABLES `unidades_de_saude` WRITE;
/*!40000 ALTER TABLE `unidades_de_saude` DISABLE KEYS */;
INSERT INTO `unidades_de_saude` VALUES (189200,'15 - MADUREIRA',90,'SMS CF ENGENHEIRO SANITARISTA PAULO D AGUILA AP 33','JORGE SHMIDT, 331'),(193089,'17 - BANGU',141,'SMS CF CRISTIANI VIEIRA PINHO AP - 51','PRACA LEALDINA MUNIZ'),(199338,'15 - MADUREIRA',78,'SMS CF ADV MARIO PIRES DA SILVA AP - 33','PRACA MARCIA MENDES 0 CAMPINHO'),(214949,'16 - JACAREPAGUA',118,'SMS CF LOURIVAL FRANCISCO DE OLIVEIRA AP - 40','AVENIDA COMANDANTE GUARANYS 0 CIDADE DE DEUS'),(265233,'24 - BARRA DA TIJUCA',127,'SMS CF PADRE MARCOS VINICIO MIRANDA VIEIRA - AP 40','ESTRADA DO ITANHANGA S/N ITANHANGA'),(2269295,'14 - IRAJA',76,'SMS CMS CLEMENTINO FRAGA - AP 33','RUA CAICARA, 514'),(2269309,'14 - IRAJA',77,'SMS CMS CARLOS CRUZ LIMA - AP 33','ESTRADA DO COLEGIO, 983'),(2269341,'9 - VILA ISABEL',36,'SMS RIO HOSPITAL MUNICIPAL JESUS','RUA OITO DE DEZEMBRO, 717'),(2269368,'8 - TIJUCA',32,'SMS POLICLINICA HELIO PELLEGRINO - AP 22','RUA DO MATOSO, 96'),(2269376,'8 - TIJUCA',33,'SMS CMS HEITOR BELTRAO - AP 22','RUA DESEMBARGADOR ISIDRO, 144'),(2269481,'13 - MEIER',69,'SMS HOSPITAL MUNICIPAL DA PIEDADE - AP 32','RUA DA CAPELA, 96'),(2269503,'13 - MEIER',71,'SMS CMS EDUARDO A VILHENA - AP 32','RUA JOSE DOS REIS, 951'),(2269511,'18 - CAMPO GRANDE',144,'SMS CMS GARFIELD DE ALMEIDA - AP 52','RUA GENERAL PAULO DE OLIVEIRA, 226'),(2269538,'18 - CAMPO GRANDE',146,'SMS CMS EDGARD MAGALHAES GOMES - AP 52','PRACA FILOMENA CARLOS MAGNO, 0'),(2269546,'18 - CAMPO GRANDE',144,'SMS CMS DR OSWALDO VILELLA - AP 52','RUA JOMAR MENDES, S/N'),(2269554,'18 - CAMPO GRANDE',144,'SMS CMS BELIZARIO PENNA - AP 52','RUA FRANKLIN, 29'),(2269562,'18 - CAMPO GRANDE',147,'SMS CMS MARIO RODRIGUES CID - AP 52','RUA MATUREIA, S/N'),(2269627,'25 - PAVUNA',113,'SMS CMS SYLVIO FREDERICO BRAUNER - AP 33','RUA DARWIN BRANDAO, S/N'),(2269651,'4 - BOTAFOGO',20,'SMS CMS DOM HELDER CAMARA - AP 21','RUA VOLUNTARIOS DA PATRIA, 136'),(2269724,'20 - ILHA DO GOVERNADOR',104,'SMS HOSPITAL MUNICIPAL NOSSA SENHORA DO LORETO - AP - 31','RUA TAIFEIRO OSMAR DE MORAES, 26'),(2269732,'15 - MADUREIRA',86,'SMS CMS CARMELA DUTRA - AP 33','AV. DOS ITALIANOS, 480'),(2269759,'22 - ANCHIETA',108,'SMS CMS FLAVIO DO COUTO VIEIRA - AP 33','RUA LUCIO JOSE FILHO, S/N'),(2269805,'13 - MEIER',66,'SMS CMS MILTON FONTES MAGARAO - AP 32','AV AMARO CAVALCANTI, 1387'),(2269813,'9 - VILA ISABEL',11,'SMS HOSPITAL DE GERIAT. E GERONT. - AP 22','RUA VISCONDE DE NITEROI, 1450'),(2269848,'17 - BANGU',142,'SMS CMS ALEXANDER FLEMING - AP 51','RUA MARMIARI, S/N'),(2269902,'31 - VIGARIO GERAL',46,'SMS CMS JOSE BREVES DOS SANTOS - AP 31','RUA MAR GRANDE, 10'),(2269929,'19 - SANTA CRUZ',149,'SMS CMS CATTAPRETA - AP 53','RUA ENGENHEIRO JOSE BOANERGES CESAR, S/N'),(2269937,'15 - MADUREIRA',83,'SMS CMS ALBERTO BORGERTH - AP 33','RUA PADRE MANSO, S/N'),(2269945,'15 - MADUREIRA',90,'SMS RIO HOSPITAL MATERNIDADE ALEXANDER FLEMING','JORGE SHMIDT, 331'),(2269953,'3 - RIO COMPRIDO',7,'SMS CMS SALLES NETTO - AP 10','PRACA CONDESSA PAULO DE FRONTIN, 52'),(2269996,'16 - JACAREPAGUA',115,'SMS IMAS JULIANO MOREIRA - AP 40','ESTRADA RODRIGUES CALDAS, 3400'),(2270013,'24 - BARRA DA TIJUCA',130,'SMS CMS CECILIA DONNANGELO - AP 40','ESTRADA DOS BANDEIRANTES, 21136'),(2270048,'17 - BANGU',141,'SMS POLICLINICA MANOEL GUILHERME (PAM BANGU) - AP 51','AV. RIBEIRO DANTAS, 571'),(2270056,'20 - ILHA DO GOVERNADOR',93,'SMS HOSPITAL MUNICIPAL PAULINO WERNECK - AP 31','ESTRADA DA CACUIA, 745'),(2270064,'20 - ILHA DO GOVERNADOR',100,'SMS POLICLINICA NEWTON ALVES CARDOZO - AP 31','RUA DR ANTONIO MONTEIRO - ANTIGA RUA COMBU, 191'),(2270072,'27 - ROCINHA',154,'SMS CMS DR ALBERT SABIN - AP 21','ESTRADA DA GAVEA, 250'),(2270242,'7 - SAO CRISTOVAO',11,'SMS HOSPITAL MUNICIPAL BARATA RIBEIRO AP. 1.0','RUA VISCONDE DE NITEROI, 1450'),(2270250,'7 - SAO CRISTOVAO',10,'SMS CMS ERNESTO ZEFERINO TIBAU JR - AP 10','AVENIDA DO EXERCITO, 1'),(2270269,'6 - LAGOA',29,'SMS HOSPITAL MUNICIPAL MIGUEL COUTO - AP 21','RUA MARIO RIBEIRO, 117'),(2270277,'26 - GUARATIBA',153,'SMS CMS ALVIMAR DE CARVALHO - AP 52','RUA SOLDADO ELISEU HIPOLITO, S/N'),(2270285,'26 - GUARATIBA',151,'SMS CMS WOODROW PIMENTEL PANTOJA - AP 52','ESTRADA DO MAGARCA, 4435'),(2270293,'26 - GUARATIBA',151,'SMS CMS RAUL BARROSO - AP 52','AV ROBERTO BURLE MAX, S/N'),(2270307,'26 - GUARATIBA',152,'SMS CMS MOURAO FILHO - AP 52','ESTRADA DA BARRA DE GUARATIBA, 9748'),(2270315,'26 - GUARATIBA',151,'SMS CMS MAIA BITTENCOURT - AP 52','ESTRADA DO MATO ALTO, 5609'),(2270323,'18 - CAMPO GRANDE',146,'SMS CMS ADAO PEREIRA NUNES - AP 52','RUA FLORESTAL, S/N'),(2270331,'18 - CAMPO GRANDE',144,'SMS POLICLINICA CARLOS ALBERTO NASCIMENTO - AP 52','PRACA MAJOR VIEIRA DE MELO, S/N'),(2270366,'18 - CAMPO GRANDE',143,'SMS CMS MANOEL DE ABREU - AP 52','RUA PADRE NOE GUALBERTO, 1'),(2270390,'15 - MADUREIRA',83,'SMS HOSPITAL MATERNIDADE HERCULANO PINHEIRO - AP 33','AV MIN EDGARD ROMERO, 276'),(2270420,'17 - BANGU',141,'SMS CMS WALDYR FRANCO - AP 51','PRACA CECILIA PEDRO, 60'),(2270439,'17 - BANGU',141,'SMS CMS HENRIQUE MONAT - AP 51','ESTRADA DO QUAFA, 7'),(2270455,'17 - BANGU',140,'SMS CMS PADRE MIGUEL - AP 51','RUA SANTO EVALDO, S/N'),(2270463,'17 - BANGU',141,'SMS CMS ATHAYDE JOSE DA FONSECA - AP 51','AV DEZENOVE DE ABRIL RUA ROQUE BARBOSA, S/N'),(2270471,'12 - INHAUMA',54,'SMS POLICLINICA RODOLPHO ROCCO - AP 32','ESTRADA ADHEMAR BEBIANO, 339'),(2270552,'17 - BANGU',142,'SMS CMS SILVIO BARBOSA - AP 51','RUA RODRIGUES DE FREITAS, S/N'),(2270560,'33 - REALENGO',137,'SMS CMS MASAO GOTO - AP 51','AV CARLOS PONTES, S/N'),(2270579,'17 - BANGU',142,'SMS CMS DR EITHEL PINHEIRO DE OLIVEIRA LIMA - AP 51','ESTRADA DO TAQUARAL, S/N'),(2270609,'24 - BARRA DA TIJUCA',128,'SMS HOSPITAL MUNICIPAL LOURENCO JORGE- AP 40','AV AYRTON SENNA, 2000'),(2270633,'18 - CAMPO GRANDE',146,'SMS CMS MARIO VITOR DE A PACHECO - AP 52','AVENIDA CESARIO DE MELO, 5580'),(2270641,'18 - CAMPO GRANDE',144,'SMS CMS PEDRO NAVA - AP 52','RUA DO PERNAMBUCANO, S/N'),(2270714,'7 - SAO CRISTOVAO',10,'SMS RIO HOSPITAL MATERNIDADE FERNANDO MAGALHAES','GENERAL JOSE CRISTINO, 87'),(2273179,'22 - ANCHIETA',106,'SMS CMS AUGUSTO DO AMARAL PEIXOTO - AP 33','RUA JORNALISTA HERMANO REQUIAO, 447'),(2273187,'16 - JACAREPAGUA',115,'SMS HOSPITAL MUNICIPAL ALVARO RAMOS - AP 40','RUA ADAUTO BOTELHO, S/N'),(2273225,'12 - INHAUMA',55,'SMS CMS ARIADNE LOPES DE MENEZES - AP 32','RUA ENG CARLOS GONCALVES PENNA, S/N'),(2273349,'16 - JACAREPAGUA',115,'SMS RIO HOSPITAL RAPHAEL DE PAULA SOUZA','ESTRADA DE CURICICA, 2000'),(2273381,'16 - JACAREPAGUA',115,'SMS HOSPITAL MUNICIPAL JURANDYR MANFREDINI - AP 40','RUA SAMPAIO CORREIA, S/N'),(2273489,'4 - BOTAFOGO',20,'SMS RIO HOSPITAL MUNICIPAL ROCHA MAIA','GENERAL SEVERIANO, 91'),(2273543,'19 - SANTA CRUZ',149,'SMS CMS FLORIPES GALDINO PEREIRA - AP 53','RUA SRG GERALDO BERTI, 0'),(2273551,'19 - SANTA CRUZ',149,'SMS CMS ALOYSIO AMANCIO DA SILVA - AP 53','ESTRADA DO CURTUME, S/N'),(2273578,'19 - SANTA CRUZ',149,'SMS CMS CESARIO DE MELLO - AP 53','RUA 2, S/N'),(2273586,'19 - SANTA CRUZ',148,'SMS CMS EMYDIO CABRAL - AP 53','RUA IEDA SANTOS DELGADO, 3'),(2273616,'19 - SANTA CRUZ',148,'SMS CMS CYRO DE MELLO MANGUARIBA - AP 53','AVENIDA DO CANAL, S/N'),(2273640,'20 - ILHA DO GOVERNADOR',97,'SMS CMS MADRE TERESA DE CALCUTA - AP 31','AV ILHA DAS ENXADAS, 100'),(2277271,'7 - SAO CRISTOVAO',10,'SMS INST DE MEDICINA VETERINARIA JORGE VAITSMAN - AP10','AV. BARTOLOMEU DE GUSMAO, 1120'),(2277298,'1 - PORTUARIA',4,'SMS CMS FERNANDO A BRAGA LOPES CAJU - AP 10','RUA CARLOS SEIDL, 785'),(2277301,'21-  PAQUETA',13,'SMS CMS MANOEL ARTHUR VILLABOIM - AP 10','PRACA BOM JESUS, 40'),(2277328,'23 - SANTA TERESA',5,'SMS CMS OSWALDO CRUZ - AP 10','AV HENRIQUE VALADARES, 151'),(2280183,'2 - CENTRO',5,'SMS RIO HOSPITAL MUNICIPAL SOUZA AGUIAR','PRACA DA REPUBLICA, 111'),(2280191,'19 - SANTA CRUZ',149,'SMS POLICLINICA LINCOLN DE FREITAS FILHO - AP 53','RUA ALVARO ALBERTO, 601'),(2280205,'6 - LAGOA',30,'SMS CMS RODOLPHO PERISSE / VIDIGAL - AP 21','AV. PRESIDENTE JOAO GOULART, 735'),(2280248,'13 - MEIER',62,'SMS MATERNIDADE CARMELA DUTRA AP 32','RUA AQUIDABA, 1037'),(2280272,'9 - VILA ISABEL',36,'SMS CMS MARIA AUGUSTA ESTRELLA - AP 22','RUA VISCONDE DE SANTA ISABEL, 56'),(2280280,'8 - TIJUCA',34,'SMS CMS NICOLA ALBANO - AP 22','RUA BOA VISTA, 190'),(2280299,'2 - CENTRO',5,'SMS POLICLINICA ANTONIO RIBEIRO NETTO - AP 10','AV TREZE DE MAIO, 23'),(2280310,'19 - SANTA CRUZ',149,'SMS CF ERNANI DE PAIVA FERREIRA BRAGA - AP 53','AVENIDA JOAO XXIII, S/N'),(2280728,'13 - MEIER',66,'SMS RIO INSTITUTO MUNICIPAL NISE DA SILVEIRA AP 32','RUA RAMIRO MAGALHAES, 521'),(2280736,'28 - JACAREZINHO',155,'SMS CMS RENATO ROCCO - AP 32','RUA AIRES DE CASAL, S/N'),(2280744,'13 - MEIER',61,'SMS CMS CARLOS GENTILLE DE MELLO - AP 32','RUA BICUIBA, 181'),(2280760,'19 - SANTA CRUZ',148,'SMS CMS MARIA APARECIDA DE ALMEIDA - AP 53','PRACA ANTONIO MATTOS AREAS, S/N'),(2280779,'20 - ILHA DO GOVERNADOR',93,'SMS CMS NECKER PINTO - AP 31','ESTRADA RIO JEQUIA, 428'),(2280787,'8 - TIJUCA',33,'SMS CMS NILZA ROSA - AP 22','RUA CASTEL NUOVO, 150'),(2280795,'5 - COPACABANA',24,'SMS CMS JOAO BARROS BARRETO - AP 21','RUA TENREIRO ARANHA, S/N'),(2288346,'3 - RIO COMPRIDO',8,'SMS CMS MARCOLINO CANDAU - AP 10','RUA LAURA DE ARAUJO, 36'),(2288362,'4 - BOTAFOGO',20,'SMS INSTITUTO MUNICIPAL PHILIPPE PINEL - AP 21','AV VENCESLAU BRAS, 65'),(2288370,'6 - LAGOA',29,'SMS CMS PINDARO DE CARVALHO RODRIGUES - AP 21','AV PADRE LEONEL FRANCA, S/N'),(2291266,'14 - IRAJA',76,'SMS RIO HOSPITAL MUNICIPAL FRANCISCO DA SILVA TELLES','UBIRAJARA, 25'),(2291274,'1 - PORTUARIA',3,'SMS CMS JOSE MESSIAS DO CARMO - AP 10','RUA WALDEMAR DUTRA, 55'),(2295032,'10 - RAMOS',41,'SMS CMS MARIA CRISTINA ROMA PAUGARTTEN - AP 31','RUA JOAQUIM GOMES, S/N'),(2295237,'19 - SANTA CRUZ',148,'SMS CF JOAO BATISTA CHAGAS - AP 53','RUA PITOMBEIRAS, S/N'),(2295253,'19 - SANTA CRUZ',150,'SMS CF WALDEMAR BERARDINELLI - AP 53','RUA FREDERICO TROTA, S/N'),(2295326,'9 - VILA ISABEL',35,'SMS CMR OSCAR CLARK - AP 22','RUA GENERAL CANABARRO, 345'),(2295407,'18 - CAMPO GRANDE',144,'SMS HOSPITAL MUNICIPAL ROCHA FARIA - AP 52','AV CESARIO DE MELO, 3215'),(2296306,'13 - MEIER',63,'SMS RIO HOSPITAL MUNICIPAL SALGADO FILHO','ARQUIAS CORDEIRO, 370'),(2296527,'11 - PENHA',43,'SMS POLICLINICA JOSE PARANHOS FONTENELLE - AP 31','RUA LEOPOLDINA REGO, 700'),(2296535,'31 - VIGARIO GERAL',49,'SMS CMS NAGIB JORGE FARAH - AP 31','PRACA SOLDADO MICHEL CHEIB, S/N'),(2296543,'16 - JACAREPAGUA',123,'SMS CMS JORGE SALDANHA BANDEIRA DE MELLO - AP40','AVENIDA GEREMARIO DANTAS, 135'),(2296551,'30 - COMPLEXO DA MARE',157,'SMS CMS AMERICO VELOSO - AP 31','RUA GERSON FERREIRA, 100'),(2296586,'25 - PAVUNA',114,'SMS CMS NASCIMENTO GURGEL - AP 33','RUA MERCURIO, S/N'),(2298120,'33 - REALENGO',139,'SMS HOSPITAL MUNICIPAL ALBERT SCHWEITZER - AP 51','RUA NILOPOLIS, 329'),(2708159,'13 - MEIER',66,'SMS CMR ENG DENTRO - AP 32','RUA RAMIRO MAGALHAES, 521'),(2708167,'13 - MEIER',63,'SMS CMS CESAR PERNETTA - AP 32','RUA ANA BARBOSA, 21'),(2708175,'16 - JACAREPAGUA',115,'SMS POLICLINICA NEWTON BETHLEM - AP 40','RUA BARAO, 259'),(2708183,'19 - SANTA CRUZ',149,'SMS CMS DECIO AMARAL FILHO - AP 53','RUA CILON CUNHA BRUM, S/N'),(2708205,'15 - MADUREIRA',82,'SMS CMS MARIO OLINTO DE OLIVEIRA - AP 33','RUA FERRAZ, 2'),(2708213,'24 - BARRA DA TIJUCA',132,'SMS CMS HARVEY RIBEIRO DE SOUZA FILHO - AP 40','AVENIDA GUIOMAR NOVAES, 133'),(2708388,'18 - CAMPO GRANDE',144,'SMS CAPS PEDRO PELLEGRINO - AP 52','PRACA MAJOR VIEIRA DE MELO, 10'),(2708396,'19 - SANTA CRUZ',149,'SMS CAPS SIMAO BACAMARTE - AP 53','R SENADOR CAMARA, 224'),(2708418,'33 - REALENGO',137,'SMS CAPSI PEQUENO HANS - AP 51','AVENIDA CARLOS PONTES, S/N'),(2708426,'23 - SANTA TERESA',14,'SMS CMS ERNANI AGRICOLA - AP 10','RUA CONSTANT JARDIM, 8'),(2708434,'4 - BOTAFOGO',18,'SMS CMS MANOEL JOSE FERREIRA - AP 21','RUA SILVEIRA MARTINS, 161'),(2778696,'8 - TIJUCA',33,'SMS CMS CARLOS FIGUEIREDO FILHO / BOREL - AP 22','RUA SAO MIGUEL, S/N'),(2806320,'19 - SANTA CRUZ',148,'SMS CMS SAVIO ANTUNES / ANTARES - AP 53','AVENIDA HERMINIA AURELIO SAMPAIO, 105'),(3018091,'17 - BANGU',141,'SMS CAPS LIMA BARRETO - AP 51','AVENIDA RIBEIRO DANTAS, 571'),(3403238,'14 - IRAJA',76,'SMS CAPS RUBENS CORREA - AP 33','RUA CAPITAO ALIATAR MARTINS, 231'),(3416321,'33 - REALENGO',139,'SMS CF ANTONIO GONCALVES DA SILVA - AP 51','ESTRADA DO ENGENHO NOVO, S/N'),(3416356,'33 - REALENGO',138,'SMS CMS BUA BOANERGES BORGES DA FONSECA - AP 51','RUA LARANJEIRAS DO SUL, S/N'),(3416372,'17 - BANGU',141,'SMS CF ROSINO BACCARINI - AP 51','RUA ARAQUEM, 840'),(3567486,'33 - REALENGO',139,'SMS CASA DE PARTO DAVID CAPISTRANO FILHO - AP 51','AVENIDA PEDRO DA CUNHA, S/N'),(3567494,'20 - ILHA DO GOVERNADOR',97,'SMS CAPS ERNESTO NAZARETH - AP 31','AVENIDA PARANAPUAN, 435'),(3567508,'16 - JACAREPAGUA',115,'SMS CMS RAPHAEL DE PAULA SOUZA - AP 40','ESTRADA DE CURICICA, 2000'),(3567516,'16 - JACAREPAGUA',122,'SMS CAPSI ELIZA SANTA ROZA - AP 40','RUA SAMPAIO CORREA, 105'),(3567532,'18 - CAMPO GRANDE',146,'SMS CAPS PROFETA GENTILEZA - AP 52','ESTRADA DE INHOAIBA, 849'),(3567540,'18 - CAMPO GRANDE',146,'SMS CF ANA GONZAGA - AP 52','PRACA JOAO WESLEY, 7'),(3567559,'18 - CAMPO GRANDE',147,'SMS CF VALDECIR SALUSTIANO CARDOZO - AP 52','PRACA MANOEL MARIZ, S/N'),(3567567,'26 - GUARATIBA',151,'SMS CF ALKINDAR SOARES PEREIRA FILHO - AP 52','ESTRADA DA PEDRA, S/N'),(3784959,'11 - PENHA',44,'SMS CMS JOAO CANDIDO - AP 31','AV. LOBO JR., 83'),(3784975,'29 - COMPLEXO DO ALEMAO',156,'SMS CF ZILDA ARNS - AP 31','ESTRADA ITARARE, 951'),(3785009,'19 - SANTA CRUZ',150,'SMS CF VALERIA GOMES ESTEVES - AP 53','RUA VITORIA REGIA, Q. 4'),(3785025,'9 - VILA ISABEL',36,'SMS CF RECANTO DO TROVADOR - AP 22','RUA VISCONDE DE SANTA ISABEL, 272'),(3796310,'6 - LAGOA',31,'SMS CMS VILA CANOAS - AP 21','ESTRADA DAS CANOAS, 610'),(3820599,'33 - REALENGO',139,'SMS CF ARMANDO PALHARES AGUINAGA - AP 51','AV SANTA CRUZ, S/N'),(4046307,'34 - CIDADE DE DEUS',118,'SMS CMS HAMILTON LAND - AP 40','AV EDGARD WERNECK, 1601'),(5034272,'16 - JACAREPAGUA',122,'SMS CAPS ARTHUR BISPO DO ROSARIO - AP 40','ESTRADA RODRIGUES CALDAS, 3400'),(5044685,'25 - PAVUNA',111,'SMS CF ENFERMEIRA EDMA VALADAO - AP 33','AV. BRASIL, 18.476'),(5154197,'18 - CAMPO GRANDE',146,'SMS CF DAVID CAPISTRANO FILHO - AP 52','AVENIDA CESARIO DE MELO, S/N'),(5179726,'11 - PENHA',44,'SMS CF ALOYSIO AUGUSTO NOVIS - AP 31','AVENIDA BRAS DE PINA, 651'),(5240832,'11 - PENHA',42,'SMS CAPS FERNANDO DINIZ - AP 31','RUA LEOPOLDINA REGO, 754'),(5313783,'22 - ANCHIETA',106,'SMS CAPS DIRCINHA E LINDA BATISTA - AP 33','RUA JORNALISTA HERMANO REQUIAO, 447'),(5315026,'25 - PAVUNA',110,'SMS CMS FAZENDA BOTAFOGO - AP 33','RUA ARNALDO GUINLE, S/N'),(5315050,'25 - PAVUNA',114,'SMS CMS PORTUS E QUITANDA - AP 33','RUA JORGE NOGUEIRA, S/N'),(5346320,'13 - MEIER',68,'SMS CAPS CLARICE LISPECTOR - AP 32','RUA DOIS DE FEVEREIRO, 785'),(5358612,'8 - TIJUCA',33,'SMS CMS CASA BRANCA - AP 22','ESTRADA DA CASA BRANCA, 200'),(5413605,'13 - MEIER',68,'SMS CAPS AD RAUL SEIXAS - AP 32','RUA DOIS DE FEVEREIRO, 785'),(5417708,'15 - MADUREIRA',83,'SMS CF SOUZA MARQUES - AP 33','PRACA PATRIARCA, S/N'),(5423430,'13 - MEIER',69,'SMS CAPSI MARIA CLARA MACHADO - AP 32','RUA GOMES SERPA, 49'),(5456932,'10 - RAMOS',39,'FIOCRUZ/ENSP/CENTRO DE SAUDE ESCOLA GERMANO SINVAL FARIA','RUA LEOPOLDO BULHOES, 1480'),(5457009,'31 - VIGARIO GERAL',48,'SMS CMS IRACI LOPES - AP 31','RUA ANTONIO MENDES, 2'),(5465877,'24 - BARRA DA TIJUCA',130,'SMS CMS NOVO PALMARES - AP 40','RUA JACARANDA, 16'),(5465885,'16 - JACAREPAGUA',115,'SMS CMS SANTA MARIA - AP 40','ESTRADA DO RIO PEQUENO, S/N'),(5467136,'20 - ILHA DO GOVERNADOR',103,'SMS CMS PARQUE ROYAL - AP 31','RUA JORNALISTA ALAIDE PIRES, 25'),(5476607,'30 - COMPLEXO DA MARE',157,'SMS CF ADIB JATENE - AP 31','AVENIDA BENTO RIBEIRO DANTAS, S/N'),(5476844,'30 - COMPLEXO DA MARE',157,'SMS CMS VILA DO JOAO - AP 31','RUA 17, S/N'),(5483107,'2 - CENTRO',5,'SMS NUCLEO DE SAUDE DO TRABALHADOR NUSAT 1 - AP 10','AVENIDA PRESIDENTE VARGAS, 1997'),(5483115,'9 - VILA ISABEL',32,'SMS NUCLEO DE SAUDE DO TRABALHADOR NUSAT 2 - AP 22','RUA GENERAL CANABARRO, 345'),(5546583,'17 - BANGU',141,'SMS CMS CATIRI - AP 51','RUA TRES MARIAS, S/N'),(5546591,'17 - BANGU',141,'SMS CF MARIA JOSE DE SOUSA BARBOSA - AP 51','ESTRADA DO TAQUARAL, 100'),(5598435,'13 - MEIER',57,'SMS CMS TIA ALICE - AP 32','R SANTOS MELLO, 73'),(5620287,'18 - CAMPO GRANDE',144,'SMS CF AGENOR DE MIRANDA ARAUJO NETO - AP 52','ESTRADA DO MATO ALTO, S/N'),(5621801,'23 - SANTA TERESA',5,'SMS CSE LAPA - AP 10','RUA DO RIACHUELO, 43'),(5670357,'18 - CAMPO GRANDE',147,'SMS CMS VILA DO CEU - AP 52','RUA GUARUJA, 69'),(5717256,'25 - PAVUNA',111,'SMS HOSPITAL MUNICIPAL RONALDO GAZOLLA - AP 33','AV PASTOR MARTIN LUTHER KING, 10976'),(5874408,'13 - MEIER',54,'SMS CAPS TORQUATO NETO - AP 32','RUA HONORIO, 461'),(5879655,'14 - IRAJA',76,'SMS CMS ALICE TOLEDO TIBIRICA - AP 33','RUA JURITI, S/N'),(6023320,'30 - COMPLEXO DA MARE',157,'SMS CF AUGUSTO BOAL - AP 31','AV. GUILHERME MAXWEL, 107'),(6023916,'17 - BANGU',141,'SMS CF FIORELLO RAYMUNDO - AP 51','RUA ACAFRAO, S/N'),(6023975,'13 - MEIER',57,'SMS CF DONA ZICA - AP 10','RUA JOAO RODRIGUES, 43'),(6023983,'3 - RIO COMPRIDO',8,'SMS CSE SAO FRANCISCO DE ASSIS - AP 10','RUA AFONSO CAVALCANTI, 20'),(6026737,'19 - SANTA CRUZ',150,'SMS CMS ADELINO SIMOES - NOVA SEPETIBA - AP 53','AVENIDA SETE, S/N'),(6028233,'3 - RIO COMPRIDO',7,'SMS CF ESTACIO DE SA - AP 10','RUA DO BISPO, 159'),(6029825,'18 - CAMPO GRANDE',144,'SMS CMS CARLOS ALBERTO NASCIMENTO - AP 52','PRACA MAJOR VIEIRA DE MELO, 0'),(6029841,'18 - CAMPO GRANDE',147,'SMS CF ROGERIO ROCCO - AP 52','ESTRADA DO ENCANAMENTO, S/N'),(6029922,'18 - CAMPO GRANDE',146,'SMS CMS AGUIAR TORRES - AP 52','ESTRADA DE INHOAIBA, 849'),(6029965,'25 - PAVUNA',111,'SMS CF MARCOS VALADAO - AP 33','AV. PASTOR MARTIN LUTHER KING JR, 10976'),(6033121,'13 - MEIER',62,'SMS CMS ANTENOR NASCENTES - AP 32','RUA PROFESSOR ANTENOR NASCENTES, 125'),(6044697,'9 - VILA ISABEL',35,'SMS CAPS AD MANE GARRINCHA - AP 22','AVENIDA PROFESSOR MANOEL DE ABREU, 196'),(6185045,'18 - CAMPO GRANDE',144,'SMS CAPSI JOAO DE BARRO - AP 52','ESTRADA DO CAMPINHO, S/N'),(6272053,'4 - BOTAFOGO',20,'SMS CF SANTA MARTA - AP 21','RUA SAO CLEMENTE, 312'),(6387152,'17 - BANGU',140,'SMS CF OLIMPIA ESTEVES - AP 51','RUA OLIMPIA ESTEVES, S/N'),(6421482,'7 - SAO CRISTOVAO',12,'SMS UPA 24H MANGUINHOS - AP 31','AV DOM HELDER CAMARA, 1390'),(6487815,'17 - BANGU',162,'SMS UPA 24H VILA KENNEDY - AP 51','PRACA DOLOMITAS, S/N'),(6496989,'5 - COPACABANA',24,'SMS CF CANTAGALO PAVAO - PAVAOZINHO - AP 21','LADEIRA SAINT ROMAN, 172'),(6503772,'27 - ROCINHA',154,'SMS CF MARIA DO SOCORRO / ROCINHA - AP 21','ESTRADA DA GAVEA, 522'),(6506232,'6 - LAGOA',31,'SMS CF RINALDO DE LAMARE - AP 21','AV. NIEMEYER, 776'),(6507409,'27 - ROCINHA',154,'SMS UPA 24H ROCINHA - AP 21','ESTRADA DA GAVEA, 522'),(6512925,'29 - COMPLEXO DO ALEMAO',40,'SMS UPA 24H COMPLEXO DO ALEMAO - AP 31','ESTRADA DO ITARARE, 221'),(6514022,'28 - JACAREZINHO',155,'SMS CF VICTOR VALLA - AP 31','AVENIDA DOM HELDER CAMARA, 1390'),(6524486,'29 - COMPLEXO DO ALEMAO',156,'SMS CF RODRIGO Y AGUILAR ROIG - AP 31','ESTRADA DO ITARARE, 650'),(6527027,'29 - COMPLEXO DO ALEMAO',156,'SMS CAPS JOAO FERREIRA SILVA FILHO - AP 31','ESTRADA DO ITARARE, 951'),(6551556,'27 - ROCINHA',154,'SMS CAPS MARIA DO SOCORRO SANTOS - AP 21','ESTRADA DA GAVEA, 522'),(6559727,'19 - SANTA CRUZ',148,'SMS CF ILZO MOTTA DE MELLO - AP 53','AVENIDA CESARIO DE MELO, 11485'),(6559735,'19 - SANTA CRUZ',149,'SMS CF LENICE MARIA MONTEIRO COELHO - AP 53','RUA JOSE CARLOS MATTA MACHADO, S/N'),(6568491,'20 - ILHA DO GOVERNADOR',101,'SMS CF MARIA SEBASTIANA DE OLIVEIRA - AP 31','AVENIDA DOS MAGISTERIOS, S/N'),(6571956,'22 - ANCHIETA',106,'SMS CF JOSUETE SANTANNA DE OLIVEIRA - AP 33','RUA LUIZ COUTINHO CAVALCANTI, S/N'),(6572014,'19 - SANTA CRUZ',148,'SMS CF LOURENCO DE MELLO - AP 53','RUA CORONEL TITO PORTO CARRERO, S/N'),(6575900,'34 - CIDADE DE DEUS',118,'SMS UPA 24H CIDADE DE DEUS - AP 40','RUA EDGAR WERNECK, S/N'),(6581994,'19 - SANTA CRUZ',149,'SMS CF JOSE ANTONIO CIRAUDO - AP 53','AVENIDA AREIA BRANCA, 1428'),(6598544,'19 - SANTA CRUZ',149,'SMS UPA 24 H JOAO XXIII - AP 53','AV. JOAO XXIII, S/N'),(6618855,'19 - SANTA CRUZ',149,'SMS CF SERGIO AROUCA - AP 53','RUA DO IMPERIO, S/N'),(6618863,'19 - SANTA CRUZ',148,'SMS CF HELANDE DE MELLO GONCALVES - AP 53','ESTRADA DE PACIENCIA, S/N'),(6618871,'19 - SANTA CRUZ',148,'SMS CF JAMIL HADDAD - AP 53','RUA SOLDADO JOAO ROTELO, S/N'),(6631169,'13 - MEIER',66,'SMS UPA 24 H ENGENHO DE DENTRO - AP 32','RUA BERNARDO, S/N'),(6632831,'5 - COPACABANA',23,'SMS CMS CHAPEU MANG BABILONIA - AP 21','RUA SAO FRANCISCO, 5'),(6635709,'26 - GUARATIBA',151,'SMS CF JOSE DE PAULA LOPES PONTES - AP 52','RUA JABURU, S/N'),(6648371,'26 - GUARATIBA',151,'SMS CF HANS JURGEN FERNANDO DOHMANN - AP 52','ESTRADA DO PIAI, S/N'),(6660185,'19 - SANTA CRUZ',149,'SMS CF DEOLINDO COUTO - AP 53','RUA SANTO AUGURIO, 40'),(6661904,'15 - MADUREIRA',83,'SMS UPA 24H MADUREIRA - AP 33','PRACA DOS LAVRADORES, S/N'),(6664040,'11 - PENHA',45,'SMS CF HEITOR DOS PRAZERES - AP 31','RUA IGUAPERIBA, 0'),(6664075,'11 - PENHA',43,'SMS CF FELIPPE CARDOSO - AP 31','AVENIDA NOSSA SENHORA DA PENHA, 42'),(6664164,'11 - PENHA',43,'SMS CMS SAO GODOFREDO - AP 31','RUA SAO GODOFREDO, 45'),(6671020,'19 - SANTA CRUZ',149,'SMS CF EDSON ABDALLA SAAD - AP 53','AVENIDA CESARIO DE MELO, 25'),(6677711,'26 - GUARATIBA',151,'SMS CF DALMIR DE ABREU SALGADO - AP 52','ESTRADA DO MAGARCA, 1831'),(6680704,'25 - PAVUNA',113,'SMS UPA 24H COSTA BARROS - AP 33','EST. BOTAFOGO, S/N'),(6681379,'12 - INHAUMA',56,'SMS CF HERBERT JOSE DE SOUZA - AP 32','AVENIDA PASTOR MARTIN LUTHER KING JUNIOR, 4776'),(6683851,'19 - SANTA CRUZ',149,'SMS CF SAMUEL PENHA VALLE - AP 53','AV. CESARIO DE MELO, 12574'),(6688152,'13 - MEIER',61,'SMS CF IZABEL DOS SANTOS - AP 32','RUA DOIS DE MAIO, 220'),(6694101,'13 - MEIER',63,'SMS PADI SALGADO FILHO - AP 32','RU ASANTA FE, S/N'),(6694187,'2 - CENTRO',5,'SMS PADI SOUZA AGUIAR','RUA MONCORVO FILHO, 10'),(6694330,'6 - LAGOA',27,'SMS PADI MIGUEL COUTO - AP 21','RUA MARIO RIBEIRO, 80'),(6695566,'3 - RIO COMPRIDO',8,'SMS PS CASS - AP 10','RUA AFONSO CAVALCANTE, 455'),(6713564,'13 - MEIER',58,'SMS CF ANNA NERY - AP 32','RUA ANA NERI COM RUA GENERAL BELFORD, S/N'),(6716598,'24 - BARRA DA TIJUCA',130,'SMS CF MAURY ALVES DE PINHO - AP 40','ESTRADA DOS BANDEIRANTES, 11227'),(6716849,'6 - LAGOA',26,'SMS COORD DE EMERGENCIA REGIONAL CER LEBLON - AP 21','RUA MARIO RIBEIRO, 1080'),(6716911,'2 - CENTRO',5,'SMS COORD DE EMERGENCIA REGIONAL CER CENTRO - AP 10','RUA FREI CANECA, S/N'),(6716938,'24 - BARRA DA TIJUCA',128,'SMS COORD DE EMERGENCIA REGIONAL CER BARRA - AP 40','AVENIDA AYRTON SENNA, 2000'),(6742130,'13 - MEIER',71,'SMS CF EMYGDIO ALVES COSTA FILHO - AP 32','RUA DO LAZER, 153'),(6742831,'17 - BANGU',142,'SMS UPA 24H SENADOR CAMARA - AP 51','AVENIDA SANTA CRUZ, 6486'),(6761704,'22 - ANCHIETA',108,'SMS CF MARIA DE AZEVEDO RODRIGUES PEREIRA - AP 33','PRACA PROFESSORA SANTINHA, S/N'),(6762042,'13 - MEIER',60,'SMS CF EDNEY CANAZARO DE OLIVEIRA - AP 32','AVENIDA MARECHAL RONDOM C/RUA ANTUNES GARCIA, S/N'),(6784720,'24 - BARRA DA TIJUCA',127,'SMS CMS ITANHANGA - AP 40','ESTRADA DO ITANHANGA, 270'),(6793231,'25 - PAVUNA',114,'SMS CF EPITACIO SOARES REIS - AP 33','AV CHISOSTOMO PIMENTEL DE OLIVEIRA, S/N'),(6804209,'20 - ILHA DO GOVERNADOR',104,'SMS CF ASSIS VALENTE - AP 31','EST. DAS CANARIAS COM AV. BRAS CRISPIN (PRACA), S/N'),(6808077,'28 - JACAREZINHO',155,'SMS CF ANTHIDIO DIAS DA SILVEIRA - AP 32','AVENIDA DOM HELDER CAMARA, S/N'),(6820018,'12 - INHAUMA',53,'SMS CF BARBARA STARFIELD - AP 32','RUA VOLTA GRANDE, S/N'),(6852203,'17 - BANGU',142,'SMS CF KELLY CRISTINA DE SA LACERDA SILVA - AP 51','AVENIDA CARLOS SAMPAIO CORREA, S/N'),(6855709,'33 - REALENGO',139,'SMS CF PADRE JOHN CRIBBIN (PADRE JOAO) - AP 51','ESTRADA MANOEL NOGUEIRA DE SA, S/N'),(6864708,'17 - BANGU',141,'SMS CF MARIO DIAS ALENCAR - AP 51','RUA MUCURIPE, S/N'),(6869009,'14 - IRAJA',72,'SMS CF ANA MARIA CONCEICAO DOS SANTOS CORREIA - AP 33','RUA QUATRO, S/N'),(6873960,'3 - RIO COMPRIDO',6,'SMS CF SERGIO VIEIRA DE MELLO - AP 10','AVENIDA TRINTA E UM DE MARCO, S/N'),(6901042,'33 - REALENGO',139,'SMS CF NILDO EYMAR DE ALMEIDA AGUIAR - AP 51','ESTRADA GENERAL AMERICANO FREIRE, S/N'),(6914152,'12 - INHAUMA',55,'SMS CF BIBI VOGEL - AP 32','ESTRADA ADHEMAR BEBIANO, 3686'),(6919626,'12 - INHAUMA',53,'SMS CF SERGIO NICOLAU AMIN - AP 32','PRACA DA CONFEDERACAO SUICA, S/N'),(6922031,'17 - BANGU',141,'SMS CMS MANOEL GUILHERME DA SILVEIRA FILHO - AP 51','AV RIBEIRO DANTAS, 571'),(6926177,'19 - SANTA CRUZ',150,'SMS UPA 24 H SEPETIBA - AP 53','RUA RAFAEL FERREIRA, S/N'),(6926797,'12 - INHAUMA',54,'SMS CMS RODOLPHO ROCCO - AP 32','RUA LAGOA VERDE, S/N'),(6927254,'16 - JACAREPAGUA',124,'SMS CMS NEWTON BETHLEM - AP 40','RUA BARAO, 260'),(6927289,'16 - JACAREPAGUA',115,'SMS CF OTTO ALVES DE CARVALHO - AP 40','AVENIDA ENGENHEIRO SOUZA FILHO, 200'),(6927319,'16 - JACAREPAGUA',117,'SMS CF PADRE JOSE DE AZEVEDO TIUBA - AP 40','RUA ACAPORI, S/N'),(6932916,'31 - VIGARIO GERAL',48,'SMS CF JOAOSINHO TRINTA - AP 31','RUA ANAMA - PRACA JOSE DA MATTA, S/N'),(6938124,'19 - SANTA CRUZ',148,'SMS UPA 24 H PACIENCIA - AP 53','ESTRADA SANTA EUGENIA, S/N'),(6974708,'15 - MADUREIRA',90,'SMS CF MAESTRO CELESTINO - AP 33','RUA LOURENCO MARQUES, 70'),(6995446,'19 - SANTA CRUZ',149,'SMS COORDENACAO DE EMERGENCIA REGIONAL CER SANTA CRUZ','RUA DO PRADO, 325'),(6995462,'19 - SANTA CRUZ',149,'SMS HOSPITAL MUNICIPAL PEDRO II - AP 53','RUA DO PRADO, 325'),(7021771,'22 - ANCHIETA',106,'SMS CF RAIMUNDO ALVES NASCIMENTO - AP 33','RUA MARCOS DE MACEDO, S/N'),(7027397,'2 - CENTRO',5,'SMS MATERNIDADE MARIA AMELIA BUARQUE DE HOLLANDA - AP 10','RUA MONCORVO FILHO, 67'),(7036884,'18 - CAMPO GRANDE',143,'SMS CF SONIA MARIA FERREIRA MACHADO - AP 52','ESTRADA DA POSSE, S/N'),(7036914,'18 - CAMPO GRANDE',144,'SMS CF ANTONIO GONCALVES VILLA SOBRINHO - AP 52','ESTRADA DO CAMPINHO, 2899'),(7041624,'17 - BANGU',141,'SMS HOSPITAL MUNICIPAL DA MULHER MARISKA RIBEIRO - AP 51','PRACA 1 DE MAIO, S/N'),(7052006,'4 - BOTAFOGO',20,'SMS CAPSI MAURICIO DE SOUSA - AP 21','AVENIDA VENCESLAU BRAS, 65'),(7052049,'13 - MEIER',58,'SMS CF CARIOCA - AP 32','RUA BERGAMO, 320'),(7060335,'30 - COMPLEXO DA MARE',157,'SMS CAPSI VISCONDE DE SABUGOSA - AP 31','AV.GUANABARA, S/N'),(7063679,'24 - BARRA DA TIJUCA',128,'SMS PADI LOURENCO JORGE - AP 40','AV AYRTON SENNA, 2000'),(7072406,'19 - SANTA CRUZ',149,'SMS CENTRO DE CONTROLE DE ZOONOSES - AP53','LARGO DO BODEGAO, 150'),(7080522,'16 - JACAREPAGUA',122,'SMS CAPS AD III ANTONIO CARLOS MUSSUM - AP 40','AVENIDA SAMPAIO CORREA, 0'),(7088574,'25 - PAVUNA',114,'SMS CF MANOEL FERNANDES DE ARAUJO - AP 33','RUA LAUDO DE CAMARGO, S/N'),(7101856,'33 - REALENGO',138,'SMS UPA 24H MAGALHAES BASTOS - AP 51','ESTRADA MANOEL NOGUEIRA DE SA, S/N'),(7107366,'20 - ILHA DO GOVERNADOR',103,'SMS COORD DE EMERGENCIA REGIONAL CER ILHA DO GOV - AP 31','ESTRADA DO GALEAO, 2920'),(7108265,'15 - MADUREIRA',90,'SMS CF DANTE ROMANO JUNIOR - AP 33','RUA CAROLINA MACHADO, S/N'),(7110162,'15 - MADUREIRA',86,'SMS UPA 24H ROCHA MIRANDA - AP 33','ESTRADA DO BARRO VERMELHO, S/N'),(7110324,'19 - SANTA CRUZ',149,'SMS PADI PEDRO II - AP 53','RUA DO PRADO, 325'),(7110340,'14 - IRAJA',76,'SMS PADI FRANCISCO DA SILVA TELLES - AP 33','AVENIDA UBIRAJARA, 25'),(7113137,'15 - MADUREIRA',83,'SMS CAPSI HEITOR VILLA LOBOS - AP 33','RUA PADRE MANSO, S/N'),(7118376,'19 - SANTA CRUZ',149,'SMS CAPS AD JULIO CESAR DE CARVALHO - AP 53','RUA SEVERIANO DAS CHAGAS, 196'),(7119798,'15 - MADUREIRA',79,'SMS CF CARLOS NERY DA COSTA FILHO - AP 33','RUA CLARIMUNDO DE MELO, 847'),(7166494,'20 - ILHA DO GOVERNADOR',103,'SMS HOSPITAL MUNICIPAL EVANDRO FREIRE - AP 31','ESTRADA DO GALEAO, 2920'),(7414226,'8 - TIJUCA',32,'SMS CMS HELIO PELLEGRINO - AP 22','RUA DO MATOSO, 96'),(7523246,'1 - PORTUARIA',2,'SMS CF NELIO DE OLIVEIRA - AP 10','RUA RIVADAVIA CORREA, 188'),(7561660,'10 - RAMOS',40,'SMS CAPS AD MIRIAM MAKEBA - AP 31','RUA PROFESSOR LACE, 485'),(7638086,'9 - VILA ISABEL',36,'SMS CF PEDRO ERNESTO - AP 22','RUA VINTE E OITO DE SETEMBRO, 109'),(7656106,'15 - MADUREIRA',85,'SMS CAPS AD III PAULO DA PORTELA - AP 33','RUA PIRAPORA, 69'),(7722494,'33 - REALENGO',139,'SMS CF FAIM PEDRO - AP 51','RUA MARECHAL AGRICOLA, S/N'),(7723296,'18 - CAMPO GRANDE',145,'SMS CF EVERTON DE SOUZA SANTOS - AP 52','ESTRADA DE MORICABA, S/N'),(7810172,'17 - BANGU',142,'SMS CF SANDRA REGINA SAMPAIO DE SOUZA - AP 51','AVENIDA SANTA CRUZ, S/N'),(7856954,'20 - ILHA DO GOVERNADOR',100,'SMS CMS NEWTON ALVES CARDOZO - AP 31','RUA DR ANTONIO MONTEIRO ANTIGA RUA COMBU, 191'),(7856962,'20 - ILHA DO GOVERNADOR',93,'SMS CMS PAULINO WERNECK - AP 31','ESTRADA DA CACUIA, 745'),(7873565,'24 - BARRA DA TIJUCA',128,'SMS CF JOSE DE SOUZA HERDY - AP 40','AVENIDA AYRTON SENNA, 2200'),(7874162,'17 - BANGU',162,'SMS CF WILSON MELLO SANTOS ( ZICO) - AP51','ESTRADA SARGENTO MIGUEL FILHO, S/N'),(7884524,'4 - BOTAFOGO',20,'SMS CAPS FRANCO BASAGLIA AP 21','AV. VENCESLAU BRAS, 65'),(7892802,'25 - PAVUNA',112,'SMS CF ADOLFO FERREIRA DE CARVALHO - AP 33','ESTRADA JOAO PAULO, 1007'),(7892810,'16 - JACAREPAGUA',116,'SMS CF BARBARA MOSLEY DE SOUZA- AP 40','AVENIDA OTAVIO MALTA, S/N'),(7892829,'16 - JACAREPAGUA',115,'SMS CF HELENA BESSERMAN VIANNA - AP 40','VIA LIGHT, S/N'),(7894554,'18 - CAMPO GRANDE',144,'SMS CF ISABELA SEVERO DA SILVA - AP 52','RUA VOTORANTIM, 664'),(7896204,'19 - SANTA CRUZ',149,'SMS CF ALICE DE JESUS REGO - AP53','ESTRADA DOS PALMARES, S/N'),(7908237,'19 - SANTA CRUZ',146,'SMS CF LECY RANQUINE- AP 52','ESTRADA DO CAMPINHO, S/N'),(7926103,'17 - BANGU',142,'SMS CAPS NEUSA SANTOS SOUZA - AP 51','RUA BAALBECK, 75'),(7985657,'31 - VIGARIO GERAL',46,'SMS CF EIDIMIR THIAGO DE SOUZA - AP 31','RUA CORDOVIL, 1242'),(7986505,'13 - MEIER',70,'SMS CF LUIZ CELIO PEREIRA - AP 32','RUA DA ABOLICAO, 303'),(7990286,'4 - BOTAFOGO',20,'SMS CMS ROCHA MAIA - AP 21','RUA GENERAL SEVERIANO, 91'),(7995520,'16 - JACAREPAGUA',115,'SMS CF MAICON SIQUEIRA - AP 40','AVENIDA SALVADOR ALLENDE, S/N'),(7996675,'16 - JACAREPAGUA',124,'SMS CF GERSON BERGHER - AP 40','RUA CANDIDO BENICIO, S/N'),(7998678,'33 - REALENGO',135,'SMS CF IVANIR DE MELLO - AP 33','ESTRADA MARECHAL ALENCASTRO, S/N'),(9016805,'31 - VIGARIO GERAL',46,'SMS CF NILDA CAMPOS DE LIMA - AP 31','RUA OLIVEIRA MELO, S/N'),(9023089,'33 - REALENGO',139,'SMS CF ROGERIO PINTO DA MOTA - AP 51','RUA MAGALHAES GANDAVO - PRACA DO BOM CONSELHO, 204'),(9029354,'28 - JACAREZINHO',155,'SMS CAPS CARLOS AUGUSTO DA SILVA - MAGAL - AP 31','AVENIDA DOM HELDER CAMARA, 1184'),(9045023,'13 - MEIER',69,'SMS CF OLGA PEREIRA PACHECO - AP 32','RUA ANA QUINTAO, 348'),(9051538,'16 - JACAREPAGUA',122,'SMS CAPS III MANOEL DE BARROS - AP 40','RUA NOSSA SENHORA DOS REMEDIOS, S/N'),(9057706,'7 - SAO CRISTOVAO',10,'SMS CF ESTIVADORES - AP 10','AVENIDA DO EXERCITO, 99'),(9057722,'15 - MADUREIRA',87,'SMS CF ADERSON FERNANDES - AP 33','RUA URURAI, S/N'),(9061398,'18 - CAMPO GRANDE',144,'SMS CF MEDALHISTA OLIMPICO BRUNO SCHMIDT - AP 52','RUA MANOEL JULIAO DE MEDEIROS, S/N'),(9061401,'18 - CAMPO GRANDE',144,'SMS CF MEDALHISTA OLIMPICO ARTHUR ZANETTI - AP 52','AVENIDA MARECHAL DANTAS BARRETO, S/N'),(9067078,'9 - VILA ISABEL',38,'SMS CF ODALEA FIRMO DUTRA - AP 22','RUA BOTUCATU, 633'),(9071385,'16 - JACAREPAGUA',115,'SMS CMS ALVARO RAMOS - AP 40','AVENIDA ADAUTO BOTELHO, S/N'),(9072640,'15 - MADUREIRA',81,'SMS CF MESTRE MOLEQUINHO DO IMPERIO - AP 33','RUA IGUACU, S/N'),(9072659,'20 - ILHA DO GOVERNADOR',96,'SMS CF WILMA COSTA - AP 31','PARQUE POETA MANUEL BANDEIRA, S/N'),(9075143,'10 - RAMOS',42,'SMS CF KLEBEL DE OLIVEIRA ROCHA - AP 31','PRACA CLOMIR TELES CERBINO, S/N'),(9078983,'25 - PAVUNA',110,'SMS CF CYPRIANO DAS CHAGAS MEDEIROS - AP 33','RUA JUMIRIM, 87'),(9079939,'7 - SAO CRISTOVAO',12,'SMS CF MEDALHISTA OLIMPICO MAURICIO SILVA AP 10','AVENIDA CARLOS MATOSO CORREIA, S/N'),(9080163,'3 - RIO COMPRIDO',9,'SMS CF MEDALHISTA OLIMPICO RICARDO LUCARELLI SOUZA AP 10','RUA FREI CANECA, S/N'),(9090010,'12 - INHAUMA',54,'SMS CAPS III OSWALDO DOS SANTOS - AP 32','RUA LAGOA CLARA, S/N'),(9101764,'13 - MEIER',67,'SMS CF AMELIA DOS SANTOS FERREIRA - AP 32','RUA POMPILIO DE ALBUQUERQUE, 386'),(9107835,'10 - RAMOS',41,'SMS CF VALTER FELISBINO DE SOUZA - AP 31','RUA DIOMEDES TROTA, 259'),(9111344,'11 - PENHA',75,'SMS CF CANDIDO RIBEIRO DA SILVA FILHO - AP 33','AVENIDA SAO FELIX, 201'),(9127100,'16 - JACAREPAGUA',115,'SMS CF JOSE NEVES - AP 40','RUA QUINTANILHA SN'),(9128867,'14 - IRAJA',76,'SMS CF AMAURY BOTTANY - AP 33','AV MONSENHOR FELIX, 512'),(9131795,'13 - MEIER',63,'SMS CF ERIVALDO FERNANDES NOBREGA - AP 32','RUA RIO GRANDE DO SUL, 26'),(9131884,'14 - IRAJA',76,'SMS CF DEPUTADO PEDRO FERNANDES FILHO - AP 33','PRACA NOSSA SENHORA DA APRESENTACAO, S/N'),(9160876,'18 - CAMPO GRANDE',144,'SMS COORDENACAO DE EMERGENCIA REGIONAL CER CAMPO GRANDE','AVENIDA CESARIO DE MELO, 3215'),(9264612,'4 - BOTAFOGO',20,'SMS POLICLINICA ROCHA MAIA AP 21','RUA GENERAL SEVERIANO, 91'),(9307265,'18 - CAMPO GRANDE',144,'SMS CF MARIA JOSE PAPERA DE AZEVEDO - AP 52','ESTRADA DA POSSE, S/N'),(9311661,'33 - REALENGO',139,'SMS CF ROMULO CARLOS TEIXEIRA - AP 51','PRACA MAROBA, S/N'),(9345515,'30 - COMPLEXO DA MARE',157,'SMS CF DINIZ BATISTA DOS SANTOS - AP 31','AVENIDA BRIGADEIRO TROMPOWSKY, S/N'),(9391983,'11 - PENHA',43,'SMS CMS JOSE PARANHOS FONTENELLE - AP 31','RUA LEOPOLDINA REGO, 700'),(9442251,'30 - COMPLEXO DA MARE',157,'SMS CF JEREMIAS MORAES DA SILVA - AP 31','RUA TEIXEIRA RIBEIRO, S/N'),(9535896,'13 - MEIER',66,'SMS CAPS II EAT SEVERINO DOS SANTOS - AP 32','RUA RAMIRO MAGALHAES 521'),(9654151,'33 - REALENGO',139,'SMS COORD DE EMERGENCIA REGIONAL CER REALENGO - AP 51','RUA NILOPOLIS, 329'),(9715444,'18 - CAMPO GRANDE',144,'SMS CF DR MYRTES AMORELLI GONZAGA - AP 52','ESTRADA DO LAMEIRAO PEQUENO S/N RIO DA PRATA');
/*!40000 ALTER TABLE `unidades_de_saude` ENABLE KEYS */;
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
