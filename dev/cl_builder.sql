-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 21, 2024 at 07:05 AM
-- Server version: 5.7.24
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cl_builder`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `block_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `copy` longtext,
  `tags` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `trashed` enum('y','n') NOT NULL DEFAULT 'n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`block_id`, `name`, `copy`, `tags`, `timestamp`, `trashed`) VALUES
(1, 'test', 'test', '1,2,3', '2024-11-21 06:37:44', 'n'),
(2, 'Test 2', 'Test TEST TEST', '1,2,3', '2024-11-21 06:38:17', 'n'),
(3, 'dsadsa', 'dsadas', '1,2,3', '2024-11-21 06:41:26', 'n'),
(4, 'fdsafsdfsd', 'sdaedsadsaNN', '1,2,3', '2024-11-21 06:51:40', 'n'),
(5, 'dsadsa', '<p>dsadsa</p>', '1,2,3', '2024-11-21 06:52:39', 'n'),
(6, 'dasdas', '<p>dsadas</p>', '1,2,3', '2024-11-21 06:53:02', 'n'),
(7, 'adfdsa', '<p>jsldjskladjklNN</p>', '1,2,3', '2024-11-21 06:54:16', 'n'),
(8, '', '<p>dsdsdsdsNN</p>', '1,2,3', '2024-11-21 07:01:13', 'n'),
(9, 'dsadsa', '<p>asdsad</p>', '1,2,3', '2024-11-21 07:02:09', 'n'),
(10, 'dasdsa', '<p>asdasdas<strong> dfsafdsaf <em>Asdsdsadsadsa</em></strong></p>', '1,2,3', '2024-11-21 07:02:50', 'n');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `tag_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `trashed` enum('n','y') DEFAULT 'n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`tag_id`, `name`, `timestamp`, `trashed`) VALUES
(1, 'motion graphics', '2024-11-21 04:05:50', 'n'),
(2, 'web design', '2024-11-21 04:05:50', 'n'),
(3, 'web developement', '2024-11-21 04:06:11', 'n'),
(4, 'php', '2024-11-21 04:06:11', 'n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`block_id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`tag_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `block_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `tag_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
