-- --------------------------------------------------------
-- Host:                         192.168.2.145
-- Server version:               10.3.20-MariaDB-0ubuntu0.19.10.1 - Ubuntu 19.10
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             10.2.0.5669
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for payvoo
CREATE DATABASE IF NOT EXISTS `payvoo` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `payvoo`;

-- Dumping structure for table payvoo.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `account_no` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL DEFAULT 0,
  `role_id` int(11) DEFAULT NULL,
  `currency` varchar(15) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `balance` decimal(15,2) DEFAULT 0.00,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`account_no`),
  KEY `fk_accountstable_applicant_id` (`applicant_id`),
  KEY `fk_accounts_table_role_id` (`role_id`),
  CONSTRAINT `fk_accounts_table_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.accounts: ~52 rows (approximately)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`account_no`, `applicant_id`, `role_id`, `currency`, `status`, `balance`, `created_on`, `updated_on`) VALUES
	(1, 1, 1, 'EUR', 1, 0.00, '2019-11-20 13:10:19', '0000-00-00 00:00:00'),
	(2, 2, 1, 'EUR', 1, 996.48, '2019-11-20 15:44:33', '0000-00-00 00:00:00'),
	(3, 3, 2, 'EUR', 1, 0.00, '2019-11-20 16:17:50', '0000-00-00 00:00:00'),
	(4, 4, 2, 'EUR', 1, 0.00, '2019-11-20 16:28:04', '0000-00-00 00:00:00'),
	(5, 5, 2, 'EUR', 1, 0.00, '2019-11-20 16:34:29', '0000-00-00 00:00:00'),
	(6, 6, 2, 'EUR', 1, 0.00, '2019-11-20 18:44:57', '0000-00-00 00:00:00'),
	(7, 7, 2, 'EUR', 1, 0.00, '2019-11-21 10:15:58', '0000-00-00 00:00:00'),
	(8, 8, 2, 'EUR', 1, 0.00, '2019-11-21 10:32:48', '0000-00-00 00:00:00'),
	(9, 1, NULL, 'PLZ', 1, 0.00, '2019-11-25 18:02:07', '0000-00-00 00:00:00'),
	(10, 1, NULL, 'INR', 1, 0.00, '2019-11-25 18:03:52', '0000-00-00 00:00:00'),
	(11, 4, NULL, 'INR', 1, 0.00, '2019-11-25 18:41:09', '0000-00-00 00:00:00'),
	(12, 9, 2, 'EUR', 1, 0.00, '2019-11-27 15:08:58', '0000-00-00 00:00:00'),
	(13, 10, 1, 'EUR', 1, 0.00, '2019-11-27 15:09:30', '0000-00-00 00:00:00'),
	(14, 11, 1, 'EUR', 1, 0.00, '2019-11-27 15:30:56', '0000-00-00 00:00:00'),
	(15, 12, 1, 'EUR', 1, 0.00, '2019-11-27 15:32:45', '0000-00-00 00:00:00'),
	(16, 13, 1, 'EUR', 1, 0.00, '2019-11-27 15:50:12', '0000-00-00 00:00:00'),
	(17, 14, 1, 'EUR', 1, 0.00, '2019-11-27 16:47:38', '0000-00-00 00:00:00'),
	(18, 15, 1, 'EUR', 1, 0.00, '2019-11-27 17:05:01', '0000-00-00 00:00:00'),
	(19, 16, 1, 'EUR', 1, 0.00, '2019-11-27 18:23:55', '0000-00-00 00:00:00'),
	(20, 17, 1, 'EUR', 1, 0.00, '2019-11-27 18:29:53', '0000-00-00 00:00:00'),
	(22, 19, 1, 'EUR', 1, 901.00, '2019-11-27 20:32:56', '0000-00-00 00:00:00'),
	(23, 20, 1, 'EUR', 1, 0.00, '2019-11-27 20:47:23', '0000-00-00 00:00:00'),
	(24, 21, 2, 'EUR', 1, 0.00, '2019-11-28 12:36:07', '0000-00-00 00:00:00'),
	(25, 22, 2, 'EUR', 1, 0.00, '2019-11-28 15:52:33', '0000-00-00 00:00:00'),
	(26, 23, 1, 'EUR', 1, 0.00, '2019-11-28 16:19:04', '0000-00-00 00:00:00'),
	(27, 19, NULL, 'USD', 1, 880.00, '2019-11-29 10:52:39', '0000-00-00 00:00:00'),
	(28, 19, NULL, 'INR', 1, 73.00, '2019-11-29 10:52:46', '0000-00-00 00:00:00'),
	(29, 2, NULL, 'INR', 1, 14321.53, '2019-11-29 10:55:20', '0000-00-00 00:00:00'),
	(30, 2, NULL, 'USD', 1, 1060.44, '2019-11-29 10:55:27', '0000-00-00 00:00:00'),
	(31, 24, 1, 'EUR', 1, 0.00, '2019-11-29 17:29:08', '0000-00-00 00:00:00'),
	(32, 25, 2, 'EUR', 1, 0.00, '2019-11-29 17:31:57', '0000-00-00 00:00:00'),
	(33, 26, 1, 'EUR', 1, 0.00, '2019-11-29 18:46:21', '0000-00-00 00:00:00'),
	(34, 27, 1, 'EUR', 1, 0.00, '2019-11-29 19:29:18', '0000-00-00 00:00:00'),
	(35, 28, 1, 'EUR', 1, 0.00, '2019-11-29 19:31:14', '0000-00-00 00:00:00'),
	(36, 27, NULL, 'PLN', 1, 26.00, '2019-11-29 19:33:29', '0000-00-00 00:00:00'),
	(37, 27, NULL, 'USD', 1, 32.00, '2019-11-29 19:35:17', '0000-00-00 00:00:00'),
	(38, 27, NULL, 'INR', 1, 0.00, '2019-11-29 19:35:39', '0000-00-00 00:00:00'),
	(39, 28, NULL, 'INR', 1, 24.00, '2019-11-29 19:36:19', '0000-00-00 00:00:00'),
	(40, 28, NULL, 'CZK', 1, 417.84, '2019-11-29 19:36:43', '0000-00-00 00:00:00'),
	(41, 28, NULL, 'HUF', 1, 1964.52, '2019-11-29 19:36:53', '0000-00-00 00:00:00'),
	(42, 29, 2, 'EUR', 1, 0.00, '2019-12-02 13:03:08', '0000-00-00 00:00:00'),
	(43, 30, 1, 'EUR', 1, 0.00, '2019-12-02 13:11:37', '0000-00-00 00:00:00'),
	(44, 31, 2, 'EUR', 1, 0.00, '2019-12-02 18:14:09', '0000-00-00 00:00:00'),
	(45, 32, 1, 'EUR', 1, 0.00, '2019-12-02 18:14:56', '0000-00-00 00:00:00'),
	(46, 33, 1, 'EUR', 1, 0.00, '2019-12-03 14:47:22', '0000-00-00 00:00:00'),
	(47, 34, 1, 'EUR', 1, 0.00, '2019-12-03 14:59:20', '0000-00-00 00:00:00'),
	(48, 35, 2, 'EUR', 1, 0.00, '2019-12-03 15:06:10', '0000-00-00 00:00:00'),
	(49, 36, 2, 'EUR', 1, 0.00, '2019-12-03 15:08:14', '0000-00-00 00:00:00'),
	(50, 37, 1, 'EUR', 1, 0.00, '2019-12-03 15:28:12', '0000-00-00 00:00:00'),
	(51, 38, 2, 'EUR', 1, 0.00, '2019-12-03 15:33:04', '0000-00-00 00:00:00'),
	(52, 39, 1, 'EUR', 1, 0.00, '2019-12-03 18:54:10', '0000-00-00 00:00:00'),
	(53, 40, 1, 'EUR', 1, 0.00, '2019-12-03 18:54:14', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping structure for table payvoo.address
CREATE TABLE IF NOT EXISTS `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `country_id` int(50) DEFAULT NULL,
  `address_type_id` int(11) DEFAULT 1,
  `address_line1` varchar(100) DEFAULT NULL,
  `address_line2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`address_id`),
  KEY `fk_address_table_applicant_id` (`applicant_id`),
  KEY `fk_address_table_contact_id` (`contact_id`),
  KEY `fk_address_table_country_id` (`country_id`),
  KEY `fk_address_table_address_type_id` (`address_type_id`),
  CONSTRAINT `fk_address_table_address_type_id` FOREIGN KEY (`address_type_id`) REFERENCES `address_type` (`address_type_id`),
  CONSTRAINT `fk_address_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_address_table_contact_id` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`contact_id`),
  CONSTRAINT `fk_address_table_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.address: ~39 rows (approximately)
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` (`address_id`, `applicant_id`, `contact_id`, `country_id`, `address_type_id`, `address_line1`, `address_line2`, `city`, `town`, `postal_code`, `region`, `created_on`, `updated_on`) VALUES
	(1, 1, 1, 1, 1, 'bvrm', 'symonds', 'hyd', 'suncity', '500015', 'TS', '2019-11-20 13:10:19', '2019-11-27 16:02:01'),
	(2, 2, 2, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-20 15:44:33', '0000-00-00 00:00:00'),
	(3, 3, 3, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-20 16:17:50', '0000-00-00 00:00:00'),
	(4, 4, 4, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-20 16:28:04', '0000-00-00 00:00:00'),
	(5, 5, 5, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-20 16:34:29', '0000-00-00 00:00:00'),
	(6, 6, 6, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-20 18:43:47', '0000-00-00 00:00:00'),
	(7, 7, 7, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-21 10:15:58', '0000-00-00 00:00:00'),
	(8, 8, 8, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-21 10:32:48', '0000-00-00 00:00:00'),
	(9, 9, 9, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-11-27 15:08:50', '0000-00-00 00:00:00'),
	(10, 10, 10, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-27 15:09:23', '0000-00-00 00:00:00'),
	(11, 11, 11, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-11-27 15:30:49', '0000-00-00 00:00:00'),
	(12, 12, 12, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-27 15:32:38', '0000-00-00 00:00:00'),
	(13, 13, 13, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-27 15:50:05', '0000-00-00 00:00:00'),
	(14, 14, 14, 1, 1, 'bvrm', '', 'hyd', 'vetapalem', '500016', 'south', '2019-11-27 16:47:30', '2019-11-29 12:47:50'),
	(15, 15, 15, 1, 1, 'bvrm', 'symonds', 'hyd', 'suncity', '500015', 'TS', '2019-11-27 17:04:53', '2019-11-27 17:36:18'),
	(16, 16, 16, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-27 18:23:48', '0000-00-00 00:00:00'),
	(17, 17, 17, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-27 18:29:45', '0000-00-00 00:00:00'),
	(19, 19, 19, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-27 20:32:56', '0000-00-00 00:00:00'),
	(20, 20, 20, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-27 20:47:23', '0000-00-00 00:00:00'),
	(21, 21, 21, 1, 1, 'null', 'null', 'null', 'null', 'null', 'null', '2019-11-28 12:36:06', '0000-00-00 00:00:00'),
	(22, 22, 22, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-11-28 15:52:25', '0000-00-00 00:00:00'),
	(23, 23, 23, 22, 1, '6558a48', '6558a48', 'Dubai', 'null', '500038', 'India', '2019-11-28 16:18:55', '2019-11-28 18:42:16'),
	(24, 24, 24, 5, 1, 'vetapalem', 'HYD', 'chirala', 'vetapalem', '523187', 'south', '2019-11-29 17:28:58', '2019-11-29 17:30:32'),
	(25, 25, 25, 5, 1, 'Banglore', 'secunderabad', 'hyd', 'bvrm', '523187', 'south', '2019-11-29 17:31:48', '2019-11-29 17:39:29'),
	(26, 26, 26, 1, 1, 'null', 'null', 'null', 'null', 'null', 'null', '2019-11-29 18:46:21', '0000-00-00 00:00:00'),
	(27, 27, 27, 1, 1, 'Raghunath Street', 'Buguda', 'Berhampur', 'null', '761118', 'Deacan', '2019-11-29 19:29:18', '0000-00-00 00:00:00'),
	(28, 28, 28, 1, 1, 'Raghunath Street', 'Buguda', 'Berhampur', 'null', '761118', 'Deacan', '2019-11-29 19:31:14', '0000-00-00 00:00:00'),
	(29, 29, 29, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-12-02 13:02:56', '0000-00-00 00:00:00'),
	(30, 30, 30, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-12-02 13:11:25', '0000-00-00 00:00:00'),
	(31, 31, 31, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-12-02 18:13:57', '0000-00-00 00:00:00'),
	(32, 32, 32, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-12-02 18:14:45', '0000-00-00 00:00:00'),
	(33, 33, 33, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-12-03 14:47:09', '0000-00-00 00:00:00'),
	(34, 34, 34, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-12-03 14:59:08', '0000-00-00 00:00:00'),
	(35, 35, 35, 5, 1, 'bvrm', 'hyd', 'hyd', 'secbad', '000000', 'North', '2019-12-03 15:05:58', '2019-12-03 15:07:30'),
	(36, 36, 36, 1, 1, 'John', 'symonds', 'riga', 'suncity', '500015', 'TS', '2019-12-03 15:08:02', '0000-00-00 00:00:00'),
	(37, 37, 37, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-12-03 15:27:59', '0000-00-00 00:00:00'),
	(38, 38, 38, 1, 1, 'hyderabad', 'hyd', 'Hyderabad', 'HYDERABAD', '500015', 'andhrapradesh', '2019-12-03 15:32:52', '0000-00-00 00:00:00'),
	(39, 39, 39, 1, 1, 'hyd ad one', 'hyd ad two', 'Hyderabad', 'null', '564425', 'Telangana', '2019-12-03 18:54:09', '0000-00-00 00:00:00'),
	(40, 40, 40, 1, 1, 'hyd ad one', 'hyd ad two', 'Hyderabad', 'null', '564425', 'Telangana', '2019-12-03 18:54:14', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;

-- Dumping structure for table payvoo.address_type
CREATE TABLE IF NOT EXISTS `address_type` (
  `address_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `address_type` varchar(50) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`address_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.address_type: ~5 rows (approximately)
/*!40000 ALTER TABLE `address_type` DISABLE KEYS */;
INSERT INTO `address_type` (`address_type_id`, `address_type`, `created_on`, `updated_on`) VALUES
	(1, 'PERSONAL_ADDRESS', NULL, '0000-00-00 00:00:00'),
	(2, 'BUSINESS_ADDRESS', NULL, '0000-00-00 00:00:00'),
	(3, 'OPERATING_ADDRESS', NULL, '0000-00-00 00:00:00'),
	(4, 'SHIPPING_ADDRESS', NULL, '0000-00-00 00:00:00'),
	(5, 'BILLING_ADDRESS', NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `address_type` ENABLE KEYS */;

-- Dumping structure for table payvoo.applicant
CREATE TABLE IF NOT EXISTS `applicant` (
  `applicant_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_type` varchar(100) NOT NULL,
  `customerId` varchar(15) NOT NULL,
  `user_id` varchar(250) NOT NULL,
  `password` varchar(100) NOT NULL,
  `passcode_pin` int(11) DEFAULT NULL,
  `mobile` varchar(15) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `otp` varchar(10) DEFAULT NULL,
  `created_on` datetime NOT NULL,
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`applicant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.applicant: ~39 rows (approximately)
/*!40000 ALTER TABLE `applicant` DISABLE KEYS */;
INSERT INTO `applicant` (`applicant_id`, `account_type`, `customerId`, `user_id`, `password`, `passcode_pin`, `mobile`, `role_id`, `status`, `otp`, `created_on`, `updated_on`) VALUES
	(1, 'business', 'PV-GA2819NN', 'avachary2408@gmail.com', 'sha1$bc45201b$1$83a5614cbc0fad69d3868181796be3a11beb7e96', 1234, '919951686471', 2, 0, NULL, '2019-11-20 13:10:19', '2019-11-27 17:15:22'),
	(2, 'business', 'PV-SB1890HX', 'testpayvoo12@gmail.com', 'sha1$c3132464$1$27ce2096343752a16e10795a604967b1fb7e5b30', 1234, '35989874612', 2, 1, NULL, '2019-11-20 15:44:33', '2019-11-26 10:12:03'),
	(3, 'personal', 'PV-ZH4811NS', 'testpayvoo123@gmail.com', 'sha1$91682942$1$5d622d23ee7c71299f36f5a10ace937ca834830a', 1234, '359898746132', 1, 1, NULL, '2019-11-20 16:17:50', '2019-11-26 10:39:36'),
	(4, 'Business', 'PV-HK5226YF', 'testpayvoo1234@gmail.com', 'sha1$16ed0e2e$1$1791dfaaa9c35476ba0a7fd5042e69fd1d2c2914', 1234, '3598987461432', 2, 1, NULL, '2019-11-20 16:28:04', '2019-11-27 19:17:12'),
	(5, 'personal', 'PV-ZC5090RA', 'sekharsahu@123', 'sha1$7c61464b$1$9886485b44b1b87b5f63cb554bf61059b74c87dd', 1234, '917205010199', 1, 1, NULL, '2019-11-20 16:34:29', '2019-11-26 10:39:36'),
	(6, 'personal', 'PV-VO9118TG', 'sekharsahu143@123', 'sekharsahu@123', 1234, '917205010100', 1, 1, NULL, '2019-11-20 18:43:47', '2019-11-26 10:39:36'),
	(7, 'personal', 'PV-PE4678ZV', 'sekhar@gmail.com', 'sekharsahu@123', 1234, '917205010101', 1, 1, NULL, '2019-11-21 10:15:58', '2019-11-27 10:52:56'),
	(8, 'personal', 'PV-SW6231QI', 'demo@gmail.com', 'sha1$eebe375a$1$bbe8d8bc01cb603ecb597ecdc6048a366351d511', 1234, '917205010102', 1, 1, NULL, '2019-11-21 10:32:48', '2019-11-26 10:39:36'),
	(9, 'business', 'PV-SB9060YB', 'anu183055775@gmail.com', 'sha1$4cc108ce$1$3323c32856438c2a5f9199dab6cc64ae7ceb20aa', 1234, '8595067879861', 2, 1, NULL, '2019-11-27 15:08:50', NULL),
	(10, 'personal', 'PV-MM3332YP', 'payvoo4@gmail.com', 'sha1$15205a6b$1$2113256c3d71337a013eef2414b99cc6ed1892b9', 1234, '359896349045', 1, 0, NULL, '2019-11-27 15:09:23', '2019-11-27 17:49:56'),
	(11, 'personal', 'PV-RK8286IL', 'anu@gmail.com', 'sha1$9b67793f$1$5befd9e7cb4948e7037a243bd2023d12bb539cc5', 1234, '85950678798', 1, 1, NULL, '2019-11-27 15:30:49', NULL),
	(12, 'personal', 'PV-LC4074FG', 'gana123@gmail.com', 'sha1$397113ec$1$e360394ced12924384211df4fec2057e1b8cba6b', 1234, '3596349045', 1, 1, NULL, '2019-11-27 15:32:38', NULL),
	(13, 'personal', 'PV-BC5854FX', 'gana1234@gmail.com', 'sha1$00b6182f$1$36630efa9df49f0743e7e16622428ff4629c1e1b', 9876, '35963490545', 1, 1, NULL, '2019-11-27 15:50:05', '2019-11-27 18:14:47'),
	(14, 'personal', 'PV-XH1802SU', 'anuu@gmail.com', 'sha1$989430f2$1$4b156faed32d03103d45590d80a11304e1266745', 6565, '875950678798', 1, 1, NULL, '2019-11-27 16:47:30', '2019-12-03 14:48:52'),
	(15, 'personal', 'PV-QQ7549CH', 'gana1235@gmail.com', 'sha1$da920391$1$c7e00c2a85574b9c83918e9713ae8bc78bb0fbf8', 1234, '359630545', 1, 1, NULL, '2019-11-27 17:04:53', NULL),
	(16, 'personal', 'PV-KG7307NX', 'user123@gmail.com', 'sha1$421ef6d0$1$bbf8d7ad782efa1b5bad719eb370a6add7b9c442', 1234, '355730545', 1, 1, NULL, '2019-11-27 18:23:48', NULL),
	(17, 'personal', 'PV-AH0227ZX', 'user1234@gmail.com', 'sha1$dc66ef09$1$97d8bb3f16c2d99352a5c5ffec4053bcbabc770b', 1234, '367730545', 1, 1, NULL, '2019-11-27 18:29:45', NULL),
	(19, 'Personal', 'PV-DQ7301WC', 'demo9@gmail.com', 'sha1$6640a5d8$1$f41c83902ba62344e8f023c205e3412d452e3038', 1234, '917205010110', 1, 1, NULL, '2019-11-27 20:32:56', NULL),
	(20, 'Personal', 'PV-OV4047CE', 'demo10@gmail.com', 'sha1$b3ce283a$1$d1f613d143ffe268c355c834ba43b89f7c4ff127', 1234, '917205010111', 1, 1, NULL, '2019-11-27 20:47:23', NULL),
	(21, 'business', 'PV-WY6456QV', 'demo11@gmail.com', 'sha1$0fe2ec20$1$3d4f422ecfb0881bcccb15877bac1309309d0020', 1234, '917205010112', 2, 1, NULL, '2019-11-28 12:36:06', NULL),
	(22, 'business', 'PV-RL1041ZG', 'gana12@gmail.com', 'sha1$a0706aed$1$2d16ea9fb792b39ca17be0d1c7dc8238e0a2fd0f', 1234, '8121438353', 2, 1, NULL, '2019-11-28 15:52:25', NULL),
	(23, 'Business', 'PV-SR8508VY', 'nikhil.katari@gmail.com', 'sha1$7bb43e18$1$463cef403f2b9ae0682d31970aea6c98d2bb4e62', NULL, '3539874561230', 1, 1, NULL, '2019-11-28 16:18:55', '2019-11-29 18:42:42'),
	(24, 'personal', 'PV-WL6347ZH', 'gana.saga@gmail.com', 'sha1$7d44b3fa$1$f4fd9c03b0e256ac00bddf8adf069f9a704c897f', 1234, '8054587549', 1, 1, NULL, '2019-11-29 17:28:58', NULL),
	(25, 'business', 'PV-LJ6388CR', 'gana321@gmail.com', 'sha1$e35a21de$1$931f1488689259bea8b0b34eab202f1978216d20', 1234, '8054589049', 2, 1, NULL, '2019-11-29 17:31:48', NULL),
	(26, 'Business', 'PV-PY3528QD', 'anilkumar.marri@ojas-it.com', 'sha1$b0ab9fc9$1$278b5c2bc58d0e846fa53df2f2e4f3d926fbb842', 1234, '917093946312', 1, 1, NULL, '2019-11-29 18:46:21', NULL),
	(27, 'Personal', 'PV-IX3515SW', 'aniltest@gmail.com', 'sha1$b7e50fd3$1$f26ca4419ae941579790257031a0f402d0af720f', 1234, '98657456555', 1, 1, NULL, '2019-11-29 19:29:18', NULL),
	(28, 'Personal', 'PV-JH8484IM', 'venutest@gmail.com', 'sha1$834ecc98$1$1c5a3be9f230f53dccfa37563558c3258770ed4a', 1234, '55996887455', 1, 1, NULL, '2019-11-29 19:31:14', NULL),
	(29, 'business', 'PV-NE0119JP', 'yougo10@gmail.com', 'sha1$ca6ebc68$1$5001701283b4b20d6d04a5bd501f5f7e16b47b1c', 1234, '690683510', 2, 1, NULL, '2019-12-02 13:02:56', NULL),
	(30, 'personal', 'PV-TV0509ZH', 'yougo11@gmail.com', 'sha1$98c0cb9c$1$17cb2a4f39743e45f31f0d2544937f716f087d45', 2222, '690633510', 1, 1, NULL, '2019-12-02 13:11:25', '2019-12-02 13:14:50'),
	(31, 'business', 'PV-BV4531UZ', 'yougo75@gmail.com', 'sha1$766f0ac6$1$03a83af651975d080f864b8643f65f4b01ea62b6', 1234, '9863745000', 2, 1, NULL, '2019-12-02 18:13:57', NULL),
	(32, 'personal', 'PV-CM3605ZP', 'yougo756@gmail.com', 'sha1$172a71b9$1$98ccd467994e525ecde228d1ce1a661a106d8066', 1234, '98637455000', 1, 1, NULL, '2019-12-02 18:14:45', '2019-12-03 13:00:10'),
	(33, 'personal', 'PV-SS7281YK', 'tarangini.dola@ojas-it.com', 'sha1$2df8d01f$1$f18f0303bae1e5a9779bd8d642590cfe5626719b', 1234, '7925689523', 1, 1, NULL, '2019-12-03 14:47:09', NULL),
	(34, 'personal', 'PV-SL9394BE', 'tarangini.dolaa@ojas-it.com', 'sha1$a2ec1adb$1$d12b4a1fa3f7191c3f9a153ea41808e982af6fff', 1234, '79256895230', 1, 1, NULL, '2019-12-03 14:59:08', NULL),
	(35, 'business', 'PV-GJ1651BG', 'test123456@gmail.com', 'sha1$9167f315$1$c529f62e4b8369a7b7a61ba7061e3669b90702ac', 1234, '80545120498', 2, 1, NULL, '2019-12-03 15:05:58', NULL),
	(36, 'business', 'PV-KV7210UQ', 'gana100@gmail.com', 'sha1$ae5ac2a8$1$386f3be7e75f55fdaa87f28109eea231fa5a8b56', 1234, '7093946312', 2, 1, NULL, '2019-12-03 15:08:02', NULL),
	(37, 'personal', 'PV-GQ0773YQ', 'krishnakanth.r@ojas-it.com', 'sha1$871b8c33$1$975b4393b8dd33a13ac824cfc952fc3cd02bad8b', 1234, '792568955230', 1, 1, NULL, '2019-12-03 15:27:59', NULL),
	(38, 'business', 'PV-RC9783DY', 'krishnakanth.rr@ojas-it.com', 'sha1$92bd81dc$1$72bd675729da1fc2518b197fb6b0069edc723212', 1234, '79256855230', 2, 1, NULL, '2019-12-03 15:32:52', NULL),
	(39, 'Personal', 'PV-GZ1909LG', 'alifm@gmail.com', 'sha1$900c462c$1$1c2f5e0f5d95bf31e35d86226d03e5fb9c83dd60', 1111, '35935989634', 1, 1, NULL, '2019-12-03 18:54:09', NULL),
	(40, 'Personal', 'PV-EE4430EN', 'alifm@gmail.com', 'sha1$cdce1af0$1$bfad231e19cef520173872945dde37ecece2e065', 1111, '35935935989634', 1, 1, NULL, '2019-12-03 18:54:14', NULL);
/*!40000 ALTER TABLE `applicant` ENABLE KEYS */;

-- Dumping structure for table payvoo.audit_log
CREATE TABLE IF NOT EXISTS `audit_log` (
  `audit_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL DEFAULT '',
  `request` longtext NOT NULL DEFAULT '',
  PRIMARY KEY (`audit_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.audit_log: ~31 rows (approximately)
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` (`audit_log_id`, `token`, `request`) VALUES
	(1, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"ac-nJ5glm3uRJCrEA+LcPdaDegaGN0""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"ac-nJ5glm3uRJCrEA+LcPdaDegaGN0""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(2, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"149-fHoO2jFoI65xRHvYHDfuUmgKqpY""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"149-fHoO2jFoI65xRHvYHDfuUmgKqpY""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(3, '', '{"body":{"userId":"demo9@gmail.com","password":"1234","account_type":"Personal"},"headers":{"content-type":"application/json","user-agent":"PostmanRuntime/7.19.0","accept":"*/*","cache-control":"no-cache","postman-token":"e46ac5a0-ddda-4e07-8e09-3a3167710439","host":"192.168.2.145:5001","accept-encoding":"gzip, deflate","content-length":"94","connection":"keep-alive"},"originalUrl":"/service/user/login","params":{},"rawHeaders":["Content-Type","application/json","User-Agent","PostmanRuntime/7.19.0","Accept","*/*","Cache-Control","no-cache","Postman-Token","e46ac5a0-ddda-4e07-8e09-3a3167710439","Host","192.168.2.145:5001","Accept-Encoding","gzip, deflate","Content-Length","94","Connection","keep-alive"],"route":{"path":"/service/user/login","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"loginUser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}'),
	(4, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(5, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(6, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(7, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(8, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(9, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(10, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(11, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(12, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(13, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(14, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(15, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(16, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(17, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(18, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(19, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(20, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(21, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(22, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(23, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(24, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(25, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(26, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(27, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(28, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(29, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(30, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(31, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(32, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(33, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(34, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(35, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(36, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(37, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(38, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(39, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(40, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(41, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9"},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9"],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(42, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(43, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(44, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(45, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(46, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/status","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/status","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getDashboardStatus","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}'),
	(47, '35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458', '{"body":{},"headers":{"host":"192.168.2.145:5000","connection":"keep-alive","accept":"application/json, text/plain, */*","x-auth-token":"35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","origin":"http://localhost:4200","content-type":"application/json","referer":"http://localhost:4200/","accept-encoding":"gzip, deflate","accept-language":"en-US,en;q=0.9","if-none-match":"W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""},"originalUrl":"/service/settings/personalProfile","params":{},"rawHeaders":["Host","192.168.2.145:5000","Connection","keep-alive","Accept","application/json, text/plain, */*","x-auth-token","35dabd10-15d0-11ea-a5f3-7b6673f9d46b1575379458","User-Agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36","Origin","http://localhost:4200","content-type","application/json","Referer","http://localhost:4200/","Accept-Encoding","gzip, deflate","Accept-Language","en-US,en;q=0.9","If-None-Match","W/"5d-tc/hk4oTvNo+CcgocU8bDaVID8g""],"route":{"path":"/service/settings/personalProfile","stack":[{"name":"isTokenValid","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"getPersonaProfile","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_details
CREATE TABLE IF NOT EXISTS `business_details` (
  `business_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `country_of_incorporation` int(11) DEFAULT NULL,
  `business_type` int(11) DEFAULT NULL,
  `business_legal_name` varchar(50) DEFAULT NULL,
  `trading_name` varchar(50) DEFAULT NULL,
  `registration_number` varchar(50) DEFAULT NULL,
  `incorporation_date` date DEFAULT NULL,
  `business_directors` longtext DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_id`),
  KEY `fk_business_details_table_applicant_id` (`applicant_id`),
  KEY `fk_business_details_table_country_of_incorporation` (`country_of_incorporation`),
  KEY `fk_business_details_table_business_type` (`business_type`),
  CONSTRAINT `fk_business_details_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_business_details_table_business_type` FOREIGN KEY (`business_type`) REFERENCES `business_type` (`business_type_id`),
  CONSTRAINT `fk_business_details_table_country_of_incorporations_country` FOREIGN KEY (`country_of_incorporation`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_details: ~4 rows (approximately)
/*!40000 ALTER TABLE `business_details` DISABLE KEYS */;
INSERT INTO `business_details` (`business_id`, `applicant_id`, `country_of_incorporation`, `business_type`, `business_legal_name`, `trading_name`, `registration_number`, `incorporation_date`, `business_directors`, `created_on`, `updated_on`) VALUES
	(1, 1, 20, 1, 'MASS MEDIA DESIGN LTD', 'Info ltd', '4994880', '2016-08-21', NULL, NULL, '0000-00-00 00:00:00'),
	(2, 2, 20, 1, 'MASS MEDIA DESIGN LTD', 'Info ltd', '4994880', '2016-08-21', NULL, NULL, '0000-00-00 00:00:00'),
	(3, 4, 20, 1, 'MASS MEDIA DESIGN LTD', 'Info ltd', '4994880', '2016-08-21', NULL, NULL, '0000-00-00 00:00:00'),
	(4, 23, 25, 2, 'UI DEV', 'Ojas DEv', 'AP37HHIJYU', '0995-12-01', NULL, NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `business_details` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_industry_lov
CREATE TABLE IF NOT EXISTS `business_industry_lov` (
  `business_industry_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_industry_name` varchar(250) DEFAULT NULL,
  `restricted` tinyint(4) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_industry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_industry_lov: ~11 rows (approximately)
/*!40000 ALTER TABLE `business_industry_lov` DISABLE KEYS */;
INSERT INTO `business_industry_lov` (`business_industry_id`, `business_industry_name`, `restricted`, `created_on`, `updated_on`) VALUES
	(1, 'Armaments, nuclear, weapons or defense manufacturers', 1, NULL, '0000-00-00 00:00:00'),
	(2, 'Adult entertainment or the sale or advertising of sexual services', 1, NULL, '0000-00-00 00:00:00'),
	(3, 'Art dealers, auction houses or pawnbroker', 0, NULL, '0000-00-00 00:00:00'),
	(4, 'Industrial chemical or legal high companies', 0, NULL, '0000-00-00 00:00:00'),
	(5, 'Client money processing firms', 0, NULL, '0000-00-00 00:00:00'),
	(6, 'Cryptocurrency processing firms', 1, NULL, '0000-00-00 00:00:00'),
	(7, 'FX speculators', 0, NULL, '0000-00-00 00:00:00'),
	(8, 'Gambling firms or video game arcades', 1, NULL, '0000-00-00 00:00:00'),
	(9, 'Nonprofit, political and religious organisations', 0, NULL, '0000-00-00 00:00:00'),
	(10, 'Precious metals and stones firms', 0, NULL, '0000-00-00 00:00:00'),
	(11, 'Sale of used cars or heavy industry vehicles', 0, NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `business_industry_lov` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_owner
CREATE TABLE IF NOT EXISTS `business_owner` (
  `business_owner_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `business_owner_type` varchar(25) DEFAULT NULL,
  `percentage` varchar(25) DEFAULT NULL,
  `email_verified` tinyint(4) DEFAULT NULL,
  `mobile_verfied` tinyint(4) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_owner_id`),
  KEY `fk_business_owner_table_business_id` (`business_id`),
  KEY `fk_business_owner_table_conatct_id` (`contact_id`),
  CONSTRAINT `fk_business_owner_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`),
  CONSTRAINT `fk_business_owner_table_conatct_id` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_owner: ~0 rows (approximately)
/*!40000 ALTER TABLE `business_owner` DISABLE KEYS */;
/*!40000 ALTER TABLE `business_owner` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_sector_details
CREATE TABLE IF NOT EXISTS `business_sector_details` (
  `business_sector_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `business_sector` int(11) DEFAULT NULL,
  `range_of_service` varchar(250) DEFAULT NULL,
  `website` varchar(150) DEFAULT NULL,
  `restricted_business` tinyint(1) DEFAULT NULL,
  `selected_industries` varchar(150) DEFAULT NULL,
  `restricted_industries` varchar(150) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_sector_details_id`),
  KEY `fk_business_sector_details_table_business_id` (`business_id`),
  KEY `fk_business_sector_details_table_business_sector` (`business_sector`),
  CONSTRAINT `fk_business_sector_details_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`),
  CONSTRAINT `fk_business_sector_details_table_business_sector` FOREIGN KEY (`business_sector`) REFERENCES `business_sector_lov` (`business_sector_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_sector_details: ~16 rows (approximately)
/*!40000 ALTER TABLE `business_sector_details` DISABLE KEYS */;
INSERT INTO `business_sector_details` (`business_sector_details_id`, `business_id`, `business_sector`, `range_of_service`, `website`, `restricted_business`, `selected_industries`, `restricted_industries`, `created_on`, `updated_on`) VALUES
	(1, 2, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '3,4,5,7,9,10,11', '8', NULL, '2019-11-20 15:47:47'),
	(2, 2, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '1,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 15:47:47'),
	(3, 2, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '3,4,5,7,9,10,11', '8', NULL, '2019-11-20 15:47:47'),
	(4, 2, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '8,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 15:47:47'),
	(5, 1, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:26:25'),
	(6, 1, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '1,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:26:25'),
	(7, 1, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '2,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:26:25'),
	(8, 1, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '6,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:26:25'),
	(9, 1, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '8,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:26:25'),
	(10, 1, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '3,4,5,7,9,10,11', NULL, NULL, '0000-00-00 00:00:00'),
	(11, 3, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:29:44'),
	(12, 3, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '1,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:29:44'),
	(13, 3, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '2,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:29:44'),
	(14, 3, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '6,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:29:44'),
	(15, 3, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '8,3,4,5,7,9,10,11', '8', NULL, '2019-11-20 16:29:44'),
	(16, 3, 2, 'Deals inpesticides and Organic foods.', 'www.test-it.com', 1, '3,4,5,7,9,10,11', NULL, NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `business_sector_details` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_sector_lov
CREATE TABLE IF NOT EXISTS `business_sector_lov` (
  `business_sector_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_sector_name` varchar(250) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_sector_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_sector_lov: ~10 rows (approximately)
/*!40000 ALTER TABLE `business_sector_lov` DISABLE KEYS */;
INSERT INTO `business_sector_lov` (`business_sector_id`, `business_sector_name`, `created_on`, `updated_on`) VALUES
	(1, 'Agriculture, Forestry and Fishing', NULL, '0000-00-00 00:00:00'),
	(2, 'Mining', NULL, '0000-00-00 00:00:00'),
	(3, 'Construction', NULL, '0000-00-00 00:00:00'),
	(4, 'Manufacturing', NULL, '0000-00-00 00:00:00'),
	(5, 'Transportation, Communications, Electric, Gas and Sanitary services', NULL, '0000-00-00 00:00:00'),
	(6, 'Wholesale Trade', NULL, '0000-00-00 00:00:00'),
	(7, 'Retail Trade', NULL, '0000-00-00 00:00:00'),
	(8, 'Finance, Insurance and Real Estate', NULL, '0000-00-00 00:00:00'),
	(9, 'Services', NULL, '0000-00-00 00:00:00'),
	(10, 'Public Administration', NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `business_sector_lov` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_service_lov
CREATE TABLE IF NOT EXISTS `business_service_lov` (
  `business_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_service_name` varchar(50) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_service_lov: ~0 rows (approximately)
/*!40000 ALTER TABLE `business_service_lov` DISABLE KEYS */;
/*!40000 ALTER TABLE `business_service_lov` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_transactions
CREATE TABLE IF NOT EXISTS `business_transactions` (
  `business_trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `monthly_transfer_amount` varchar(50) DEFAULT NULL,
  `no_payments_per_month` varchar(50) DEFAULT NULL,
  `max_value_of_payments` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_trans_id`),
  KEY `fk_business_transactiona_table_business_id` (`business_id`),
  CONSTRAINT `fk_business_transactiona_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_transactions: ~1 rows (approximately)
/*!40000 ALTER TABLE `business_transactions` DISABLE KEYS */;
INSERT INTO `business_transactions` (`business_trans_id`, `business_id`, `monthly_transfer_amount`, `no_payments_per_month`, `max_value_of_payments`, `created_on`, `updated_on`) VALUES
	(1, 1, '1000-10000 euros', '<50', 10, NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `business_transactions` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_transaction_countries
CREATE TABLE IF NOT EXISTS `business_transaction_countries` (
  `business_transaction_countries_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `business_description` varchar(150) DEFAULT NULL,
  `transaction_type` varchar(25) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_transaction_countries_id`),
  KEY `business_transaction_countries_table_business_id` (`business_id`),
  KEY `business_transaction_countries_table_country_id` (`country_id`),
  CONSTRAINT `business_transaction_countries_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`),
  CONSTRAINT `business_transaction_countries_table_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_transaction_countries: ~2 rows (approximately)
/*!40000 ALTER TABLE `business_transaction_countries` DISABLE KEYS */;
INSERT INTO `business_transaction_countries` (`business_transaction_countries_id`, `business_id`, `country_id`, `business_description`, `transaction_type`, `created_on`, `updated_on`) VALUES
	(1, 2, 2, 'some bussiness description', 'SEND/RECEIVE', NULL, '0000-00-00 00:00:00'),
	(2, 2, 3, 'some bussiness description', 'SEND/RECEIVE', NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `business_transaction_countries` ENABLE KEYS */;

-- Dumping structure for table payvoo.business_type
CREATE TABLE IF NOT EXISTS `business_type` (
  `business_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_type_name` varchar(50) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`business_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.business_type: ~6 rows (approximately)
/*!40000 ALTER TABLE `business_type` DISABLE KEYS */;
INSERT INTO `business_type` (`business_type_id`, `business_type_name`, `created_on`, `updated_on`) VALUES
	(1, 'SOLE  PROPRIETORSHIP', NULL, '0000-00-00 00:00:00'),
	(2, 'PARTNERSHIP', NULL, '0000-00-00 00:00:00'),
	(3, 'CORPORATION', NULL, '0000-00-00 00:00:00'),
	(4, 'LIMITED  LIABILITY  COMPANY', NULL, '0000-00-00 00:00:00'),
	(5, 'COOPERATIVE', NULL, '0000-00-00 00:00:00'),
	(6, 'SANDBOX', NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `business_type` ENABLE KEYS */;

-- Dumping structure for table payvoo.card_Issue
CREATE TABLE IF NOT EXISTS `card_Issue` (
  `card_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `card_pin` int(10) NOT NULL,
  `card_limit` int(10) NOT NULL,
  `card_base_currency` varchar(3) NOT NULL,
  `card_deliver_to` int(8) NOT NULL,
  `card_feewithdraw_account` int(11) NOT NULL,
  `card_name_in_card` varchar(50) NOT NULL,
  `card_number` varchar(25) NOT NULL,
  `card_expiry_date` varchar(10) DEFAULT NULL,
  `card_cvv` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  KEY `fk_card_issue_applicant` (`applicant_id`),
  KEY `fk_card_issue_card_feewithdraw_account` (`card_feewithdraw_account`),
  CONSTRAINT `fk_card_issue_applicant` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_card_issue_card_feewithdraw_account` FOREIGN KEY (`card_feewithdraw_account`) REFERENCES `accounts` (`account_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table payvoo.card_Issue: ~0 rows (approximately)
/*!40000 ALTER TABLE `card_Issue` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_Issue` ENABLE KEYS */;

-- Dumping structure for table payvoo.card_linked_accounts
CREATE TABLE IF NOT EXISTS `card_linked_accounts` (
  `card_linked_accountid` int(11) NOT NULL AUTO_INCREMENT,
  `Card_id` smallint(6) NOT NULL,
  `card_linked_urrencyccount` varchar(25) NOT NULL,
  PRIMARY KEY (`card_linked_accountid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table payvoo.card_linked_accounts: ~0 rows (approximately)
/*!40000 ALTER TABLE `card_linked_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_linked_accounts` ENABLE KEYS */;

-- Dumping structure for table payvoo.card_product_type
CREATE TABLE IF NOT EXISTS `card_product_type` (
  `card_product_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `card_product_name` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`card_product_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table payvoo.card_product_type: ~0 rows (approximately)
/*!40000 ALTER TABLE `card_product_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_product_type` ENABLE KEYS */;

-- Dumping structure for table payvoo.card_type
CREATE TABLE IF NOT EXISTS `card_type` (
  `card_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `card_type` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`card_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table payvoo.card_type: ~0 rows (approximately)
/*!40000 ALTER TABLE `card_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `card_type` ENABLE KEYS */;

-- Dumping structure for table payvoo.check_rates
CREATE TABLE IF NOT EXISTS `check_rates` (
  `check_rates_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `from_currency` varchar(25) DEFAULT NULL,
  `to_currency` varchar(25) DEFAULT NULL,
  `isConvert` tinyint(4) DEFAULT 0,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`check_rates_id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.check_rates: ~117 rows (approximately)
/*!40000 ALTER TABLE `check_rates` DISABLE KEYS */;
INSERT INTO `check_rates` (`check_rates_id`, `applicant_id`, `from_currency`, `to_currency`, `isConvert`, `created_on`, `updated_on`) VALUES
	(1, 1, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(2, 1, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(3, 1, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(4, 2, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(5, 2, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(6, 2, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(7, 3, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(8, 3, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(9, 3, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(10, 4, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(11, 4, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(12, 4, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(13, 5, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(14, 5, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(15, 5, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(16, 6, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(17, 6, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(18, 6, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(19, 7, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(20, 7, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(21, 7, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(22, 8, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(23, 8, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(24, 8, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(25, 9, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(26, 9, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(27, 9, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(28, 10, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(29, 10, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(30, 10, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(31, 11, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(32, 11, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(33, 11, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(34, 12, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(35, 12, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(36, 12, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(37, 13, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(38, 13, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(39, 13, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(40, 14, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(41, 14, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(42, 14, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(43, 15, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(44, 15, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(45, 15, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(46, 16, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(47, 16, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(48, 16, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(49, 17, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(50, 17, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(51, 17, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(52, 19, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(53, 19, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(54, 19, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(55, 20, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(56, 20, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(57, 20, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(58, 21, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(59, 21, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(60, 21, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(61, 22, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(62, 22, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(63, 22, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(64, 23, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(65, 23, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(66, 23, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(67, 24, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(68, 24, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(69, 24, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(70, 25, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(71, 25, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(72, 25, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(73, 26, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(74, 26, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(75, 26, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(76, 27, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(77, 27, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(78, 27, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(79, 28, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(80, 28, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(81, 28, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(82, 29, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(83, 29, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(84, 29, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(85, 30, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(86, 30, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(87, 30, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(88, 31, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(89, 31, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(90, 31, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(91, 32, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(92, 32, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(93, 32, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(94, 33, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(95, 33, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(96, 33, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(97, 34, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(98, 34, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(99, 34, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(100, 35, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(101, 35, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(102, 35, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(103, 36, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(104, 36, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(105, 36, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(106, 37, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(107, 37, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(108, 37, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(109, 38, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(110, 38, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(111, 38, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(112, 39, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(113, 39, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(114, 39, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(115, 40, 'EUR', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(116, 40, 'USD', NULL, 1, NULL, '0000-00-00 00:00:00'),
	(117, 40, 'GBP', NULL, 1, NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `check_rates` ENABLE KEYS */;

-- Dumping structure for table payvoo.contact
CREATE TABLE IF NOT EXISTS `contact` (
  `contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `gender` varchar(100) DEFAULT 'MALE',
  `dob` date DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`contact_id`),
  KEY `fk_contact_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_contact_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.contact: ~39 rows (approximately)
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` (`contact_id`, `applicant_id`, `first_name`, `middle_name`, `last_name`, `email`, `gender`, `dob`, `telephone`, `mobile`, `phone`, `created_on`, `updated_on`) VALUES
	(1, 1, 'gana', 'varun', 'undefined', 'test123@gmail.com', 'Male', '2019-06-27', '21545524', '919951686471', '587889888', '2019-11-20 13:10:19', '2019-11-27 16:08:33'),
	(2, 2, 'johhny', 'varun', 'stanic', 'testpayvoo12@gmail.com', 'Male', '2019-06-27', '21545524', '35989874612', '1234567', '2019-11-20 15:44:33', '0000-00-00 00:00:00'),
	(3, 3, 'johhny', 'varun', 'stanic', 'testpayvoo123@gmail.com', 'Male', '2019-06-27', '21545524', '359898746132', '1234567', '2019-11-20 16:17:50', '0000-00-00 00:00:00'),
	(4, 4, 'johhny', 'varun', 'stanic', 'testpayvoo1234@gmail.com', 'Male', '2019-06-27', '21545524', '3598987461432', '1234567', '2019-11-20 16:28:04', '0000-00-00 00:00:00'),
	(5, 5, 'johhny', 'varun', 'stanic', 'sekharsahu@123', 'Male', '2019-06-27', '21545524', '917205010199', '917205010100', '2019-11-20 16:34:29', '0000-00-00 00:00:00'),
	(6, 6, 'johhny', 'varun', 'stanic', 'sekharsahu143@123', 'Male', '2019-06-27', '21545524', '917205010100', '917205010100', '2019-11-20 18:43:47', '0000-00-00 00:00:00'),
	(7, 7, 'Sekhar', 'varun', 'sahu', 'sekhar@gmail.com', 'Male', '2019-06-27', '21545524', '917205010101', '917205010100', '2019-11-21 10:15:58', '0000-00-00 00:00:00'),
	(8, 8, 'Sekhar', 'varun', 'sahu', 'demo@gmail.com', 'Male', '2019-06-27', '21545524', '917205010102', '917205010100', '2019-11-21 10:32:48', '0000-00-00 00:00:00'),
	(9, 9, 'Anu', 'Anu', 'ANu', 'anu183055775@gmail.com', 'male', '2019-06-27', '21545524', '8595067879861', '9545652355', '2019-11-27 15:08:50', '0000-00-00 00:00:00'),
	(10, 10, 'johhny', 'varun', 'stanic', 'payvoo4@gmail.com', 'male', '2019-06-27', '21545524', '359896349045', '1234567', '2019-11-27 15:09:23', '0000-00-00 00:00:00'),
	(11, 11, 'Anu', 'Anu', 'ANu', 'anu@gmail.com', 'male', '2019-06-27', '21545524', '85950678798', '9545652355', '2019-11-27 15:30:49', '0000-00-00 00:00:00'),
	(12, 12, 'johhny', 'varun', 'stanic', 'gana123@gmail.com', 'male', '2019-06-27', '21545524', '3596349045', '1234567', '2019-11-27 15:32:38', '0000-00-00 00:00:00'),
	(13, 13, 'johhny', 'varun', 'stanic', 'gana1234@gmail.com', 'male', '2019-06-27', '21545524', '35963490545', '1234567', '2019-11-27 15:50:05', '0000-00-00 00:00:00'),
	(14, 14, 'gana', 'Anu', 'nagesh', 'anuu@gmail.com', 'male', '2019-06-27', '21545524', '875950678798', '9545652355', '2019-11-27 16:47:30', '2019-11-29 12:42:29'),
	(15, 15, 'gana', 'varun', 'nagesh', 'test123@gmail.com', 'male', '2019-06-27', '21545524', '359630545', '587889888', '2019-11-27 17:04:53', '2019-11-27 17:36:18'),
	(16, 16, 'johhny', 'varun', 'stanic', 'user123@gmail.com', 'male', '2019-06-27', '21545524', '355730545', '1234567', '2019-11-27 18:23:48', '0000-00-00 00:00:00'),
	(17, 17, 'johhny', 'varun', 'stanic', 'user1234@gmail.com', 'male', '2019-06-27', '21545524', '367730545', '1234567', '2019-11-27 18:29:45', '0000-00-00 00:00:00'),
	(19, 19, 'Sekhar', 'varun', 'sahu', 'demo9@gmail.com', 'Male', '2019-06-27', '21545524', '917205010110', '917205010100', '2019-11-27 20:32:56', '0000-00-00 00:00:00'),
	(20, 20, 'Sekhar', 'varun', 'sahu', 'demo10@gmail.com', 'Male', '2019-06-27', '21545524', '917205010111', '917205010100', '2019-11-27 20:47:23', '0000-00-00 00:00:00'),
	(21, 21, 'null', 'null', 'null', 'demo11@gmail.com', 'null', '2019-06-27', '21545524', '917205010112', '917205010100', '2019-11-28 12:36:06', '0000-00-00 00:00:00'),
	(22, 22, 'johhny', 'varun', 'stanic', 'gana12@gmail.com', 'male', '2019-06-27', '21545524', '8121438353', '1234567', '2019-11-28 15:52:25', '0000-00-00 00:00:00'),
	(23, 23, 'Nikhil ', 'null', 'Katari', 'nikhil.katari@gmail.com', 'MALE', '1995-05-10', 'null', '3533539874561230', '9874561230', '2019-11-28 16:18:55', '2019-11-28 20:01:26'),
	(24, 24, 'gana', 'varun', 'nagesh', 'gana.saga@gmail.com', 'male', '2019-06-27', '21545524', '8054587549', '1234567', '2019-11-29 17:28:58', '2019-11-29 17:30:32'),
	(25, 25, 'gana', 'varun', 'nagesh', 'gana321@gmail.com', 'male', '2019-06-27', '21545524', '8054589049', '1234567', '2019-11-29 17:31:48', '2019-11-29 17:33:52'),
	(26, 26, 'null', 'null', 'null', 'anilkumar.marri@ojas-it.com', 'null', '2019-06-27', '21545524', '917093946312', '917205010100', '2019-11-29 18:46:21', '0000-00-00 00:00:00'),
	(27, 27, 'Sekhar', 'Suman', 'Sahu', 'aniltest@gmail.com', 'MALE', '2019-06-27', '21545524', '98657456555', '917205010100', '2019-11-29 19:29:18', '0000-00-00 00:00:00'),
	(28, 28, 'Sekhar', 'Suman', 'Sahu', 'venutest@gmail.com', 'MALE', '2019-06-27', '21545524', '55996887455', '917205010100', '2019-11-29 19:31:14', '0000-00-00 00:00:00'),
	(29, 29, 'Anu', 'Anu', 'ANu', 'yougo10@gmail.com', 'male', '2019-06-27', '21545524', '690683510', '1234567', '2019-12-02 13:02:56', '0000-00-00 00:00:00'),
	(30, 30, 'Anu', 'Anu', 'ANu', 'yougo11@gmail.com', 'male', '2019-06-27', '21545524', '690633510', '1234567', '2019-12-02 13:11:25', '0000-00-00 00:00:00'),
	(31, 31, 'Anu', 'Anu', 'ANu', 'yougo75@gmail.com', 'male', '2019-06-27', '21545524', '9863745000', '1234567', '2019-12-02 18:13:57', '0000-00-00 00:00:00'),
	(32, 32, 'Anu', 'Anu', 'ANu', 'yougo756@gmail.com', 'male', '2019-06-27', '21545524', '98637455000', '1234567', '2019-12-02 18:14:45', '0000-00-00 00:00:00'),
	(33, 33, 'Anu', 'Anu', 'ANu', 'tarangini.dola@ojas-it.com', 'male', '2019-06-27', '21545524', '7925689523', '1234567', '2019-12-03 14:47:09', '0000-00-00 00:00:00'),
	(34, 34, 'Anu', 'Anu', 'ANu', 'tarangini.dolaa@ojas-it.com', 'male', '2019-06-27', '21545524', '79256895230', '1234567', '2019-12-03 14:59:08', '0000-00-00 00:00:00'),
	(35, 35, 'gana', 'varun', 'nagesh', 'test123456@gmail.com', 'male', '2019-12-02', '21545524', '80545120498', '1234567', '2019-12-03 15:05:58', '2019-12-03 15:07:30'),
	(36, 36, 'johhny', 'varun', 'stanic', 'gana100@gmail.com', 'male', '2019-06-27', '21545524', '7093946312', '1234567', '2019-12-03 15:08:02', '0000-00-00 00:00:00'),
	(37, 37, 'Anu', 'Anu', 'ANu', 'krishnakanth.r@ojas-it.com', 'male', '2019-06-27', '21545524', '792568955230', '1234567', '2019-12-03 15:27:59', '0000-00-00 00:00:00'),
	(38, 38, 'Anu', 'Anu', 'ANu', 'krishnakanth.rr@ojas-it.com', 'male', '2019-06-27', '21545524', '79256855230', '1234567', '2019-12-03 15:32:52', '0000-00-00 00:00:00'),
	(39, 39, 'Alif', 'null', 'Mohammad', 'alifm@gmail.com', 'FEMALE', '2019-02-02', 'null', '35935989634', '35935989634', '2019-12-03 18:54:09', '0000-00-00 00:00:00'),
	(40, 40, 'Alif', 'null', 'Mohammad', 'alifm@gmail.com', 'FEMALE', '2019-02-02', 'null', '35935935989634', '35935989634', '2019-12-03 18:54:14', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;

-- Dumping structure for table payvoo.country
CREATE TABLE IF NOT EXISTS `country` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(100) NOT NULL,
  `calling_code` int(11) DEFAULT NULL,
  `country_code` char(50) DEFAULT NULL,
  `currency` varchar(15) DEFAULT NULL,
  `currency_symbol` varchar(25) CHARACTER SET utf8 DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `country_flag_img_path` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.country: ~36 rows (approximately)
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` (`country_id`, `country_name`, `calling_code`, `country_code`, `currency`, `currency_symbol`, `status`, `created_on`, `updated_on`, `country_flag_img_path`) VALUES
	(1, 'BULGARIA', 359, 'BG', 'BGN', 'Лв', 1, NULL, '2019-11-27 16:08:33', '/images/country_flag_img_path/bulgaria_640.png'),
	(2, 'EURO', 0, 'EU', 'EUR', '£', 1, NULL, '2019-08-29 15:21:07', '/images/country_flag_img_path/euroFlag@3x.png'),
	(3, 'AUSTRIA ', 43, 'AT', 'EUR', '£', 0, NULL, '2019-08-29 15:24:11', ''),
	(4, 'BELGIUM ', 32, 'BG', 'EUR', '£', 0, NULL, '2019-08-29 15:24:06', ''),
	(5, 'INDIA', 91, 'IN', 'INR', '₹', 0, NULL, '2019-08-29 15:54:28', '/images/country_flag_img_path/india_640.png'),
	(6, 'CANARY ISLANDS ', 34, 'AT', 'EUR', '£', 0, NULL, '2019-08-29 15:24:00', ''),
	(7, 'CROATIA ', 385, 'HR', 'HRK', 'kn', 1, NULL, '2019-08-29 15:21:27', '/images/country_flag_img_path/croatia_640.png'),
	(8, 'CYPRUS ', 357, 'CY', 'EUR', '£', 1, NULL, '2019-08-29 15:22:08', '/images/country_flag_img_path/cyprus_640.png'),
	(9, 'CZECH REPUBLIC', 420, 'CZ', 'CZK', 'Kč', 1, NULL, '2019-08-29 15:22:25', '/images/country_flag_img_path/czech_republic_640.png'),
	(10, 'ESTONIA ', 372, 'EE', 'EUR', '£', 1, NULL, '2019-08-29 15:22:48', '/images/country_flag_img_path/estonia_640.png'),
	(11, 'AZORES ', 351, 'PT', 'EUR', '£', 0, NULL, '2019-08-29 15:23:56', ''),
	(12, 'DENMARK', 45, 'DK', 'DKK', 'Kr', 1, NULL, '2019-08-29 15:23:08', '/images/country_flag_img_path/denmark_640.png'),
	(13, 'FINLAND', 358, 'FI', 'EUR', '£', 1, NULL, '2019-08-29 15:23:24', '/images/country_flag_img_path/finland_640.png'),
	(14, 'FRANCE', 33, 'FR', 'EUR', '£', 1, NULL, '2019-08-29 15:23:42', '/images/country_flag_img_path/france_640.png'),
	(15, 'FRENCH GUIANA', 594, 'GF', 'EUR', '£', 0, NULL, '2019-11-29 12:38:30', ''),
	(16, 'GIBRALTER', 350, 'GI', 'EUR', '£', 0, NULL, '2019-08-29 15:23:49', ''),
	(17, 'GREECE', 30, 'GR', 'EUR', '£', 1, NULL, '2019-08-29 15:20:48', '/images/country_flag_img_path/greece_640.png'),
	(18, 'GUADELOUPE', 590, 'GP', 'EUR', '£', 0, NULL, '2019-08-29 15:35:00', ''),
	(19, 'SWEDEN', 46, 'SE', 'SEK', 'kr', 1, NULL, '2019-08-29 15:19:37', '/images/country_flag_img_path/sweden_640.png'),
	(20, 'UK', 44, 'UK', 'GBP', '£', 1, NULL, '2019-08-29 15:09:17', '/images/country_flag_img_path/united_kingdom_640.png'),
	(21, 'HUNGARY', 36, 'HU', 'HUF', 'Ft', 1, NULL, '2019-08-29 15:09:43', '/images/country_flag_img_path/hungary_640.png'),
	(22, 'IRELAND', 353, 'IE', 'EUR', '£', 1, NULL, '2019-08-29 15:10:28', '/images/country_flag_img_path/ireland_640.png'),
	(23, 'ITALY', 39, 'IT', 'EUR', '£', 1, NULL, '2019-08-29 15:10:46', '/images/country_flag_img_path/italy_640.png'),
	(24, 'LATVIA', 371, 'LV', 'EUR', '£', 1, NULL, '2019-08-29 15:11:02', '/images/country_flag_img_path/latvia_640.png'),
	(25, 'LITHUANIA', 370, 'LT', 'EUR', '£', 1, NULL, '2019-08-29 15:11:36', '/images/country_flag_img_path/lithuania_640.png'),
	(26, 'LUXEMBOURG', 352, 'LU', 'EUR', '£', 1, NULL, '2019-08-29 15:12:06', '/images/country_flag_img_path/luxembourg_640.png'),
	(27, 'MALTA', 356, 'MT', 'EUR', '£', 1, NULL, '2019-08-29 15:12:22', '/images/country_flag_img_path/malta_640.png'),
	(28, 'NETHERLANDS', 31, 'NL', 'EUR', '£', 1, NULL, '2019-08-29 15:12:58', '/images/country_flag_img_path/netherlands_640.png'),
	(29, 'POLAND', 48, 'PL', 'PLN', 'zł', 1, NULL, '2019-08-29 15:13:14', '/images/country_flag_img_path/poland_640.png'),
	(30, 'PORTUGAL', 351, 'PT', 'EUR', '£', 1, NULL, '2019-08-29 15:13:33', '/images/country_flag_img_path/portugal_640.png'),
	(31, 'ROMANIA', 40, 'RO', 'RON', 'leu', 1, NULL, '2019-08-29 15:13:50', '/images/country_flag_img_path/romania_640.png'),
	(32, 'SLOVAKIA', 421, 'SK', 'EUR', '£', 1, NULL, '2019-08-29 15:18:46', '/images/country_flag_img_path/slovakia_640.png'),
	(33, 'SLOVENIA', 386, 'SI', 'EUR', '£', 1, NULL, '2019-08-29 15:19:01', '/images/country_flag_img_path/slovenia_640.png'),
	(34, 'SPAIN', 34, 'ES', 'EUR', '£', 1, NULL, '2019-08-29 15:19:16', '/images/country_flag_img_path/spain_640.png'),
	(35, 'USA', 1, 'US', 'USD', '$', 0, NULL, '2019-08-29 15:44:11', '/images/country_flag_img_path/united_states_of_america_640.png'),
	(36, 'GERMANY', 49, 'DE', 'EUR', '£', 1, NULL, '2019-08-29 15:21:07', '/images/country_flag_img_path/germany_640.png');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;

-- Dumping structure for table payvoo.currency_exchange
CREATE TABLE IF NOT EXISTS `currency_exchange` (
  `auto_exchange_id` int(5) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(5) DEFAULT NULL,
  `account_no` int(5) DEFAULT NULL,
  `from_currency` varchar(5) DEFAULT NULL,
  `to_currency` varchar(5) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `target_amount` decimal(15,2) DEFAULT NULL,
  `exchange_status` tinyint(4) NOT NULL DEFAULT 1,
  `status` int(2) NOT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`auto_exchange_id`),
  KEY `fk_check_rates_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_check_rates_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.currency_exchange: ~0 rows (approximately)
/*!40000 ALTER TABLE `currency_exchange` DISABLE KEYS */;
/*!40000 ALTER TABLE `currency_exchange` ENABLE KEYS */;

-- Dumping structure for table payvoo.kyb_business
CREATE TABLE IF NOT EXISTS `kyb_business` (
  `kyb_business_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `kyb_status` varchar(15) DEFAULT NULL,
  `kyb_initiated_on` datetime DEFAULT NULL,
  `kyb_updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `kyb_completed_on` datetime DEFAULT NULL,
  `isRestricted` tinyint(4) DEFAULT 0,
  `type_of_business` enum('0','1','2') NOT NULL DEFAULT '0',
  `business_address` enum('0','1','2') NOT NULL DEFAULT '0',
  `personal_profile` enum('0','1','2') NOT NULL DEFAULT '0',
  `business_owner_details` enum('0','1','2') NOT NULL DEFAULT '0',
  PRIMARY KEY (`kyb_business_id`),
  KEY `kyb_business_table_business_id` (`business_id`),
  CONSTRAINT `kyb_business_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.kyb_business: ~121 rows (approximately)
/*!40000 ALTER TABLE `kyb_business` DISABLE KEYS */;
INSERT INTO `kyb_business` (`kyb_business_id`, `business_id`, `kyb_status`, `kyb_initiated_on`, `kyb_updated_on`, `kyb_completed_on`, `isRestricted`, `type_of_business`, `business_address`, `personal_profile`, `business_owner_details`) VALUES
	(1, 1, NULL, NULL, '2019-11-20 16:26:03', NULL, 1, '2', '0', '0', '0'),
	(2, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(3, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(4, 1, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(5, 1, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(6, 1, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(7, 1, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(8, 1, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(9, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(10, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(11, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(12, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(13, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(14, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(15, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(16, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(17, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(18, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(19, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(20, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(21, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(22, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(23, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(24, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(25, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(26, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(27, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(28, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(29, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(30, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(31, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(32, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(33, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(34, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(35, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(36, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(37, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(38, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(39, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(40, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(41, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(42, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(43, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(44, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(45, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(46, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(47, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(48, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(49, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(50, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(51, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(52, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(53, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(54, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(55, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(56, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(57, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(58, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(59, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(60, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(61, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(62, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(63, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(64, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(65, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(66, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(67, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(68, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(69, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(70, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(71, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(72, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(73, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(74, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(75, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(76, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(77, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(78, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(79, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(80, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(81, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(82, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(83, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(84, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(85, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(86, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(87, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(88, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(89, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(90, 3, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(91, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(92, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(93, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(94, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(95, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(96, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(97, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(98, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(99, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(100, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(101, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(102, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(103, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(104, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(105, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(106, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(107, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(108, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(109, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(110, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(111, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(112, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(113, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(114, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(115, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(116, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(117, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(118, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(119, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(120, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0'),
	(121, 4, NULL, NULL, '0000-00-00 00:00:00', NULL, 0, '0', '0', '0', '0');
/*!40000 ALTER TABLE `kyb_business` ENABLE KEYS */;

-- Dumping structure for table payvoo.kyb_business_docs
CREATE TABLE IF NOT EXISTS `kyb_business_docs` (
  `kyb_business_docs_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `kyb_doc_type` varchar(250) DEFAULT NULL,
  `kyb_doc_file_type` varchar(250) DEFAULT NULL,
  `kyb_doc_base64` longtext DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`kyb_business_docs_id`),
  KEY `kyb_business_docs_table_business_id` (`business_id`),
  CONSTRAINT `kyb_business_docs_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.kyb_business_docs: ~0 rows (approximately)
/*!40000 ALTER TABLE `kyb_business_docs` DISABLE KEYS */;
/*!40000 ALTER TABLE `kyb_business_docs` ENABLE KEYS */;

-- Dumping structure for table payvoo.kyb_business_owner
CREATE TABLE IF NOT EXISTS `kyb_business_owner` (
  `kyb_bo_id` int(11) NOT NULL AUTO_INCREMENT,
  `business_id` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `dob` varchar(50) DEFAULT NULL,
  `percentage` varchar(50) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`kyb_bo_id`),
  KEY `kyb_business_owner_table_business_id` (`business_id`),
  CONSTRAINT `kyb_business_owner_table_business_id` FOREIGN KEY (`business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.kyb_business_owner: ~15 rows (approximately)
/*!40000 ALTER TABLE `kyb_business_owner` DISABLE KEYS */;
INSERT INTO `kyb_business_owner` (`kyb_bo_id`, `business_id`, `type`, `email`, `name`, `status`, `dob`, `percentage`, `created_on`, `updated_on`) VALUES
	(1, 1, 'director', '', 'BUNCE, Andrew Kenneth', 0, '1974-11', ' ', NULL, '0000-00-00 00:00:00'),
	(2, 1, 'director', '', 'SPOWART, Gregor', 0, '1977-08', ' ', NULL, '0000-00-00 00:00:00'),
	(3, 1, 'director', '', 'DUPORT DIRECTOR LIMITED', 0, ' ', ' ', NULL, '0000-00-00 00:00:00'),
	(4, 1, 'shareholder', 'srinivadsteddfsfsast@gmail.com', 'verr,dsga', 1, '12-12-2011', '30', NULL, '0000-00-00 00:00:00'),
	(5, 1, 'director', 'srinivadstefsast@gmail.com', 'vneu,dsga', 1, '12-12-2011', '30', NULL, '0000-00-00 00:00:00'),
	(6, 1, 'businessowner', 'businessowne@gmail.com', 'businessowne,dsga', 1, '12-12-2011', '30', NULL, '0000-00-00 00:00:00'),
	(7, 2, 'director', '', 'BUNCE, Andrew Kenneth', 0, '1974-11', ' ', NULL, '0000-00-00 00:00:00'),
	(8, 2, 'director', '', 'SPOWART, Gregor', 0, '1977-08', ' ', NULL, '0000-00-00 00:00:00'),
	(9, 2, 'director', '', 'DUPORT DIRECTOR LIMITED', 0, ' ', ' ', NULL, '0000-00-00 00:00:00'),
	(10, 3, 'director', '', 'BUNCE, Andrew Kenneth', 0, '1974-11', ' ', NULL, '0000-00-00 00:00:00'),
	(11, 3, 'director', '', 'SPOWART, Gregor', 0, '1977-08', ' ', NULL, '0000-00-00 00:00:00'),
	(12, 3, 'director', '', 'DUPORT DIRECTOR LIMITED', 0, ' ', ' ', NULL, '0000-00-00 00:00:00'),
	(13, 3, 'shareholder', 'shekar@gmail.com', 'shekar,dsga', 1, '12-12-2011', '40', NULL, '0000-00-00 00:00:00'),
	(14, 3, 'shareholder', 'shekart@gmail.com', 'shetkar,dsga', 1, '12-12-2011', '40', NULL, '0000-00-00 00:00:00'),
	(15, 3, 'shareholder', 'shekart5@gmail.com', 'shetkar,dsga', 1, '12-12-2011', '20', NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `kyb_business_owner` ENABLE KEYS */;

-- Dumping structure for table payvoo.kyb_company_details
CREATE TABLE IF NOT EXISTS `kyb_company_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kyb_business_id` int(11) DEFAULT NULL,
  `company_details` longtext DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `update_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_kyb_company_details_table_kyb_business_id` (`kyb_business_id`),
  CONSTRAINT `fk_kyb_company_details_table_kyb_business_id` FOREIGN KEY (`kyb_business_id`) REFERENCES `business_details` (`business_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table payvoo.kyb_company_details: ~4 rows (approximately)
/*!40000 ALTER TABLE `kyb_company_details` DISABLE KEYS */;
INSERT INTO `kyb_company_details` (`id`, `kyb_business_id`, `company_details`, `created_on`, `update_on`) VALUES
	(1, 1, '{"id":"15E13D8547670D5D4BFDADBB7C090BC8","country":"UK","registrationNumber":"04994880","name":"MASS MEDIA DESIGN LTD","status":"LIVE","address":["450 Brook Drive","Green Park","Reading","RG2 6UU","England"],"formattedAddress":{"street":"450 Brook Drive","district":"Green Park","city":"Reading","zip":"RG2 6UU","country":"England","cc":"UK"},"managingDirectors":["Gregor SPOWART"],"secretaries":[],"dateOfIncorporation":"2003-12-15","legalForm":"ltd","sicNaceCodes":["62090 - Other information technology service activities","62090"],"extraData":{"otherName":"MASS MEDIA DESIGN LTD","currentAppointments":"3","email":"enquiries@massmediadesign.co.uk","facebook":"https://www.facebook.com/massmediadesign","providedStatus":"active","resignedAppointments":"2","shareCapital":"4","shareCurrency":"GBP","twitter":"twitter.com/massmediadesign","vat":"GB837834003"},"people":{"director":[{"dateOfBirth":"1974-11","endDate":"2018-08-30","isCorporate":"FALSE","name":"BUNCE, Andrew Kenneth","startDate":"2004-06-16","status":"RESIGNED","address":["44 Common Platt","Purton","Swindon","Wiltshire","SN5 5LB"]},{"dateOfBirth":"1977-08","isCorporate":"FALSE","name":"SPOWART, Gregor","startDate":"2008-06-05","status":"CURRENT","address":["450","Brook Drive","Green Park","Reading","RG2 6UU","England"]},{"endDate":"2003-12-15","isCorporate":"TRUE","name":"DUPORT DIRECTOR LIMITED","startDate":"2003-12-15","status":"RESIGNED","address":["2 Southfield Road","Westbury-On-Trym","Bristol","BS9 3BH"]}],"secretary":[{"endDate":"2018-08-30","isCorporate":"FALSE","name":"BUNCE, Ann","startDate":"2004-06-16","status":"RESIGNED","address":["44 Common Platt","Near Purton","Swindon","Wiltshire","SN5 5LB"]},{"endDate":"2003-12-15","isCorporate":"TRUE","name":"DUPORT SECRETARY LIMITED","startDate":"2003-12-15","status":"RESIGNED","address":["The Bristol Office","2 Southfield Road","Westbury On Trym","Bristol","BS9 3BH"]}],"ultimateBeneficialOwner":[{"dateOfBirth":"1977-08","name":"Mr Gregor John Spowart","startDate":"2016-12-01","address":["250 South Oak Way","Green Park","Reading","Berkshire","RG2 6UG"]},{"dateOfBirth":"1974-11","endDate":"2018-08-30","name":"Mr Andrew Kenneth Bunce","startDate":"2016-12-01","address":["250 South Oak Way","Green Park","Reading","Berkshire","RG2 6UG"]}]},"latestAccounts":{"category":"micro-entity","lastMadeUpDate":"2018-05-31","nextDueDate":"2020-02-29","overdue":"false","referenceDate":"31-05"},"latestReturn":{"lastMadeUpDate":"2017-12-15","nextDueDate":"2018-12-29","overdue":"NO"},"lastAnnouncementDate":"2017-12-15"}', NULL, '0000-00-00 00:00:00'),
	(2, 2, '{"id":"15E13D8547670D5D4BFDADBB7C090BC8","country":"UK","registrationNumber":"04994880","name":"MASS MEDIA DESIGN LTD","status":"LIVE","address":["450 Brook Drive","Green Park","Reading","RG2 6UU","England"],"formattedAddress":{"street":"450 Brook Drive","district":"Green Park","city":"Reading","zip":"RG2 6UU","country":"England","cc":"UK"},"managingDirectors":["Gregor SPOWART"],"secretaries":[],"dateOfIncorporation":"2003-12-15","legalForm":"ltd","sicNaceCodes":["62090 - Other information technology service activities","62090"],"extraData":{"otherName":"MASS MEDIA DESIGN LTD","currentAppointments":"3","email":"enquiries@massmediadesign.co.uk","facebook":"https://www.facebook.com/massmediadesign","providedStatus":"active","resignedAppointments":"2","shareCapital":"4","shareCurrency":"GBP","twitter":"twitter.com/massmediadesign","vat":"GB837834003"},"people":{"director":[{"dateOfBirth":"1974-11","endDate":"2018-08-30","isCorporate":"FALSE","name":"BUNCE, Andrew Kenneth","startDate":"2004-06-16","status":"RESIGNED","address":["44 Common Platt","Purton","Swindon","Wiltshire","SN5 5LB"]},{"dateOfBirth":"1977-08","isCorporate":"FALSE","name":"SPOWART, Gregor","startDate":"2008-06-05","status":"CURRENT","address":["450","Brook Drive","Green Park","Reading","RG2 6UU","England"]},{"endDate":"2003-12-15","isCorporate":"TRUE","name":"DUPORT DIRECTOR LIMITED","startDate":"2003-12-15","status":"RESIGNED","address":["2 Southfield Road","Westbury-On-Trym","Bristol","BS9 3BH"]}],"secretary":[{"endDate":"2018-08-30","isCorporate":"FALSE","name":"BUNCE, Ann","startDate":"2004-06-16","status":"RESIGNED","address":["44 Common Platt","Near Purton","Swindon","Wiltshire","SN5 5LB"]},{"endDate":"2003-12-15","isCorporate":"TRUE","name":"DUPORT SECRETARY LIMITED","startDate":"2003-12-15","status":"RESIGNED","address":["The Bristol Office","2 Southfield Road","Westbury On Trym","Bristol","BS9 3BH"]}],"ultimateBeneficialOwner":[{"dateOfBirth":"1977-08","name":"Mr Gregor John Spowart","startDate":"2016-12-01","address":["250 South Oak Way","Green Park","Reading","Berkshire","RG2 6UG"]},{"dateOfBirth":"1974-11","endDate":"2018-08-30","name":"Mr Andrew Kenneth Bunce","startDate":"2016-12-01","address":["250 South Oak Way","Green Park","Reading","Berkshire","RG2 6UG"]}]},"latestAccounts":{"category":"micro-entity","lastMadeUpDate":"2018-05-31","nextDueDate":"2020-02-29","overdue":"false","referenceDate":"31-05"},"latestReturn":{"lastMadeUpDate":"2017-12-15","nextDueDate":"2018-12-29","overdue":"NO"},"lastAnnouncementDate":"2017-12-15"}', NULL, '0000-00-00 00:00:00'),
	(3, 3, '{"id":"15E13D8547670D5D4BFDADBB7C090BC8","country":"UK","registrationNumber":"04994880","name":"MASS MEDIA DESIGN LTD","status":"LIVE","address":["450 Brook Drive","Green Park","Reading","RG2 6UU","England"],"formattedAddress":{"street":"450 Brook Drive","district":"Green Park","city":"Reading","zip":"RG2 6UU","country":"England","cc":"UK"},"managingDirectors":["Gregor SPOWART"],"secretaries":[],"dateOfIncorporation":"2003-12-15","legalForm":"ltd","sicNaceCodes":["62090 - Other information technology service activities","62090"],"extraData":{"otherName":"MASS MEDIA DESIGN LTD","currentAppointments":"3","email":"enquiries@massmediadesign.co.uk","facebook":"https://www.facebook.com/massmediadesign","providedStatus":"active","resignedAppointments":"2","shareCapital":"4","shareCurrency":"GBP","twitter":"twitter.com/massmediadesign","vat":"GB837834003"},"people":{"director":[{"dateOfBirth":"1974-11","endDate":"2018-08-30","isCorporate":"FALSE","name":"BUNCE, Andrew Kenneth","startDate":"2004-06-16","status":"RESIGNED","address":["44 Common Platt","Purton","Swindon","Wiltshire","SN5 5LB"]},{"dateOfBirth":"1977-08","isCorporate":"FALSE","name":"SPOWART, Gregor","startDate":"2008-06-05","status":"CURRENT","address":["450","Brook Drive","Green Park","Reading","RG2 6UU","England"]},{"endDate":"2003-12-15","isCorporate":"TRUE","name":"DUPORT DIRECTOR LIMITED","startDate":"2003-12-15","status":"RESIGNED","address":["2 Southfield Road","Westbury-On-Trym","Bristol","BS9 3BH"]}],"secretary":[{"endDate":"2018-08-30","isCorporate":"FALSE","name":"BUNCE, Ann","startDate":"2004-06-16","status":"RESIGNED","address":["44 Common Platt","Near Purton","Swindon","Wiltshire","SN5 5LB"]},{"endDate":"2003-12-15","isCorporate":"TRUE","name":"DUPORT SECRETARY LIMITED","startDate":"2003-12-15","status":"RESIGNED","address":["The Bristol Office","2 Southfield Road","Westbury On Trym","Bristol","BS9 3BH"]}],"ultimateBeneficialOwner":[{"dateOfBirth":"1977-08","name":"Mr Gregor John Spowart","startDate":"2016-12-01","address":["250 South Oak Way","Green Park","Reading","Berkshire","RG2 6UG"]},{"dateOfBirth":"1974-11","endDate":"2018-08-30","name":"Mr Andrew Kenneth Bunce","startDate":"2016-12-01","address":["250 South Oak Way","Green Park","Reading","Berkshire","RG2 6UG"]}]},"latestAccounts":{"category":"micro-entity","lastMadeUpDate":"2018-05-31","nextDueDate":"2020-02-29","overdue":"false","referenceDate":"31-05"},"latestReturn":{"lastMadeUpDate":"2017-12-15","nextDueDate":"2018-12-29","overdue":"NO"},"lastAnnouncementDate":"2017-12-15"}', NULL, '0000-00-00 00:00:00'),
	(4, 4, 'null', NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `kyb_company_details` ENABLE KEYS */;

-- Dumping structure for table payvoo.kyc
CREATE TABLE IF NOT EXISTS `kyc` (
  `kyc_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `kyc_doc_id` int(11) DEFAULT NULL,
  `kyc_transaction_id` varchar(50) DEFAULT NULL,
  `kyc_vendor_id` varchar(50) DEFAULT NULL,
  `kyc_status` varchar(250) DEFAULT 'PENDING',
  `kyc_doc_front` blob DEFAULT NULL,
  `kyc_doc_back` blob DEFAULT NULL,
  `photograph` blob DEFAULT NULL,
  `kyc_initiated_on` datetime DEFAULT NULL,
  `kyc_updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  `completed_on` datetime DEFAULT NULL,
  `pep_status` varchar(50) DEFAULT NULL,
  `sanctions_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`kyc_id`),
  KEY `fk_kyc_table_applicant_id` (`applicant_id`),
  KEY `fk_kyc_table_kyc_doc_id` (`kyc_doc_id`),
  CONSTRAINT `fk_kyc_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_kyc_table_kyc_doc_id` FOREIGN KEY (`kyc_doc_id`) REFERENCES `kyc_document_lov` (`kyc_doc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.kyc: ~39 rows (approximately)
/*!40000 ALTER TABLE `kyc` DISABLE KEYS */;
INSERT INTO `kyc` (`kyc_id`, `applicant_id`, `kyc_doc_id`, `kyc_transaction_id`, `kyc_vendor_id`, `kyc_status`, `kyc_doc_front`, `kyc_doc_back`, `photograph`, `kyc_initiated_on`, `kyc_updated_on`, `completed_on`, `pep_status`, `sanctions_status`) VALUES
	(1, 1, NULL, '84beaaac-ed41-4b08-8f81-a7083bb993e8', 'HYD-URYYC', 'PENDING', NULL, NULL, NULL, NULL, '2019-11-20 14:30:16', NULL, NULL, NULL),
	(2, 2, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(3, 3, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(4, 4, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(5, 5, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(6, 6, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(7, 7, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(8, 8, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(9, 9, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(10, 10, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(11, 11, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(12, 12, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(13, 13, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(14, 14, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(15, 15, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(16, 16, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(17, 17, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(19, 19, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(20, 20, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(21, 21, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(22, 22, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(23, 23, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(24, 24, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(25, 25, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(26, 26, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(27, 27, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(28, 28, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(29, 29, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(30, 30, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(31, 31, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(32, 32, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(33, 33, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(34, 34, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(35, 35, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(36, 36, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(37, 37, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(38, 38, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(39, 39, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL),
	(40, 40, NULL, NULL, NULL, 'PENDING', NULL, NULL, NULL, NULL, '0000-00-00 00:00:00', NULL, NULL, NULL);
/*!40000 ALTER TABLE `kyc` ENABLE KEYS */;

-- Dumping structure for table payvoo.kyc_document_lov
CREATE TABLE IF NOT EXISTS `kyc_document_lov` (
  `kyc_doc_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) DEFAULT NULL,
  `document_name` varchar(25) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`kyc_doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.kyc_document_lov: ~0 rows (approximately)
/*!40000 ALTER TABLE `kyc_document_lov` DISABLE KEYS */;
/*!40000 ALTER TABLE `kyc_document_lov` ENABLE KEYS */;

-- Dumping structure for table payvoo.logs
CREATE TABLE IF NOT EXISTS `logs` (
  `logs_id` int(25) NOT NULL AUTO_INCREMENT,
  `email` varchar(25) NOT NULL,
  `status_code` int(25) NOT NULL,
  `request` longtext NOT NULL,
  `response` longtext NOT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`logs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.logs: ~0 rows (approximately)
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;

-- Dumping structure for table payvoo.OTPValidator
CREATE TABLE IF NOT EXISTS `OTPValidator` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `emailOrMobile` varchar(25) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `isVerified` tinyint(4) DEFAULT 0,
  `isExpired` tinyint(4) DEFAULT 0,
  `created_on` datetime NOT NULL,
  `updated_on` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table payvoo.OTPValidator: ~0 rows (approximately)
/*!40000 ALTER TABLE `OTPValidator` DISABLE KEYS */;
/*!40000 ALTER TABLE `OTPValidator` ENABLE KEYS */;

-- Dumping structure for table payvoo.otp_validator
CREATE TABLE IF NOT EXISTS `otp_validator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(80) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `otp_status` enum('0','1','2') NOT NULL DEFAULT '0',
  `expired` int(11) NOT NULL DEFAULT 300000,
  `mobile_no` varchar(50) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.otp_validator: ~0 rows (approximately)
/*!40000 ALTER TABLE `otp_validator` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp_validator` ENABLE KEYS */;

-- Dumping structure for table payvoo.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `paymentsid` int(11) NOT NULL,
  `paymentType` enum('DB','CR') NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  `payment_Brand` varchar(15) DEFAULT NULL,
  `payment_Mode` varchar(15) DEFAULT NULL,
  `first_Name` varchar(50) DEFAULT NULL,
  `last_Name` varchar(50) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT 0.00,
  `currency` varchar(11) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `result` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `card` longtext DEFAULT NULL,
  `customer` longtext DEFAULT NULL,
  `transaction_details` longtext DEFAULT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `merchant_Transaction_Id` varchar(100) DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `trans_Status` varchar(100) DEFAULT NULL,
  `tmpl_amount` decimal(15,2) DEFAULT NULL,
  `tmpl_currency` varchar(100) DEFAULT NULL,
  `eci` varchar(100) DEFAULT NULL,
  `checksum` varchar(100) DEFAULT NULL,
  `order_Description` varchar(100) DEFAULT NULL,
  `company_Name` varchar(100) DEFAULT NULL,
  `merchant_contact` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payments_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_payments_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.payments: ~0 rows (approximately)
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;

-- Dumping structure for table payvoo.payment_cards
CREATE TABLE IF NOT EXISTS `payment_cards` (
  `payment_cards_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL DEFAULT 0,
  `card_type` varchar(50) NOT NULL DEFAULT '',
  `name_on_card` varchar(64) NOT NULL DEFAULT '',
  `card_number` varchar(32) NOT NULL DEFAULT '',
  `card_cvv` varchar(16) NOT NULL DEFAULT '',
  `card_month` varchar(5) NOT NULL DEFAULT '0',
  `card_year` smallint(6) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `default_card` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`payment_cards_id`),
  KEY `fk__payment_cards_applicant_id` (`applicant_id`),
  CONSTRAINT `fk__payment_cards_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.payment_cards: ~5 rows (approximately)
/*!40000 ALTER TABLE `payment_cards` DISABLE KEYS */;
INSERT INTO `payment_cards` (`payment_cards_id`, `applicant_id`, `card_type`, `name_on_card`, `card_number`, `card_cvv`, `card_month`, `card_year`, `status`, `default_card`) VALUES
	(1, 4, 'VISA', 'RTRYTR', '4444333322224656', '', '02', 2030, 1, 1),
	(2, 4, 'VISA', 'RTRYTR', '5555333322224656', '', '12', 2024, 1, 1),
	(3, 4, 'VISA', 'RTRYTR', '5555333322220000', '', '03', 2024, 1, 1),
	(4, 4, 'VISA', 'RTRYTR', '5555533322220000', '', '02', 2025, 1, 1),
	(5, 4, 'VISA', 'RTRYTR', '5555533322220080', '', '12', 2025, 1, 1);
/*!40000 ALTER TABLE `payment_cards` ENABLE KEYS */;

-- Dumping structure for table payvoo.peer_contact
CREATE TABLE IF NOT EXISTS `peer_contact` (
  `peer_contact_id` int(50) NOT NULL AUTO_INCREMENT,
  `applicant_id_from` int(50) NOT NULL DEFAULT 0,
  `applicant_id_to` int(50) NOT NULL DEFAULT 0,
  `contact_number` varchar(50) NOT NULL DEFAULT '0',
  `mobile_number` varchar(50) NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL DEFAULT '0',
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`peer_contact_id`),
  KEY `fk_perr_contact_table_applicant_id` (`applicant_id_from`),
  CONSTRAINT `fk_perr_contact_table_applicant_id` FOREIGN KEY (`applicant_id_from`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.peer_contact: ~15 rows (approximately)
/*!40000 ALTER TABLE `peer_contact` DISABLE KEYS */;
INSERT INTO `peer_contact` (`peer_contact_id`, `applicant_id_from`, `applicant_id_to`, `contact_number`, `mobile_number`, `name`, `created_on`, `updated_on`) VALUES
	(1, 10, 13, '1234567', '35963490545', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(2, 10, 16, '1234567', '355730545', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(3, 10, 2, '1234567', '35989874612', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(4, 10, 4, '1234567', '3598987461432', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(5, 10, 10, '1234567', '359896349045', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(6, 10, 3, '1234567', '359898746132', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(7, 10, 17, '1234567', '367730545', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(8, 10, 11, '9545652355', '85950678798', 'AnuANu', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(9, 10, 1, '587889888', '919951686471', 'ganaundefined', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(10, 10, 12, '1234567', '3596349045', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(11, 10, 22, '1234567', '8121438353', 'johhnystanic', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(12, 10, 29, '1234567', '690683510', 'AnuANu', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(13, 10, 24, '1234567', '8054587549', 'gananagesh', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(14, 10, 30, '1234567', '690633510', 'AnuANu', '2019-12-02 17:38:19', '0000-00-00 00:00:00'),
	(15, 10, 25, '1234567', '8054589049', 'gananagesh', '2019-12-02 17:38:19', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `peer_contact` ENABLE KEYS */;

-- Dumping structure for table payvoo.price_alert
CREATE TABLE IF NOT EXISTS `price_alert` (
  `price_alert_id` int(5) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(5) DEFAULT NULL,
  `from_currency` varchar(5) DEFAULT NULL,
  `to_currency` varchar(5) DEFAULT NULL,
  `target_amount` decimal(15,2) DEFAULT NULL,
  `alert_status` tinyint(4) NOT NULL DEFAULT 1,
  `status` int(2) NOT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`price_alert_id`),
  KEY `fk_price_alert_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_price_alert_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.price_alert: ~0 rows (approximately)
/*!40000 ALTER TABLE `price_alert` DISABLE KEYS */;
/*!40000 ALTER TABLE `price_alert` ENABLE KEYS */;

-- Dumping structure for table payvoo.privacy
CREATE TABLE IF NOT EXISTS `privacy` (
  `privacy_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `doEmailNotify` tinyint(4) DEFAULT 1,
  `doPushNotify` tinyint(4) DEFAULT 1,
  `isVisible` tinyint(4) DEFAULT 1,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`privacy_id`),
  KEY `applicant_id` (`applicant_id`),
  CONSTRAINT `applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table payvoo.privacy: ~4 rows (approximately)
/*!40000 ALTER TABLE `privacy` DISABLE KEYS */;
INSERT INTO `privacy` (`privacy_id`, `applicant_id`, `doEmailNotify`, `doPushNotify`, `isVisible`, `created_on`, `updated_on`) VALUES
	(1, 14, 1, 1, 1, '2019-11-27 10:28:06', '2019-12-03 14:46:23'),
	(2, 15, 1, 1, 1, '2019-11-28 16:08:55', NULL),
	(3, 13, 1, 1, 1, '2019-11-28 16:09:05', NULL),
	(4, 17, 1, 1, 1, '2019-11-28 16:09:14', NULL);
/*!40000 ALTER TABLE `privacy` ENABLE KEYS */;

-- Dumping structure for table payvoo.role
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp(),
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.role: ~3 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`role_id`, `role_name`, `created_on`, `updated_on`) VALUES
	(1, 'ADMIN', NULL, '0000-00-00 00:00:00'),
	(2, 'ACCOUNTANT', NULL, '0000-00-00 00:00:00'),
	(3, 'VIEWER', NULL, '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for table payvoo.sandbox
CREATE TABLE IF NOT EXISTS `sandbox` (
  `sandbox_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `memberId` varchar(100) DEFAULT NULL,
  `api_key` varchar(100) DEFAULT NULL,
  `url` varchar(150) DEFAULT NULL,
  `api_doc_url` varchar(150) DEFAULT NULL,
  `redirect_url` varchar(150) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`sandbox_id`),
  KEY `fk_payvoo_sandbox_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_payvoo_sandbox_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.sandbox: ~15 rows (approximately)
/*!40000 ALTER TABLE `sandbox` DISABLE KEYS */;
INSERT INTO `sandbox` (`sandbox_id`, `applicant_id`, `memberId`, `api_key`, `url`, `api_doc_url`, `redirect_url`, `created_on`, `updated_on`) VALUES
	(1, 3, 'ab2d8146080d', 'N52DJD3-54TMFF0-QD2Z8P8-XB5YSJY', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-20 16:17:50', '0000-00-00 00:00:00'),
	(2, 4, '46f7ad7b6eed', 'GQGC3KE-HWDMM7G-N75137M-CE5BSA7', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-20 16:28:04', '0000-00-00 00:00:00'),
	(3, 5, '86a1a5dca6b8', 'XGMW82C-NWJ4340-G37Q2M1-XR3EPJH', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-20 16:34:29', '0000-00-00 00:00:00'),
	(4, 6, '20a879bf8bc4', 'GJK7QRW-9EK4B3X-P5CA3WH-BQR8BNM', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-20 18:45:10', '0000-00-00 00:00:00'),
	(5, 7, '34602bd8fdcd', 'VBKMCQR-NPH4B17-JSNYBPV-89WS6F2', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-21 10:15:58', '0000-00-00 00:00:00'),
	(6, 8, '8238eebc2af3', 'PDQV22M-EBFM044-QG0DW0B-FPJYKZS', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-21 10:32:48', '0000-00-00 00:00:00'),
	(7, 9, '37862b4d7f6b', '9B3B725-M9GMQRE-QF24KXD-1QQN51D', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-27 15:08:58', '0000-00-00 00:00:00'),
	(8, 21, 'ee0d375681d5', 'ZS76MDM-W7YM099-NZ3AAAA-XVBMYQZ', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-28 12:36:07', '0000-00-00 00:00:00'),
	(9, 22, 'ce71e0460826', 'K4VYNBA-9Z84DS1-NQR12GC-3HTXRAP', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-28 15:52:33', '0000-00-00 00:00:00'),
	(10, 25, 'f30fb316a0b1', 'ZNREFXE-NDDM8FR-JWC889S-MDMB2WC', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-11-29 17:31:57', '0000-00-00 00:00:00'),
	(11, 29, '14f4f91e3f50', 'Z52BJ67-K3C485K-NM040NT-KC5CCV2', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-12-02 13:03:08', '0000-00-00 00:00:00'),
	(12, 31, 'df72973d9604', 'HK8GSKE-MVBMDG8-QJ0462Y-V5T5ZDK', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-12-02 18:14:09', '0000-00-00 00:00:00'),
	(13, 35, 'ea67b295c385', 'DFK3KMN-DFMM2EW-PREF45D-BBGZH4W', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-12-03 15:06:10', '0000-00-00 00:00:00'),
	(14, 36, '3028f5dbd8ba', 'QK78G95-R22M7FZ-JHWPMWN-JY0A9C6', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-12-03 15:08:14', '0000-00-00 00:00:00'),
	(15, 38, '5da0d96f1b43', '81XP4TT-RPA4PF8-J3XDDTD-3RRV6A0', 'http://192.168.16.4:5001', 'http://115.112.122.100:5000/merchant-api-docs/', 'http://115.112.122.100:4200/#/business-sign-up', '2019-12-03 15:33:04', '0000-00-00 00:00:00');
/*!40000 ALTER TABLE `sandbox` ENABLE KEYS */;

-- Dumping structure for table payvoo.sandbox_token_validator
CREATE TABLE IF NOT EXISTS `sandbox_token_validator` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL,
  `member_token` varchar(2555) DEFAULT NULL,
  `member_id` varchar(225) DEFAULT NULL,
  `expiry` int(10) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.sandbox_token_validator: ~0 rows (approximately)
/*!40000 ALTER TABLE `sandbox_token_validator` DISABLE KEYS */;
/*!40000 ALTER TABLE `sandbox_token_validator` ENABLE KEYS */;

-- Dumping structure for table payvoo.scheduled_transfer
CREATE TABLE IF NOT EXISTS `scheduled_transfer` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `refference_number` varchar(15) DEFAULT NULL,
  `applicant_id` int(11) NOT NULL,
  `transfer_time` datetime NOT NULL,
  `from_currency` varchar(5) DEFAULT NULL,
  `list_of_transaction` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` tinyint(1) unsigned zerofill DEFAULT 0,
  `total_amount` decimal(15,2) DEFAULT NULL,
  `do_notify` tinyint(4) DEFAULT 0,
  `created_on` datetime DEFAULT '0000-00-00 00:00:00',
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `fk_sceduled_transfer_applicant` (`applicant_id`),
  CONSTRAINT `fk_sceduled_transfer_applicant` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.scheduled_transfer: ~0 rows (approximately)
/*!40000 ALTER TABLE `scheduled_transfer` DISABLE KEYS */;
/*!40000 ALTER TABLE `scheduled_transfer` ENABLE KEYS */;

-- Dumping structure for table payvoo.server_logs
CREATE TABLE IF NOT EXISTS `server_logs` (
  `logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `module` varchar(250) NOT NULL,
  `status` tinyint(4) DEFAULT 0,
  `log_level` int(11) DEFAULT NULL,
  PRIMARY KEY (`logs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.server_logs: ~56 rows (approximately)
/*!40000 ALTER TABLE `server_logs` DISABLE KEYS */;
INSERT INTO `server_logs` (`logs_id`, `module`, `status`, `log_level`) VALUES
	(1, 'controller.account', 1, 3),
	(2, 'controller.address', 1, 3),
	(3, 'controller.businessDetails', 1, 3),
	(4, 'controller.businessOwner', 1, 3),
	(5, 'controller.businessRegistration', 1, 3),
	(6, 'controller.card', 1, 3),
	(7, 'controller.checkRate', 1, 3),
	(8, 'controller.commonCode', 1, 3),
	(9, 'controller.contact', 1, 3),
	(10, 'controller.country', 1, 3),
	(11, 'controller.currencyExchange', 1, 3),
	(12, 'controller.currencyRate', 1, 3),
	(13, 'controller.dashboardStatus', 1, 3),
	(14, 'controller.kycIdentity', 1, 3),
	(15, 'controller.loggerConfigure', 1, 3),
	(16, 'controller.kycStatus', 1, 3),
	(17, 'controller.login1', 1, 3),
	(18, 'controller.moneyTransfer', 1, 3),
	(19, 'controller.otp1', 1, 3),
	(20, 'controller.password1', 1, 3),
	(21, 'controller.payments', 1, 3),
	(22, 'controller.signUp1', 1, 3),
	(23, 'controller.transaction', 1, 3),
	(24, 'controller.upload', 1, 3),
	(25, 'model.account', 1, 3),
	(26, 'model.addressModel', 1, 3),
	(27, 'model.businessDetails', 1, 3),
	(28, 'model.businessModel', 1, 3),
	(29, 'model.businessOwner', 1, 3),
	(30, 'model.businessRegisterModel', 1, 3),
	(31, 'model.businessRegistration', 1, 3),
	(32, 'model.card', 1, 3),
	(33, 'model.checkRate', 1, 3),
	(34, 'model.contactModel', 1, 3),
	(35, 'model.country', 1, 3),
	(36, 'model.currencyExchangeModel', 1, 3),
	(37, 'model.currencyRateModel', 1, 3),
	(38, 'model.dashboardModel', 1, 3),
	(39, 'model.kyc', 1, 3),
	(40, 'model.loggerModel', 1, 3),
	(41, 'model.login1', 1, 3),
	(42, 'model.mockModel', 1, 3),
	(43, 'model.moneyTransfer', 1, 3),
	(44, 'model.otp1', 1, 3),
	(45, 'model.password1', 1, 3),
	(46, 'model.payment', 1, 3),
	(47, 'model.responseHandlerModel', 1, 3),
	(48, 'model.responseHelperModel', 1, 3),
	(49, 'model.signUp1', 1, 3),
	(50, 'model.tokenManager', 1, 3),
	(51, 'model.tokenModel', 1, 3),
	(52, 'model.transactionModel', 1, 3),
	(53, 'model.uploadModel', 1, 3),
	(54, 'model.userModel', 1, 3),
	(55, 'controller.personalSettings', 1, 3),
	(56, 'model.personalSettings', 1, 3);
/*!40000 ALTER TABLE `server_logs` ENABLE KEYS */;

-- Dumping structure for table payvoo.token
CREATE TABLE IF NOT EXISTS `token` (
  `token_id` int(10) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(10) DEFAULT NULL,
  `token` varchar(250) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`token_id`),
  KEY `fk_token_table_applicant_id` (`applicant_id`),
  CONSTRAINT `fk_token_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.token: ~1 rows (approximately)
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` (`token_id`, `applicant_id`, `token`, `created_on`) VALUES
	(1, 19, '6b0adc80-15d6-11ea-aaaa-9db2caff94591575382125', '2019-12-03 19:38:45');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;

-- Dumping structure for table payvoo.transactions
CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) DEFAULT NULL,
  `transaction_number` varchar(50) DEFAULT NULL,
  `transaction_type` enum('DB','CR') DEFAULT NULL,
  `from_account` int(11) NOT NULL DEFAULT 0,
  `to_account` int(11) NOT NULL DEFAULT 0,
  `currency_type` varchar(5) NOT NULL DEFAULT '',
  `counterparty` varchar(100) DEFAULT NULL,
  `account_type` varchar(15) DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT 0.00,
  `created_on` datetime DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `fk_transaction_table_applicant_id` (`applicant_id`),
  KEY `fk_transaction_table_from_account` (`from_account`),
  KEY `fk_transaction_table_to_account` (`to_account`),
  KEY `fk_transaction_table_currency_type` (`currency_type`),
  CONSTRAINT `fk_transaction_table_applicant_id` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  CONSTRAINT `fk_transaction_table_from_account` FOREIGN KEY (`from_account`) REFERENCES `accounts` (`account_no`),
  CONSTRAINT `fk_transaction_table_to_account` FOREIGN KEY (`to_account`) REFERENCES `accounts` (`account_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.transactions: ~0 rows (approximately)
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

-- Dumping structure for table payvoo.transfer_history
CREATE TABLE IF NOT EXISTS `transfer_history` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `applicant_id` int(11) NOT NULL,
  `initiation_time` datetime DEFAULT '0000-00-00 00:00:00',
  `execution_time` datetime DEFAULT '0000-00-00 00:00:00',
  `no_of_transactions` smallint(6) DEFAULT 0,
  `total-amount` decimal(15,2) DEFAULT 0.00,
  `from_currency` varchar(5) DEFAULT NULL,
  `list_of_trans` longtext DEFAULT NULL,
  `no_of_success_trans` smallint(6) DEFAULT 0,
  `succ_trans_list` longtext DEFAULT NULL,
  `no_of_failed_trans` smallint(6) DEFAULT 0,
  `failed_trans_list` longtext DEFAULT NULL,
  `description` varchar(25) DEFAULT NULL,
  `created_on` datetime DEFAULT '0000-00-00 00:00:00',
  `updated_on` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `fk_scheduled_transfer_history_applicant` (`applicant_id`),
  CONSTRAINT `fk_scheduled_transfer_history_applicant` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.transfer_history: ~0 rows (approximately)
/*!40000 ALTER TABLE `transfer_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `transfer_history` ENABLE KEYS */;

-- Dumping structure for table payvoo.user_counterparty
CREATE TABLE IF NOT EXISTS `user_counterparty` (
  `counterparty_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `userId` smallint(6) DEFAULT 0,
  `counterparty` int(11) DEFAULT NULL,
  `full_name` varchar(50) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `country` smallint(6) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `created_on` datetime DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  PRIMARY KEY (`counterparty_id`),
  KEY `FK_user_counterparty_accounts` (`counterparty`),
  CONSTRAINT `FK_user_counterparty_accounts` FOREIGN KEY (`counterparty`) REFERENCES `accounts` (`applicant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table payvoo.user_counterparty: ~3 rows (approximately)
/*!40000 ALTER TABLE `user_counterparty` DISABLE KEYS */;
INSERT INTO `user_counterparty` (`counterparty_id`, `userId`, `counterparty`, `full_name`, `mobile`, `email`, `country`, `status`, `created_on`, `updated_on`) VALUES
	(7, 1, 3, 'johhny varun stanic', '8121438343', '', 1, 1, '2019-11-26 18:38:23', NULL),
	(8, 1, 4, 'johny', '7419235589', 'testpayvoo@gmail.com', 2, 1, NULL, NULL),
	(9, 19, 2, 'MASS MEDIA DESIGN LTD', '35989874612', 'undefined', 1, 1, '2019-11-26 20:28:07', NULL);
/*!40000 ALTER TABLE `user_counterparty` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
