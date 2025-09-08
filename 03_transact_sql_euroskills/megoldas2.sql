START TRANSACTION;
CREATE TEMPORARY TABLE seged1 AS
SELECT szakma.szakmaNev AS szaknev, max(versenyzo.pont) AS verpont
FROM szakma
INNER JOIN versenyzo
on szakma.id=versenyzo.szakmaId 

GROUP BY szakma.szakmaNev;
CREATE TABLE infosok3 AS
SELECT szaknev,verpont,IF(seged1.szaknev LIKE "%info%" OR seged1.szaknev LIKE "%web%" ,"+" ,"-") AS infos
FROM seged1
order by seged1.verpont desc;
COMMIT;