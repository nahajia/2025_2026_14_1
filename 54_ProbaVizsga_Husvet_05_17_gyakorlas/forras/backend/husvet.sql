-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 04. 14:17
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `husvet`
--
CREATE DATABASE IF NOT EXISTS `husvet` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `husvet`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `locsoloversek`
--

DROP TABLE IF EXISTS `locsoloversek`;
CREATE TABLE `locsoloversek` (
  `locsolovers_id` int(11) NOT NULL,
  `cim` varchar(255) NOT NULL,
  `vers` text NOT NULL,
  `keletkezes_ev` int(11) DEFAULT NULL,
  `olvasasi_ido_perc` double DEFAULT NULL,
  `kedvelesek_szama` int(11) DEFAULT 0,
  `stilus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `locsoloversek`
--

INSERT INTO `locsoloversek` (`locsolovers_id`, `cim`, `vers`, `keletkezes_ev`, `olvasasi_ido_perc`, `kedvelesek_szama`, `stilus_id`) VALUES
(1, 'Piros tojás', 'Zöld erdőben jártam, piros tojást vártam, ha nem kapok belőle, vízzel jól meglocsoltalak volna!', 2024, 0.4, 12, 1),
(2, 'Kölni támadás', 'Van nálam egy kölni, meg foglak most ölni... ja nem, csak meglocsollak, ha adsz egy szép tojást!', 2024, 0.5, 25, 2),
(3, 'Modern nyúl', 'Zöld erdőben jártam, wifi jelet láttam, húsvéti nyuszit keresve egy lájkot is találtam.', 2025, 0.4, 31, 3),
(4, 'Sprint locsoló', 'Locsolni jöttem gyorsan, tojást adj most nyomban!', 2025, 0.2, 1, 4),
(5, 'Parfümteszt', 'Szabad-e locsolni? Ezt jöttem megtudni. Ha szabad, locsolok, és tojással távozok.', 2023, 0.3, 20, 1),
(6, 'Vicces nyuszi', 'Nyuszi ül a fűben, mobil van a kezében, azt írta egy SMS-ben: meglocsollak élőben!', 2025, 0.4, 0, 3),
(7, 'Tojásvadász', 'Én kis kertész legény vagyok, rózsavízzel locsolkodok. Aki nekem tojást ad, annak boldog napja marad.', 2022, 0.4, 15, 1),
(8, 'Kicsit ciki', 'Zöld erdőben jártam, zokniban csúszkáltam, mire hozzád eljutottam, kölnivel beborultam.', 2024, 0.5, 22, 2),
(9, 'Nyuszis reels', 'Húsvét napján keltem, TikTok-verset hoztam, ha nem adsz tojást nekem, posztban panaszkodtam.', 2025, 0.4, 35, 3),
(10, 'Mini locsoló', 'Meglocsollak, kész, tojás jöhet, mész.', 2025, 0.2, 17, 4),
(11, 'ChatGPT locsoló', 'Zöld erdőben jártam, ChatGPT-t találtam, megkérdeztem tőle: locsoljak-e máma?', 2026, 0.4, 0, 3),
(12, 'Energiatakarékos', 'Nem hoztam én kölnit, spórolok a vízzel, csak szóban locsollak, beéred ennyivel?', 2026, 0.3, 3, 1),
(13, 'Influenszer nyuszi', 'Nyuszi ül a neten, posztol éppen csendben, ha nem adsz tojást, kirak storyba menten!', 2026, 0.4, 13, 3),
(14, 'Vizsgaidőszak', 'Zöld erdőben jártam, ZH-t is találtam, locsolni jöttem, de inkább puskát vártam!', 2026, 0.5, 10, 2),
(15, 'Minimalista', 'Locsolni jöttem. Tojás?', 2026, 0.1, 4, 4),
(16, 'Tech locsoló', 'Van nálam egy app, locsoló mód bekapcs, ha adsz egy tojást, nem lesz több popup!', 2026, 0.4, 6, 3),
(17, 'Udvarias verzió', 'Szabad-e locsolni? Kérdem én szépen, ha jár a tojás, boldogan lépek.', 2026, 0.3, 10, 1),
(18, 'Ciki verzió', 'Zöld erdőben jártam, el is estem útközben, mire ideértem, kifolyt a kölnim zömében...', 2026, 0.5, 5, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stilusok`
--

DROP TABLE IF EXISTS `stilusok`;
CREATE TABLE `stilusok` (
  `stilus_id` int(11) NOT NULL,
  `stilus_nev` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `stilusok`
--

INSERT INTO `stilusok` (`stilus_id`, `stilus_nev`) VALUES
(1, 'vicces'),
(2, 'ciki'),
(3, 'modern'),
(4, 'rövid');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `locsoloversek`
--
ALTER TABLE `locsoloversek`
  ADD PRIMARY KEY (`locsolovers_id`),
  ADD KEY `stilus_id` (`stilus_id`);

--
-- A tábla indexei `stilusok`
--
ALTER TABLE `stilusok`
  ADD PRIMARY KEY (`stilus_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `locsoloversek`
--
ALTER TABLE `locsoloversek`
  MODIFY `locsolovers_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `stilusok`
--
ALTER TABLE `stilusok`
  MODIFY `stilus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `locsoloversek`
--
ALTER TABLE `locsoloversek`
  ADD CONSTRAINT `fk_stilus` FOREIGN KEY (`stilus_id`) REFERENCES `stilusok` (`stilus_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
