# Rendszerterv

## 1. Bevezetés
A rendszer lényege, hogy híreket tudok olvasni teniszezőkről, 
valamint felhasználó(beléptetés nélkül) fel tud tölteni bejegyzést.


## 2. Architektúra
Adatbázis: Mysql, phpmyadmin
Backend: Express.js
Frontend: React


## 3. Funkcionális köv.
Fő funkciók:
- forum bejegyzéseinek megjelenítése, játékos neve is: */bejegyzes*
- új bejegyzés: */bejegyzesFelvitel*
- jatekos nevének megjelenítése lenyílóban: */jatekos*


Távlati tervek:
- bejegyzés törlése
- bejegyzés módosítása


## 4. Nem funkc. köv.
1. Front és Backend JSON-ben kommunikál
2. Hibakezelés...
3. Reszponzív
4. jól áttekinthető kód

## 5. Adatb. terv

### 5.1 Táblák
jatekos tábla:
- jatekos_id: PK (elsodleges kulcs)
- jatekos_nev
bejegyzes tábla:
- bejegyzes_id: PK
- bejegyzes_szoveg
- bejegyzes_datum
- bejegyzes_ki
- bejegyzes_jatekos: FK (idegen kulcs)
### 5.2 Kapcsolatok
A jatekos tábla kapcsolatban van a bejegyzés táblával, a bejegyzes_jatekos mezőn keresztül, a játokosról szóló hírek, pletykák alapján él a kapcsolat.

## 6. Adatáramlás
Bejegyzés létrehozásának folyamata:
1. felh. beírja szöveg
2. felh. kiválasztja lenyílóból a játékos nevét
3. felh. becenevét beírja, felvitel gomb
4. post-os kérés indul a beckendre
5. backend tárolja adatb-ben
6. a lapon frissül az új bejegyzéssel









