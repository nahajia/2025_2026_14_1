const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

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
        if (err)
        {
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
        if (err)
        {
          console.log(err)
          return res.status(500).json({error:"Hiba"})
        }
        console.log(result)
        return res.status(200).json(result)
    })
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
