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
//adott ártól drágább termékek neve, ára
app.post('/termekArNagyobb', (req, res) => {
    const sql=`
        select termek.termek_nev,termek.termek_ar
        from termek
        where termek.termek_ar>?;
        `
      pool.query(sql,[req.body.tipus_ar] , (err, result) => {
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
//adott terméktípusra, amely egy adott ártól drágább
app.post('/tipusArSzerint', (req, res) => {
    const {tipus_nev,termek_ar} =req.body
    const sql=`
        select *
        FROM termek
        inner join tipus
        on termek.termek_tipus=tipus.tipus_id
        where tipus.tipus_nev=? and termek.termek_ar>?
        `
      pool.query(sql,[tipus_nev,termek_ar] , (err, result) => {
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
//adott típusnevű, adott ártól olcsóbb
app.post('/tipusArOlcsobb', (req, res) => {
    const {bevitel1,bevitel2} =req.body
    const sql=`
        select *
        FROM termek
        inner join tipus
        on termek.termek_tipus=tipus.tipus_id
        where tipus.tipus_nev=? and termek.termek_ar<?
        `
      pool.query(sql,[bevitel1,bevitel2] , (err, result) => {
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
//új tipus felvitele
app.post('/tipusFelvitel', (req, res) => {
    const {bevitel1} =req.body
    const sql=`insert into tipus values (null,?)`
    pool.query(sql,[bevitel1] , (err, result) => {
        if (err){
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        return res.status(201).json({message:"Sikeres felvitel!"})
    })
})
//új termék felvitele
app.post('/termekFelvitel', (req, res) => {
    const {termek_nev,termek_ar,termek_tipus} =req.body
    const sql=`insert into termek values (null,?,?,?)`
    pool.query(sql,[termek_nev,termek_ar,termek_tipus] , (err, result) => {
        if (err){
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        return res.status(201).json({message:"Sikeres felvitel!"})
    })
})
//termék törlése
app.delete('/termekTorles', (req, res) => {
    const {termek_id} =req.body
    const sql=`delete from termek where termek.termek_id=?`
    pool.query(sql,[termek_id] , (err, result) => {
        if (err){
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        return res.status(200).json({message:"Sikeres törlés!"})
    })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
