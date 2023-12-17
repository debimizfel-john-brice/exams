-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2023 at 05:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schedules`
--
CREATE DATABASE IF NOT EXISTS `schedules` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `schedules`;

-- --------------------------------------------------------

--
-- Table structure for table `development_groups`
--

CREATE TABLE `development_groups` (
  `groupId` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `development_groups`
--

INSERT INTO `development_groups` (`groupId`, `name`) VALUES
(1, 'React Team'),
(2, 'Mobile Team'),
(3, 'UI Team'),
(4, 'QA Team');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meetingId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `startMeeting` datetime NOT NULL,
  `endMeeting` datetime NOT NULL,
  `description` varchar(30) NOT NULL,
  `meetingRoom` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meetingId`, `groupId`, `startMeeting`, `endMeeting`, `description`, `meetingRoom`) VALUES
(1, 2, '2023-12-06 10:00:00', '2023-12-06 11:00:00', 'Designing app', 'Blue Room'),
(2, 4, '2023-12-10 13:00:00', '2023-12-10 15:00:00', 'Testing app', 'New York Room'),
(3, 1, '2023-12-12 15:30:00', '2023-12-12 16:30:00', 'Implementing Redux', 'Large Board Room'),
(4, 3, '2023-12-14 11:00:00', '2023-12-06 12:30:00', 'Fixing design', 'London Room');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `development_groups`
--
ALTER TABLE `development_groups`
  ADD PRIMARY KEY (`groupId`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meetingId`),
  ADD KEY `groupId` (`groupId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `development_groups`
--
ALTER TABLE `development_groups`
  MODIFY `groupId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meetingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`groupId`) REFERENCES `development_groups` (`groupId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
