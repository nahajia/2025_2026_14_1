# 📱 Mobiltelefon Webshop

Ez a projekt egy mobiltelefonokat értékesítő webshop alkalmazás, amely záródolgozatként készült.
Az alkalmazás lehetővé teszi mobiltelefonok böngészését, megtekintését és rendelését egy modern webes felületen.

A rendszer **frontend és backend architektúrával** készült.

---

# 👨‍💻 Készítők

* Név 1
* Név 2

---

# 🧰 Felhasznált technológiák

## Frontend

* React
* JavaScript
* HTML
* CSS

## Backend

* Node.js
* Express.js

## Adatbázis

* MySQL

---

# ⚙️ Funkciók

Az alkalmazás főbb funkciói:

* 📱 Mobiltelefonok listázása
* 🔍 Termékek részletes megtekintése
* 👤 Felhasználói regisztráció
* 🔐 Bejelentkezés
* 🛒 Kosár kezelés
* 📦 Rendelések leadása
* 🗄️ Adatok tárolása MySQL adatbázisban

---

# 🗂️ Projekt struktúra

```
project-root
│
├── frontend        # React alkalmazás
│
├── backend         # Express szerver
│
├── database        # SQL fájlok / adatbázis séma
│
└── README.md
```

---

# 🚀 Telepítés és futtatás

## 1️⃣ Repository klónozása

```
git clone https://github.com/felhasznalonev/mobiltelefon-webshop.git
```

## 2️⃣ Backend telepítése és indítása

```
cd backend
npm install
node server.js
```

A backend alapértelmezetten a következő porton fut:

```
http://localhost:3001
```

---

## 3️⃣ Frontend telepítése és indítása

```
cd frontend
npm install
npm start
```

A frontend elérhető lesz:

```
http://localhost:3000
```

---

# 🗄️ Adatbázis beállítása

1. Hozz létre egy új adatbázist MySQL-ben:

```
mobilwebshop
```

2. Importáld a `database.sql` fájlt.

3. Állítsd be a backendben az adatbázis kapcsolatot.

Példa:

```
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mobilwebshop"
});
```

---

# 🔗 API végpontok (példa)

| Method | Endpoint    | Leírás                   |
| ------ | ----------- | ------------------------ |
| GET    | /phones     | Mobiltelefonok listázása |
| GET    | /phones/:id | Egy telefon adatai       |
| POST   | /login      | Bejelentkezés            |
| POST   | /register   | Regisztráció             |
| POST   | /order      | Rendelés leadása         |

---

# 📸 Képernyőképek

Ide lehet feltölteni képeket az alkalmazásról:

* Főoldal
* Terméklista
* Termék részletek
* Kosár
* Bejelentkezés

Példa:

```
![Főoldal](images/home.png)
```

---

# 🎓 Projekt célja

A projekt célja egy teljes **full-stack webalkalmazás** létrehozása volt, amely bemutatja:

* frontend fejlesztést React segítségével
* backend API készítését Express használatával
* adatbázis kezelését MySQL segítségével

---

# 📄 Licenc

Ez a projekt oktatási célból készült.
