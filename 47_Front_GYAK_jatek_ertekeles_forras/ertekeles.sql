CREATE TABLE ertekelesek (
    ertekeles_id INT AUTO_INCREMENT PRIMARY KEY,
    ertekeles_game_id INT NOT NULL,
    ertekeles_becenev VARCHAR(50) NOT NULL,
    ertekeles_pont INT NOT NULL,
    ertekeles_komment TEXT,
    ertekeles_datum DATE
);

INSERT INTO ertekelesek 
(ertekeles_game_id, ertekeles_becenev, ertekeles_pont, ertekeles_komment, ertekeles_datum) 
VALUES
(1, 'GamerKing', 9, 'Nagyon jó játék, sok küldetéssel.', '2024-03-10'),
(2, 'ShadowPlayer', 8, 'Jó grafika és történet.', '2024-03-11'),
(3, 'NoobMaster', 7, 'Kicsit nehéz, de élvezetes.', '2024-03-12'),
(1, 'PixelHero', 10, 'Az egyik legjobb játék amit próbáltam.', '2024-03-13'),
(2, 'DragonSlayer', 6, 'Nem rossz, de lehetne hosszabb.', '2024-03-14'),
(3, 'RetroFan', 8, 'Régi stílus, de nagyon hangulatos.', '2024-03-15');