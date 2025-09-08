START TRANSACTION;

CREATE TEMPORARY TABLE seged1 AS
SELECT orszag.id AS oid, orszag.orszagNev AS onev, MAX(versenyzo.pont) AS opont
FROM versenyzo
INNER JOIN orszag
ON versenyzo.orszagId = orszag.id
GROUP BY orszag.id;
SET @kivalo = 750;
SET @jo = 700;
SET @kozepes = 650;

CREATE TABLE dijazas AS 
SELECT seged1.onev, seged1.opont, versenyzo.nev,
CASE 
	WHEN seged1.opont>@kivalo THEN "2000$"
    WHEN seged1.opont>@jo THEN "1000$"
    WHEN seged1.opont>@kozepes THEN "500$"
    ELSE "Nincs díjazás"
END AS "jutalom"
FROM seged1
INNER JOIN versenyzo
ON seged1.opont = versenyzo.pont AND seged1.oid = versenyzo.orszagId;

COMMIT;