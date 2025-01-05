-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 06, 2023 at 03:49 AM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comments`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL,
  `receivedDate` datetime DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `e-mail` varchar(60) DEFAULT NULL,
  `comment` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentID`, `receivedDate`, `name`, `e-mail`, `comment`) VALUES
(1, '2023-03-15 09:00:00', 'Marta', 'marta1805@gmail.com', 'Świetne portfolio! Doceniam Twoją kreatywność i profesjonalizm.'),
(2, '2023-08-07 14:20:00', 'Robert', 'robert2207@yahoo.com', 'Bardzo inspirująca strona. Projekty są naprawdę imponujące. Gratuluję!'),
(3, '2023-12-25 19:15:00', 'Anna', 'anna1009@gmail.com', 'Twoje portfolio to prawdziwa wizytówka profesjonalisty! Świetna robota.'),
(4, '2024-02-10 08:25:00', 'Krzysztof', 'krzysztof0506@poczta.pl', 'Zaciekawiła mnie Twoja oferta. Mam nadzieję, że wkrótce nawiążemy współpracę.'),
(5, '2024-05-20 17:20:00', 'Ewelina', 'ewelina1504@onet.pl', 'Design strony jest naprawdę estetyczny. Gratuluję talentu!'),
(6, '2024-11-03 22:00:00', 'Łukasz', 'lukasz3010@wp.pl', 'Zaimponowała mi Twoja sekcja projektów. Widać ogromne zaangażowanie i pasję. Polecam.');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
