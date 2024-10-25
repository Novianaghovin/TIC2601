const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Define the path to the database file
const DB_PATH = path.resolve(__dirname, 'new_database.db');

// Create a new database instance
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database successfully.');
    }
});

// Middleware to parse JSON
app.use(express.json());

// Example API endpoint to fetch all challenges
app.get('/api/challenges', (req, res) => {
    const sql = `SELECT * FROM Challenges`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Example API endpoint to create a new challenge
app.post('/api/challenges', (req, res) => {
    const { challenge_type, challenge_name, challenge_deadline, activity_id, participants_num, badge_id } = req.body;
    const sql = `INSERT INTO Challenges (challenge_type, challenge_name, challenge_deadline, activity_id, participants_num, badge_id) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [challenge_type, challenge_name, challenge_deadline, activity_id, participants_num, badge_id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ success: true, challenge_id: this.lastID }); // Return the ID of the newly created challenge
    });
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
