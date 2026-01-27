const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
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
        database: 'jatek2025'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tipus', (req, res) => {
        const sql=`SELECT * from tipus`
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
app.get('/jatek', (req, res) => {
        const sql=`
                select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id`
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

app.post('/jatekKeresTip', (req, res) => {
        const {tipus_id} =req.body
        const sql=`
                select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id
                where tipus_id=?
                `
        pool.query(sql,[tipus_id], (err, result) => {
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

app.post('/jatekKeresNev', (req, res) => {
        const {szoveg} =req.body
        const sql=`
                select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id
                where jatek_nev like ?
                `
        pool.query(sql,[`%${szoveg}%`], (err, result) => {
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

app.post('/jatekKeresErtek', (req, res) => {
        const {ertek} =req.body
        const sql=`
                select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id
                where jatek_ertekeles >= ?
                `
        pool.query(sql,[ertek], (err, result) => {
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
app.delete('/jatekTorles/:jatek_id', (req, res) => {
        const {jatek_id} =req.params
        const sql=`delete from jatek where jatek_id=?`
        pool.query(sql,[jatek_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})

app.post('/jatekFelvitel', (req, res) => {
        const {jatek_nev,jatek_ertekeles,jatek_ar,jatek_leiras,jatek_tipus}=req.body
        const sql=`insert into jatek 
                    values (null,?,?,?,?,?)
                    `
        pool.query(sql,[jatek_nev,jatek_ertekeles,jatek_ar,jatek_leiras,jatek_tipus], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres felvitel"})
        })
})

app.get('/jatekEgy/:jatek_id', (req, res) => {
        const {jatek_id} =req.params
        const sql=`
                select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id
                where jatek_id=?
                `
        pool.query(sql,[jatek_id], (err, result) => {
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

app.put('/jatekModosit/:jatek_id', (req, res) => {
        const {jatek_id} =req.params
        const {jatek_nev,jatek_ertekeles,jatek_ar,jatek_leiras,jatek_tipus}=req.body
        const sql=`update jatek 
                    set jatek_nev=?,jatek_ertekeles=?,jatek_ar=?,jatek_leiras=?,jatek_tipus=?
                    where jatek_id=?
                    `
        pool.query(sql,[jatek_nev,jatek_ertekeles,jatek_ar,jatek_leiras,jatek_tipus,jatek_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres módosítás"})
        })
})

//---------------------- DOLGOZAT --------------------------------------------------------------------------------------------------------------------------------------------

//1. feladat
app.get('/jatekSzamolTipusonkent', (req, res) => {

        const sql=`
                    SELECT tipus_nev, Count(*) AS játék_db 
                    FROM jatek 
                    INNER JOIN tipus ON jatek_tipus = tipus_id 
                    GROUP BY jatek_tipus;
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

//2. feladat
app.post('/jatekKeresArakKozott', (req, res) => {
        const {minAr, maxAr} =req.body
        const sql=`
                    SELECT * 
                    FROM jatek 
                    WHERE jatek_ar >= ? AND jatek_ar <= ?;
                `
        pool.query(sql,[minAr, maxAr], (err, result) => {
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

//3. feladat
app.post('/tipusFelvitel', (req, res) => {
        const {tipusNev}=req.body
        const sql=`insert into tipus 
                    values (null,?)
                    `
        pool.query(sql,[tipusNev], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres felvitel"})
        })
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


