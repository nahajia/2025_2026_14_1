const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/kepek", express.static("kepek"));
app.use("/kepek2", express.static("kepek2"));

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "marveladatb",
});

// biztosítsuk, hogy létezzen a mappa
const UPLOAD_DIR = path.join(__dirname, "kepek");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// multer beállítás: kepek almappába ment, egyedi fájlnév
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^\w\-]+/g, "_")
      .slice(0, 50);

    const unique = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}_${unique}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ok = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
    file.mimetype
  );
  cb(ok ? null : new Error("Csak képfájl tölthető fel!"), ok);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/film", (req, res) => {
  const sql = `SELECT * FROM film`;
  pool.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Hiba" });
    if (result.length === 0) return res.status(404).json({ error: "Nincs adat" });
    return res.status(200).json(result);
  });
});

// Multipart/form-data endpoint: mezők + 1 kép
// frontend: FormData { film_cim, film_ev, kep }  (a fájl mező neve: "kep")
app.post("/filmFelvitel", upload.single("kep"), (req, res) => {
  const { film_cim, film_ev } = req.body;

  if (!film_cim || !film_ev) {
    if (req.file) fs.unlink(req.file.path, () => {});
    return res.status(400).json({ error: "film_cim és film_ev kötelező" });
  }

  // DB-be a fájlnév (vagy teheted: `/kepek/${req.file.filename}`)
  const film_kep = req.file ? req.file.filename : null;

  const sql = `INSERT INTO film (film_id, film_cim, film_ev, film_kep) VALUES (NULL, ?, ?, ?)`;
  pool.query(sql, [film_cim, film_ev, film_kep], (err) => {
    if (err) {
      if (req.file) fs.unlink(req.file.path, () => {});
      return res.status(500).json({ error: "Hiba" });
    }
    return res.status(200).json({
      message: "Sikeres felvitel",
      film_kep,
      url: film_kep ? `/kepek/${film_kep}` : null,
    });
  });
});

// multer/egyéb hibák kezelése
app.use((err, req, res, next) => {
  if (err) return res.status(400).json({ error: err.message || "Hiba" });
  next();
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
