const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bumi12345+',
    database: 'mahasiswa',
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', + err.stack);
        return;
    }
    console.log('Connection to MySQL successful!');
});

app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('Error executing query:', + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});