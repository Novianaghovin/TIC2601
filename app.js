// Import the sqlite3 library with verbose mode for additional debugging information
const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
// './ConnectToDB.db' refers to the relative path of the database file
// sqlite3.OPEN_READWRITE mode allows both reading and writing to the database
const db = new sqlite3.Database('./ConnectToDB.db', sqlite3.OPEN_READWRITE, (err) => {
    
    // If there is an error while connecting, log the error message and stop the execution
    if (err) return console.error(err.message);
    
    // If no error occurs, log a message indicating the successful connection to the database
    console.log('Connected to the database.');
});


hello 