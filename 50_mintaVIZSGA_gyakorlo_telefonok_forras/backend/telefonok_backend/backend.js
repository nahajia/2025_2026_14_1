const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { body, validationResult } = require("express-validator")

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek", express.static("kepek"))
app.use("/kepek2", express.static("kepek2"))

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
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/markak', (req, res) => {
    const sql = `SELECT * FROM markak`
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Hiba" })
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Nincs adat" })
        }

        return res.status(200).json(result)
    })
})

app.get('/telefonok', (req, res) => {
    const sql = `
        SELECT *
        FROM telefonok
        INNER JOIN markak
        ON telefonok.marka_id = markak.marka_id
    `
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Hiba" })
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Nincs adat" })
        }

        return res.status(200).json(result)
    })
})

app.post('/telefonUjArKereses',
    [
        body("minimum")
            .isInt({ min: 0 }).withMessage("A minimum ár csak 0 vagy pozitív egész szám lehet"),
        body("maximum")
            .isInt({ min: 0 }).withMessage("A maximum ár csak 0 vagy pozitív egész szám lehet")
    ],
    (req, res) => {

        if (handleValidationErrors(req, res)) return

        const { minimum, maximum } = req.body

        const sql = `
            SELECT *
            FROM telefonok
            INNER JOIN markak
            ON telefonok.marka_id = markak.marka_id
            WHERE uj_ar BETWEEN ? AND ?
        `

        pool.query(sql, [minimum, maximum], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: "Hiba" })
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "Nincs adat" })
            }

            return res.status(200).json(result)
        })
    }
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})