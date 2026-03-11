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
        database: 'kiralyok2026'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/minden', (req, res) => {
        const sql=`
                select uralkodo.nev as nev, hivatal.mettol as mettol, hivatal.meddig as meddig
                from uralkodo
                inner join uralkodohaz
                on uralkodo.uhaz_az=uralkodohaz.azon
                inner join hivatal
                on uralkodo.azon=hivatal.uralkodo_az
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
app.get('/hivatal', (req, res) => {
        const sql=`
                select *
                from hivatal
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
app.get('/uralkodo', (req, res) => {
        const sql=`
                select *
                from uralkodo
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
app.get('/uralkodohaz', (req, res) => {
        const sql=`
                select *
                from uralkodohaz
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

app.post('/felvitelHivatal', (req, res) => {
        const {uralkodo_az,mettol,meddig,koronazas}=req.body
        const sql=`
                INSERT Into hivatal VALUES (null,?,?,?,?)
                `
        pool.query(sql,[uralkodo_az,mettol,meddig,koronazas], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres!"})
        })
})
app.post('/felvitelUralkodo', (req, res) => {
        const {nev,ragnev,szul,hal,uhaz_az}=req.body
        const sql=`
                INSERT Into uralkodo VALUES (null,?,?,?,?,?)
                `
        pool.query(sql,[nev,ragnev,szul,hal,uhaz_az], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres!"})
        })
})
app.post('/felvitelUralkodoHaz', (req, res) => {
        const {nev}=req.body
        const sql=`
                INSERT Into uralkodohaz VALUES (null,?)
                `
        pool.query(sql,[nev], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres!"})
        })
})
app.post('/keresUralkodo', (req, res) => {
        const {szo}=req.body
        const sql=`
                select *
                from uralkodo
                where uralkodo.nev like ?
                `
        pool.query(sql,[`%${szo}%`], (err, result) => {
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
app.post('/keresHazUralkodo', (req, res) => {
        const {szo}=req.body
        const sql=`
                select uralkodo.nev as nev,uralkodo.szul as szul,uralkodo.hal as hal,uralkodo.uhaz_az as uhaz_az,uralkodohaz.nev as unev
                from uralkodo
                inner join uralkodohaz
                on uralkodo.uhaz_az=uralkodohaz.azon
                where uralkodohaz.nev like ?
                `
        pool.query(sql,[`%${szo}%`], (err, result) => {
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


