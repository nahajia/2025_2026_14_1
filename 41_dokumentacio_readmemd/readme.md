# 🎮 Játékadat-kezelő Webalkalmazás  
## Szakdolgozat – 2025

**Készítette:**  
Hallgató 1 neve  
Hallgató 2 neve  

**Szak:** Szak megnevezése  
**Intézmény:** Intézmény neve  
**Témavezető:** Témavezető neve  

---

## 1. Bevezetés

A szakdolgozat célja egy háromrétegű webalkalmazás tervezése és megvalósítása, amely videojátékok adatainak kezelésére szolgál.

A rendszer React alapú frontenddel, Express keretrendszerre épülő Node.js backenddel, valamint MySQL relációs adatbázissal került kialakításra.

Az alkalmazás lehetővé teszi:

- játékok adatainak rögzítését  
- meglévő adatok módosítását  
- rekordok törlését  
- listázást  
- keresést különböző szempontok alapján  

A frontend kizárólag REST API végpontokon keresztül kommunikál a backenddel, amely paraméterezett SQL lekérdezések segítségével kapcsolódik az adatbázishoz.

---

## 2. A rendszer architektúrája

Az alkalmazás háromrétegű kliens–szerver architektúrát alkalmaz:

### 2.1 Prezentációs réteg (Frontend)

- React alapú, menüvezérelt felhasználói felület  
- API kommunikáció Axios segítségével  
- Űrlapkezelés és adatmegjelenítés  

### 2.2 Alkalmazáslogikai réteg (Backend)

- Express alapú REST API  
- HTTP kérések kezelése  
- CRUD műveletek megvalósítása  
- Statikus fájlok kiszolgálása (`/kepek`, `/kepek2`)  

### 2.3 Adatkezelési réteg (Database)

- MySQL relációs adatbázis  
- Kapcsolt táblák (FOREIGN KEY)  
- INNER JOIN lekérdezések  

---

## 3. Adatbázis struktúra

### 3.1 `tipus` tábla

- `tipus_id` (elsődleges kulcs)  
- `tipus_nev`  

### 3.2 `jatek` tábla

- `jatek_id` (elsődleges kulcs)  
- `jatek_nev`  
- `jatek_ertekeles`  
- `jatek_ar`  
- `jatek_leiras`  
- `jatek_tipus` (idegen kulcs → `tipus.tipus_id`)  

A két tábla között reláció biztosítja az adatintegritást.

---

## 4. REST API végpontok

### 4.1 Típusok

| Metódus | Végpont | Funkció |
|----------|----------|-----------|
| GET | `/tipus` | Típusok lekérdezése |

---

### 4.2 Játékok (CRUD műveletek)

| Metódus | Végpont | Funkció |
|----------|----------|-----------|
| GET | `/jatek` | Összes játék listázása |
| GET | `/jatekEgy/:jatek_id` | Egy játék lekérdezése |
| POST | `/jatekFelvitel` | Új játék felvitele |
| PUT | `/jatekModosit/:jatek_id` | Játék módosítása |
| DELETE | `/jatekTorles/:jatek_id` | Játék törlése |

---

### 4.3 Keresési funkciók

| Metódus | Végpont | Paraméter |
|----------|----------|-------------|
| POST | `/jatekKeresTip` | `tipus_id` |
| POST | `/jatekKeresNev` | `szoveg` |
| POST | `/jatekKeresErtek` | `ertek` |

---

## 5. Telepítés és futtatás

![adatbkép](2.png)

### 5.1 Repository klónozása

```bash
git clone https://github.com/felhasznalonev/jatek-webapp.git
```
---
hali
