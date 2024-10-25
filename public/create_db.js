const sqlite3 = require('sqlite3').verbose();
const path = require('path');

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

// Create tables
db.serialize(() => {
    // Create the badge_records table
    db.run(`CREATE TABLE IF NOT EXISTS badge_records (
        badge_id INTEGER PRIMARY KEY AUTOINCREMENT,
        badge_name TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating badge_records table:', err.message);
        } else {
            console.log('badge_records table created successfully.');
        }
    });

    // Create the activity_log table
    db.run(`CREATE TABLE IF NOT EXISTS activity_log (
        activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity_name TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating activity_log table:', err.message);
        } else {
            console.log('activity_log table created successfully.');
        }
    });

    // Create the Challenges table
    db.run(`CREATE TABLE IF NOT EXISTS Challenges (
        challenge_id INTEGER PRIMARY KEY AUTOINCREMENT,
        challenge_type TEXT NOT NULL,
        challenge_name TEXT NOT NULL,
        challenge_deadline DATE NOT NULL,
        activity_id INTEGER NOT NULL,
        participants_num INTEGER NOT NULL,
        badge_id INTEGER NOT NULL,
        FOREIGN KEY (badge_id) REFERENCES badge_records(badge_id),
        FOREIGN KEY (activity_id) REFERENCES activity_log(activity_id)
    )`, (err) => {
        if (err) {
            console.error('Error creating Challenges table:', err.message);
        } else {
            console.log('Challenges table created successfully.');
        }
    });
});

// Close the database when done
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
