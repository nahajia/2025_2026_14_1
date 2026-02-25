1. Címsorok

# jelekkel adod meg a címsor szintjét (1–6).
# H1 címsor
## H2 címsor
### H3 címsor
2. Szövegformázás
**félkövér**
*dőlt*
~~áthúzott~~
`inline kód`
3. Kódblokkok
```javascript
console.log("Hello Markdown");
```
4. Listák
Rendezetlen lista:
- elem
- másik elem
  - al-lista
Rendezett lista:
1. Első
2. Második
3. Harmadik
5. Linkek és képek
[wikipédi](https://hu.wikipedia.org/wiki/Wiki)

![Alternatív szöveg](kepecskek/2.png)

7. Elválasztó vonal
---

8. kiemelés
```bash
git clone https://github.com/felhasznalonev/jatek-webapp.git
```
9.
táblázat:
| Metódus | Végpont | Funkció |
|----------|----------|-----------|
| GET | `/jatek` | Összes játék listázása |
| GET | `/jatekEgy/:jatek_id` | Egy játék lekérdezése |
| POST | `/jatekFelvitel` | Új játék felvitele |
| PUT | `/jatekModosit/:jatek_id` | Játék módosítása |
| DELETE | `/jatekTorles/:jatek_id` | Játék törlése |

