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





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


