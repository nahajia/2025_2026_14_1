-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 21. 18:59
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
-- Adatbázis: `jatek2025`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `komment`
--

CREATE TABLE `komment` (
  `komment_id` int(11) NOT NULL,
  `komment_jatek_id` int(11) DEFAULT NULL,
  `komment_becenev` varchar(50) DEFAULT NULL,
  `komment_cime` varchar(100) DEFAULT NULL,
  `komment_szovege` text DEFAULT NULL,
  `komment_datum` datetime DEFAULT NULL,
  `komment_likeok_szama` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `komment`
--

INSERT INTO `komment` (`komment_id`, `komment_jatek_id`, `komment_becenev`, `komment_cime`, `komment_szovege`, `komment_datum`, `komment_likeok_szama`) VALUES
(1, 1, 'Gamer123', 'Imádom', 'A Minecraft egy nagyon kreatív játék, rengeteg lehetőséggel.', '2026-04-20 14:30:00', 12),
(2, 2, 'ProPlayer', 'Versenyképes', 'A Valorant jó taktikai FPS, de néha idegesítőek a csapattársak.', '2026-04-20 16:10:00', 8),
(3, 3, 'ClashFan', 'Addiktív', 'A Clash Royale könnyen beszippant, gyors meccsek és sok stratégia.', '2026-04-19 18:45:00', 15),
(4, 1, 'BuilderKing', 'Kreatív mód', 'Creative módban órákig lehet építkezni, nagyon chill.', '2026-04-18 12:00:00', 5),
(5, 2, 'AimGod', 'Jó, de nehéz', 'Sok gyakorlás kell hozzá, de ha belejössz, nagyon élvezetes.', '2026-04-21 10:20:00', 9);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `komment`
--
ALTER TABLE `komment`
  ADD PRIMARY KEY (`komment_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `komment`
--
ALTER TABLE `komment`
  MODIFY `komment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
