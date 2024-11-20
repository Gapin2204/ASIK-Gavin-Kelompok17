const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // Untuk enkripsi password
const router = express.Router();

// Konfigurasi koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Ganti dengan username database Anda
    password: '', // Ganti dengan password database Anda
    database: 'ecotrack'
});

// Rute registrasi
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan ke database
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) {
            console.error('Error saat menyimpan pengguna:', err);
            return res.status(500).send('Gagal mendaftarkan pengguna.');
        }
        res.redirect('/login');
    });
});

// Rute login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Periksa pengguna di database
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).send('Username atau password salah.');
        }

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send('Username atau password salah.');
        }

        // Simpan sesi pengguna
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/home');
    });
});

// Rute logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error saat logout:', err);
        }
        res.redirect('/');
    });
});

module.exports = router;
