const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { body, param, validationResult } = require("express-validator");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/kepek", express.static("kepek"));
app.use("/kepek2", express.static("kepek2"));

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "telefonbolt",
});

function handleValidationErrors(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/markak", (req, res) => {
    const sql = `SELECT * FROM markak`;

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

app.get("/telefonok", (req, res) => {
    const sql = `
    SELECT *
    FROM telefonok
    INNER JOIN markak
    ON telefonok.marka_id = markak.marka_id
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

app.post("/telefonokMarkaSzerint", (req, res) => {
    const { marka_id } = req.body;

    const sql = `
    SELECT *
    FROM telefonok
    INNER JOIN markak
    ON telefonok.marka_id = markak.marka_id
    WHERE markak.marka_id = ?
  `;

    pool.query(sql, [marka_id], (err, result) => {
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

app.post(
    "/telefonKeresNev",
    [body("szoveg").trim().isLength({ min: 1 }).withMessage("A keresendő szöveg minimum 1 karakter!")],
    (req, res) => {
        if (handleValidationErrors(req, res)) return;

        const { szoveg } = req.body;

        const sql = `
      SELECT *
      FROM telefonok
      INNER JOIN markak
      ON telefonok.marka_id = markak.marka_id
      WHERE modell LIKE ?
    `;

        pool.query(sql, [`%${szoveg}%`], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Hiba" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "Nincs adat" });
            }

            return res.status(200).json(result);
        });
    }
);

app.post("/telefonKeresKijelzo", (req, res) => {
    const { ertek } = req.body;

    const sql = `
    SELECT *
    FROM telefonok
    INNER JOIN markak
    ON telefonok.marka_id = markak.marka_id
    WHERE kijelzo_merete >= ?
  `;

    pool.query(sql, [ertek], (err, result) => {
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

app.delete("/telefonTorles/:telefon_id", (req, res) => {
    const { telefon_id } = req.params;

    const sql = `DELETE FROM telefonok WHERE telefon_id = ?`;

    pool.query(sql, [telefon_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba" });
        }

        return res.status(200).json({ message: "Sikeres törlés" });
    });
});

app.post("/telefonFelvitel", (req, res) => {
    const {
        marka_id,
        modell,
        leiras,
        uj_ar,
        hasznalt_ar,
        kijelzo_merete,
        okostelefon,
    } = req.body;

    const sql = `
    INSERT INTO telefonok
    VALUES (null, ?, ?, ?, ?, ?, ?, ?)
  `;

    pool.query(
        sql,
        [marka_id, modell, leiras, uj_ar, hasznalt_ar, kijelzo_merete, okostelefon],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Hiba" });
            }

            return res.status(200).json({ message: "Sikeres felvitel" });
        }
    );
});

app.get(
    "/telefonEgy/:telefon_id",
    [
        param("telefon_id")
            .trim()
            .isInt({ min: 1 })
            .withMessage("Az id csak pozitív egész szám lehet"),
    ],
    (req, res) => {
        const { telefon_id } = req.params;

        if (handleValidationErrors(req, res)) return;

        const sql = `
      SELECT *
      FROM telefonok
      INNER JOIN markak
      ON telefonok.marka_id = markak.marka_id
      WHERE telefon_id = ?
    `;

        pool.query(sql, [telefon_id], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Hiba" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "Nincs adat" });
            }

            return res.status(200).json(result);
        });
    }
);

app.put("/telefonModosit/:telefon_id", (req, res) => {
    const { telefon_id } = req.params;
    const {
        marka_id,
        modell,
        leiras,
        uj_ar,
        hasznalt_ar,
        kijelzo_merete,
        okostelefon,
    } = req.body;

    const sql = `
    UPDATE telefonok
    SET marka_id = ?, modell = ?, leiras = ?, uj_ar = ?, hasznalt_ar = ?, kijelzo_merete = ?, okostelefon = ?
    WHERE telefon_id = ?
  `;

    pool.query(
        sql,
        [marka_id, modell, leiras, uj_ar, hasznalt_ar, kijelzo_merete, okostelefon, telefon_id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Hiba" });
            }

            return res.status(200).json({ message: "Sikeres módosítás" });
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});