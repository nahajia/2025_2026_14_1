const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const { body, validationResult } = require('express-validator')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek",express.static("kepek"))

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'husvet'
})

function handleValidationErrors(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return true
    }
    return false
}

app.get('/', (req, res) => {
    res.send('Húsvéti locsolóversek backend működik!')
})

app.get('/stilusok', (req, res) => {
    const sql = `SELECT * FROM stilusok`

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Hiba' })
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nincs adat' })
        }

        return res.status(200).json(result)
    })
})

app.get('/locsoloversek', (req, res) => {
    const sql = `
        SELECT *
        FROM locsoloversek
        INNER JOIN stilusok
        ON locsoloversek.stilus_id = stilusok.stilus_id
    `

    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Hiba' })
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nincs adat' })
        }

        return res.status(200).json(result)
    })
})

app.post('/versKereses',
    [
        body('szo')
            .notEmpty().withMessage('A keresett szó megadása kötelező')
            .isLength({ min: 2 }).withMessage('A keresett szó legalább 2 karakter legyen')
    ],
    (req, res) => {

        if (handleValidationErrors(req, res)) return

        const { szo } = req.body

        const sql = `
            SELECT *
            FROM locsoloversek
            INNER JOIN stilusok
            ON locsoloversek.stilus_id = stilusok.stilus_id
            WHERE vers LIKE ?
        `

        pool.query(sql, [`%${szo}%`], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: 'Hiba' })
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Nincs ilyen szövegű vers' })
            }

            return res.status(200).json(result)
        })
    }
)

app.post('/ujLocsolovers',
    [
        body('cim')
            .notEmpty().withMessage('A cím megadása kötelező'),
        body('vers')
            .notEmpty().withMessage('A vers megadása kötelező'),
        body('keletkezes_ev')
            .optional({ nullable: true })
            .isInt({ min: 0 }).withMessage('A keletkezési év csak pozitív egész szám lehet'),
        body('olvasasi_ido_perc')
            .optional({ nullable: true })
            .isFloat({ min: 0 }).withMessage('Az olvasási idő csak pozitív szám lehet'),
        body('kedvelesek_szama')
            .optional({ nullable: true })
            .isInt({ min: 0 }).withMessage('A kedvelések száma csak pozitív egész szám lehet'),
        body('stilus_id')
            .isInt({ min: 1 }).withMessage('A stílus azonosító csak pozitív egész szám lehet')
    ],
    (req, res) => {

        if (handleValidationErrors(req, res)) return

        const {
            cim,
            vers,
            keletkezes_ev,
            olvasasi_ido_perc,
            kedvelesek_szama,
            stilus_id
        } = req.body

        const sql = `
            INSERT INTO locsoloversek
            (cim, vers, keletkezes_ev, olvasasi_ido_perc, kedvelesek_szama, stilus_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `

        pool.query(
            sql,
            [
                cim,
                vers,
                keletkezes_ev ?? null,
                olvasasi_ido_perc ?? null,
                kedvelesek_szama ?? 0,
                stilus_id
            ],
            (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ error: 'Hiba' })
                }

                return res.status(201).json({
                    message: 'Új locsolóvers sikeresen felvéve',
                    id: result.insertId
                })
            }
        )
    }
)

app.post("/keres/cim", (req, res) => {
    const { szoveg } = req.body;

    if (!szoveg || szoveg.trim() === "") {
        return res.status(400).json({ message: "A keresési szöveg nem lehet üres." });
    }

    const sql = `
        SELECT 
            locsoloversek.locsolovers_id,
            locsoloversek.cim,
            locsoloversek.vers,
            locsoloversek.keletkezes_ev,
            locsoloversek.olvasasi_ido_perc,
            locsoloversek.kedvelesek_szama,
            stilusok.stilus_nev
        FROM locsoloversek
        INNER JOIN stilusok ON locsoloversek.stilus_id = stilusok.stilus_id
        WHERE locsoloversek.cim LIKE ?
    `;

    pool.query(sql, [`%${szoveg.trim()}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Adatbázis hiba." });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Nincs találat." });
        }

        res.status(200).json(results);
    });
});

app.post("/keres/kedveles", (req, res) => {
    const { ertek } = req.body;

    if (ertek === undefined || isNaN(ertek)) {
        return res.status(400).json({ message: "Érvénytelen érték." });
    }

    const sql = `
        SELECT 
            locsoloversek.locsolovers_id,
            locsoloversek.cim,
            locsoloversek.vers,
            locsoloversek.keletkezes_ev,
            locsoloversek.olvasasi_ido_perc,
            locsoloversek.kedvelesek_szama,
            stilusok.stilus_nev
        FROM locsoloversek
        INNER JOIN stilusok ON locsoloversek.stilus_id = stilusok.stilus_id
        WHERE locsoloversek.kedvelesek_szama >= ?
    `;

    pool.query(sql, [ertek], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Adatbázis hiba." });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Nincs találat." });
        }

        res.status(200).json(results);
    });
});

app.post("/stilusok", (req, res) => {
    const { stilus_nev } = req.body;

    if (!stilus_nev) {
        return res.status(400).json({
            message: "A stílus neve kötelező."
        });
    }

    const ujStilusNev = stilus_nev.trim();

    if (ujStilusNev.length < 3 || ujStilusNev.length > 15) {
        return res.status(400).json({
            message: "A stílus neve 3 és 15 karakter között lehet."
        });
    }

    const checkSql = "SELECT * FROM stilusok WHERE stilus_nev = ?";

    pool.query(checkSql, [ujStilusNev], (checkErr, checkResults) => {
        if (checkErr) {
            console.error(checkErr);
            return res.status(500).json({
                message: "Adatbázis hiba történt."
            });
        }

        if (checkResults.length > 0) {
            return res.status(409).json({
                message: "Ez a stílusnév már létezik."
            });
        }

        const insertSql = "INSERT INTO stilusok (stilus_nev) VALUES (?)";

        pool.query(insertSql, [ujStilusNev], (insertErr, insertResult) => {
            if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({
                    message: "Adatbázis hiba történt."
                });
            }

            return res.status(201).json({
                message: "Új stílus felvétele sikeres.",
                id: insertResult.insertId,
                stilus_nev: ujStilusNev
            });
        });
    });
});

app.put("/stilusok/:id", (req, res) => {
    const id = req.params.id;
    const { stilus_nev } = req.body;

    if (!id || isNaN(id)) {
        return res.status(400).json({
            message: "Érvénytelen azonosító."
        });
    }

    if (!stilus_nev) {
        return res.status(400).json({
            message: "A stílus neve kötelező."
        });
    }

    const ujStilusNev = stilus_nev.trim();

    if (ujStilusNev.length < 3 || ujStilusNev.length > 15) {
        return res.status(400).json({
            message: "A stílus neve 3 és 15 karakter között lehet."
        });
    }

    const checkSql = "SELECT * FROM stilusok WHERE stilus_id = ?";

    pool.query(checkSql, [id], (checkErr, checkResults) => {
        if (checkErr) {
            console.error(checkErr);
            return res.status(500).json({
                message: "Adatbázis hiba történt."
            });
        }

        if (checkResults.length === 0) {
            return res.status(404).json({
                message: "A megadott stílus nem található."
            });
        }

        const existsSql = "SELECT * FROM stilusok WHERE stilus_nev = ? AND stilus_id != ?";

        pool.query(existsSql, [ujStilusNev, id], (existsErr, existsResults) => {
            if (existsErr) {
                console.error(existsErr);
                return res.status(500).json({
                    message: "Adatbázis hiba történt."
                });
            }

            if (existsResults.length > 0) {
                return res.status(409).json({
                    message: "Ez a stílusnév már létezik."
                });
            }

            const updateSql = "UPDATE stilusok SET stilus_nev = ? WHERE stilus_id = ?";

            pool.query(updateSql, [ujStilusNev, id], (updateErr) => {
                if (updateErr) {
                    console.error(updateErr);
                    return res.status(500).json({
                        message: "Adatbázis hiba történt."
                    });
                }

                return res.status(200).json({
                    message: "A stílus módosítása sikeres."
                });
            });
        });
    });
});

app.delete("/stilusok/:id", (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        return res.status(400).json({
            message: "Érvénytelen azonosító."
        });
    }

    const checkSql = "SELECT * FROM stilusok WHERE stilus_id = ?";

    pool.query(checkSql, [id], (checkErr, checkResults) => {
        if (checkErr) {
            console.error(checkErr);
            return res.status(500).json({
                message: "Adatbázis hiba történt."
            });
        }

        if (checkResults.length === 0) {
            return res.status(404).json({
                message: "A megadott stílus nem található."
            });
        }

        const usedSql = "SELECT COUNT(*) AS db FROM locsoloversek WHERE stilus_id = ?";

        pool.query(usedSql, [id], (usedErr, usedResults) => {
            if (usedErr) {
                console.error(usedErr);
                return res.status(500).json({
                    message: "Adatbázis hiba történt."
                });
            }

            if (usedResults[0].db > 0) {
                return res.status(409).json({
                    message: "A stílus nem törölhető, mert tartozik hozzá locsolóvers."
                });
            }

            const deleteSql = "DELETE FROM stilusok WHERE stilus_id = ?";

            pool.query(deleteSql, [id], (deleteErr) => {
                if (deleteErr) {
                    console.error(deleteErr);
                    return res.status(500).json({
                        message: "Adatbázis hiba történt."
                    });
                }

                return res.status(200).json({
                    message: "A stílus törlése sikeres."
                });
            });
        });
    });
});
/*
app.post('/felvitelVersenyzo', (req, res) => {
        const {nev, szakma, orszag, pont}=req.body
        const sql=`
                INSERT Into versenyzo VALUES (Null,?,?,?,?)
                `
        pool.query(sql,[nev, szakma, orszag, pont], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({Message:"Sikeres!"})
        })
})
app.delete('/versneyzoTorles/:v_id', (req, res) => {
        const {v_id} =req.params
        const sql=`delete from versenyzo where id=?`
        pool.query(sql,[v_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})

app.put('/versenyzoModosit/:v_id', (req, res) => {
        const {v_id} =req.params
        const {nev,szakmaId,orszagId,pont}=req.body
        const sql=`update versenyzo 
                    set nev=?,szakmaId=?,orszagId=?,pont=?
                    where id=?
                    `
        pool.query(sql,[nev,szakmaId,orszagId,pont,v_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres módosítás"})
        })
})


*/


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})