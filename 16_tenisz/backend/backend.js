const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'teniszforum2025'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//*********************lekérdezi a bejegyzéseket, játékos nevével együtt
app.get('/bejegyzes', (req, res) => {
        const sql=`
                SELECT * 
                from bejegyzes
                inner join jatekos
                on bejegyzes_jatekos=jatekos_id
                order by bejegyzes_id 
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
app.get('/bejegyzesCsokk', (req, res) => {
        const sql=`
                SELECT * 
                from bejegyzes
                inner join jatekos
                on bejegyzes_jatekos=jatekos_id
                order by bejegyzes_id desc
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
//két plusz rendezés: játékos neve szerint növ, csökk


//***********************lekérdezi a játékos nevét
app.get('/jatekos', (req, res) => {
        const sql=`
                SELECT * 
                from jatekos
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
//************************* bejegyzés felvitele
app.post('/bejegyzesFelvitel', (req, res) => {
        const {bejegyzes_szoveg,bejegyzes_datum,bejegyzes_ki,bejegyzes_jatekos} =req.body
        const sql=`insert into bejegyzes values (null,?,?,?,?)`
        pool.query(sql,[bejegyzes_szoveg,bejegyzes_datum,bejegyzes_ki,bejegyzes_jatekos], (err, result) => {
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


