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
        database: 'jatekok'
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

//--------------------------------DOLGOZAT B csop

//tipus keresés
app.post('/tipusKeres', (req, res) => {
        const {szoveg} =req.body
        const sql=`
                select jatek_nev
                from tipus
                inner join jatek
                on jatek_tipus=tipus_id
                where tipus_nev like ?
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

//tipus törlés

app.delete('/tipusTorles/:tipus_id', (req, res) => {
        const {tipus_id} =req.params
        const sql=`delete from tipus where tipus_id=?`
        pool.query(sql,[tipus_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})




//tipus módosítás

app.put('/tipusModosit/:tipus_id', (req, res) => {
        const {tipus_id} =req.params
        const {tipus_nev}=req.body
        const sql=`update tipus 
                    set tipus_nev=?
                    where tipus_id=?
                    `
        pool.query(sql,[tipus_nev,tipus_id], (err, result) => {
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


