const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const auth = require('./authMiddleware');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek",express.static("kepek"))
app.use("/kepek2",express.static("kepek2"))

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'marvel_2025_login'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//Bejelentkezéshez szükséges végpontok a login.js fájlban: login és register
//hivatkozas rajuk: /login/login illetve /login/register

const login = require('./login');
app.use('/login', login);








//Admin végpontjai
app.get('/felhasznalo',auth, (req, res) => {
    
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Nincs jogosultság" });
    }
     
    const sql = `SELECT felhasznalo_nev FROM felhasznalo`;

    pool.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Hiba" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Nincs adat" });
        }

        return res.status(200).json(result);
    });
});
//Admin funkció , felhasználó törlés, id alapján
app.delete('/felhasznaloTorles/:felhasznalo_id',auth, (req, res) => {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Nincs jogosultság" });
        }
        const {felhasznalo_id} =req.params
        const sql=`delete from felhasznalo where felhasznalo_id=?`
        pool.query(sql,[felhasznalo_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})
//bejelentkezett felhasználó vihessen fel szavazatot
app.post('/szavazatFelvitel',auth, (req, res) => {
        const {film,user}=req.body
        const sql=`insert into szavazat 
                    values (null,?,?)
                    `
        pool.query(sql,[film,user], (err, result) => {
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


