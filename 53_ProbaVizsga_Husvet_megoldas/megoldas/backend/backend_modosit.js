const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const {body,param,validationResult} =require("express-validator")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek",express.static("kepek"))

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "husvet"
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


//-------------------------------------ÚJ végpontok----------------------------------


//stilus osszeszamol group by-al
app.get('/stilusok', (req, res) => {
    const sql = `SELECT stilusok.stilus_nev as "Stílus név",Count(locsoloversek.stilus_id) as "darabszám" FROM locsoloversek inner join stilusok on locsoloversek.stilus_id=stilusok.stilus_id group by stilusok.stilus_nev;`

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
/*Készítsen új végpontot, amely egy stílus törlését végzi azonosító alapján. 
A végpont minden beállítására figyeljen. 
Tesztelje a végpontot, és készítsen róla képernyőképe(ke)t. */
app.delete("/stilustorol/:id", (req, res) => {
    const id = req.params.id;

    const sql = "delete from stilusok where stilus_id=?";

     pool.query(sql,[id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Hiba' })
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nincs adat' })
        }

        return res.status(200).json({message: 'Sikeres törlés'})
    })
});
/*Készítsen új végpontot, amely egy stílus módosítását végzi azonosító alapján. 
A stílus nevét lehessen módosítani. A végpont minden beállítására figyeljen. 
Tesztelje a végpontot, és készítsen róla képernyőképe(ke)t. */
app.put("/stilusmodosit/:id", (req, res) => {
    const {id} = req.params;
    const {stilus_nev} = req.body;
    const sql = "UPDATE stilusok SET stilus_nev=? WHERE stilus_id=?";

     pool.query(sql,[stilus_nev,id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Hiba' })
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nincs adat' })
        }

        return res.status(200).json({message: 'Sikeres modósitás'})
        
    })
});
/*Készítsen új végpontot, amely egy új stílus felvitelét végzi. 
A végpont minden beállítására figyeljen. 
A végponthoz készítsen validációt, amely megoldja, hogy a megadott stílus neve legalább 3 karakter és legfeljebb 15 karakter hosszú legyen. 
Két tesztet készítsen a végpontról: egyet a sikeres felvitelről, egyet pedig a validáció hibájáról, és készítsen mindkettőről képernyőképe(ke)t.*/
app.post("/ujstilus", [
  body('stilus_nev')
           
            .isLength({ min: 3 , max:15 }).withMessage('A stílus név csak 3 és 15 karakter lehet'),
],(req, res) => {

    if (handleValidationErrors(req, res)) return


    const {stilus_nev} = req.body;
    const sql = "insert into stilusok values (null,?)";

     pool.query(sql,[stilus_nev], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Hiba' })
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Nincs adat' })
        }

        return res.status(200).json({message: 'Sikeres felvitel'})
    })
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


