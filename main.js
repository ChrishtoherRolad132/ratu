//main.js
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__filename, 'index.html'));
});

const db = new sqlite3.Database('example.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the example database.');
});

document.getElementById('inputForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    // Insert data into SQLite database
    db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, [name, age], function(err) {
        if (err) {
            console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    // Reset form
    document.getElementById('inputForm').reset();
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});

app.listen(3000, () => {
    console.log('server was running on port 3000');
});
