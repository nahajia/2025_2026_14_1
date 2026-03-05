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
        database: 'euroskills2026'
        })

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
app.post('/keresMindketto', (req, res) => {
        const {szakma,orszag}=req.body
        if(szakma!="0"&& orszag!="0"){

        
                const sql=`
                        select *
                        from versenyzo
                        WHERE versenyzo.orszagId=? AND versenyzo.szakmaId=?
                        `
                pool.query(sql,[orszag,szakma], (err, result) => {
                if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
                }
                if (result.length===0){
                return res.status(404).json({error:"Nincs adat"})
                }

                return res.status(200).json(result)
                })
        }
        else if(szakma!="0"&& orszag=="0"){

        
                const sql=`
                        select *
                        from versenyzo
                        WHERE versenyzo.szakmaId=?
                        `
                pool.query(sql,[szakma], (err, result) => {
                if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
                }
                if (result.length===0){
                return res.status(404).json({error:"Nincs adat"})
                }

                return res.status(200).json(result)
                })
        }
        else if(szakma=="0"&& orszag!="0"){

        
                const sql=`
                        select *
                        from versenyzo
                        WHERE versenyzo.orszagId=?
                        `
                pool.query(sql,[orszag], (err, result) => {
                if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
                }
                if (result.length===0){
                return res.status(404).json({error:"Nincs adat"})
                }

                return res.status(200).json(result)
                })
        }
                
        
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


