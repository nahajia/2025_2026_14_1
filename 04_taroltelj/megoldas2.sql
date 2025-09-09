DELIMITER //
CREATE PROCEDURE ertekeles()
BEGIN
SELECT tanulok.nev,SUM(leadasok.mennyiseg),
CASE
	WHEN SUM(leadasok.mennyiseg)>10000 THEN "Sok"
    WHEN SUM(leadasok.mennyiseg)>5000 THEN "Jó ez is"
    WHEN SUM(leadasok.mennyiseg)<=5000 THEN "Gyüjts többet"
END AS "értékelés"
FROM tanulok
INNER JOIN leadasok
ON tanulok.tazon=leadasok.tanulo
GROUP BY tanulok.nev;
END//

DELIMITER ;
CALL ertekeles();

Másik megoldás

DELIMITER //
CREATE PROCEDURE ertekeles2()
BEGIN
SELECT tanulok.nev,SUM(leadasok.mennyiseg),
IF(SUM(leadasok.mennyiseg)>10000,"sok", IF(SUM(leadasok.mennyiseg)>5000,"ez is jó","gyűjts többet"))
FROM tanulok
INNER JOIN leadasok
ON tanulok.tazon=leadasok.tanulo
GROUP BY tanulok.nev;
END//

DELIMITER ;
CALL ertekeles();