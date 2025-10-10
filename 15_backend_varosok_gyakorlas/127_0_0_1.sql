-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Sze 24. 11:52
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
-- Adatbázis: `konyvtar2025`
--
CREATE DATABASE IF NOT EXISTS `konyvtar2025` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `konyvtar2025`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kolcsonzes`
--

CREATE TABLE `kolcsonzes` (
  `kolcsonzes_id` int(11) NOT NULL,
  `kolcsonzes_olvaso` int(11) NOT NULL,
  `kolcsonzes_konyv` int(11) NOT NULL,
  `kolcsonzes_datumki` date NOT NULL,
  `kolcsonzes_datumbe` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kolcsonzes`
--

INSERT INTO `kolcsonzes` (`kolcsonzes_id`, `kolcsonzes_olvaso`, `kolcsonzes_konyv`, `kolcsonzes_datumki`, `kolcsonzes_datumbe`) VALUES
(1, 1, 1, '2025-09-22', '2025-09-29'),
(2, 2, 2, '2025-09-22', '2025-09-30'),
(3, 1, 2, '2025-09-24', '2025-10-22');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyv`
--

CREATE TABLE `konyv` (
  `konyv_id` int(11) NOT NULL,
  `konyv_cim` varchar(255) NOT NULL,
  `konyv_ev` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `konyv`
--

INSERT INTO `konyv` (`konyv_id`, `konyv_cim`, `konyv_ev`) VALUES
(1, 'Harry Potter 1.- Bölcsek köve', 1997),
(2, 'Harry Potter 2. - Titkok kamrája', 1998);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `olvaso`
--

CREATE TABLE `olvaso` (
  `olvaso_id` int(11) NOT NULL,
  `olvaso_nev` varchar(255) NOT NULL,
  `olvaso_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `olvaso`
--

INSERT INTO `olvaso` (`olvaso_id`, `olvaso_nev`, `olvaso_email`) VALUES
(1, 'Fá Zoltán', 'fazoltan@gmail.com'),
(2, 'Beka Kálmán', 'bekakalman@gmail.com');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD PRIMARY KEY (`kolcsonzes_id`),
  ADD KEY `kolcsonzes_olvaso` (`kolcsonzes_olvaso`),
  ADD KEY `kolcsonzes_konyv` (`kolcsonzes_konyv`);

--
-- A tábla indexei `konyv`
--
ALTER TABLE `konyv`
  ADD PRIMARY KEY (`konyv_id`);

--
-- A tábla indexei `olvaso`
--
ALTER TABLE `olvaso`
  ADD PRIMARY KEY (`olvaso_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  MODIFY `kolcsonzes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `konyv`
--
ALTER TABLE `konyv`
  MODIFY `konyv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `olvaso`
--
ALTER TABLE `olvaso`
  MODIFY `olvaso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kolcsonzes`
--
ALTER TABLE `kolcsonzes`
  ADD CONSTRAINT `kolcsonzes_ibfk_1` FOREIGN KEY (`kolcsonzes_olvaso`) REFERENCES `olvaso` (`olvaso_id`),
  ADD CONSTRAINT `kolcsonzes_ibfk_2` FOREIGN KEY (`kolcsonzes_konyv`) REFERENCES `konyv` (`konyv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
