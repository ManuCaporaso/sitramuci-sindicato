-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: sindicato_db
-- ------------------------------------------------------
-- Server version	11.4.2-MariaDB

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
-- Table structure for table `afiliados`
--

DROP TABLE IF EXISTS `afiliados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `afiliados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `dni` varchar(15) NOT NULL,
  `estado_civil` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `domicilio` varchar(100) DEFAULT NULL,
  `localidad` varchar(50) DEFAULT NULL,
  `provincia` varchar(50) DEFAULT NULL,
  `codigo_postal` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `profesion` varchar(50) DEFAULT NULL,
  `sector` varchar(50) DEFAULT NULL,
  `rubro` varchar(50) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `legajo` varchar(20) DEFAULT NULL,
  `domicilio_laboral` varchar(100) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `dni_2` (`dni`),
  UNIQUE KEY `dni_3` (`dni`),
  UNIQUE KEY `dni_4` (`dni`),
  UNIQUE KEY `dni_5` (`dni`),
  UNIQUE KEY `dni_6` (`dni`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `legajo` (`legajo`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `legajo_2` (`legajo`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `legajo_3` (`legajo`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `legajo_4` (`legajo`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `legajo_5` (`legajo`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `legajo_6` (`legajo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `afiliados`
--

LOCK TABLES `afiliados` WRITE;
/*!40000 ALTER TABLE `afiliados` DISABLE KEYS */;
INSERT INTO `afiliados` VALUES (1,'Juan','Pérez','30123456','Casado','1985-07-14','Calle Falsa 123','Neuquén','Neuquén','8300','juan.perez@mail.com','2991234567','Electricista','Construcción','Obras civiles','Oficial','LEG-001','Empresa X - Parque Industrial','2010-03-01','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'María','Gómez','28976543','Soltera','1990-02-20','Av. Argentina 456','Plottier','Neuquén','8316','maria.gomez@mail.com','2997654321','Administrativa','Administración','Oficinas','Empleado','LEG-002','Municipalidad de Plottier','2015-09-15','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Carlos','Ramírez','31222333','Casado','1978-11-05','San Martín 789','Cipolletti','Río Negro','8324','carlos.ramirez@mail.com','2993322114','Chofer','Transporte','Carga','Operario','LEG-003','Expreso Sur','2008-06-10','0000-00-00 00:00:00','0000-00-00 00:00:00'),(4,'Lucía','Fernández','30111222','Divorciada','1987-09-18','Belgrano 234','Centenario','Neuquén','8309','lucia.fernandez@mail.com','2994455667','Enfermera','Salud','Hospital','Técnico','LEG-004','Hospital Castro Rendón','2012-11-20','0000-00-00 00:00:00','0000-00-00 00:00:00'),(5,'Pedro','Martínez','29555111','Casado','1982-04-10','Rivadavia 890','Neuquén','Neuquén','8300','pedro.martinez@mail.com','2997788990','Ingeniero','Construcción','Obras civiles','Jefe de obra','LEG-005','Empresa Y - Parque Industrial','2006-01-12','0000-00-00 00:00:00','0000-00-00 00:00:00'),(6,'Ana','López','31888999','Soltera','1993-12-01','Corrientes 1500','Plottier','Neuquén','8316','ana.lopez@mail.com','2991122334','Abogada','Legal','Sindicato','Asesor','LEG-006','Estudio Jurídico López','2019-08-05','0000-00-00 00:00:00','0000-00-00 00:00:00'),(7,'Roberto','Suárez','27666111','Casado','1975-06-25','9 de Julio 333','Cipolletti','Río Negro','8324','roberto.suarez@mail.com','2995566778','Mecánico','Automotor','Talleres','Oficial','LEG-007','Taller El Rápido','2000-05-18','0000-00-00 00:00:00','0000-00-00 00:00:00'),(8,'Carolina','Mendoza','29999123','Viuda','1980-01-30','Catriel 567','Catriel','Río Negro','8307','carolina.mendoza@mail.com','2996677889','Docente','Educación','Primaria','Maestra','LEG-008','Escuela Nº12 Catriel','2003-03-01','0000-00-00 00:00:00','0000-00-00 00:00:00'),(9,'Diego','Hernández','32123456','Casado','1991-08-12','Mendoza 200','Neuquén','Neuquén','8300','diego.hernandez@mail.com','2992233445','Programador','Tecnología','Software','Desarrollador','LEG-009','TechSoft SA','2020-02-10','0000-00-00 00:00:00','0000-00-00 00:00:00'),(10,'Sofía','Castro','31555111','Soltera','1995-05-05','Mitre 600','Plottier','Neuquén','8316','sofia.castro@mail.com','2999988776','Contadora','Finanzas','Contabilidad','Analista','LEG-010','Estudio Contable Castro','2021-07-22','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `afiliados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sindicato_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-02 17:39:41
