-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 23. 09:02
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `marvel2024`
--
CREATE DATABASE IF NOT EXISTS `marvel2024` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `marvel2024`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznalo_id` int(11) NOT NULL,
  `felhasznalo_nev` varchar(255) NOT NULL,
  `felhasznalo_jelszo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznalo_id`, `felhasznalo_nev`, `felhasznalo_jelszo`) VALUES
(1, 'A', 'A'),
(2, 'B', 'B'),
(3, 'C', 'C'),
(4, 'a@gmail.com', '$2b$12$QWgoH9hS.7UP5t.dL7UOpeBoALmPqTe9Q5hyML/KGahjYSfQ1jeha'),
(5, 'Aa', '$2a$10$auhieAYn7dvRvnziq7bFHuNTcBVx/LMBUofF/wsbkz6rfTn95x6mO'),
(6, 'Admin', '$2a$10$FNoGv4HB.4kVETfdb2QvbegXOqNv2BNpXWCDwFKla.www/Qz0wMB.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `film`
--

CREATE TABLE `film` (
  `film_id` int(11) NOT NULL,
  `film_cim` varchar(255) NOT NULL,
  `film_ev` int(11) NOT NULL,
  `film_kep` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `film`
--

INSERT INTO `film` (`film_id`, `film_cim`, `film_ev`, `film_kep`) VALUES
(1, 'Wandavision', 2018, '1.png'),
(2, 'Loki', 2018, '2.png'),
(3, 'Tél katonája', 2020, '3.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rang`
--

CREATE TABLE `rang` (
  `rang_id` int(11) NOT NULL,
  `rang_felhasznalo` int(11) NOT NULL,
  `rang_ertek` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `rang`
--

INSERT INTO `rang` (`rang_id`, `rang_felhasznalo`, `rang_ertek`) VALUES
(1, 5, 1),
(2, 6, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szavazat`
--

CREATE TABLE `szavazat` (
  `szavazat_id` int(11) NOT NULL,
  `szavazat_film` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szavazat`
--

INSERT INTO `szavazat` (`szavazat_id`, `szavazat_film`) VALUES
(3, 1),
(6, 1),
(7, 1),
(8, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(1, 2),
(2, 2),
(5, 2),
(9, 2),
(4, 3);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`felhasznalo_id`);

--
-- A tábla indexei `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`film_id`);

--
-- A tábla indexei `rang`
--
ALTER TABLE `rang`
  ADD PRIMARY KEY (`rang_id`);

--
-- A tábla indexei `szavazat`
--
ALTER TABLE `szavazat`
  ADD PRIMARY KEY (`szavazat_id`),
  ADD KEY `szavazat_film` (`szavazat_film`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `film`
--
ALTER TABLE `film`
  MODIFY `film_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `rang`
--
ALTER TABLE `rang`
  MODIFY `rang_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `szavazat`
--
ALTER TABLE `szavazat`
  MODIFY `szavazat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `szavazat`
--
ALTER TABLE `szavazat`
  ADD CONSTRAINT `szavazat_ibfk_1` FOREIGN KEY (`szavazat_film`) REFERENCES `film` (`film_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
