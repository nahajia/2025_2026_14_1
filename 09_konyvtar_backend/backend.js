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
//könyv keresése id alapján
app.post('/konyvKeresId', (req, res) => {
        const {konyv_id} =req.body
        const sql=`
                    select *
                    from konyv
                    where konyv.konyv_id= ?
                    `
        pool.query(sql,[konyv_id], (err, result) => {
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
//keres :bemenet: nap kivitték, könyv id,  kimenet:minden
app.post('/napKonyvKeres', (req, res) => {
        const {datum,konyv} =req.body
        const sql=`
                    select *
                    from olvaso
                    inner join kolcsonzes
                    on olvaso.olvaso_id=kolcsonzes.kolcsonzes_olvaso
                    inner join konyv
                    on konyv.konyv_id=kolcsonzes.kolcsonzes_konyv
                    where kolcsonzes.kolcsonzes_datumki=? and konyv.konyv_id=?
                    `
        pool.query(sql,[datum,konyv], (err, result) => {
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
//konyv törlése id alapján
app.delete('/konyvTorles/:konyv_id', (req, res) => {
        const {konyv_id} =req.params
        const sql=`delete from konyv where konyv.konyv_id=?`
        pool.query(sql,[konyv_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})
//kölcsönzés törlése, adott dátum alapján
app.delete('/kolcsDatumTorles', (req, res) => {
        const {datum} =req.body
        const sql=`delete from kolcsonzes 
                    where kolcsonzes.kolcsonzes_datumki=?`
        pool.query(sql,[datum], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres törlés"})
        })
})
//olvasó módosítás
app.put('/olvasoModosit/:olvaso_id', (req, res) => {
        const {olvaso_id} =req.params
        const {olvaso_nev,olvaso_email}=req.body
        const sql=`update olvaso 
                    set olvaso.olvaso_nev=?,olvaso.olvaso_email=?
                    where olvaso.olvaso_id=?
                    `
        pool.query(sql,[olvaso_nev,olvaso_email,olvaso_id], (err, result) => {
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


