0. Próba
DELIMITER //

CREATE PROCEDURE proba()
BEGIN
SELECT * from orszag;
END //

DELIMITER ;
CALL proba()
1.
DELIMITER //

CREATE PROCEDURE hatszazkerdez()
BEGIN
SELECT versenyzo.nev, versenyzo.pont, szakma.szakmaNev
FROM versenyzo
INNER JOIN szakma
ON versenyzo.szakmaId = szakma.id
WHERE versenyzo.pont>600;
END //

DELIMITER ;

CALL hatszazkerdez()

2.
DELIMITER //

CREATE PROCEDURE pontkerdez(in pontszam int(11))
BEGIN
SELECT versenyzo.nev, versenyzo.pont, szakma.szakmaNev
FROM versenyzo
INNER JOIN szakma
ON versenyzo.szakmaId = szakma.id
WHERE versenyzo.pont>pontszam;
END //

DELIMITER ;

CALL pontkerdez(700)

3.

DELIMITER //

CREATE PROCEDURE fejleszto_kerdez()
BEGIN
SELECT versenyzo.nev, szakma.szakmaNev
FROM versenyzo
INNER JOIN szakma
ON versenyzo.szakmaId = szakma.id
WHERE szakma.szakmaNev LIKE "%fejlesztő%";
END //

DELIMITER ;

CALL fejleszto_kerdez()

4.

DELIMITER //

CREATE PROCEDURE szakma_kerdez(IN kulcsszo varchar(255))
BEGIN
SELECT versenyzo.nev, szakma.szakmaNev
FROM versenyzo
INNER JOIN szakma
ON versenyzo.szakmaId = szakma.id
WHERE szakma.szakmaNev LIKE CONCAT("%", kulcsszo, "%");
END //

DELIMITER ;

CALL szakma_kerdez("faragó")

5.

DELIMITER //
CREATE PROCEDURE magyarkerdez()
BEGIN
CREATE VIEW magyartabla AS
SELECT versenyzo.nev, versenyzo.pont, orszag.orszagNev
FROM versenyzo
INNER JOIN orszag
ON versenyzo.orszagId=orszag.id
WHERE orszag.orszagNev = "magyarország";
END //
DELIMITER ;
CALL magyarkerdez()



