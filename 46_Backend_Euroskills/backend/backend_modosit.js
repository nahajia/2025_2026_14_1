const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const {body,param,validationResult} =require("express-validator")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek",express.static("kepek"))
app.use("/kepek2",express.static("kepek2"))

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'euroskills2026'
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

//1. új szakma felvitele
app.post('/ujSzakma',
        [
            body("szakma")
                .trim()
                .isLength({min:1}).withMessage("A keresendő min 1 karakter")
                .isLength({max:10}).withMessage("A keresendő max 10 karakter")
        ], (req, res) => {
        const {id,szakma}=req.body
        
        if (handleValidationErrors(req,res)) return 

        const sql=`
                INSERT Into szakma VALUES (?,?)
                `
        pool.query(sql,[id,szakma], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({Message:"Sikeres felvitel!"})
        })
})
//2. szakma törlése
app.delete('/szakmaTorles/:id', (req, res) => {
        const {id} =req.params
        const sql=`delete from szakma where id=?`
        pool.query(sql,[id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})
//----------------3.sZAKMA MÓDOSÍTÁS

app.put('/szakmaModosit/:id', (req, res) => {
        const {id} =req.params
        const {szakmaNev}=req.body
        const sql=`update szakma 
                    set szakmaNev=?
                    where id=?
                    `
        pool.query(sql,[szakmaNev,id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres módosítás"})
        })
})

//4.Újország felvitel

app.post('/ujOrszag', (req, res) => {
        const {id,orszagNev}=req.body
        const sql=`
                INSERT Into orszag VALUES (?,?)
                `
        pool.query(sql,[id,orszagNev], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({Message:"Sikeres felvitel!"})
        })
})

//5. ország törlése
app.delete('/orszagTorles/:id', (req, res) => {
        const {id} =req.params
        const sql=`delete from orszag where id=?`
        pool.query(sql,[id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})

//6. ország módosítása
app.put('/orszagModosit/:id', (req, res) => {
        const {id} =req.params
        const {orszagNev}=req.body
        const sql=`update orszag 
                    set orszagNev=?
                    where id=?
                    `
        pool.query(sql,[orszagNev,id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres módosítás"})
        })
})

// 7. egy ország id alapján
// 14. validáció: 7-esnél csak szöveg lehessen 

app.get('/egyOrszag/:id',
        (req, res) => {
        const {id} =req.params
        if (!isNaN(id)){
                return res.status(500).json({error:"Szöveget kell megadni az ország megkersésére!"})
        }
        const sql=`
                select *
                from orszag
                where id=?
                `
        pool.query(sql,[id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
//8.
app.get('/egySzakma/:id',       
        (req, res) => {
        const {id} =req.params        
        const sql=`
                select *
                from szakma
                where id=?
                `
        pool.query(sql,[id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
//9.
app.get('/egyVersenyzo/:id',       
        (req, res) => {
        const {id} =req.params        
        const sql=`
                select *
                from szakma
                inner join versenyzo
                on szakma.id = versenyzo.szakmaId
                inner join orszag
                on versenyzo.orszagId = orszag.id
                where versenyzo.id=?
                `
        pool.query(sql,[id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

// 10. feladat:

app.get('/orszagonkentHany',       
        (req, res) => {      
        const sql=`
                SELECT orszag.orszagNev, COUNT(orszag.orszagNev)
                FROM orszag
                INNER JOIN versenyzo
                ON orszag.id = versenyzo.orszagId
                GROUP BY orszag.orszagNev;
                `
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

// 11. Szakmánként hány
app.get('/szakmankentHany',       
        (req, res) => {      
        const sql=`
                SELECT szakma.szakmaNev, COUNT(szakma.szakmaNev)
                FROM szakma
                INNER JOIN versenyzo
                ON versenyzo.szakmaId = szakma.id
                GROUP BY szakma.szakmaNev;
                `
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

// 12. keresés: versenyzők, ország név alapján

app.post('/orszagKeres',
        [
            body("orszagNev")
                .trim()
                .isLength({min:1}).withMessage("A keresendő min 1 karakter")
        ] ,       
        (req, res) => {
        const {orszagNev}=req.body  
        
        if (handleValidationErrors(req,res)) return 

        const sql=`
                select *
                from szakma
                inner join versenyzo
                on szakma.id = versenyzo.szakmaId
                inner join orszag
                on versenyzo.orszagId = orszag.id
                where orszag.orszagNev LIKE ?;
                `
        pool.query(sql, [`%${orszagNev}%`],(err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

// 13. keresés: versenyzők, szakma név alapján
app.post('/szakmaKeres',       
        (req, res) => {
        const {szakmaNev}=req.body             
        const sql=`
                select *
                from szakma
                inner join versenyzo
                on szakma.id = versenyzo.szakmaId
                inner join orszag
                on versenyzo.orszagId = orszag.id
                where szakma.szakmaNev LIKE ?;
                `
        pool.query(sql, [`%${szakmaNev}%`],(err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


