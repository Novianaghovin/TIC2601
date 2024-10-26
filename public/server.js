const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

/* To handle FE and BE different ports issue */ 
app.use(cors());

// Define the path to the existing database file
const DB_PATH = path.resolve(__dirname, 'challenges.db');

// Connect to the existing database instance
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the existing SQLite database successfully.');
    }
});

// Middleware to parse JSON
app.use(express.json());

// Route to fetch available challenges (challenges the user hasn't joined yet)
app.get('/api/available-challenges', (req, res) => {
    const sql = `SELECT * FROM Challenges`; // Adjust the condition based on your data structure
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching available challenges:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows); // Send the available challenges back to the frontend
    });
});

// Route for a user to join a challenge
app.post('/api/join-challenge/:userId/:challengeId', (req, res) => {
    const { userId, challengeId } = req.params;

    // SQL query to insert a new entry in the user_challenges table
    const sql = `INSERT INTO user_challenges (user_id, challenge_id) VALUES (?, ?)`;

    db.run(sql, [userId, challengeId], function(err) {
        if (err) {
            console.error('Error joining challenge:', err.message);
            res.status(500).json({ error: 'Failed to join challenge' });
            return;
        }

        // Respond with success
        res.json({ success: true, message: 'Successfully joined the challenge' });
    });
});


// Route to fetch "My Challenges" (challenges the user has joined)
app.get('/api/my-challenges/:userId', (req, res) => {
    const userId = req.params.userId;

    // SQL query to fetch the challenges that the user has joined
    const sql = `
        SELECT c.*
        FROM Challenges c
        JOIN user_challenges uc ON c.challenge_id = uc.challenge_id
        WHERE uc.user_id = ? `;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching user challenges:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows); // Return the joined challenges for the user
    });
});

// Example route to get user data (like userId) from the database
app.get('/api/get-user/:user_id', (req, res) => {
    const username = req.params.user_id; 
  
    const sql = `SELECT user_id FROM user_profile WHERE user_id = ?`;
    db.get(sql, [username], (err, row) => {
      if (err) {
        console.error('Error fetching user data:', err.message);
        res.status(500).json({ error: 'Database error' });
      } else if (row) {
        res.json({ userId: row.user_id });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
  });

// Start the server
app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});