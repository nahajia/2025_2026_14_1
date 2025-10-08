const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('kepek'))

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'marvel2025'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//film lekérdezése
app.get('/film', (req, res) => {
        const sql=`SELECT * from film`
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
//szavazat felvitele
app.post('/szavazatFelvitel', (req, res) => {
        const {szavazat_film} =req.body
        const sql=`insert into szavazat values (null,?)`
        pool.query(sql,[szavazat_film], (err, result) => {
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




