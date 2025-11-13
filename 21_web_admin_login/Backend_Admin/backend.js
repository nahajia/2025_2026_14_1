const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key';

// Adatbázis kapcsolat beállítása
var connection;
function kapcsolat() {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'marvel_2025_login',
  });
  connection.connect();
}

//-------------- WEB Bejelentkezés végpont
app.post('/web/login', (req, res) => {
  const { username, password } = req.body;

  kapcsolat()

  const query = `
      SELECT felhasznalo_nev, felhasznalo_jelszo 
      FROM felhasznalo 
      inner join rang 
      on rang_felhasznalo=felhasznalo_id 
      WHERE felhasznalo_nev = ? and rang_ertek=1`
  connection.query(query, [username], (err, rows) => {
    if (err) {
      console.error('Adatbázis hiba:', err);
      res.status(500).json({ message: 'Szerverhiba' });
    } else if (rows.length === 0) {
      res.status(404).json({ message: 'Felhasználó nem található' });
    } else {
      const hashedPassword = rows[0].felhasznalo_jelszo;

      // Jelszó ellenőrzése bcrypt-tel
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          console.error('Hiba a jelszó ellenőrzésekor:', err);
          res.status(500).json({ message: 'Szerverhiba' });
        } else if (isMatch) {
          const token = jwt.sign({ username: rows[0].felhasznalo_nev }, SECRET_KEY, {
            expiresIn: '1h',
          });
          res.json({ token });
        } else {
          res.status(401).json({ message: 'Hibás jelszó' });
        }
      });
    }
  });

  connection.end();
});


//-----------Diagramhoz végpont
app.get('/szavazatCsoportosit', (req, res) => {
  kapcsolat()
  connection.query(`
      SELECT film_cim, COUNT(szavazat_film) AS darab
      FROM film
      INNER JOIN szavazat
      ON film_id=szavazat_film
      GROUP BY film_cim    
    `, (err, rows, fields) => {
    if (err) {
      console.log("Hiba")
      console.log(err)
      res.status(500).send("Hiba")
    }
    else {
      console.log(rows)
      res.status(200).send(rows)
    }
  })
  connection.end()
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
