const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const { body, param, validationResult } = require('express-validator')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'telefonbolt'
})

function handleValidationErrors(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    return null
}

app.get('/', (req, res) => {
    res.send('Telefonbolt backend működik!')
})

/* ------------------------------------- ÚJ VÉGPONTOK ---------------------------------- */



app.listen(port, () => {
    console.log(`A szerver fut a ${port} porton`)
})