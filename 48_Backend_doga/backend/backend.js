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

app.get('/versenyzo', (req, res) => {
        const sql=`
                select *
                from versenyzo
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
app.post('/keresesNev', (req, res) => {
        const {keresendo}=req.body
        const sql=`
                select *
                from versenyzo 
                WHERE versenyzo.nev like ?
                `
        pool.query(sql,[`%${keresendo}%`], (err, result) => {
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
app.get('/szakma', (req, res) => {
        const sql=`
                select *
                from szakma
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
app.post('/keresSzakma', (req, res) => {
        const {azonosito}=req.body
        const sql=`
                select *
                from versenyzo
                WHERE versenyzo.szakmaId=?
                `
        pool.query(sql,[azonosito], (err, result) => {
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
app.get('/orszag', (req, res) => {
        const sql=`
                select *
                from orszag
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
app.post('/keresOrszag', (req, res) => {
        const {azonosito}=req.body
        const sql=`
                select *
                from versenyzo
                WHERE versenyzo.orszagId=?
                `
        pool.query(sql,[azonosito], (err, result) => {
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



app.get('/versenyzoEgy/:v_id',
        [
            param("v_id")
                .trim()
                .isInt({min:1}).withMessage("Az id csak pozitív egész szám lehet")
        ] 
        , (req, res) => {
        const {v_id} =req.params

        if (handleValidationErrors(req,res)) return 

        const sql=`
                select *
                from versenyzo
                where id=?
                `
        pool.query(sql,[v_id], (err, result) => {
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




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


