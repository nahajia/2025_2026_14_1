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