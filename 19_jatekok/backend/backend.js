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
        database: 'jatek2025'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tipus', (req, res) => {
        const sql=`SELECT * from tipus`
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
app.post('/jatekKeresTip', (req, res) => {
        const {tipus_id} =req.body
        const sql=`
                select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id
                where tipus_id=?
                `
        pool.query(sql,[tipus_id], (err, result) => {
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


