CREATE DATABASE  IF NOT EXISTS `datawarehouse`;
USE `datawarehouse`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: datawarehouse
-- ------------------------------------------------------
-- Server version	8.0.22


--
-- Table structure for table `canales`
--

DROP TABLE IF EXISTS `canales`;
CREATE TABLE `canales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `canales`
--

LOCK TABLES `canales` WRITE;

UNLOCK TABLES;


--
-- Table structure for table `regiones`
--

DROP TABLE IF EXISTS `regiones`;
CREATE TABLE `regiones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `regiones`
--

LOCK TABLES `regiones` WRITE;
UNLOCK TABLES;



--
-- Table structure for table `paises`
--

DROP TABLE IF EXISTS `paises`;
CREATE TABLE `paises` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `id_region` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  CONSTRAINT `fk_paises_regiones` FOREIGN KEY (`id_region`) REFERENCES `regiones` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `paises`
--

LOCK TABLES `paises` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
CREATE TABLE `ciudades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `id_paises` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  CONSTRAINT `fk_ciudad_paises` FOREIGN KEY (`id_paises`) REFERENCES `paises` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `companias`
--

DROP TABLE IF EXISTS `companias`;
CREATE TABLE `companias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `id_ciudad` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  KEY `fk_ciudad_companias` (`id_ciudad`),
  CONSTRAINT `fk_ciudad_companias` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companias`
--

LOCK TABLES `companias` WRITE;
UNLOCK TABLES;


--
-- Table structure for table `contactos`
--

DROP TABLE IF EXISTS `contactos`;
CREATE TABLE `contactos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(100) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `id_compania` int NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `interes` int NOT NULL,
  `id_ciudad` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_compania` (`id_compania`),
  KEY `fk_ciudad` (`id_ciudad`),
  CONSTRAINT `fk_ciudad` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_compania` FOREIGN KEY (`id_compania`) REFERENCES `companias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contactos`
--

LOCK TABLES `contactos` WRITE;
UNLOCK TABLES;


--
-- Table structure for table `preferencias`
--

DROP TABLE IF EXISTS `preferencias`;
CREATE TABLE `preferencias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `preferencia` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `preferencia_UNIQUE` (`preferencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `preferencias`
--

LOCK TABLES `preferencias` WRITE;
UNLOCK TABLES;


--
-- Table structure for table `canales_contacto`
--

DROP TABLE IF EXISTS `canales_contacto`;
CREATE TABLE `canales_contacto` (
  `id_contacto` int NOT NULL,
  `id_canal` int NOT NULL,
  `cuenta_usuario` varchar(250) NOT NULL,
  `preferencia` int NOT NULL,
  PRIMARY KEY (`id_contacto`,`id_canal`,`cuenta_usuario`),
  KEY `fk_preferencia` (`preferencia`),
  KEY `fk_canal` (`id_canal`),
  CONSTRAINT `fk_canal` FOREIGN KEY (`id_canal`) REFERENCES `canales` (`id`),
  CONSTRAINT `fk_contacto_canal` FOREIGN KEY (`id_contacto`) REFERENCES `contactos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_preferencia` FOREIGN KEY (`preferencia`) REFERENCES `preferencias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `canales_contacto`
--

LOCK TABLES `canales_contacto` WRITE;
UNLOCK TABLES;



--
-- Table structure for table `perfiles`
--

DROP TABLE IF EXISTS `perfiles`;
CREATE TABLE `perfiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `perfil` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `perfil_UNIQUE` (`perfil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `perfiles`
--

LOCK TABLES `perfiles` WRITE;
UNLOCK TABLES;


--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `id_perfil` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `id_perfil` (`id_perfil`),
  CONSTRAINT `fk_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `perfiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
UNLOCK TABLES;


-- ------------------------------------------------------------------------------------------------------------------

--
-- INSERT DE DATOS DE PRUEBA (OPCIONAL)
--

 INSERT INTO `perfiles` (`perfil`) VALUES ("administrador"),("usuario");
 INSERT INTO `usuarios` (`username`,`password`,`nombre_completo`,`email`, `id_perfil`) VALUES ("admin","admin","usuario administrador","admin@mail.com","1");
 INSERT INTO `usuarios` (`username`,`password`,`nombre_completo`,`email`, `id_perfil`) VALUES ("sharac","sharac","usuario normal","sharac@mail.com","2");
 INSERT INTO `canales` (`nombre`) VALUES ("Whatsapp"),("Telefono"),("e-mail"),("Facebook");
 INSERT INTO `preferencias` (`preferencia`) VALUES ("Sin preferencia"),("Canal favorito"),("No molestar");
 INSERT INTO `regiones` (`nombre`) VALUES ("Sudamérica"),("Norteamérica"),("Europa"),("Asia"),("Centroamérica"),("Africa"),("Oceanía");
 INSERT INTO `paises` (`nombre`,`id_region`) VALUES ("Colombia",1),("Venezuela",1),("Perú",1),("Brasil",1),("Ecuador",1),("Bolivia",1),("Uruguay",1),("paraguay",1),("Argentina",1),("Chile",1);
 INSERT INTO `paises` (`nombre`,`id_region`) VALUES ("Estados Unidos",2),("Canadá",2),("Alaska",2);
 INSERT INTO `paises` (`nombre`,`id_region`) VALUES ("Inglaterra",3),("España",3),("Italia",3),("Francia",3),("Alemania",3),("Escocia",3),("Afganistán",3),("Portugal",3),("Suiza",3),("Suecia",3);
 INSERT INTO `paises` (`nombre`,`id_region`) VALUES ("China",4),("India",4),("Japón",4),("Corea del norte",4),("Corea del Sur",4),("Rusia",4),("Indonesia",4);
 INSERT INTO `paises` (`nombre`,`id_region`) VALUES ("México",5),("Costa rica",5),("Guatemala",5),("Nicaragua",5),("Panamá",5),("Cuba",5),("Hawai",5);
 INSERT INTO `paises` (`nombre`,`id_region`) VALUES ("Egipto",6),("El congo",6),("Nigeria",6);
 INSERT INTO `paises` (`nombre`,`id_region`) VALUES ("Australia",7),("Nueva Zelanda",7),("Tanzania",7);
 INSERT INTO `ciudades` (`nombre`,`id_paises`) VALUES ("Bogotá",1),("Medellín",1),("Cali",1),("Bucaramanga",1),("Barranquilla",1),("Manizales",1),("Quibdó",1),("Ibagué",1),("Cartagena",1);
 INSERT INTO `companias` (`nombre`,`direccion`,`email`,`telefono`,`id_ciudad`) VALUES 
 ("Globant","AV 345 POB","globant@mail.com","345678890","1"),
 ("Protección","AV 345 GUA","proteccion@mail.com","345678890","2"),
 ("Deloitte","AV 345 COP","deloitte@mail.com","345678890","3"),
 ("Pragma","AV 345 BEL","pragma@mail.com","345678890","4"),
 ("Bancolombia","AV 345 ENV","bancolombia@mail.com","345678890","5"),
 ("Postobon","AV 345 ITA","postobon@mail.com","345678890","6"); 
 INSERT INTO `contactos` (`nombre_completo`,`cargo`,`email`,`id_compania`,`direccion`,`interes`,`id_ciudad`) VALUES 
 ("Shara Cadavid Aguilar","Desarrollador de software","sharac@mail.com",1,"Cra 34343 LO",50,2),
 ("Thaliana Miranda","Anlista de automatización","thaliana@mail.com",2,"Cra 34343 AS",25,1),
 ("Juan Camilo Herrera","Arquitecto de software","juanc@mail.com",3,"Cra 34343 HF",0,3),
 ("Mayerli Bustamante","Auxiliar de TI","mayerli@mail.com",4,"Cra 34343 IW",75,4),
 ("Susana Ramirez Higuita","Analista de procesos","susana@mail.com",1,"Cra 34343 PW",50,5),
 ("Cristian Alzate Lozano","Desarrollador de software","cristian@mail.com",1,"Cra 34343 DF",0,6),
 ("Angelica Cadavid ","Lider de certificacion","sharac@mail.com",5,"Cra 34343 MN",100,2),
 ("Laura Bermudez Tarazona","Analista Devops","laura@mail.com",1,"Cra 34343 WY",75,1),
 ("Fernando Suarez Montoya","Ingeniero de Redes","fernando@mail.com",6,"Cra 34343 MC",100,1),
 ("Duban Terra Florez","Aprendiz seguridad","duban@mail.com",1,"Cra 34343 PW",50,2); 
 INSERT INTO `ciudades` (`nombre`,`id_paises`) VALUES ("Washington",11),("Boston",11),("Texas",11),("Chicago",11),("Ottawa",12),("Toronto",12),("Montreal",12),("Palermo",17),("Paris",17),("Tokio",24),("Osaka",24),("Nawasaki",24);
 INSERT INTO `canales_contacto` (`id_contacto`,`id_canal`,`cuenta_usuario`,`preferencia`) VALUES (1,2,"sharac",1),(2,1,"melon",3);
select * from usuarios
