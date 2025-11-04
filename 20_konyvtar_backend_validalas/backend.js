const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const {body,param,validationResult} =require("express-validator")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'konyvtar2025'
        })

function handleValidationErrors(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
}


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
app.post('/konyvKeres',
        [
            body("konyv_cim")
                .trim().isLength({min:1}).withMessage("A keresendő szöveg minimum 1 karakter!")
            
        ]
        ,(req, res) => {
        
        if (handleValidationErrors(req,res)) return 

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
app.post('/kolcsonzesKeres',
        [
            body("szemely")
                .trim().isLength({min:1}).withMessage("A keresendő szöveg minimum 1 karakter!")
            
        ] 
        ,(req, res) => {

        if (handleValidationErrors(req,res)) return 

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
app.post('/konyvKeresId',
        [
            body("konyv_id")
                .trim()
                .notEmpty().withMessage("A könyv id megadása kötelező")
                .isInt({min:1}).withMessage("A könyv id-je csak pozitív egész szám lehet")
        ] 
        ,(req, res) => {

        if (handleValidationErrors(req,res)) return 
        
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
app.post('/napKonyvKeres',
        [
            body("konyv")
                .trim()
                .notEmpty().withMessage("A könyv id megadása kötelező")
                .isInt({min:1}).withMessage("A könyv id-je csak pozitív egész szám lehet"),
            body("datum")
                .trim()
                .notEmpty().withMessage("A dátum megadása kötelező")
                .isDate({format:'YYYY-MM-DD'}).withMessage("A dátum formátuma: YYYY-MM-DD pl. 2022-09-10 ")
        ]  
        , (req, res) => {
        
        if (handleValidationErrors(req,res)) return 

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
//konyv felvitele
app.post('/konyvFelvitel',
        [
            body("konyv_cim")
                .trim()
                .notEmpty().withMessage("A könyv cím megadása kötelező")
                .isLength({min:1}).withMessage("A könyv címe min 1 karakter")
                .isLength({max:20}).withMessage("A könyv címe  max 20 karakter"),
            body("konyv_ev")
                .trim()
                .notEmpty().withMessage("A könyv kiadási évének megadása kötelező")
                .isInt({min:1900}).withMessage("Az év nagyobb kell hogy legyen, mint 1900")
                .isInt({max:new Date().getFullYear()}).withMessage(`Az év felső határa: ${new Date().getFullYear()}`)

            
        ] 
        , (req, res) => {

        if (handleValidationErrors(req,res)) return 

        const {konyv_cim,konyv_ev} =req.body
        const sql=`insert into konyv values (null,?,?)`
        pool.query(sql,[konyv_cim,konyv_ev], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        
        return res.status(200).json({message:"Sikeres felvitel"})
        })
})

//konyv törlése id alapján
app.delete('/konyvTorles/:konyv_id',
    [
        param("konyv_id")
            .trim()
            .isInt({min:1}).withMessage("A könyv id-ja poz egész szám kell hogy legyen")
    ]
    ,(req, res) => {

        if (handleValidationErrors(req,res)) return 


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
app.put('/olvasoModosit/:olvaso_id',
    [
        param("olvaso_id")
            .trim()
            .isInt({min:1}).withMessage("A olvasó id-ja poz egész szám kell hogy legyen"),
        body("olvaso_nev")
                .trim()
                .notEmpty().withMessage("A olvasó nevének megadása kötelező")
                .isLength({min:1}).withMessage("A olvasó neve min 1 karakter")
                .isLength({max:20}).withMessage("A olvasó neve max 20 karakter"),
        body("olvaso_email")
                .trim()
                .notEmpty().withMessage("A olvasó nevének megadása kötelező")
                .isEmail().withMessage("Email címet kell megadni: pl. bela@gmail.com")

    ]
    , (req, res) => {

        if (handleValidationErrors(req,res)) return 

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
//konyv módosítás
app.put('/konyvModosit/:konyv_id', (req, res) => {
        const {konyv_id} =req.params
        const {konyv_cim,konyv_ev}=req.body
        const sql=`update konyv 
                    set konyv.konyv_cim=?,konyv.konyv_ev=?
                    where konyv.konyv_id=?
                    `
        pool.query(sql,[konyv_cim,konyv_ev,konyv_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres módosítás"})
        })
})
//patch , csak rész adat módosítás: id - param, datumbe body
app.patch('/kolcsDatumbeModosit/:kolcsonzes_id', (req, res) => {
        const {kolcsonzes_id} =req.params
        const {kolcsonzes_datumbe}=req.body
        const sql=`update kolcsonzes
                    set kolcsonzes.kolcsonzes_datumbe=?
                    where kolcsonzes.kolcsonzes_id=?
                    `
        pool.query(sql,[kolcsonzes_datumbe,kolcsonzes_id], (err, result) => {
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


