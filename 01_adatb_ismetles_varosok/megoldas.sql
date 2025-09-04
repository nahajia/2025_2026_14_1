1.
select varos.vnev,varos.nepesseg,varos.terulet
from varos
where varos.vnev like "%ház%";

12 találat

2.
select varos.vnev,varos.nepesseg,varos.terulet
from varos
where varos.vnev like "%ház%" or varos.vnev like "%vár%"  
ORDER BY `varos`.`nepesseg` ASC

34 találat

3.
select varos.vnev,varos.nepesseg
from varos
where varos.nepesseg>10000  
ORDER BY `varos`.`nepesseg` DESC

144 találat

4.
select varos.vnev, megye.mnev
from varos
INNER JOIN megye
on varos.megyeid=megye.id
where varos.vnev like "%ház%";

12 találat

5.select varos.vnev, varos.nepesseg
from varos
INNER JOIN megye
on varos.megyeid=megye.id
where megye.mnev = "Hajdú-Bihar";

21 találat

6.
SELECT varos.vnev
FROM varos
INNER JOIN varostipus
ON varos.vtipid=varostipus.id
WHERE varostipus.vtip="megyei jogú város";

5 találat

7.
SELECT AVG(varos.nepesseg)
FROM varos;
20335.6098

8.
SELECT AVG(varos.nepesseg)
FROM varos 
INNER JOIN megye
ON varos.megyeid=megye.id 
WHERE megye.mnev="Pest" OR megye.mnev="Budapest";
47342.0727
9.

SELECT AVG(varos.nepesseg)
FROM varos
INNER JOIN megye
ON megye.id=varos.megyeid
WHERE megye.mnev="Szabolcs-Szatmár-Bereg";

10831.7143

10.

SELECT varos.vnev,varos.terulet
FROM varos
INNER JOIN megye
ON megye.id=varos.megyeid
WHERE megye.mnev="Somogy"  
ORDER BY `varos`.`terulet` DESC
LIMIT 1;

Siófok 124.66

Másik

SELECT varos.vnev,varos.terulet
FROM varos
WHERE varos.terulet=(SELECT MAX(varos.terulet)
FROM varos
INNER JOIN megye
ON megye.id=varos.megyeid
WHERE megye.mnev="Somogy");

Siófok 124.66

11.

SELECT COUNT(varos.id)
FROM varos
INNER JOIN varostipus
ON varostipus.id= varos.vtipid
WHERE varostipus.vtip ='megyei jogú város';

5

12.

SELECT megye.mnev, COUNT(varos.id) AS 'Darab'
FROM varos
INNER JOIN megye
ON megye.id = megyeid
GROUP BY megye.mnev;

találat 20

13.
SELECT varostipus.vtip,COUNT(varos.id)
FROM varostipus
INNER JOIN varos 
ON varos.vtipid=varostipus.id
GROUP BY varostipus.vtip;
5 darab
14 
SELECT varos.vnev, varos.nepesseg,varos.terulet
FROM varos
INNER JOIN megye
ON varos.megyeid=megye.id
WHERE megye.mnev="Vas"  
ORDER BY `varos`.`nepesseg` DESC  
LIMIT 1;
Szombathely
Másik megoldás:
SELECT varos.vnev, varos.nepesseg,varos.terulet
FROM varos
INNER JOIN megye
ON varos.megyeid=megye.id
WHERE megye.mnev="Vas"  
ORDER BY `varos`.`nepesseg` DESC  
LIMIT 1;
15.
SELECT varos.vnev,varos.nepesseg
from varos
where varos.nepesseg>(select avg(varos.nepesseg)
from varos)  
ORDER BY `varos`.`nepesseg` ASC
56 találat
16.
select varos.vnev,varos.nepesseg 
from varos
where varos.nepesseg<(select varos.nepesseg
from varos
inner join megye
on varos.megyeid=megye.id
where megye.mnev="Hajdú-Bihar"  
ORDER BY `varos`.`nepesseg` ASC 
limit 1);
54 találat

17.
SELECT varos.vnev, varos.nepesseg, megye.mnev
FROM varos 
INNER JOIN megye 
ON varos.megyeid = megye.id
WHERE megye.mnev IN (select megye.mnev 
FROM megye
INNER JOIN varos
ON megye.id = varos.megyeid
WHERE varos.vnev LIKE "%város%");

67 találat

18.
SELECT megye.mnev, varos.vnev
FROM varos
INNER JOIN megye
ON varos.megyeid = megye.id
WHERE varos.megyeid NOT IN (SELECT varos.megyeid
FROM varos
WHERE varos.vnev LIKE "%falu%")
AND varos.nepesseg BETWEEN 10000 AND 20000;

76 találat

19. 
INSERT INTO varos VALUES (NULL, "Kukutyin", 5, 10, "Hajdú járás", "Hajdú kistérség", 1000, 50); 

20.
UPDATE varos SET varos.nepesseg = varos.nepesseg * 1.1 WHERE varos.vnev LIKE "Kuk%"; 

21.
DELETE FROM varos
WHERE varos.megyeid=(SELECT megye.id
FROM megye
WHERE megye.mnev="Zala");

22.
SELECT megye.mnev,COUNT(varos.id)
FROM megye
LEFT JOIN varos
ON megye.id=varos.megyeid
GROUP BY megye.mnev;

20 találat

23.
CREATE TABLE hajdunevek AS
SELECT varos.vnev
FROM varos
WHERE varos.vnev LIKE "%Hajdú%"

Találat: 6
24.

CREATE VIEW nagyvarosok AS
SELECT varos.id, varos.vnev, varos.nepesseg, varos.terulet, megye.mnev, varostipus.vtip
FROM varos
INNER JOIN varostipus
ON varostipus.id=varos.vtipid
INNER JOIN megye
ON megye.id=varos.megyeid
WHERE varos.nepesseg > 50000

Találat: 18

25.
START TRANSACTION;
CREATE TABLE seged AS
SELECT varos.nepesseg,varos.vnev
FROM varos
INNER JOIN megye
ON megye.id = varos.megyeid
WHERE megye.mnev = "Hajdú-Bihar";
UPDATE seged SET seged.nepesseg = seged.nepesseg*1.1
WHERE seged.nepesseg>50000;
UPDATE seged SET seged.nepesseg = seged.nepesseg*0.9
WHERE seged.nepesseg<=50000;
COMMIT;

