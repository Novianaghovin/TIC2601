const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// SQLite connection setup
const db = new sqlite3.Database('./challenges_db.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// API to fetch My Challenges
app.get('/api/my-challenges', (req, res) => {
    const userId = 1; // Assume user ID is 1 for now
    const sql = `SELECT c.type, c.name, c.deadline, c.participants 
                 FROM challenges c 
                 JOIN user_challenges uc ON c.id = uc.challenge_id 
                 WHERE uc.user_id = ?`;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API to fetch Available Challenges
app.get('/api/available-challenges', (req, res) => {
    const sql = 'SELECT * FROM challenges WHERE id NOT IN (SELECT challenge_id FROM user_challenges WHERE user_id = ?)';

    db.all(sql, [1], (err, rows) => {  // Assume user ID 1 for now
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// API to join a challenge
app.post('/api/join-challenge/:id', (req, res) => {
    const challengeId = req.params.id;
    const userId = req.user.id; // Get user ID from the authenticated session
    const sql = `INSERT INTO user_challenges (user_id, challenge_id) VALUES (?, ?)`;

    db.run(sql, [userId, challengeId], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
