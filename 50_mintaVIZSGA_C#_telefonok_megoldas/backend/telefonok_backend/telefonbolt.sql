-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 03. 23:10
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
-- Adatbázis: `telefonbolt`
--
CREATE DATABASE IF NOT EXISTS `telefonbolt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `telefonbolt`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `markak`
--

DROP TABLE IF EXISTS `markak`;
CREATE TABLE `markak` (
  `marka_id` int(11) NOT NULL,
  `marka_nev` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `markak`
--

INSERT INTO `markak` (`marka_id`, `marka_nev`) VALUES
(2, 'Apple'),
(5, 'Honor'),
(4, 'Huawei'),
(6, 'Nokia'),
(1, 'Samsung'),
(3, 'Xiaomi');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `telefonok`
--

DROP TABLE IF EXISTS `telefonok`;
CREATE TABLE `telefonok` (
  `telefon_id` int(11) NOT NULL,
  `marka_id` int(11) NOT NULL,
  `modell` varchar(100) NOT NULL,
  `leiras` text DEFAULT NULL,
  `uj_ar` int(11) DEFAULT NULL,
  `hasznalt_ar` int(11) DEFAULT NULL,
  `kijelzo_merete` decimal(3,1) DEFAULT NULL,
  `okostelefon` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `telefonok`
--

INSERT INTO `telefonok` (`telefon_id`, `marka_id`, `modell`, `leiras`, `uj_ar`, `hasznalt_ar`, `kijelzo_merete`, `okostelefon`) VALUES
(1, 1, 'Galaxy S23', 'Modern, gyors okostelefon kiváló kamerával, erős processzorral és hosszú akkumulátor-üzemidővel. Ideális mindennapi használatra, közösségi médiára és multimédiás tartalmak fogyasztására. Letisztult kialakítása és prémium anyaghasználata kiemeli a kategóriájában, miközben megbízható teljesítményt nyújt hosszú távon is.', 320000, 230000, 6.1, 1),
(2, 1, 'Galaxy A54', 'Középkategóriás okostelefon jó teljesítménnyel és megbízható akkumulátorral. Kiváló választás általános felhasználásra, böngészésre és alkalmazások futtatására. Stabil működésének és kedvező ár-érték arányának köszönhetően ideális mindennapi használatra, akár hosszabb távon is.', 180000, 120000, 6.4, 1),
(3, 1, 'Galaxy S10e', 'Kompakt méretű okostelefon kisebb kijelzővel, amely könnyen kezelhető egy kézzel. Ideális azok számára, akik nem szeretik a nagy készülékeket, de nem akarnak lemondani a teljesítményről. Praktikus kialakítása miatt kényelmesen hordozható, és mindennapi használatra tökéletes választás.', 160000, 90000, 5.8, 1),
(4, 2, 'iPhone 13', 'Erős teljesítményű Apple készülék prémium kialakítással, kiváló kamerával és hosszú szoftveres támogatással. Zökkenőmentes működése és optimalizált rendszere gyors és stabil felhasználói élményt biztosít. Ideális választás azok számára, akik megbízható és tartós készüléket keresnek.', 290000, 210000, 6.1, 1),
(5, 2, 'iPhone 12 mini', 'Kompakt okostelefon kis méretben, de erős hardverrel és gyors működéssel. Könnyen hordozható és kényelmesen használható egy kézzel is. Kiváló választás azoknak, akik kisebb méretű, de modern funkciókkal rendelkező készüléket szeretnének.', 250000, 180000, 5.4, 1),
(6, 2, 'iPhone SE 2022', 'Klasszikus kialakítású okostelefon fizikai gombbal, stabil működéssel és gyors rendszerrel. Egyszerű kezelhetősége miatt sokak számára ideális választás. Kompakt mérete és megbízhatósága miatt jól használható mindennapi feladatokra.', 210000, 145000, 4.7, 1),
(7, 3, 'Redmi Note 12', 'Nagy kijelzős, kedvező árú okostelefon, amely ideális videónézésre, böngészésre és játékra. Jó ár-érték arányának köszönhetően széles körben elérhető választás. Hosszú üzemideje és nagy kijelzője kényelmes felhasználói élményt biztosít.', 110000, 75000, 6.7, 1),
(8, 3, 'Xiaomi 13', 'Prémium kategóriás telefon erős hardverrel, gyors működéssel és elegáns kialakítással. Kiváló teljesítményt nyújt még nagyobb igénybevétel mellett is. Modern megjelenése és fejlett funkciói miatt ideális választás igényes felhasználók számára.', 260000, 190000, 6.4, 1),
(9, 3, 'Xiaomi 12', 'Erős teljesítményű, még viszonylag kompakt méretű okostelefon. Jó választás játékra, munkára és mindennapi használatra is. Kiegyensúlyozott teljesítményt nyújt, miközben mérete még kényelmes használatot tesz lehetővé.', 220000, 155000, 6.3, 1),
(10, 4, 'P50 Pro', 'Kiváló kamerarendszerrel rendelkező prémium telefon, amely professzionális fotózási élményt nyújt. Erős hardverének köszönhetően gyors és stabil működést biztosít. Ideális választás azok számára, akik a fotózásra és videózásra helyezik a hangsúlyt.', 280000, 180000, 6.6, 1),
(11, 4, 'P30', 'Régebbi modell, de még mindig megbízható teljesítményt nyújt. Kedvezőbb ára miatt jó választás lehet költségtudatos felhasználók számára. Stabil működése és bevált technológiája miatt még mindig sokak által kedvelt készülék.', 150000, 95000, 6.1, 1),
(12, 5, 'Honor 90', 'Nagy kijelzős, modern kialakítású okostelefon, amely ideális multimédiás használatra és tartalomfogyasztásra. Kényelmes kezelhetősége és látványos kijelzője kiemeli a mezőnyből. Jó választás filmnézéshez és online tartalmakhoz.', 170000, 115000, 6.7, 1),
(13, 5, 'Honor 10', 'Kompaktabb méretű készülék elegáns megjelenéssel és megfelelő teljesítménnyel. Ideális azok számára, akik kisebb, de mégis modern telefont keresnek. Könnyen kezelhető és jól hordozható, miközben stabil működést biztosít.', 140000, 80000, 5.8, 1),
(14, 6, '3310', 'Klasszikus nyomógombos telefon hosszú akkumulátor-üzemidővel és egyszerű kezelhetőséggel. Ideális hívásokra és alapvető funkciók használatára. Strapabíró kialakítása miatt hosszú távon is megbízható társ lehet.', 20000, 10000, 2.4, 0),
(15, 6, '105', 'Egyszerű, megbízható telefon alapvető funkciókkal, mint hívás és SMS küldés. Könnyen kezelhető felépítése miatt idősebb felhasználók számára is ideális. Hosszú üzemideje és egyszerűsége a fő előnye.', 12000, 7000, 1.8, 0),
(16, 6, '8110 4G', 'Alap funkciós készülék modern hálózati támogatással és egyszerű kezelhetőséggel. Ideális azok számára, akik csak a legszükségesebb funkciókat szeretnék használni. Praktikus kialakítása és megbízható működése miatt jó választás.', 30000, 18000, 2.4, 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `markak`
--
ALTER TABLE `markak`
  ADD PRIMARY KEY (`marka_id`),
  ADD UNIQUE KEY `marka_nev` (`marka_nev`);

--
-- A tábla indexei `telefonok`
--
ALTER TABLE `telefonok`
  ADD PRIMARY KEY (`telefon_id`),
  ADD KEY `marka_id` (`marka_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `markak`
--
ALTER TABLE `markak`
  MODIFY `marka_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `telefonok`
--
ALTER TABLE `telefonok`
  MODIFY `telefon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `telefonok`
--
ALTER TABLE `telefonok`
  ADD CONSTRAINT `telefonok_ibfk_1` FOREIGN KEY (`marka_id`) REFERENCES `markak` (`marka_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
