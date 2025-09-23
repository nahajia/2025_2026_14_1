const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

app.use(express.json())

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'konyvtar2025'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//olvasok lekérdezése
app.get('/olvaso', (req, res) => {
        const sql=`SELECT * from olvaso`
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
//konyvek lekérdezése
app.get('/konyv', (req, res) => {
        const sql=`SELECT * from konyv`
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
//kölcsönzések, összes adat
app.get('/kolcsonzes', (req, res) => {
        const sql=`
                    select *
                    from olvaso
                    inner join kolcsonzes
                    on olvaso.olvaso_id=kolcsonzes.kolcsonzes_olvaso
                    inner join konyv
                    on konyv.konyv_id=kolcsonzes.kolcsonzes_konyv;`
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

//könyv keresése
app.post('/konyvKeres', (req, res) => {
        const {konyv_cim} =req.body
        const sql=`
                SELECT * 
                from konyv 
                where konyv.konyv_cim like ?   `
        pool.query(sql,[`%${konyv_cim}%`], (err, result) => {
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
//kölcsönzés keresés, olvasó nevének részletére
app.post('/kolcsonzesKeres', (req, res) => {
        const {szemely} =req.body
        const sql=`
                    select *
                    from olvaso
                    inner join kolcsonzes
                    on olvaso.olvaso_id=kolcsonzes.kolcsonzes_olvaso
                    inner join konyv
                    on konyv.konyv_id=kolcsonzes.kolcsonzes_konyv
                    where olvaso.olvaso_nev like ?
                    `
        pool.query(sql,[`%${szemely}%`], (err, result) => {
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


