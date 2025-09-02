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



