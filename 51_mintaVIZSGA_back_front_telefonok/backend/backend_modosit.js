const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const { body, param, validationResult } = require('express-validator')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'telefonbolt'
})

function handleValidationErrors(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    return null
}


app.get('/', (req, res) => {
    res.send('Telefonbolt backend működik!')
})

/* ------------------------------------- ÚJ VÉGPONTOK ---------------------------------- */

//1. feladat

app.get("/markankentDarabszam", (req, res) => {
    const sql = `
    SELECT markak.marka_nev,COUNT(telefonok.telefon_id) as "db"
    FROM markak
    LEFT JOIN telefonok
    ON telefonok.marka_id = markak.marka_id
    GROUP BY markak.marka_nev  
ORDER BY db ASC;
  `;

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Nincs adat" });
        }

        return res.status(200).json(result);
    });
});

//2.feladat

app.delete("/markaTorles/:marka_id", (req, res) => {
    const { marka_id } = req.params;

    const sql = `DELETE FROM markak WHERE marka_id = ?`;

    pool.query(sql, [marka_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba" });
        }

        return res.status(200).json({ message: "Sikeres törlés" });
    });
});

//3.feladat

app.put("/markaModosit/:marka_id", (req, res) => {
    const { marka_id } = req.params;
    const {marka_nev} = req.body;

    const sql = `
    UPDATE markak
    SET marka_nev = ?
    WHERE marka_id = ?
  `;

    pool.query(
        sql,
        [marka_nev, marka_id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Hiba" });
            }

            return res.status(200).json({ message: "Sikeres módosítás" });
        }
    );
});


//4.feladat

app.post("/markaFelvitel",[
        body("marka_nev")
            .trim()
            .isLength({ min: 2,max:20 })
            .withMessage("A márka nevének 2 és 20 karakter közöttinek kell lennie."),
    ], (req, res) => {
    const {marka_nev,} = req.body;

    if (handleValidationErrors(req, res)) return;
    
    const sql = `
    INSERT INTO markak
    VALUES (null, ?)
  `;

    pool.query(
        sql,
        [marka_nev],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Hiba" });
            }

            return res.status(200).json({ message: "Sikeres felvitel" });
        }
    );
});




app.listen(port, () => {
    console.log(`A szerver fut a ${port} porton`)
})