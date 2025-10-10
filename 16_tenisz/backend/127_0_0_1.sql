-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Okt 10. 14:06
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
-- Adatbázis: `teniszforum2025`
--
CREATE DATABASE IF NOT EXISTS `teniszforum2025` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `teniszforum2025`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bejegyzes`
--

CREATE TABLE `bejegyzes` (
  `bejegyzes_id` int(11) NOT NULL,
  `bejegyzes_szoveg` text NOT NULL,
  `bejegyzes_datum` date NOT NULL,
  `bejegyzes_ki` varchar(255) NOT NULL,
  `bejegyzes_jatekos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `bejegyzes`
--

INSERT INTO `bejegyzes` (`bejegyzes_id`, `bejegyzes_szoveg`, `bejegyzes_datum`, `bejegyzes_ki`, `bejegyzes_jatekos`) VALUES
(1, 'Carlos Alcaraz nyerte a US Opent, legyőzte Jannik Sinnert, és elvette tőle a világelsőséget', '2025-09-07', 'Béla', 1),
(2, 'Alcaraz szőke hajú lett.', '2025-09-30', 'Juci', 1),
(3, 'Novak Djokovic legyőzte Zizou Bergst a sanghaji 1000-es tornán, amivel bejutott az elődöntőbe. Mindez azt jelenti, hogy két győzelemre van attól, hogy ismért Masterst nyerjen, ami azért lenne nagy dolog, mert a szerb az olimpia óta nem nyert igazán nagyot. A következő meccsét a meglepetésember Valentin Vacherot ellen vívja, ahol papíron egyértelműen ő az esélyes.', '2025-10-10', 'Feri', 3),
(4, 'Nem kerülik el a sérülések, Jannik Sinner öt év alatt már tizenhárom mérkőzést adott fel valamilyen fizikai probléma miatt', '2025-10-06', 'Kati', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jatekos`
--

CREATE TABLE `jatekos` (
  `jatekos_id` int(11) NOT NULL,
  `jatekos_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `jatekos`
--

INSERT INTO `jatekos` (`jatekos_id`, `jatekos_nev`) VALUES
(1, 'Alcaraz'),
(2, 'Sinner'),
(3, 'Djokovic');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bejegyzes`
--
ALTER TABLE `bejegyzes`
  ADD PRIMARY KEY (`bejegyzes_id`),
  ADD KEY `bejegyzes_jatekos` (`bejegyzes_jatekos`);

--
-- A tábla indexei `jatekos`
--
ALTER TABLE `jatekos`
  ADD PRIMARY KEY (`jatekos_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bejegyzes`
--
ALTER TABLE `bejegyzes`
  MODIFY `bejegyzes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `jatekos`
--
ALTER TABLE `jatekos`
  MODIFY `jatekos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bejegyzes`
--
ALTER TABLE `bejegyzes`
  ADD CONSTRAINT `bejegyzes_ibfk_1` FOREIGN KEY (`bejegyzes_jatekos`) REFERENCES `jatekos` (`jatekos_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
