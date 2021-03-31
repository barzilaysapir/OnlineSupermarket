-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `amount` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id_idx` (`product_id`),
  KEY `cart_id_idx` (`cart_id`),
  CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (1,50,5,2,600),(2,50,6,4,88),(5,53,1,1,170),(11,52,14,1,30),(16,52,3,2,60),(17,52,31,2,140),(29,65,57,1,115),(30,65,58,1,300),(32,67,34,1,40);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint NOT NULL,
  `create_date` date NOT NULL,
  `status` varchar(60) NOT NULL DEFAULT 'open',
  PRIMARY KEY (`id`),
  KEY `product_id_idx` (`id`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (50,55,'2021-03-05','close'),(52,55,'2021-03-05','close'),(53,123456,'2021-03-05','close'),(65,123456,'2021-03-11','open'),(67,55,'2021-03-12','open');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'cakes'),(2,'cookies'),(3,'chocolate'),(4,'candies'),(5,'trays'),(6,'drinks');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cart_id` bigint NOT NULL,
  `customer_id` int NOT NULL,
  `final_price` int NOT NULL,
  `ship_city` varchar(60) NOT NULL,
  `ship_address` varchar(60) NOT NULL,
  `ship_date` date NOT NULL,
  `order_date` date NOT NULL,
  `credit_card` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_id_UNIQUE` (`cart_id`),
  CONSTRAINT `order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,53,123456,170,'Ashdod','Hovevei Tzion','2021-03-13','2021-03-05',2134),(15,52,55,230,'Netanya','Hovevei Tzion','2021-03-12','2021-03-12',2123);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `price` int NOT NULL,
  `image_url` varchar(250) NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'chocolate cake',170,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPIUH58iidxUGYlbCeWxx_4swFMEXxy1S-w&usqp=CAU',1),(2,'brownies ',30,'https://i0.wp.com/smittenkitchen.com/wp-content/uploads//2012/08/my-favorite-brownies1.jpg?fit=1200%2C800&ssl=1',2),(3,'chocolate ice cream',30,'https://c.recipeland.com/images/r/17839/2dd845aa872d103562c9_550.jpg',3),(4,'soft caramels',20,'https://lh3.googleusercontent.com/proxy/E5Q16kNOuKA6S17uC6bQMnC1ONQn4iUdcCIIVeZk-w6s8zdJtxbJztUpKgK6rjD1atNWAYPyZUm7aY7YlIkLke4CQckP0jo31leA66th4lh0YoSRRv7Nn-5uMHgWVgnZKpSzX6Q',4),(5,'bday snacks mix',300,'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F07%2F07%2FGettyImages-1149135424.jpg',5),(6,'vanilla milkshake',22,'https://hips.hearstapps.com/hmg-prod/images/190523-vanilla-milkshake-015-horizontal-1559169412.png',6),(9,'banana cake',100,'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/5/1/0/BX0609H_old-fashioned-banana-cake_s4x3.jpg.rend.hgtvcom.826.620.suffix/1557858582520.jpeg',1),(10,'biscotti',30,'https://www.fifteenspatulas.com/wp-content/uploads/2010/12/Biscotti-Fifteen-Spatulas-10.jpg',2),(11,'chocolate mousse',50,'https://3f4c2184e060ce99111b-f8c0985c8cb63a71df5cb7fd729edcab.ssl.cf2.rackcdn.com/media/15665/layeredchocolatemousse.jpg',3),(12,'brittle',40,'https://www.cookingclassy.com/wp-content/uploads/2020/12/peanut-brittle-21-768x1152.jpg',4),(13,'healthy mix',200,'https://i2.wp.com/reluctantentertainer.com/wp-content/uploads/2020/11/best-Trader-Joes-Sweet-Snack-Trays-600x386.jpg',5),(14,'mile-high milkshake',30,'https://i2.wp.com/joyblog.joycone.com/wp-content/uploads/2019/06/joycone_milkshakes3.jpg?w=580&ssl=1',6),(30,'vanilla cake',120,'https://i.ytimg.com/vi/qtlhdIfojmc/maxresdefault.jpg',1),(31,'summer fruits cake',70,'https://i1.wp.com/www.thebrickkitchen.com/wp-content/uploads/2015/02/Summer-fruit-cake-6.jpg',1),(32,'summer berry frosted sponge cake',80,'https://www.telegraph.co.uk/content/dam/food-and-drink/2019/09/13/TELEMMGLPICT000172372087_trans_NvBQzQNjv4BqtBg4IWrAXvoIj_S3h6VNeNeDgafV9vosH_nKHduH82s.jpeg',1),(33,'strawberry tuxedo cake ',120,'https://i.pinimg.com/originals/03/c3/a2/03c3a2c8dbd73aa3f61ec5ad66cb7460.png',1),(34,'chocolate chip',40,'https://joyfoodsunshine.com/wp-content/uploads/2016/01/best-chocolate-chip-cookies-recipe-ever-no-chilling-1-e1549147195343.jpg',2),(35,'sprinkle sandwich',55,'https://princesspinkygirl.com/wp-content/uploads/2017/09/Rainbow-Sprinkle-Cookies-square-500x375.jpg',2),(36,'healthy cookie',27,'https://i1.wp.com/apple-of-my-eye.com/wp-content/uploads/2017/03/The-BEST-Healthy-Cookie-Ever-1-2.jpg?resize=1367%2C2048',2),(37,' chewy chocolate fudge',16,'https://www.urbanblisslife.com/wp-content/uploads/2018/08/Chewy-Chocolate-Fudge-Cookies.jpg',2),(38,'sweet \'n salty mix',70,'https://storcpdkenticomedia.blob.core.windows.net/media/recipemanagementsystem/media/recipe-media-files/recipes/retail/x17/2018_sweet-sallty-snack-mix_5817_600x600.jpg?ext=.jpg',5),(39,'pb&j snack board‏',130,'https://www.livinglocurto.com/wp-content/uploads/2020/01/Giraffe-Cake-Dessert-Board-Easy-Kids-Snack-Baby-Shower-Living-Locurto.jpg',5),(40,'passion fruit cocktail',70,'https://www.tasteofhome.com/wp-content/uploads/2018/01/Passion-Fruit-Hurricanes_EXPS_JMZ18_37571_C03_14_8b-1.jpg',6),(41,'tuberoos filled sour licorice sticks',10,'https://pyxis.nymag.com/v1/imgs/2a2/a44/dde6197cf0d97bf6ed64b1edcb412cb6eb-10-strawberry-fingers.rsquare.w700.jpg',4),(52,'gummy worms',20,'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1598414780000/photosp/4501d601-30cf-42ad-bace-043441852b1c/stock-photo-colorful-candy-sugar-color-gummy-sugar-coated-sweet-candy-gummy-worms-bright-and-colorful-4501d601-3',4),(53,'chocolate pralines',77,'https://i.pinimg.com/originals/ed/c5/c6/edc5c6c677190da4ded5860d86250b29.jpg',3),(54,'candy corn',12,'https://cdn.vox-cdn.com/thumbor/PT2J2231BCSbat2yViPl9kWz32E=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13320655/candy_corn_halloween_history.jpg',4),(55,'gummy bears',22,'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80',4),(56,'assorted fruit sour',17,'https://media.candynation.com/catalog/product/cache/3cd2ce2b9f5add902f37baa77584be72/s/o/sour_fruit_balls_jelly_belly__71178.jpg',4),(57,'carrot cake',115,'https://preppykitchen.com/wp-content/uploads/2020/04/carrot-cake-Recipe-new.jpg',1),(58,'wedding cake',300,'https://5restaurante.com/wp-content/uploads/2020/02/Wedding-Cake0.jpg',1),(59,'sweet poison cocktail',55,'https://i2.wp.com/dishesdelish.com/wp-content/uploads/2020/02/Sweet-Poison-Cocktail-Square-1.jpg',6),(60,'mellow yellow margaritas‏',62,'https://i.pinimg.com/originals/63/95/e6/6395e69dbe7da604ad7de4ae3d74a291.jpg',6),(61,'coca cola six pack',35,'https://d1906a8c873b5d638f11-66fd139e67371687450909048768944b.ssl.cf2.rackcdn.com/0049000024680_CR_Default_default_large.jpeg',6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first_name` varchar(60) DEFAULT NULL,
  `last_name` varchar(60) DEFAULT NULL,
  `city` varchar(60) DEFAULT NULL,
  `street` varchar(60) DEFAULT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (0,'sapir181818@walla.co.il','b4ff2684d5796a66f4c44b07ec2587c4','sapir',NULL,NULL,NULL,'ADMIN'),(1,'1','508dce8720665162875470a1d283136e','One','First','Holon','Rishon blvd. 45678','CUSTOMER'),(55,'noam55@gmail.com','ebea1e62e0ff78abfe1403c7dfd179bc','noam','Hamesh','Netanya','Noamon 5','CUSTOMER'),(123,'123','b4ff2684d5796a66f4c44b07ec2587c4','123','123','Jerusalem','123','CUSTOMER'),(123456,'pucpucca@gmail.com','5fa822b94ddc869984fdcc0951bcb8b1','sapir','Barzilay','Tel Aviv','Hovevei Tzion','CUSTOMER');
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

-- Dump completed on 2021-03-13 10:02:49
