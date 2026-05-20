const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const {body,param,validationResult} =require("express-validator")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek",express.static("kepek"))

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "husvet"
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


//-------------------------------------ÚJ végpontok----------------------------------







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


