1.
CREATE VIEW nezetTablaBorsod AS
SELECT varos.vnev, varos.nepesseg, IF(varos.nepesseg<5000,"kicsi","")
FROM varos
INNER JOIN megye
ON megye.id=varos.megyeid
WHERE megye.mnev="Borsod-Abaúj-Zemplén"

2.
CREATE view Megyetablakicsi AS
select megye.mnev,max(varos.nepesseg),
CASE
    WHEN max(varos.nepesseg)<5000 THEN "kicsi"
    WHEN max(varos.nepesseg)<100000 THEN "közepes"
    WHEN max(varos.nepesseg)>=100000 THEN "nagy"
END as "minősités"
from megye
inner join varos 
on megye.id=varos.megyeid
group by megye.mnev

3.
START TRANSACTION;

SET @szamadat=( select max(varos.nepesseg)
from megye
inner join varos 
on megye.id=varos.megyeid
group by megye.mnev  
ORDER BY `max(varos.nepesseg)` DESC
LIMIT 1 OFFSET 1);

SELECT varos.vnev, varos.nepesseg 
FROM varos
WHERE varos.nepesseg=@szamadat;
COMMIT;

4.

START TRANSACTION;
SET @megyenev = (SELECT megye.mnev
FROM megye
INNER JOIN varos
ON varos.megyeid = megye.id
GROUP BY megye.mnev  
ORDER BY MIN(varos.nepesseg) DESC
limit 1 OFFSET 1);

SET @megyenepesseg =(SELECT min(varos.nepesseg)
FROM megye
INNER JOIN varos
ON varos.megyeid = megye.id
GROUP BY megye.mnev  
ORDER BY MIN(varos.nepesseg) DESC
limit 1 OFFSET 1);
                     
SELECT varos.vnev,varos.nepesseg,megye.mnev
from varos
INNER JOIN megye
ON megye.id = varos.megyeid
WHERE megye.mnev = @megyenev AND varos.nepesseg = @megyenepesseg;                      
COMMIT;







