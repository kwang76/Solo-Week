-- MySQL dump 10.13  Distrib 5.7.21, for Win64 (x86_64)
--
-- Host: localhost    Database: workoutworld
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercise` (
  `exercise_id` int(11) NOT NULL AUTO_INCREMENT,
  `exerciseName` varchar(100) DEFAULT NULL,
  `muscleGroup` varchar(60) DEFAULT NULL,
  `type` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`exercise_id`),
  UNIQUE KEY `exerciseName` (`exerciseName`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,'Barbell Incline Bench Press','Chest','Strength'),(2,'Barbell Decline Bench Press','Chest','Strength'),(3,'Butterfly Machine','Chest','Strength'),(4,'Cable Crossover','Chest','Strength'),(5,'Cable Press','Chest','Strength'),(6,'Dumbell Bench Press','Chest','Strength'),(7,'Dumbell Incline Bench Press','Chest','Strength'),(8,'Dumbell Decline Bench Press','Chest','Strength'),(9,'Pushups','Chest','Strength'),(10,'Barbell Bent Over Row','Back','Strength'),(11,'Barbell Deadlift','Back','Strength'),(12,'Barbell Good Morning','Back','Strength'),(13,'Barbell Lat Pulldown','Back','Strength'),(14,'Cable Seated Row','Back','Strength'),(15,'Chin Up','Back','Strength'),(16,'Deadlift','Back','Strength'),(17,'Dumbbell Pullover','Back','Strength'),(18,'Dumbbell Bent Over Row','Back','Strength'),(19,'Pullups','Back','Strength'),(20,'Barbell Military Press','Shoulders','Strength'),(21,'Barbell Bent Over Delt Row','Shoulders','Strength'),(22,'Dumbbell Seated Arnold Press','Shoulders','Strength'),(23,'Dumbbell Seated Front Raise','Shoulders','Strength'),(24,'Dumbbell Seated Lateral Raise','Shoulders','Strength'),(25,'Dumbbell Alternate Seated Press','Shoulders','Strength'),(26,'Barbell Preacher Curl','Biceps','Strength'),(27,'Barbell Spider Curl','Biceps','Strength'),(28,'Bicep Curl Machine','Biceps','Strength'),(29,'Cable Rope Hammer Curls','Biceps','Strength'),(30,'Dumbbell Alternate Bicep Curl','Biceps','Strength'),(31,'Dumbbell Alternate Hammer Curl','Biceps','Strength'),(32,'Barbell Lying Tricep Extensions','Triceps','Strength'),(33,'Barbell Skullcrusher','Triceps','Strength'),(34,'Bench Dip','Triceps','Strength'),(35,'Cable Pushdowns','Triceps','Strength'),(36,'Dumbbell Kickback','Triceps','Strength'),(37,'Dumbell Triceps Press','Triceps','Strength'),(38,'Barbell Back Squat','Legs','Strength'),(39,'Barbell Lunge','Legs','Strength'),(40,'Hamstring Curls','Legs','Strength'),(41,'Leg Extensions','Legs','Strength'),(42,'Leg Press Machine','Legs','Strength'),(43,'Hip Abductor Machine','Legs','Strength'),(44,'Hip Adductor Machine','Legs','Strength'),(45,'Calf Raise','Legs','Strength'),(46,'Bilateral Pectoral Door Stretch','Chest','Stretch'),(47,'Unilateral Pectoral Door Stretch','Chest','Stretch'),(48,'Lumbar Twist','Back','Stretch'),(49,'Knee\'s To Chest','Back','Stretch'),(50,'Sidelying Rotations','Back','Stretch'),(51,'Sleeper Stretch','Shoulder','Stretch'),(52,'Cane Flexion','Shoulder','Stretch'),(53,'Cane External Rotation','Shoulder','Stretch'),(54,'Cane Internal Rotation','Shoulder','Stretch'),(55,'Kneeling Hip Flexor','Legs','Stretch'),(56,'Runner\'s Stretch','Legs','Stretch'),(57,'Sidelying Quad Stretch','Legs','Stretch');
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `username` varchar(60) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'s','s','s','$2b$10$JMY6r7FyUDt0Ycrmfzky1Ohtv.YnhbfIt8DbVPsWzXx.IhaUmfMp.','$2b$10$JMY6r7FyUDt0Ycrmfzky1O','s'),(2,'k','k','k','$2b$10$.u6tVbv2BQ7eps8GJLabW.q.bhkCOByqZZ6am5TOq9wBxh9Wm9EmK','$2b$10$.u6tVbv2BQ7eps8GJLabW.','k');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout`
--

DROP TABLE IF EXISTS `workout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout` (
  `workout_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`workout_id`),
  KEY `userId` (`userId`),
  CONSTRAINT `workout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout`
--

LOCK TABLES `workout` WRITE;
/*!40000 ALTER TABLE `workout` DISABLE KEYS */;
INSERT INTO `workout` VALUES (1,'mon',1),(2,'mon',1),(3,'mon',1),(6,'Monday',2),(7,'Tuesday',2);
/*!40000 ALTER TABLE `workout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_exercises`
--

DROP TABLE IF EXISTS `workout_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workout_exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `workout_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `workoutName` varchar(255) DEFAULT NULL,
  `exercise` varchar(255) DEFAULT NULL,
  `sets` int(11) NOT NULL,
  `reps` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `exercise_id` (`exercise_id`),
  KEY `workout_id` (`workout_id`),
  CONSTRAINT `workout_exercises_ibfk_1` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`exercise_id`) ON DELETE CASCADE,
  CONSTRAINT `workout_exercises_ibfk_2` FOREIGN KEY (`workout_id`) REFERENCES `workout` (`workout_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_exercises`
--

LOCK TABLES `workout_exercises` WRITE;
/*!40000 ALTER TABLE `workout_exercises` DISABLE KEYS */;
INSERT INTO `workout_exercises` VALUES (4,6,5,'Monday','Cable Press',3,10),(5,7,12,'Tuesday','Barbell Good Morning',3,10),(6,6,9,'Monday','Pushups',3,20),(7,6,3,'Monday','Butterfly Machine',3,12),(9,7,15,'Tuesday','Chin Up',3,20),(10,7,10,'Tuesday','Barbell Bent Over Row',3,12);
/*!40000 ALTER TABLE `workout_exercises` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-22 16:19:34
