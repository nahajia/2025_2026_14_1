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
        database: 'szinkronhangok'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/film', (req, res) => {
        const sql=`
                select *
                from film
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
app.get('/szinkron', (req, res) => {
        const sql=`
                select *
                from szinkron
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
app.post('/keresettSzo', (req, res) => {
        const {szo} = req.body
        const sql=`
                select *
                from szinkron 
                where szerep like ? or szinesz like ? or hang like ?
                `
        pool.query(sql,[`%${szo}%`,`%${szo}%`,`%${szo}%`], (err, result) => {
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

app.post('/szinkronFelvitel', (req, res) => {
        const {filmaz,szerep,szinesz,hang} = req.body
        const sql=`
                INSERT INTO szinkron VALUES (Null,?,?,?,?)
                `
        pool.query(sql,[filmaz,szerep,szinesz,hang], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        

        return res.status(200).json({Message:"Sikerült a felvitel!"})
        })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


