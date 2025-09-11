const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'termek2025'
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tipus', (req, res) => {
    const sql=`SELECT * from tipus`
    pool.query(sql, (err, result) => {
        if (err){
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        console.log(result)
        return res.status(200).json(result)
    })
})

app.get('/termek', (req, res) => {
    const sql=`SELECT * from termek`
    pool.query(sql, (err, result) => {
        if (err){
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        console.log(result)
        return res.status(200).json(result)
    })
})

app.get('/kamu', (req, res) => {
    const sql=`SELECT * from kamu`
    pool.query(sql, (err, result) => {
        if (err){
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
          return res.status(404).json({error:"Nem található adat!"})
        }

        console.log(result)
        return res.status(200).json(result)
    })
})

//lekerdezi a termékek nevét, árát, típusát, 2 tábla
app.get('/termekTipus', (req, res) => {
    const sql=`
        select termek.termek_nev,termek.termek_ar,tipus.tipus_nev
        FROM termek
        inner join tipus
        on termek.termek_tipus=tipus.tipus_id;`
      pool.query(sql, (err, result) => {
        if (err){
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
          return res.status(404).json({error:"Nem található adat!"})
        }

        console.log(result)
        return res.status(200).json(result)
    })
})
//típus neve szerint kérdezze le a termékeket
app.post('/tipusSzerint', (req, res) => {
    const sql=`
        select termek.termek_nev,termek.termek_ar,tipus.tipus_nev
        FROM termek
        inner join tipus
        on termek.termek_tipus=tipus.tipus_id
        where tipus.tipus_nev=?
        `
      pool.query(sql,[req.body.tipus_nev] , (err, result) => {
        if (err){
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
          return res.status(404).json({error:"Nem található adat!"})
        }

        console.log(result)
        return res.status(200).json(result)
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
