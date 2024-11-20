const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./auth');

const app = express();

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username database Anda
    password: '', // Ganti dengan password database Anda
    database: 'ecotrack'
});

// Koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err);
        process.exit(1);
    }
    console.log('Terhubung ke database.');
});

// Set EJS sebagai view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret_key', // Ganti dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Memanggil css
app.use(express.static('image'));

// Rute untuk halaman About Us
app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/home", (req, res) => {
    res.render("home");
});



// Rute untuk halaman Ekosistem
app.get("/ekosistem", (req, res) => {
    res.render("ekosistem");
});

// Rute untuk halaman wisata
app.get("/wisata",(req, res)=>{
    res.render("wisata");
});

// Rute persebaran
app.get("/persebaran", (req, res) => {
    res.render("persebaran");
});

// Rute utama
app.get('/', (req, res) => {
    res.render('index'); // Render file EJS home.ejs
});

app.get('/login', (req, res) => {
    res.render('login'); // Render file EJS login.ejs
});

app.get('/register', (req, res) => {
    res.render('register'); // Render file EJS register.ejs
});

//Rute ke halaman burung
app.get('/burung', (req, res)=> {
    res.render('burung');
});

//Rute ke halaman snorkeling
app.get('/snorkeling', (req, res)=> {
    res.render('snorkeling');
});

//Rute ke halaman mangrove
app.get('/mangrove', (req, res)=> {
    res.render('mangrove');
});

//Rute ke halaman terumbu
app.get('/terumbu', (req, res)=> {
    res.render('terumbu');
});

//Rute ke halaman ekosistem
app.get('/ekosistem', (req, res)=> {
    res.render('ekosistem');
});

//Rute Logout
app.get('/', (req, res) => {
    res.render('')
})

// Import rute autentikasi
app.use(auth);

// Jalankan server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
