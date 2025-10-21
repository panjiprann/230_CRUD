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
            res.status(500).json('Error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, kelas, prodi } = req.body;

    if (!nama || !nim || !kelas || !prodi) {
        return res.status(400).send({ message: 'nama, nim, kelas, and prodi are required' });
    }
    db.query('INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)',
        [nama, nim, kelas, prodi],
        (err, results) => {
            if (err) {
                console.error(stack);
                return res.status(500).json({ message: 'Error adding mahasiswa'});
            }
            res.status(201).json({ message: 'User added successfully'});
        }
    );
});

app.put('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    const { nama, nim, kelas, prodi } = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, prodi = ? WHERE id = ?',
        [nama, nim, kelas, prodi, userId],
        (err, results) => {
            if (err) {
                console.error(stack);
                return res.status(500).json({ message: 'Error updating mahasiswa' });
            }
            res.json({ message: 'User updated successfully' });
        }
    );
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error(stack);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});