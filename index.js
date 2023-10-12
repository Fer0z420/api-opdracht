const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});
const app = express();

app.use(cors());
app.use(bodyParser.json());



app.get('/tabelnode', (req, res) => {
    const sql = 'SELECT * FROM tabelnode';
    db.query(sql, (error, results) => {
        if (error){
            throw error;
        }

        res.json(results);
    });


    // Get specific users
    app.get(`/tabelnode/:id`, (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        const userId = req.params.id;
        const sql = `SELECT * FROM tabelnode WHERE id = ?`;
        db.query(sql, [userId], (error, results) => {
            if (error) {
                console.error('Error retrieving user:', error);
                res.status(500).json({ error: 'Failed to retrieve user' });
            } else {
                if (results.length === 0) {
                    res.status(404).json({ error: 'User Not found in "Users"' });
                } else {
                    const user = results[0];
                    res.status(200).json(user);
                }
            }
        });
    });

    app.post('/tabelnode', (req, res) => {
        const { username, password, email } = req.body;
        const sql = 'INSERT INTO tabelnode (username, password, email) VALUES (?, ?, ?)';
        db.query(sql, [username, password, email], (err, results) => {
            if (err) {
                console.error('Error inserting record:', err);
                res.status(500).json({ error: 'Error inserting' });
                return;
            }
            res.status(201).json({ message: 'added successfully' });
        });
    });

// Update a user
    app.put(`/tabelnode/:id`, (req, res) => {
        const userId = req.params.id;
        const { username, password, email } = req.body;
        const sql = `UPDATE tabelnode SET username = ?, password = ?, email = ? WHERE id = ?`;
        db.query(sql, [username, password, email, userId], (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                res.status(500).json({ error: 'Error updating user' });
                return;
            }
            res.status(201).json({ message: 'Updated successfully' });
        });
    });

    app.delete('/tabelnode/:id', (req, res) => {
        const userId = req.params.id;
        const sql = 'DELETE FROM tabelnode WHERE id = ?';
        db.query(sql, [userId], (error, result) => {

            if (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({error: 'Error deleting user'});
                return;
            }
            res.status(201).json({ message: 'Deleted successfully' });


        });
    });

    });















app.listen(2000, () => {
    console.log('Server started on port 2000');
});