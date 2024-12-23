// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

//.GET [insert queries] , .PUT, .POST, .DELETE function to be inserted -- please see week10 tutorial  

// Get all users
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err.message); // Log the error for debugging
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        
        // If no users are found, you may choose to return an empty array or a specific message
        res.json(rows.length > 0 ? rows : []); // Respond with the users or an empty array
    });
});


// Add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, email });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
